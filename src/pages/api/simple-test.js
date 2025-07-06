import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    console.log('开始简单测试...')
    
    // 1. 检查RSS源表
    const { data: rssSources, error: rssError } = await supabase
      .from('rss_sources')
      .select('*')
    
    console.log('RSS源:', rssSources, 'RSS错误:', rssError)
    
    // 2. 检查文章表
    const { data: articles, error: articleError } = await supabase
      .from('OSINT Workstation')
      .select('*')
      .limit(5)
    
    console.log('文章:', articles, '文章错误:', articleError)
    
    // 3. 尝试插入一条测试数据
    const testArticle = {
      Title: '测试文章 ' + new Date().toLocaleString(),
      Original_Article_Link: 'https://test.com/' + Date.now(),
      InfoSource: '测试源',
      Source_Language: 'zh_CN',
      Vertical_Name: '测试',
      is_selected: false
    }
    
    const { data: insertResult, error: insertError } = await supabase
      .from('OSINT Workstation')
      .insert([testArticle])
      .select()
    
    console.log('插入结果:', insertResult, '插入错误:', insertError)
    
    return new Response(JSON.stringify({
      success: true,
      rssSources: rssSources || [],
      rssError: rssError?.message,
      articles: articles || [],
      articleError: articleError?.message,
      insertResult: insertResult || [],
      insertError: insertError?.message,
      testArticle
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('测试失败:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}