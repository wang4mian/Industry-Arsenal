export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    // 测试单个Google News RSS源（你的3D Print源）
    const testUrl = 'https://news.google.com/rss/search?q=3D%2BPrint&hl=en-US&gl=US&ceid=US:en-US';
    
    console.log('测试RSS源:', testUrl);
    console.log('开始请求...');
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    
    console.log('响应状态:', response.status, response.statusText);
    console.log('响应头:', [...response.headers.entries()]);
    
    if (!response.ok) {
      return new Response(JSON.stringify({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        headers: [...response.headers.entries()]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const xmlText = await response.text();
    console.log('XML内容长度:', xmlText.length);
    console.log('XML开头:', xmlText.substring(0, 500));
    
    // 检查是否包含RSS项目
    const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];
    const entryMatches = xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];
    const totalItems = itemMatches.length + entryMatches.length;
    
    return new Response(JSON.stringify({
      success: true,
      message: 'RSS源测试成功',
      status: response.status,
      contentLength: xmlText.length,
      itemsFound: totalItems,
      rssFormat: itemMatches.length > 0 ? 'RSS 2.0' : (entryMatches.length > 0 ? 'Atom' : 'Unknown'),
      preview: xmlText.substring(0, 800)
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('RSS测试失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      type: error.constructor.name,
      cause: error.cause
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
