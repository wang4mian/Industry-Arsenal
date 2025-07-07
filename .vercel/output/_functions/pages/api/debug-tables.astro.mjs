import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = "https://msvgeriacsaaakmxvqye.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdmdlcmlhY3NhYWFrbXh2cXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MDQyMDksImV4cCI6MjA1MzE4MDIwOX0.wF83FpJ8N9SCj6BKAeLxHtmaS2cPsCPs1BoXzVwvJQ0";
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET() {
  try {
    console.log("检查Supabase表结构...");
    const tableNames = [
      "OSINT Workstation",
      "osint_workstation",
      "articles",
      "rss_sources"
    ];
    const results = {};
    for (const tableName of tableNames) {
      try {
        const { data, error, count } = await supabase.from(tableName).select("*", { count: "exact", head: true });
        if (error) {
          results[tableName] = { error: error.message };
        } else {
          results[tableName] = {
            exists: true,
            count,
            status: "success"
          };
        }
      } catch (e) {
        results[tableName] = { error: e.message };
      }
    }
    return new Response(JSON.stringify({
      success: true,
      tables: results,
      supabaseUrl
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("调试错误:", error);
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
