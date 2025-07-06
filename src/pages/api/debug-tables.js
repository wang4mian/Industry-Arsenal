import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    console.log('检查Supabase表结构...')
    
    // 尝试不同的表名
    const tableNames = [
      'OSINT Workstation',
      'osint_workstation', 
      'articles',
      'rss_sources'
    ]
    
    const results = {}
    
    for (const tableName of tableNames) {
      try {
        const { data, error, count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          results[tableName] = { error: error.message }
        } else {
          results[tableName] = { 
            exists: true, 
            count: count,
            status: 'success'
          }
        }
      } catch (e) {
        results[tableName] = { error: e.message }
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      tables: results,
      supabaseUrl: supabaseUrl
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('调试错误:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}