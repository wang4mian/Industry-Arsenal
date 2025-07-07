import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { rssUrl, sourceName, verticalName } = await req.json();
    if (!rssUrl) {
      throw new Error('RSS URL不能为空');
    }
    console.log('🔥 开始RSS分析:', rssUrl);
    // ===== 步骤1: RSS拉取 - 只获取基础字段 =====
    const rssArticles = await fetchRSSBasicInfo(rssUrl);
    console.log(`📄 RSS拉取完成，找到 ${rssArticles.length} 篇文章`);
    const processedArticles = [];
    // 处理每篇文章
    for (const rssArticle of rssArticles.slice(0, 5)){
      try {
        console.log(`🔄 处理文章: ${rssArticle.title.substring(0, 50)}...`);
        // 检查文章是否已存在
        const { data: existingArticle } = await supabaseClient.from('articles').select('id').eq('original_article_link', rssArticle.link).maybeSingle();
        if (existingArticle) {
          console.log(`⚠️ 文章已存在，跳过`);
          continue;
        }
        // ===== 步骤2: Jina API 读取全文 =====
        const fullContent = await fetchFullTextWithJina(rssArticle.link);
        if (!fullContent || fullContent.length < 100) {
          console.log(`❌ 全文抓取失败，跳过此文章`);
          continue;
        }
        console.log(`✅ 全文抓取成功，长度: ${fullContent.length}字符`);
        // ===== 步骤3: Gemini LLM 分析全文 - 摘要和打分 =====
        const aiAnalysis = await analyzeWithGemini(rssArticle.title, fullContent, verticalName);
        // 组装最终数据 - 匹配实际数据库表结构
        const article = {
          title: rssArticle.title,
          original_article_link: rssArticle.link,
          vertical_name: verticalName,
          content: fullContent,
          summary_ai: aiAnalysis.summary,
          score_ai: aiAnalysis.score,
          is_selected: false
        };
        processedArticles.push(article);
        console.log(`✅ 文章处理完成，评分: ${aiAnalysis.score}`);
      } catch (articleError) {
        console.error(`❌ 文章处理失败: ${articleError.message}`);
      }
    }
    // 插入数据库
    if (processedArticles.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        count: 0,
        message: '没有新文章需要添加'
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200
      });
    }
    const { data, error } = await supabaseClient.from('articles').insert(processedArticles).select();
    if (error) {
      if (error.code === '23505') {
        console.log(`⚠️ 检测到重复文章`);
        return new Response(JSON.stringify({
          success: true,
          count: 0,
          message: '检测到重复文章，已跳过'
        }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200
        });
      } else {
        throw new Error(`数据库插入失败: ${error.message}`);
      }
    }
    return new Response(JSON.stringify({
      success: true,
      count: data?.length || 0,
      message: `成功处理 ${data?.length || 0} 篇文章`
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error('❌ RSS分析失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
// ===== 步骤1: RSS拉取 - 只获取基础字段 =====
async function fetchRSSBasicInfo(rssUrl) {
  console.log('📡 开始RSS拉取...');
  const response = await fetch(rssUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*'
    },
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) {
    throw new Error(`RSS拉取失败: HTTP ${response.status}`);
  }
  const xmlText = await response.text();
  console.log(`📡 RSS内容获取成功，长度: ${xmlText.length}`);
  // 解析RSS，只提取基础信息
  const articles = [];
  const itemPattern = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  const itemMatches = [
    ...xmlText.matchAll(itemPattern)
  ];
  for (const itemMatch of itemMatches){
    const itemContent = itemMatch[1];
    const titleMatch = itemContent.match(/<title[^>]*>(.*?)<\/title>/is);
    const linkMatch = itemContent.match(/<link[^>]*>(.*?)<\/link>/is);
    if (titleMatch && linkMatch) {
      const title = cleanText(titleMatch[1]);
      const link = linkMatch[1].trim();
      if (title && link && link.startsWith('http')) {
        articles.push({
          title,
          link
        });
      }
    }
  }
  return articles;
}
// ===== 步骤2: Jina API 读取全文 =====
async function fetchFullTextWithJina(url) {
  console.log(`📖 开始Jina API抓取全文...`);
  const jinaApiKey = Deno.env.get('JINA_API_KEY');
  if (!jinaApiKey) {
    throw new Error('未配置JINA_API_KEY');
  }
  const jinaUrl = `https://r.jina.ai/${url}`;
  console.log(`📖 调用Jina API: ${jinaUrl}`);
  const response = await fetch(jinaUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jinaApiKey}`,
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(45000)
  });
  console.log(`📖 Jina API响应状态: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Jina API失败 (${response.status}): ${errorText}`);
  }
  const data = await response.json();
  if (data.content && data.content.length > 100) {
    console.log(`📖 ✅ 全文抓取成功，长度: ${data.content.length}字符`);
    return data.content;
  } else {
    throw new Error(`Jina API返回内容为空或过短`);
  }
}
// ===== 步骤3: Gemini LLM 分析全文 - 摘要和打分 =====
async function analyzeWithGemini(title, fullContent, verticalName) {
  console.log('🤖 开始Gemini AI分析...');
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiApiKey) {
    throw new Error('未配置GEMINI_API_KEY');
  }
  const prompt = `你是一个专业的${verticalName}行业分析师。请基于以下标准为新闻打分：

评分维度：
1. 重要性(40%)：技术突破/市场动态/政策法规的重要程度
2. 影响范围(30%)：全球性>区域性>企业级>概念性
3. 时效性(20%)：突发>独家>定期>历史
4. 信息质量(10%)：权威来源>详实数据>明确来源>推测性质

评分标准：
• 10分：行业重大突破，全球影响，突发新闻，权威来源
• 9分：重要技术进展，广泛影响，独家报道，可靠来源
• 8分：显著市场动态，区域影响，及时报道，明确来源
• 7分：一般行业新闻，企业级影响，定期更新，基本可信
• 6分：常规信息，局部影响，延迟报道，来源一般
• 5分：边缘相关，概念性，历史回顾，来源模糊
• 1-4分：不相关/过时/虚假信息

标题: ${title}
内容: ${fullContent.substring(0, 3000)}...
领域: ${verticalName}

请返回JSON格式:
{
  "score": 1到10的数字评分,
  "summary": "基于文章内容的中文摘要，2-3句话，不超过100字"
}`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': geminiApiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    }),
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API失败 (${response.status}): ${errorText}`);
  }
  const geminiData = await response.json();
  const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!aiText) {
    throw new Error('Gemini返回空内容');
  }
  console.log(`🤖 AI分析完成`);
  // 解析JSON响应
  try {
    const jsonMatch = aiText.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        score: Math.max(1, Math.min(10, parseInt(result.score) || 7)),
        summary: result.summary || ''
      };
    }
  } catch (parseError) {
    console.log(`⚠️ JSON解析失败，尝试提取数字`);
    const scoreMatch = aiText.match(/(\d+)/);
    return {
      score: scoreMatch ? Math.max(1, Math.min(10, parseInt(scoreMatch[1]))) : 7,
      summary: `AI分析摘要：${title.substring(0, 50)}...`
    };
  }
  return {
    score: 7,
    summary: `AI分析摘要：${title.substring(0, 50)}...`
  };
}
// 文本清理
function cleanText(text) {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/\s+/g, ' ').trim();
}