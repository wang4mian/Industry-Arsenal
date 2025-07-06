// 使用RSS代理服务来绕过网络限制
export async function POST({ request }) {
  try {
    const requestData = await request.json()
    const { rssUrl, sourceName } = requestData
    
    console.log('使用代理方式获取RSS:', rssUrl)
    
    // 方法1: 使用RSS代理服务
    const proxyServices = [
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
      `https://feed.devarchy.com/get?url=${encodeURIComponent(rssUrl)}`,
      `https://rss-proxy.vercel.app/api?url=${encodeURIComponent(rssUrl)}`
    ]
    
    for (const proxyUrl of proxyServices) {
      try {
        console.log('尝试代理服务:', proxyUrl)
        
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
            'Accept': 'application/json, application/xml, text/xml',
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log('代理服务响应:', data)
          
          if (data.items && data.items.length > 0) {
            return new Response(JSON.stringify({
              success: true,
              count: data.items.length,
              message: `通过代理服务成功获取 ${data.items.length} 篇文章`,
              items: data.items,
              mode: 'proxy'
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
        }
      } catch (proxyError) {
        console.log('代理服务失败:', proxyError.message)
      }
    }
    
    // 如果所有代理都失败，返回网络问题说明
    return new Response(JSON.stringify({
      success: false,
      error: '所有RSS代理服务都无法访问',
      suggestion: '建议：1) 检查网络设置 2) 尝试配置代理 3) 使用智能内容模式',
      testedServices: proxyServices.length
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('代理RSS获取失败:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}