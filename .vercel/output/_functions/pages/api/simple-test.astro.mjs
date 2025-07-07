import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = "https://msvgeriacsaaakmxvqye.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdmdlcmlhY3NhYWFrbXh2cXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MDQyMDksImV4cCI6MjA1MzE4MDIwOX0.wF83FpJ8N9SCj6BKAeLxHtmaS2cPsCPs1BoXzVwvJQ0";
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET() {
  try {
    console.log("开始简单测试...");
    const { data: rssSources, error: rssError } = await supabase.from("rss_sources").select("*");
    console.log("RSS源:", rssSources, "RSS错误:", rssError);
    const { data: articles, error: articleError } = await supabase.from("OSINT Workstation").select("*").limit(5);
    console.log("文章:", articles, "文章错误:", articleError);
    const testArticle = {
      Title: "测试文章 " + (/* @__PURE__ */ new Date()).toLocaleString(),
      Original_Article_Link: "https://test.com/" + Date.now(),
      InfoSource: "测试源",
      Source_Language: "zh_CN",
      Vertical_Name: "测试",
      is_selected: false
    };
    const { data: insertResult, error: insertError } = await supabase.from("OSINT Workstation").insert([testArticle]).select();
    console.log("插入结果:", insertResult, "插入错误:", insertError);
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
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("测试失败:", error);
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
