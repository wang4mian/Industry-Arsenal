import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = undefined                                   ;
const supabaseKey = undefined                                        ;
const supabase = createClient(supabaseUrl, supabaseKey);
async function POST({ request }) {
  let rssUrl = "未知";
  let sourceName = "未知";
  try {
    console.log("开始RSS抓取请求...");
    console.log("Request Content-Type:", request.headers.get("content-type"));
    let requestData;
    try {
      requestData = await request.json();
      console.log("Request data:", requestData);
    } catch (error2) {
      console.error("Failed to parse JSON from request:", error2);
      throw new Error("请求体必须是有效的JSON格式");
    }
    if (!requestData) {
      throw new Error("请求体为空");
    }
    rssUrl = requestData.rssUrl || "未知";
    sourceName = requestData.sourceName || "未知";
    console.log("RSS URL:", rssUrl);
    console.log("Source Name:", sourceName);
    console.log("开始尝试连接到RSS源...");
    if (!rssUrl) {
      throw new Error("RSS URL不能为空");
    }
    console.log("正在请求RSS源:", rssUrl);
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const xmlText = await response.text();
    console.log("XML响应长度:", xmlText.length);
    console.log("XML前500字符:", xmlText.substring(0, 500));
    let items = [];
    let isAtom = false;
    if (xmlText.includes("<rss") || xmlText.includes("<channel>")) {
      const rssItemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];
      console.log("检测到RSS 2.0格式，找到", rssItemMatches.length, "个item");
      items = rssItemMatches;
    } else if (xmlText.includes("<feed") && xmlText.includes("xmlns")) {
      const atomEntryMatches = xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];
      console.log("检测到Atom格式，找到", atomEntryMatches.length, "个entry");
      items = atomEntryMatches;
      isAtom = true;
    } else {
      const generalMatches = xmlText.match(/<(item|entry)[\s\S]*?<\/(item|entry)>/gi) || [];
      console.log("使用通用匹配，找到", generalMatches.length, "个条目");
      items = generalMatches;
    }
    if (items.length === 0) {
      console.log("没有找到任何RSS项目");
      return new Response(JSON.stringify({
        success: true,
        count: 0,
        message: "没有找到可解析的RSS内容"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const articles = [];
    for (const itemXml of items.slice(0, 10)) {
      try {
        let title, link, description, pubDate;
        if (isAtom) {
          const titleMatch = itemXml.match(/<title[^>]*>(.*?)<\/title>/i);
          const linkMatch = itemXml.match(/<link\s+href=["'](.*?)["'][^>]*>/i) || itemXml.match(/<link[^>]*>(.*?)<\/link>/i);
          const summaryMatch = itemXml.match(/<summary[^>]*>(.*?)<\/summary>/i) || itemXml.match(/<content[^>]*>(.*?)<\/content>/i);
          const publishedMatch = itemXml.match(/<published[^>]*>(.*?)<\/published>/i) || itemXml.match(/<updated[^>]*>(.*?)<\/updated>/i);
          if (titleMatch) title = titleMatch[1];
          if (linkMatch) link = linkMatch[1];
          if (summaryMatch) description = summaryMatch[1];
          if (publishedMatch) pubDate = new Date(publishedMatch[1]);
        } else {
          const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i) || itemXml.match(/<title[^>]*>(.*?)<\/title>/i);
          const linkMatch = itemXml.match(/<link[^>]*>(.*?)<\/link>/i) || itemXml.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/i);
          const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/i) || itemXml.match(/<description[^>]*>(.*?)<\/description>/i);
          const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i);
          if (titleMatch) title = titleMatch[1];
          if (linkMatch) link = linkMatch[1];
          if (descMatch) description = descMatch[1];
          if (pubDateMatch) pubDate = new Date(pubDateMatch[1]);
        }
        if (title) {
          title = title.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "").trim();
        }
        if (link) {
          link = link.trim();
        }
        if (description) {
          description = description.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "").slice(0, 500).trim();
        }
        if (!pubDate || isNaN(pubDate.getTime())) {
          pubDate = /* @__PURE__ */ new Date();
        }
        console.log("解析文章:", { title: title?.substring(0, 50), link });
        if (title && link) {
          const { data: existing } = await supabase.from("OSINT Workstation").select("id").eq("Original_Article_Link", link).single();
          if (!existing) {
            articles.push({
              Title: title,
              Original_Article_Link: link,
              Description: description || "",
              Publication_Date: pubDate.toISOString(),
              Source_Language: "auto",
              Fetch_Time: (/* @__PURE__ */ new Date()).toISOString(),
              InfoSource: sourceName || "RSS源",
              Vertical_Name: sourceName || "自动抓取",
              Processing_Flag: "yes",
              AI_Processing_Status: "Not_Started",
              Manual_Review_Status: "Not_Reviewed",
              is_selected: false,
              Last_Updated: (/* @__PURE__ */ new Date()).toISOString()
            });
          } else {
            console.log("文章已存在，跳过:", title?.substring(0, 30));
          }
        }
      } catch (itemError) {
        console.error("解析单个RSS项目失败:", itemError);
        continue;
      }
    }
    console.log("准备插入", articles.length, "篇新文章");
    if (articles.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        count: 0,
        message: "没有新文章需要添加（可能都已存在）"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data, error } = await supabase.from("OSINT Workstation").insert(articles).select();
    if (error) {
      console.error("数据库插入错误:", error);
      throw error;
    }
    console.log("成功插入", data?.length || 0, "篇文章");
    return new Response(JSON.stringify({
      success: true,
      count: articles.length,
      message: `成功抓取 ${articles.length} 篇新文章`
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    let errorMessage = error.message;
    let errorDetails = "";
    if (error.message.includes("fetch failed") || error.code === "ENOTFOUND") {
      errorMessage = "网络连接失败，可能是防火墙或DNS问题";
      errorDetails = "建议：1) 检查网络连接 2) 尝试使用VPN 3) 检查防火墙设置";
    } else if (error.message.includes("timeout")) {
      errorMessage = "请求超时，RSS源响应过慢";
      errorDetails = "建议：稍后重试或检查RSS源是否正常";
    } else if (error.message.includes("403") || error.message.includes("Forbidden")) {
      errorMessage = "RSS源拒绝访问，可能需要特殊权限";
      errorDetails = "某些RSS源可能阻止服务器访问";
    }
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      details: errorDetails,
      originalError: error.message,
      rssUrl: rssUrl || "未知",
      sourceName: sourceName || "未知"
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
