import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // 尝试插入一个最简单的记录来测试字段
    const testRecord = {
      Title: '字段测试',
      Original_Article_Link: 'https://test.com'
    }
    
    const { data, error } = await supabase
      .from('OSINT Workstation')
      .insert([testRecord])
      .select()
    
    if (error) {
      console.error('插入测试失败:', error)
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 如果成功，读取一条记录查看实际字段
    const { data: sample, error: readError } = await supabase
      .from('OSINT Workstation')
      .select('*')
      .limit(1)
    
    if (readError) {
      return new Response(JSON.stringify({
        success: false,
        error: readError.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 删除测试记录
    if (data && data[0]) {
      await supabase
        .from('OSINT Workstation')
        .delete()
        .eq('Title', '字段测试')
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: '表结构检查完成',
      insertedRecord: data?.[0],
      sampleRecord: sample?.[0],
      availableFields: sample?.[0] ? Object.keys(sample[0]) : []
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('检查表结构失败:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}