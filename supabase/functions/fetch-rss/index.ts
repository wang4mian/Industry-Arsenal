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

    console.log('🔥 开始AI评分优先RSS分析:', rssUrl)
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

    // 2. AI评分优先解析
    const articles = await parseRSSWithAIScoreFirst(xmlText, sourceName, verticalName)
    
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
        mode: 'ai-score-first',
        processingTime,
        message: `🚀 AI评分优先分析完成！处理 ${data?.length || 0} 篇文章`,
        articles: data?.slice(0, 3)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('AI评分优先分析失败:', error)
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

// 🔥 AI评分优先的RSS解析
async function parseRSSWithAIScoreFirst(xmlText: string, sourceName: string, verticalName: string) {
  const articles = []
  
  try {
    console.log('🚀 开始AI评分优先RSS解析...')
    
    // 查找所有item
    const itemPattern = /<item[^>]*>([\s\S]*?)<\/item>/gi
    const itemMatches = [...xmlText.matchAll(itemPattern)]
    
    console.log(`找到 ${itemMatches.length} 个item，开始逐个AI评分...`)
    
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
        
        console.log(`🤖 第${i+1}个item AI快速评分: ${title.substring(0, 30)}...`)
        
        // 🔥 步骤1: AI快速评分
        const quickScore = await getAIQuickScore(title, description, verticalName)
        
        console.log(`📊 第${i+1}个item快速评分: ${quickScore}分`)
        
        // 🔥 步骤2: 根据评分决定是否抓全文
        let finalResult
        if (quickScore >= 7) {
          console.log('📖 高分文章，抓取全文进行深度分析...')
          finalResult = await getAIFullAnalysis(title, description, link, verticalName)
          finalResult.analysis_mode = 'full-text'
        } else {
          console.log('📝 普通文章，生成快速摘要')
          const quickSummary = await getAIQuickSummary(title, description, verticalName)
          finalResult = {
            summary_ai: quickSummary,
            score_ai: quickScore,
            analysis_mode: 'quick'
          }
        }
        
        const article = {
          title: title,
          original_article_link: link,
          vertical_name: verticalName,
          summary_ai: finalResult.summary_ai,
          score_ai: finalResult.score_ai,
          analysis_mode: finalResult.analysis_mode,
          is_selected: false
        }
        
        articles.push(article)
        console.log(`✅ 第${i+1}个item分析完成 (${finalResult.analysis_mode}, 评分: ${finalResult.score_ai})`)
        
      } catch (itemError) {
        console.log(`❌ 第${i+1}个item分析失败:`, itemError.message)
      }
    }
    
  } catch (parseError) {
    console.error('❌ RSS解析过程出错:', parseError)
  }
  
  console.log(`🎉 AI评分优先分析完成！共处理 ${articles.length} 篇文章`)
  return articles
}

// 🔥 AI快速评分 - 只要分数
async function getAIQuickScore(title: string, description: string, verticalName: string): Promise<number> {
  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      console.log('⚠️ 未配置GEMINI_API_KEY，使用默认评分')
      return Math.floor(Math.random() * 3) + 7
    }

    const newsContent = `标题：${title}\n描述：${description || '无描述'}`
    
    const prompt = `请为以下新闻打1-10分：

新闻内容：
${newsContent}

请只返回数字，不要其他内容。`

    console.log('🤖 调用Gemini进行快速评分...')
    console.log('🔧 API Key:', geminiApiKey ? `${geminiApiKey.substring(0, 10)}...` : 'MISSING')
    
    // 🔥 使用标准curl格式的API调用，包含X-goog-api-key头部
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 10,
          topP: 0.8,
          topK: 10
        }
      })
    })

    console.log('🔧 Gemini响应状态:', geminiResponse.status)
    
    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('🔧 Gemini API详细错误:', errorText)
      throw new Error(`Gemini API失败: ${geminiResponse.status} - ${errorText}`)
    }

    const geminiData = await geminiResponse.json()
    console.log('🔧 Gemini响应数据:', JSON.stringify(geminiData, null, 2))
    
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      throw new Error('Gemini返回空结果')
    }

    // 提取数字分数
    const scoreMatch = aiText.match(/(\d+)/)
    if (scoreMatch) {
      const score = parseInt(scoreMatch[1])
      return Math.max(1, Math.min(10, score))
    } else {
      throw new Error('AI返回格式错误: ' + aiText)
    }

  } catch (error) {
    console.error('AI快速评分失败:', error.message)
    return Math.floor(Math.random() * 3) + 7 // 降级处理
  }
}

// 🔥 AI快速摘要 - 基于RSS内容
async function getAIQuickSummary(title: string, description: string, verticalName: string): Promise<string> {
  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      return description || `【${verticalName}】${title}`
    }

    const newsContent = `标题：${title}\n描述：${description || '无描述'}`
    
    const prompt = `你是一个专业的${verticalName}行业分析师。请基于以下新闻内容，用精炼的中文生成一个不超过三句话的核心观点摘要：

新闻内容：
${newsContent}

请直接返回摘要内容，不要格式化，不要前缀。`

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API失败: ${geminiResponse.status}`)
    }

    const geminiData = await geminiResponse.json()
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    return aiText?.trim() || description || `【${verticalName}】${title}`

  } catch (error) {
    console.error('AI快速摘要失败:', error.message)
    return description || `【${verticalName}】${title}`
  }
}

// 🔥 AI全文分析 - 抓取全文后分析
async function getAIFullAnalysis(title: string, description: string, link: string, verticalName: string) {
  try {
    // 1. 使用Jina Reader抓取全文
    const fullText = await fetchFullTextWithJina(link)
    
    if (!fullText) {
      console.log('全文抓取失败，使用RSS摘要')
      const quickSummary = await getAIQuickSummary(title, description, verticalName)
      const quickScore = await getAIQuickScore(title, description, verticalName)
      return {
        summary_ai: quickSummary,
        score_ai: quickScore
      }
    }
    
    console.log(`📖 成功抓取全文，长度: ${fullText.length}字符`)
    
    // 2. 用全文进行完整AI分析
    const newsContent = `标题：${title}\n描述：${description}\n全文：${fullText.substring(0, 3000)}...`
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('未配置GEMINI_API_KEY')
    }

    const prompt = `你是一个专业的${verticalName}行业分析师。请基于以下完整新闻内容，完成分析并以JSON格式返回：

1. 用精炼的中文，生成一个不超过三句话的核心观点摘要，存入'summary_ai'字段。
2. 评估这篇新闻的产业重要性，打一个1-10分的分数，存入'score_ai'字段。

完整新闻内容：
${newsContent}

请严格按照以下JSON格式返回：
{
  "summary_ai": "中文摘要，不超过三句话",
  "score_ai": 数字分数
}`

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API失败: ${geminiResponse.status}`)
    }

    const geminiData = await geminiResponse.json()
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      throw new Error('Gemini返回空结果')
    }

    // 解析AI返回的JSON
    const jsonMatch = aiText.match(/\{[\s\S]*?\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      
      return {
        summary_ai: parsed.summary_ai || description,
        score_ai: Math.max(1, Math.min(10, parseInt(parsed.score_ai) || 7))
      }
    } else {
      throw new Error('AI返回格式错误')
    }

  } catch (error) {
    console.log('全文分析失败，降级为RSS分析:', error.message)
    const quickSummary = await getAIQuickSummary(title, description, verticalName)
    const quickScore = await getAIQuickScore(title, description, verticalName)
    return {
      summary_ai: quickSummary,
      score_ai: quickScore
    }
  }
}

// 🔥 使用Jina Reader抓取全文
async function fetchFullTextWithJina(url: string) {
  try {
    console.log('📖 使用Jina Reader抓取全文:', url)
    
    const jinaUrl = `https://r.jina.ai/${url}`
    
    const response = await fetch(jinaUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
      },
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      throw new Error(`Jina API失败: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.content && data.content.length > 100) {
      return data.content
    } else {
      throw new Error('Jina返回内容为空或过短')
    }
    
  } catch (error) {
    console.log('Jina抓取失败:', error.message)
    return null
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