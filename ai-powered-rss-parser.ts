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

    console.log('🔥 开始AI驱动的RSS抓取:', rssUrl)

    const startTime = Date.now()
    
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

    // 🔥 使用AI驱动的解析方法
    const articles = await parseRSSWithAI(xmlText, sourceName, verticalName)
    
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

    // 插入到数据库
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
        mode: 'ai-powered',
        processingTime,
        message: `🤖 AI分析完成！成功处理 ${data?.length || 0} 篇文章`,
        articles: data?.slice(0, 3) // 只返回前3篇作为示例
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('AI RSS抓取失败:', error)
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

// 🔥 AI驱动的RSS解析方法
async function parseRSSWithAI(xmlText: string, sourceName: string, verticalName: string) {
  const articles = []
  
  try {
    console.log('🤖 开始AI驱动的RSS解析...')
    
    // 查找所有item
    const itemPattern = /<item[^>]*>([\s\S]*?)<\/item>/gi
    const itemMatches = [...xmlText.matchAll(itemPattern)]
    
    console.log(`找到 ${itemMatches.length} 个item，开始AI分析...`)
    
    for (let i = 0; i < Math.min(itemMatches.length, 15); i++) {
      const itemContent = itemMatches[i][1]
      
      try {
        console.log(`🤖 AI分析第${i+1}个item...`)
        
        // 提取基础内容
        const titleMatch = itemContent.match(/<title[^>]*>(.*?)<\/title>/is)
        const linkMatch = itemContent.match(/<link[^>]*>(.*?)<\/link>/is)
        const descMatch = itemContent.match(/<description[^>]*>(.*?)<\/description>/is)
        
        let title = ''
        let link = ''
        let rawDescription = ''
        
        if (titleMatch) {
          title = cleanText(titleMatch[1])
        }
        
        if (linkMatch) {
          link = linkMatch[1].trim()
        }
        
        if (descMatch) {
          rawDescription = cleanText(descMatch[1]).substring(0, 500)
        }
        
        // 基本验证
        if (!title || title.length < 3 || !link || !link.startsWith('http')) {
          console.log(`❌ 第${i+1}个item基础验证失败`)
          continue
        }
        
        // 🔥 调用AI分析
        const aiAnalysis = await analyzeContentWithAI(title, rawDescription, verticalName)
        
        if (aiAnalysis.shouldInclude) {
          const article = {
            title: title,
            original_article_link: link,
            vertical_name: verticalName,
            summary_ai: aiAnalysis.summary, // 🔥 AI生成的摘要
            score_ai: aiAnalysis.score,     // 🔥 AI计算的评分
            is_selected: false,
            ai_analysis_tags: aiAnalysis.tags,
            ai_analysis_category: aiAnalysis.category
          }
          
          articles.push(article)
          console.log(`✅ AI分析通过，添加第${articles.length}篇文章: ${title.substring(0, 40)}... (评分: ${aiAnalysis.score})`)
          
        } else {
          console.log(`🚫 AI分析认为内容质量不足，跳过: ${title.substring(0, 30)}...`)
        }
        
      } catch (itemError) {
        console.log(`❌ AI分析第${i+1}个item时出错:`, itemError.message)
      }
    }
    
  } catch (parseError) {
    console.error('❌ AI RSS解析过程中出错:', parseError)
  }
  
  console.log(`🎉 AI解析完成！共提取 ${articles.length} 篇高质量文章`)
  return articles
}

// 🔥 AI内容分析函数
async function analyzeContentWithAI(title: string, description: string, vertical: string) {
  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      console.log('⚠️ 未配置GEMINI_API_KEY，使用智能默认评分')
      return getSmartDefaultAnalysis(title, description, vertical)
    }

    // 构造AI分析prompt
    const prompt = `
请分析以下新闻文章的质量和重要性：

标题：${title}
描述：${description}
领域：${vertical}

请提供：
1. 质量评分（1-10分）
2. 简洁摘要（50-100字）
3. 内容标签（最多3个关键词）
4. 文章分类（如：突破性进展、行业动态、政策变化等）
5. 是否值得收录（true/false）

请以JSON格式回复：
{
  "score": 数字,
  "summary": "摘要文本",
  "tags": ["标签1", "标签2"],
  "category": "分类",
  "shouldInclude": true/false,
  "reasoning": "分析理由"
}
`

    console.log('🤖 调用Gemini API进行内容分析...')
    
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
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
      return getSmartDefaultAnalysis(title, description, vertical)
    }

    const geminiData = await geminiResponse.json()
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      console.error('Gemini API返回格式异常')
      return getSmartDefaultAnalysis(title, description, vertical)
    }

    // 解析AI返回的JSON
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const aiAnalysis = JSON.parse(jsonMatch[0])
        
        // 验证和清理数据
        return {
          score: Math.max(1, Math.min(10, aiAnalysis.score || 5)),
          summary: aiAnalysis.summary?.substring(0, 300) || description.substring(0, 200),
          tags: Array.isArray(aiAnalysis.tags) ? aiAnalysis.tags.slice(0, 3) : [vertical],
          category: aiAnalysis.category || '行业动态',
          shouldInclude: aiAnalysis.shouldInclude !== false, // 默认包含
          reasoning: aiAnalysis.reasoning || '内容具有一定价值'
        }
      }
    } catch (parseError) {
      console.error('解析AI返回的JSON失败:', parseError)
    }

    // 如果解析失败，使用智能默认分析
    return getSmartDefaultAnalysis(title, description, vertical)
    
  } catch (error) {
    console.error('AI分析出错:', error)
    return getSmartDefaultAnalysis(title, description, vertical)
  }
}

// 🔥 智能默认分析（当AI不可用时）
function getSmartDefaultAnalysis(title: string, description: string, vertical: string) {
  // 基于关键词的智能评分
  const qualityKeywords = [
    '突破', '创新', '首次', '重大', '发布', '推出', '技术', '研发',
    '投资', '融资', '合作', '并购', '政策', '法规', '标准'
  ]
  
  const lowQualityKeywords = [
    '可能', '据说', '传言', '未证实', '或将', '预计'
  ]
  
  let score = 5 // 基础分
  const content = (title + ' ' + description).toLowerCase()
  
  // 正面关键词加分
  qualityKeywords.forEach(keyword => {
    if (content.includes(keyword)) score += 0.5
  })
  
  // 负面关键词减分
  lowQualityKeywords.forEach(keyword => {
    if (content.includes(keyword)) score -= 0.3
  })
  
  // 标题长度调整
  if (title.length > 50) score += 0.5
  if (title.length < 20) score -= 0.5
  
  // 描述长度调整
  if (description.length > 100) score += 0.5
  
  // 限制评分范围
  score = Math.max(3, Math.min(9, Math.round(score * 10) / 10))
  
  // 生成智能摘要
  const summary = description.length > 50 
    ? `${description.substring(0, 150)}...` 
    : `【${vertical}】${title} - 来源：自动分析`
  
  return {
    score: score,
    summary: summary,
    tags: [vertical, '自动分析'],
    category: '行业动态',
    shouldInclude: score >= 4, // 4分以上才收录
    reasoning: `智能评分：${score}分，基于内容关键词分析`
  }
}

// 🔥 文本清理工具
function cleanText(text: string): string {
  if (!text) return ''
  
  return text
    .replace(/<!\\[CDATA\\[(.*?)\\]\\]>/gs, '$1')   // 移除CDATA包装
    .replace(/<[^>]*>/g, '')                     // 移除所有HTML标签
    .replace(/&lt;/g, '<')                       // HTML实体解码
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\\s+/g, ' ')                        // 合并多个空白字符
    .trim()
}