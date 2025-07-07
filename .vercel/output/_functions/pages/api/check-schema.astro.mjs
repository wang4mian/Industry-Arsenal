import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = undefined                                   ;
const supabaseKey = undefined                                        ;
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET() {
  try {
    const testRecord = {
      Title: "字段测试",
      Original_Article_Link: "https://test.com"
    };
    const { data, error } = await supabase.from("OSINT Workstation").insert([testRecord]).select();
    if (error) {
      console.error("插入测试失败:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: sample, error: readError } = await supabase.from("OSINT Workstation").select("*").limit(1);
    if (readError) {
      return new Response(JSON.stringify({
        success: false,
        error: readError.message
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (data && data[0]) {
      await supabase.from("OSINT Workstation").delete().eq("Title", "字段测试");
    }
    return new Response(JSON.stringify({
      success: true,
      message: "表结构检查完成",
      insertedRecord: data?.[0],
      sampleRecord: sample?.[0],
      availableFields: sample?.[0] ? Object.keys(sample[0]) : []
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("检查表结构失败:", error);
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
