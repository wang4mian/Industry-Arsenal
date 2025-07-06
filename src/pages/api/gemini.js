import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST({ request }) {
  try {
    const { articleId } = await request.json()
    
    // 获取文章内容
    const { data: article, error } = await supabase
      .from('OSINT Workstation')
      .select('*')
      .eq('id', articleId)
      .single()
    
    if (error) throw error
    
    // 构建 Gemini API 请求
    const prompt = `
请分析这篇3D打印/科技行业文章，提供以下信息：
1. 简洁中文摘要（100字以内）
2. 核心关键词（3-5个，用逗号分隔）
3. 重要程度评分（1-10分，10分最重要）

文章标题：${article.Title}
文章链接：${article.Original_Article_Link}
信息来源：${article.InfoSource}

请严格按照以下格式返回：
摘要：[摘要内容]
关键词：[关键词1,关键词2,关键词3]
评分：[数字]
`
    
    // 调用 Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })
    
    const result = await response.json()
    
    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('AI 分析失败')
    }
    
    const text = result.candidates[0].content.parts[0].text
    
    // 解析AI响应
    const summaryMatch = text.match(/摘要[:：]\s*(.+)/i)
    const keywordsMatch = text.match(/关键词[:：]\s*(.+)/i)
    const scoreMatch = text.match(/评分[:：]\s*(\d+)/i)
    
    const aiResponse = {
      summary: summaryMatch ? summaryMatch[1].trim() : '暂无摘要',
      keywords: keywordsMatch ? keywordsMatch[1].trim() : '暂无关键词',
      score: scoreMatch ? parseInt(scoreMatch[1]) : 5
    }
    
    // 更新文章的AI处理结果
    const { error: updateError } = await supabase
      .from('OSINT Workstation')
      .update({
        summary_ai: aiResponse.summary,
        score_ai: aiResponse.score
      })
      .eq('id', articleId)
    
    if (updateError) throw updateError
    
    return new Response(JSON.stringify({
      success: true,
      data: aiResponse
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}