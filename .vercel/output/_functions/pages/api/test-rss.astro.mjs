import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = undefined                                   ;
const supabaseKey = undefined                                        ;
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET() {
  try {
    const testUrl = "https://news.google.com/rss/search?q=3D%2BPrint&hl=en-US&gl=US&ceid=US:en-US";
    console.log("测试RSS抓取:", testUrl);
    const response = await fetch(testUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const xmlText = await response.text();
    console.log("RSS内容长度:", xmlText.length);
    const items = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];
    console.log("找到文章数量:", items.length);
    if (items.length > 0) {
      const firstItem = items[0];
      const titleMatch = firstItem.match(/<title[^>]*>(.*?)<\/title>/i);
      const linkMatch = firstItem.match(/<link[^>]*>(.*?)<\/link>/i);
      const testArticle = {
        Title: titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : "Test Article",
        Original_Article_Link: linkMatch ? linkMatch[1].trim() : "https://test.com",
        InfoSource: "3D Print RSS测试",
        Source_Language: "en_US",
        Vertical_Name: "3D Print 英文",
        is_selected: false
      };
      console.log("测试文章:", testArticle);
      const { data, error } = await supabase.from("OSINT Workstation").insert([testArticle]).select();
      if (error) {
        console.error("数据库插入失败:", error);
        return new Response(JSON.stringify({
          success: false,
          error: error.message,
          testArticle,
          rssItemsFound: items.length
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({
        success: true,
        message: "测试成功！",
        insertedArticle: data[0],
        rssItemsFound: items.length
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: "没有找到RSS条目",
        xmlPreview: xmlText.substring(0, 500)
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("测试RSS抓取失败:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
