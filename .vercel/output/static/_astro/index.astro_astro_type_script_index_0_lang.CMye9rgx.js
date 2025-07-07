lucide.createIcons();const L="https://msvgeriacsaaakmxvqye.supabase.co",w="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdmdlcmlhY3NhYWFrbXh2cXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MDQyMDksImV4cCI6MjA1MzE4MDIwOX0.wF83FpJ8N9SCj6BKAeLxHtmaS2cPsCPs1BoXzVwvJQ0",m=window.supabase.createClient(L,w);let f="inbox",g="",p=[],l=[],i={search:"",status:"inbox"};function $(){const e=localStorage.getItem("osint-layout-sizes");let t=[40,60];if(e)try{const s=JSON.parse(e);Array.isArray(s)&&s.length===2&&(t=s,console.log("从localStorage恢复布局:",t))}catch{console.log("解析保存的布局失败，使用默认布局")}return Split(["#sourcePanel","#draftPanel"],{sizes:t,minSize:[300,200],gutterSize:8,cursor:"col-resize",onDragEnd:function(s){localStorage.setItem("osint-layout-sizes",JSON.stringify(s)),console.log("保存布局到localStorage:",s)}})}$();async function E(){await u(),T(),M()}async function u(){try{h(!0);let e=m.from("articles").select("*").order("created_at",{ascending:!1});f==="inbox"?e=e.eq("is_selected",!1):f==="selected"&&(e=e.eq("is_selected",!0)),g&&(e=e.ilike("title",`%${g}%`));const{data:t,error:n}=await e;if(n){console.error("加载文章失败:",n),o("加载文章失败: "+n.message);return}p=t||[],B(),await x()}catch(e){console.error("加载文章出错:",e),o("加载文章出错: "+e.message)}finally{h(!1)}}async function x(){try{const{data:e,error:t}=await m.from("articles").select("*").eq("is_selected",!0).order("created_at",{ascending:!1});if(t){console.error("加载草稿失败:",t);return}l=e||[],_()}catch(e){console.error("加载草稿出错:",e)}}function B(){const e=document.getElementById("articlesList");if(p.length===0){e.innerHTML=`
          <div class="empty-state">
            <svg data-lucide="inbox"></svg>
            <h3>暂无文章</h3>
            <p>点击刷新按钮获取最新文章，或尝试调整过滤条件</p>
          </div>
        `,lucide.createIcons();return}e.innerHTML=p.map(t=>`
        <div class="article-card card ${t.is_selected?"selected":""}" data-id="${t.id}">
          <div class="card-header">
            <div class="badge ${k(t.score_ai)}" style="margin-bottom: 0.5rem;">
              评分: ${t.score_ai||"N/A"}
            </div>
            <a href="${t.original_article_link}" target="_blank" class="article-title">
              ${t.title}
            </a>
          </div>
          <div class="card-content">
            <p class="article-summary">${t.summary_ai||"暂无摘要"}</p>
          </div>
          <div class="card-footer article-footer">
            <span class="article-source">${t.vertical_name||"未知来源"}</span>
            <button class="btn btn-sm ${t.is_selected?"btn-ghost":"btn-primary"}" 
                    onclick="toggleSelection(${t.id})"
                    ${t.is_selected?"disabled":""}>
              ${t.is_selected?"✓ 已选":"+ 选中"}
            </button>
          </div>
        </div>
      `).join("")}function _(){const e=document.getElementById("draftsList");if(l.length===0){e.innerHTML=`
          <div class="empty-state">
            <svg data-lucide="edit"></svg>
            <h3>暂无草稿</h3>
            <p>从左侧选择文章开始编辑</p>
          </div>
        `,lucide.createIcons();return}e.innerHTML=l.map(t=>`
        <div class="draft-card card" data-id="${t.id}">
          <div class="card-header">
            <div class="draft-title">${t.title}</div>
            <button class="btn btn-ghost btn-sm" onclick="removeDraft(${t.id})">
              <i data-lucide="x"></i>
            </button>
          </div>
          <div class="card-content">
            <textarea 
              class="draft-summary" 
              placeholder="编辑摘要..." 
              id="textarea-${t.id}"
            >${t.final_summary||t.summary_ai||""}</textarea>
            <div style="margin-top: 0.5rem; text-align: right;">
              <button class="btn btn-ghost btn-sm" onclick="saveDraftSummary(${t.id})">
                <i data-lucide="save"></i>
                保存修改
              </button>
            </div>
          </div>
        </div>
      `).join(""),lucide.createIcons()}function k(e){return e>=8?"badge-success":e>=6?"badge-warning":e>=1?"badge-destructive":"badge-default"}function M(){const e=document.getElementById("draftsList");e&&new Sortable(e,{animation:150,ghostClass:"opacity-50",chosenClass:"scale-105",onEnd:function(t){const n=l.splice(t.oldIndex,1)[0];l.splice(t.newIndex,0,n)}})}async function R(){try{if(l.length===0){o("请先选择一些文章");return}const e=l.map(t=>{const n=t.title,s=t.final_summary||t.summary_ai||"";return`## ${n}

${s}

`}).join("");await navigator.clipboard.writeText(e),S("内容已复制到剪贴板")}catch(e){console.error("复制内容失败:",e),o("复制内容失败: "+e.message)}}async function b(){try{h(!0);const e=document.getElementById("fetchRssBtn"),t=e.innerHTML;e.innerHTML='<div class="spinner" style="width: 1rem; height: 1rem;"></div> 抓取中...',e.disabled=!0;const{data:n,error:s}=await m.from("rss_sources").select("*").eq("is_active",!0);if(s)throw new Error("获取RSS源失败: "+s.message);if(!n||n.length===0){o("没有找到活跃的RSS源");return}let a=0,d=0;for(const r of n)try{console.log(`正在抓取: ${r.name}`);const{data:c,error:y}=await m.functions.invoke("fetch-rss",{body:{rssUrl:r.url,sourceName:r.name,verticalName:r.vertical_name}});if(y){console.error(`抓取${r.name}失败:`,y),d++;continue}c&&c.success?(a+=c.count||0,console.log(`成功抓取${r.name}: ${c.count}篇文章`)):(console.error(`抓取${r.name}失败:`,c?.error||"未知错误"),d++),await new Promise(I=>setTimeout(I,1e3))}catch(c){console.error(`抓取${r.name}出错:`,c),d++}a>0?(S(`成功抓取 ${a} 篇文章！${d>0?` (${d}个源失败)`:""}`),await u()):o(`RSS抓取失败，共 ${d} 个源出错`)}catch(e){console.error("RSS抓取出错:",e),o("RSS抓取出错: "+e.message)}finally{h(!1);const e=document.getElementById("fetchRssBtn");e.innerHTML='<i data-lucide="rss"></i> 抓取RSS',e.disabled=!1,lucide.createIcons()}}function T(){document.getElementById("refreshBtn").addEventListener("click",u);let e;document.getElementById("searchInput").addEventListener("input",t=>{clearTimeout(e),e=setTimeout(()=>{g=t.target.value.trim(),i.search=g,v(),u()},300)}),document.querySelectorAll(".tabs-trigger").forEach(t=>{t.addEventListener("click",n=>{document.querySelectorAll(".tabs-trigger").forEach(s=>s.classList.remove("active")),n.target.classList.add("active"),f=n.target.dataset.status,i.status=f,v(),u()})}),document.getElementById("publishBtn").addEventListener("click",R),document.getElementById("filterBtn").addEventListener("click",()=>{z("过滤器功能开发中...")}),document.getElementById("fetchRssBtn").addEventListener("click",b)}function h(e){const t=document.getElementById("loadingIndicator"),n=document.getElementById("articlesList");e?(t.style.display="flex",n.style.display="none"):(t.style.display="none",n.style.display="block")}function o(e){alert("错误: "+e)}function S(e){alert("成功: "+e)}function z(e){alert("信息: "+e)}function v(){const e=document.getElementById("activeFilters"),t=document.getElementById("filterPills"),n=document.getElementById("split").parentElement,s=[];if(i.search&&s.push({type:"search",label:`搜索: "${i.search}"`,value:i.search}),i.status!=="all"){const a={inbox:"待处理",selected:"已选中"};s.push({type:"status",label:`状态: ${a[i.status]||i.status}`,value:i.status})}s.length>0?(e.classList.add("visible"),n.classList.add("with-filters"),t.innerHTML=s.map(a=>`
          <div class="filter-pill">
            ${a.label}
            <span class="filter-pill-remove" onclick="removeFilter('${a.type}')" title="移除过滤器">
              ×
            </span>
          </div>
        `).join("")):(e.classList.remove("visible"),n.classList.remove("with-filters"),t.innerHTML="")}async function C(){try{const e=localStorage.getItem("lastRSSFetch"),t=Date.now(),n=24*60*60*1e3;if(!e||t-parseInt(e)>n){console.log("🔥 检测到需要自动抓取RSS...");const s=document.createElement("div");s.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 1rem;
            border-radius: var(--radius);
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            z-index: 1000;
            font-size: 0.875rem;
            max-width: 300px;
          `,s.innerHTML="🔥 正在自动抓取最新RSS内容...",document.body.appendChild(s),await b(),localStorage.setItem("lastRSSFetch",t.toString()),s.innerHTML="✅ RSS自动抓取完成！",s.style.background="hsl(142.1 70.6% 45.3%)",setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},3e3)}else{const s=t-parseInt(e),a=Math.ceil((n-s)/(60*60*1e3));console.log(`⏰ RSS上次抓取时间: ${new Date(parseInt(e)).toLocaleString()}`),console.log(`⏰ 下次自动抓取还有 ${a} 小时`)}}catch(e){console.error("自动RSS抓取失败:",e)}}async function F(){await E(),await C()}F();
