import { c as createComponent, r as renderScript, a as renderHead, b as renderTemplate } from '../chunks/astro/server_DCy4IZz9.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$IndexV2 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN" data-astro-cid-6n3u5w2h> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OSINT 工作台 V3.0 - shadcn版</title>${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index-v2.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index-v2.astro?astro&type=script&index=1&lang.ts")}${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index-v2.astro?astro&type=script&index=2&lang.ts")}${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index-v2.astro?astro&type=script&index=3&lang.ts")}${renderHead()}</head> <body data-astro-cid-6n3u5w2h> <div class="dashboard-layout" data-astro-cid-6n3u5w2h> <!-- Dashboard Header --> <header class="dashboard-header" data-astro-cid-6n3u5w2h> <div class="nav-container" data-astro-cid-6n3u5w2h> <div class="nav-left" data-astro-cid-6n3u5w2h> <div class="brand" data-astro-cid-6n3u5w2h>OSINT 工作台 V3.0</div> </div> <div class="nav-right" data-astro-cid-6n3u5w2h> <button class="btn btn-ghost btn-icon" id="refreshBtn" title="刷新数据" data-astro-cid-6n3u5w2h> <i data-lucide="refresh-cw" class="w-4 h-4" data-astro-cid-6n3u5w2h></i> </button> <input type="text" class="input" placeholder="搜索标题..." id="searchInput" style="width: 300px;" data-astro-cid-6n3u5w2h> <button class="btn btn-outline" id="filterBtn" data-astro-cid-6n3u5w2h> <i data-lucide="filter" class="w-4 h-4" data-astro-cid-6n3u5w2h></i>
过滤器
</button> <button class="btn btn-default" id="fetchRssBtn" data-astro-cid-6n3u5w2h> <i data-lucide="rss" class="w-4 h-4" data-astro-cid-6n3u5w2h></i>
抓取RSS
</button> <div class="tabs-root" data-astro-cid-6n3u5w2h> <div class="tabs-list" data-astro-cid-6n3u5w2h> <button class="tabs-trigger" data-state="active" data-status="inbox" data-astro-cid-6n3u5w2h> <i data-lucide="inbox" class="w-4 h-4" data-astro-cid-6n3u5w2h></i>
待处理
</button> <button class="tabs-trigger" data-status="selected" data-astro-cid-6n3u5w2h> <i data-lucide="check-circle" class="w-4 h-4" data-astro-cid-6n3u5w2h></i>
已选中
</button> <button class="tabs-trigger" data-status="all" data-astro-cid-6n3u5w2h> <i data-lucide="list" class="w-4 h-4" data-astro-cid-6n3u5w2h></i>
全部
</button> </div> </div> </div> </div> <!-- Active Filters --> <div class="active-filters" id="activeFilters" data-astro-cid-6n3u5w2h> <span style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-right: 0.5rem;" data-astro-cid-6n3u5w2h>当前过滤器:</span> <div id="filterPills" data-astro-cid-6n3u5w2h></div> </div> </header> <!-- Dashboard Content --> <main class="dashboard-content" data-astro-cid-6n3u5w2h> <div class="main-grid" id="mainGrid" data-astro-cid-6n3u5w2h> <!-- 左侧信息源面板 --> <div class="panel" data-astro-cid-6n3u5w2h> <div class="panel-header" data-astro-cid-6n3u5w2h> <h2 class="card-title" data-astro-cid-6n3u5w2h>信息源</h2> <p class="card-description" data-astro-cid-6n3u5w2h>浏览和选择文章</p> </div> <div class="panel-content" data-astro-cid-6n3u5w2h> <div class="loading" id="loadingIndicator" data-astro-cid-6n3u5w2h> <div class="spinner" data-astro-cid-6n3u5w2h></div> <span style="margin-left: 0.5rem;" data-astro-cid-6n3u5w2h>加载中...</span> </div> <div class="article-grid" id="articlesList" data-astro-cid-6n3u5w2h></div> </div> </div> <!-- 右侧草稿箱面板 --> <div class="panel" data-astro-cid-6n3u5w2h> <div class="panel-header" data-astro-cid-6n3u5w2h> <h2 class="card-title" data-astro-cid-6n3u5w2h>草稿箱</h2> <p class="card-description" data-astro-cid-6n3u5w2h>编辑和整理选中的文章</p> </div> <div class="panel-content" data-astro-cid-6n3u5w2h> <div class="drafts-grid" id="draftsList" data-astro-cid-6n3u5w2h></div> <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid hsl(var(--border));" data-astro-cid-6n3u5w2h> <button class="btn btn-default" id="publishBtn" style="width: 100%;" data-astro-cid-6n3u5w2h> <i data-lucide="send" class="w-4 h-4" data-astro-cid-6n3u5w2h></i>
生成并复制内容
</button> </div> </div> </div> </div> </main> </div> ${renderScript($$result, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index-v2.astro?astro&type=script&index=4&lang.ts")} </body> </html>`;
}, "/Users/simianwang/Desktop/\u4EA7\u4E1A\u7F16\u8BD1\u5DE5\u4F5C\u5BA4/src/pages/index-v2.astro", void 0);

const $$file = "/Users/simianwang/Desktop/产业编译工作室/src/pages/index-v2.astro";
const $$url = "/index-v2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$IndexV2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
