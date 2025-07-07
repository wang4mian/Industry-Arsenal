import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = undefined                                   ;
const supabaseKey = undefined                                        ;
const supabase = createClient(supabaseUrl, supabaseKey);
async function POST({ request }) {
  try {
    console.log("开始模拟RSS抓取...");
    const requestData = await request.json();
    const { sourceName } = requestData;
    console.log("模拟抓取源:", sourceName);
    const mockArticles = [
      {
        Title: `${sourceName} - 测试文章1: AI技术最新突破`,
        Original_Article_Link: `https://example.com/ai-breakthrough-${Date.now()}`,
        Description: "人工智能领域迎来重大突破，新技术有望改变多个行业的发展轨迹。研究团队表示这项技术将在未来几年内商业化应用。",
        Publication_Date: (/* @__PURE__ */ new Date()).toISOString(),
        Source_Language: "zh_CN",
        Fetch_Time: (/* @__PURE__ */ new Date()).toISOString(),
        InfoSource: sourceName || "模拟RSS源",
        Vertical_Name: sourceName || "测试",
        Processing_Flag: "yes",
        AI_Processing_Status: "Not_Started",
        Manual_Review_Status: "Not_Reviewed",
        is_selected: false,
        Last_Updated: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        Title: `${sourceName} - 测试文章2: 新兴市场趋势分析`,
        Original_Article_Link: `https://example.com/market-trends-${Date.now()}`,
        Description: "最新市场研究显示，新兴技术正在推动传统行业的数字化转型，预计未来五年将带来显著的增长机会。",
        Publication_Date: new Date(Date.now() - 36e5).toISOString(),
        Source_Language: "zh_CN",
        Fetch_Time: (/* @__PURE__ */ new Date()).toISOString(),
        InfoSource: sourceName || "模拟RSS源",
        Vertical_Name: sourceName || "测试",
        Processing_Flag: "yes",
        AI_Processing_Status: "Not_Started",
        Manual_Review_Status: "Not_Reviewed",
        is_selected: false,
        Last_Updated: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        Title: `${sourceName} - 测试文章3: 可持续发展新方案`,
        Original_Article_Link: `https://example.com/sustainability-${Date.now()}`,
        Description: "环保技术创新为可持续发展提供了新的解决方案，多家企业已开始试点应用这些创新技术。",
        Publication_Date: new Date(Date.now() - 72e5).toISOString(),
        Source_Language: "zh_CN",
        Fetch_Time: (/* @__PURE__ */ new Date()).toISOString(),
        InfoSource: sourceName || "模拟RSS源",
        Vertical_Name: sourceName || "测试",
        Processing_Flag: "yes",
        AI_Processing_Status: "Not_Started",
        Manual_Review_Status: "Not_Reviewed",
        is_selected: false,
        Last_Updated: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
    console.log("准备插入", mockArticles.length, "篇模拟文章");
    const { data, error } = await supabase.from("OSINT Workstation").insert(mockArticles).select();
    if (error) {
      console.error("数据库插入错误:", error);
      throw error;
    }
    console.log("成功插入", data?.length || 0, "篇文章");
    return new Response(JSON.stringify({
      success: true,
      count: mockArticles.length,
      message: `成功模拟抓取 ${mockArticles.length} 篇新文章`,
      articles: data
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("模拟RSS抓取失败:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      details: "这是模拟RSS抓取，用于测试系统功能"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
