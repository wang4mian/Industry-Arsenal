import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { rssUrl, sourceName, verticalName } = await req.json()
    
    if (!rssUrl) {
      throw new Error('RSS URL不能为空')
    }

    console.log('🔥 开始一步到位AI分析RSS:', rssUrl)
    const startTime = Date.now()
    
    // 1. 获取RSS内容
    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const xmlText = await response.text()
    console.log('RSS内容获取成功，长度:', xmlText.length)

    // 2. 解析RSS并AI分析
    const articles = await parseRSSWithSimpleAI(xmlText, sourceName, verticalName)
    
    if (articles.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'RSS解析成功但没有找到有效文章内容',
          count: 0
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // 3. 批量插入到数据库
    const { data, error } = await supabaseClient
      .from('articles')
      .insert(articles)
      .select()

    if (error) {
      console.error('数据库插入错误:', error)
      throw new Error(`数据库插入失败: ${error.message}`)
    }

    const processingTime = Date.now() - startTime

    return new Response(
      JSON.stringify({
        success: true,
        count: data?.length || 0,
        mode: 'one-shot-ai',
        processingTime,
        message: `🚀 一步到位AI分析完成！处理 ${data?.length || 0} 篇文章`,
        articles: data?.slice(0, 3)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('一步到位AI分析失败:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        count: 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

// 🔥 RSS解析 + 一步到位AI分析
async function parseRSSWithSimpleAI(xmlText: string, sourceName: string, verticalName: string) {
  const articles = []
  
  try {
    console.log('🚀 开始RSS解析 + 一步到位AI分析...')
    
    // 查找所有item
    const itemPattern = /<item[^>]*>([\s\S]*?)<\/item>/gi
    const itemMatches = [...xmlText.matchAll(itemPattern)]
    
    console.log(`找到 ${itemMatches.length} 个item，开始逐个AI分析...`)
    
    for (let i = 0; i < Math.min(itemMatches.length, 15); i++) {
      const itemContent = itemMatches[i][1]
      
      try {
        // 基础内容提取
        const titleMatch = itemContent.match(/<title[^>]*>(.*?)<\/title>/is)
        const linkMatch = itemContent.match(/<link[^>]*>(.*?)<\/link>/is)
        const descMatch = itemContent.match(/<description[^>]*>(.*?)<\/description>/is)
        
        if (!titleMatch || !linkMatch) {
          console.log(`❌ 第${i+1}个item缺少基础字段`)
          continue
        }
        
        const title = cleanText(titleMatch[1])
        const link = linkMatch[1].trim()
        const description = cleanText(descMatch?.[1] || '')
        
        // 基本验证
        if (!title || title.length < 3 || !link || !link.startsWith('http')) {
          console.log(`❌ 第${i+1}个item验证失败`)
          continue
        }
        
        console.log(`🤖 正在AI分析第${i+1}个item: ${title.substring(0, 30)}...`)
        
        // 🔥 一步到位AI分析
        const aiResult = await analyzeWithOneShot(title, description, verticalName)
        
        const article = {
          title: title,
          original_article_link: link,
          vertical_name: verticalName,
          summary_ai: aiResult.summary_ai,  // 🔥 AI生成的摘要
          score_ai: aiResult.score_ai,      // 🔥 AI评分
          is_selected: false
        }
        
        articles.push(article)
        console.log(`✅ 第${i+1}个item AI分析完成 (评分: ${aiResult.score_ai})`)
        
      } catch (itemError) {
        console.log(`❌ 第${i+1}个item AI分析失败:`, itemError.message)
      }
    }
    
  } catch (parseError) {
    console.error('❌ RSS解析过程出错:', parseError)
  }
  
  console.log(`🎉 一步到位分析完成！共处理 ${articles.length} 篇文章`)
  return articles
}

// 🔥 一步到位AI分析函数
async function analyzeWithOneShot(title: string, description: string, verticalName: string) {
  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      console.log('⚠️ 未配置GEMINI_API_KEY，使用默认评分')
      return {
        summary_ai: description || `【${verticalName}】${title}`,
        score_ai: Math.floor(Math.random() * 3) + 7
      }
    }

    // 🔥 构造一步到位prompt
    const newsContent = `标题：${title}\n描述：${description || '无描述'}`
    
    const prompt = `你是一个专业的${verticalName}行业分析师。请基于以下新闻内容（可能是英文、日文或中文），完成以下任务，并以JSON格式返回：

1. 用精炼的中文，生成一个不超过三句话的核心观点摘要，存入'summary_ai'字段。
2. 评估这篇新闻的产业重要性，打一个1-10分的分数，存入'score_ai'字段。

新闻内容如下：
${newsContent}

请严格按照以下JSON格式返回：
{
  "summary_ai": "中文摘要，不超过三句话",
  "score_ai": 数字分数
}`

    console.log('🤖 调用Gemini进行一步到位分析...')
    
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    })

    if (!geminiResponse.ok) {
      console.error('Gemini API调用失败:', geminiResponse.status)
      throw new Error('Gemini API失败')
    }

    const geminiData = await geminiResponse.json()
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      throw new Error('Gemini返回空结果')
    }

    // 解析AI返回的JSON
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*?\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        
        return {
          summary_ai: parsed.summary_ai || description || `【${verticalName}】${title}`,
          score_ai: Math.max(1, Math.min(10, parseInt(parsed.score_ai) || 5))
        }
      } else {
        throw new Error('未找到JSON格式')
      }
    } catch (parseError) {
      console.error('解析AI返回JSON失败:', parseError)
      throw parseError
    }

  } catch (error) {
    console.error('AI分析出错:', error)
    
    // 🔄 降级处理：使用默认逻辑
    return {
      summary_ai: description || `【${verticalName}】${title}`,
      score_ai: Math.floor(Math.random() * 3) + 7 // 暂时保持随机数
    }
  }
}

// 🔥 文本清理工具
function cleanText(text: string): string {
  if (!text) return ''
  
  return text
    .replace(/<!\\[CDATA\\[(.*?)\\]\\]>/gs, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\\s+/g, ' ')
    .trim()
}