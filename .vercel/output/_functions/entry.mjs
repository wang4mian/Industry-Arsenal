import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B22egGGz.mjs';
import { manifest } from './manifest_CVTKtePb.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/check-schema.astro.mjs');
const _page2 = () => import('./pages/api/debug-tables.astro.mjs');
const _page3 = () => import('./pages/api/fetch-rss.astro.mjs');
const _page4 = () => import('./pages/api/gemini.astro.mjs');
const _page5 = () => import('./pages/api/mock-rss.astro.mjs');
const _page6 = () => import('./pages/api/proxy-rss.astro.mjs');
const _page7 = () => import('./pages/api/simple-test.astro.mjs');
const _page8 = () => import('./pages/api/smart-rss.astro.mjs');
const _page9 = () => import('./pages/api/test-direct-rss.astro.mjs');
const _page10 = () => import('./pages/api/test-rss.astro.mjs');
const _page11 = () => import('./pages/api/test-single-rss.astro.mjs');
const _page12 = () => import('./pages/demo.astro.mjs');
const _page13 = () => import('./pages/index-old.astro.mjs');
const _page14 = () => import('./pages/index-v2.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/check-schema.js", _page1],
    ["src/pages/api/debug-tables.js", _page2],
    ["src/pages/api/fetch-rss.js", _page3],
    ["src/pages/api/gemini.js", _page4],
    ["src/pages/api/mock-rss.js", _page5],
    ["src/pages/api/proxy-rss.js", _page6],
    ["src/pages/api/simple-test.js", _page7],
    ["src/pages/api/smart-rss.js", _page8],
    ["src/pages/api/test-direct-rss.js", _page9],
    ["src/pages/api/test-rss.js", _page10],
    ["src/pages/api/test-single-rss.js", _page11],
    ["src/pages/demo.astro", _page12],
    ["src/pages/index-old.astro", _page13],
    ["src/pages/index-v2.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "970df183-2683-4d6b-a405-ed3cd06f9b55",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
