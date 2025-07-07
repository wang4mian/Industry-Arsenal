import { c as createComponent, r as renderScript, a as renderHead, b as renderTemplate } from '../chunks/astro/server_DCy4IZz9.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN" data-astro-cid-j7pv25f6> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OSINT 工作台 V3.0</title>${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index.astro?astro&type=script&index=1&lang.ts")}${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index.astro?astro&type=script&index=2&lang.ts")}${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index.astro?astro&type=script&index=3&lang.ts")}${renderHead()}</head> <body data-astro-cid-j7pv25f6> <!-- 顶部导航栏 --> <nav class="navbar" data-astro-cid-j7pv25f6> <button class="btn btn-ghost btn-icon" id="refreshBtn" title="刷新数据" data-astro-cid-j7pv25f6> <i data-lucide="refresh-cw" data-astro-cid-j7pv25f6></i> </button> <input type="text" class="input" placeholder="搜索标题..." id="searchInput" style="flex: 1;" data-astro-cid-j7pv25f6> <button class="btn btn-secondary" id="filterBtn" data-astro-cid-j7pv25f6> <i data-lucide="filter" data-astro-cid-j7pv25f6></i>
过滤器
</button> <button class="btn btn-primary" id="fetchRssBtn" data-astro-cid-j7pv25f6> <i data-lucide="rss" data-astro-cid-j7pv25f6></i>
抓取RSS
</button> <div class="tabs" data-astro-cid-j7pv25f6> <button class="tabs-trigger active" data-status="inbox" data-astro-cid-j7pv25f6> <i data-lucide="inbox" data-astro-cid-j7pv25f6></i>
待处理
</button> <button class="tabs-trigger" data-status="selected" data-astro-cid-j7pv25f6> <i data-lucide="check-circle" data-astro-cid-j7pv25f6></i>
已选中
</button> <button class="tabs-trigger" data-status="all" data-astro-cid-j7pv25f6> <i data-lucide="list" data-astro-cid-j7pv25f6></i>
全部
</button> </div> </nav> <!-- 活动过滤器条 --> <div class="active-filters" id="activeFilters" data-astro-cid-j7pv25f6> <span class="active-filters-label" data-astro-cid-j7pv25f6>当前过滤器:</span> <div id="filterPills" data-astro-cid-j7pv25f6></div> </div> <!-- 主要内容区域 --> <div class="main-container" data-astro-cid-j7pv25f6> <div class="split" id="split" data-astro-cid-j7pv25f6> <!-- 左侧信息源面板 --> <div class="source-panel" id="sourcePanel" data-astro-cid-j7pv25f6> <div class="loading" id="loadingIndicator" data-astro-cid-j7pv25f6> <div class="spinner" data-astro-cid-j7pv25f6></div> <span style="margin-left: 0.5rem;" data-astro-cid-j7pv25f6>加载中...</span> </div> <div id="articlesList" data-astro-cid-j7pv25f6></div> </div> <!-- 右侧草稿箱面板 --> <div class="draft-panel" id="draftPanel" data-astro-cid-j7pv25f6> <div style="margin-bottom: 1rem;" data-astro-cid-j7pv25f6> <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;" data-astro-cid-j7pv25f6>草稿箱</h2> <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));" data-astro-cid-j7pv25f6>
拖拽卡片来调整发布顺序
</p> </div> <div id="draftsList" style="flex: 1; overflow-y: auto;" data-astro-cid-j7pv25f6></div> <div class="publish-section" data-astro-cid-j7pv25f6> <button class="btn btn-primary" id="publishBtn" style="width: 100%;" data-astro-cid-j7pv25f6> <i data-lucide="send" data-astro-cid-j7pv25f6></i>
生成并复制内容
</button> </div> </div> </div> </div> ${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index.astro?astro&type=script&index=4&lang.ts")} </body> </html>`;
}, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index.astro", void 0);

const $$file = "/Users/simianwang/Desktop/产业编译工作室/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
