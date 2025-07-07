export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    // 测试一个简单的RSS源
    const testUrls = [
      'https://feeds.feedburner.com/TechCrunch',
      'https://www.nasa.gov/news/releases/latest/rss',
      'https://rss.cnn.com/rss/edition.rss'
    ];
    
    const results = [];
    
    for (const url of testUrls) {
      try {
        console.log('测试RSS源:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml',
          },
          timeout: 10000
        });
        
        if (response.ok) {
          const text = await response.text();
          const itemCount = (text.match(/<item/gi) || []).length;
          
          results.push({
            url,
            status: 'success',
            size: text.length,
            itemCount,
            preview: text.substring(0, 200) + '...'
          });
        } else {
          results.push({
            url,
            status: 'failed',
            error: `HTTP ${response.status}: ${response.statusText}`
          });
        }
      } catch (error) {
        results.push({
          url,
          status: 'error',
          error: error.message
        });
      }
    }
    
    // 现在测试Google News
    try {
      const googleNewsUrl = 'https://news.google.com/rss/search?q=tech&hl=en-US&gl=US&ceid=US:en-US';
      
      const response = await fetch(googleNewsUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        timeout: 15000
      });
      
      if (response.ok) {
        const text = await response.text();
        const itemCount = (text.match(/<item/gi) || []).length;
        
        results.push({
          url: googleNewsUrl,
          status: 'success',
          size: text.length,
          itemCount,
          preview: text.substring(0, 300) + '...'
        });
      } else {
        results.push({
          url: googleNewsUrl,
          status: 'failed',
          error: `HTTP ${response.status}: ${response.statusText}`
        });
      }
    } catch (error) {
      results.push({
        url: 'Google News',
        status: 'error',
        error: error.message
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: '网络连接测试完成',
      results
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
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
