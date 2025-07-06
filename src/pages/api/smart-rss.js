import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// 移除了所有模拟内容生成函数

export async function POST({ request }) {
  try {
    console.log('智能RSS抓取开始...')
    
    const requestData = await request.json()
    const { rssUrl, sourceName } = requestData
    
    console.log('RSS URL:', rssUrl)
    console.log('Source Name:', sourceName)
    
    if (!rssUrl) {
      throw new Error('RSS URL不能为空')
    }

    let articles = []
    let useRealRSS = false
    
    // 首先尝试真实RSS抓取
    try {
      console.log('尝试真实RSS抓取...')
      
      const response = await fetch(rssUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        signal: AbortSignal.timeout(5000) // 5秒超时
      })
      
      if (response.ok) {
        const xmlText = await response.text()
        console.log('真实RSS抓取成功，内容长度:', xmlText.length)
        
        // 解析RSS内容 - 专门处理Google News RSS格式
        const items = xmlText.match(/<item[\s\S]*?<\/item>/gi) || 
                     xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || []
        
        if (items.length > 0) {
          useRealRSS = true
          console.log('解析到', items.length, '个RSS项目')
          
          // 处理真实RSS数据（Google News专用解析）
          for (const itemXml of items.slice(0, 8)) {
            try {
              // Google News RSS的特殊解析
              const titleMatch = itemXml.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/i) || 
                               itemXml.match(/<title[^>]*>(.*?)<\/title>/i)
              const linkMatch = itemXml.match(/<link[^>]*>(.*?)<\/link>/i) ||
                               itemXml.match(/<link\s+href=["'](.*?)["'][^>]*>/i)
              const descMatch = itemXml.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>/i) ||
                               itemXml.match(/<description[^>]*>(.*?)<\/description>/i) ||
                               itemXml.match(/<summary[^>]*>(.*?)<\/summary>/i)
              const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i)
              
              if (titleMatch && linkMatch) {
                let title = titleMatch[1]
                let link = linkMatch[1].trim()
                let description = descMatch ? descMatch[1] : '从RSS源获取的真实新闻内容'
                
                // 清理HTML和特殊字符
                title = title.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim()
                description = description.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').slice(0, 300).trim()
                
                // 如果是Google News，link可能需要特殊处理
                if (link.includes('news.google.com')) {
                  // 保持Google News链接
                }
                
                console.log('解析到文章:', { title, link: link.substring(0, 50) + '...' })
                
                // 检查是否已存在
                const { data: existing } = await supabase
                  .from('articles')
                  .select('id')
                  .eq('original_article_link', link)
                  .single()
                
                if (!existing) {
                  articles.push({
                    title: title,
                    original_article_link: link,
                    vertical_name: sourceName,
                    summary_ai: description,
                    score_ai: Math.floor(Math.random() * 4) + 7, // 7-10分（真实新闻给高分）
                    is_selected: false
                  })
                }
              }
            } catch (itemError) {
              console.log('解析RSS项目失败:', itemError)
            }
          }
        }
      }
    } catch (rssError) {
      console.log('真实RSS抓取失败，使用智能模拟数据:', rssError.message)
    }
    
    // 如果真实RSS失败，直接报错，不生成任何模拟数据
    if (!useRealRSS || articles.length === 0) {
      console.log('真实RSS抓取失败，不生成模拟数据')
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: '无法获取真实RSS内容。可能原因：1) RSS源不可访问 2) 网络连接问题 3) RSS格式错误',
        details: '为确保数据真实性，系统不会生成模拟内容'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    if (articles.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        count: 0,
        message: '没有新文章需要添加（可能都已存在）',
        mode: useRealRSS ? 'real' : 'smart'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 插入到简化的articles表
    const { data, error } = await supabase
      .from('articles')
      .insert(articles)
      .select()
    
    if (error) {
      console.error('数据库插入错误:', error)
      throw error
    }
    
    console.log('成功插入', data?.length || 0, '篇文章')
    
    return new Response(JSON.stringify({ 
      success: true, 
      count: articles.length,
      message: `成功抓取 ${articles.length} 篇${useRealRSS ? '真实' : '智能'}文章`,
      mode: useRealRSS ? 'real' : 'smart',
      articles: data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('智能RSS抓取失败:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: '智能RSS抓取系统遇到问题'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}