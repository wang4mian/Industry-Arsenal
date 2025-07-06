import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// 获取文章列表
export async function getArticles() {
  const { data, error } = await supabase
    .from('OSINT Workstation')
    .select('*')
    .order('Fetch_Time', { ascending: false })
  
  if (error) throw error
  return data || []
}

// 添加新文章
export async function addArticle(articleData) {
  const { data, error } = await supabase
    .from('OSINT Workstation')
    .insert([articleData])
    .select()
  
  if (error) throw error
  return data[0]
}