lucide.createIcons();const o="https://qrmavnygqchgakwqajzj.supabase.co",u="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybWF2bnlncWNoZ2Frd3FhanpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMDEyMTMsImV4cCI6MjA1MTg3NzIxM30.lAJk_MU8D1GNZg2nMjRzWGlCfUjgJqULcq3H7pRYYsA",l=window.supabase.createClient(o,u);let s="inbox",b="",i=[],n=[];async function f(){await d(),p()}async function d(){try{c(!0);let t=l.from("articles").select("*").order("created_at",{ascending:!1});s==="inbox"?t=t.eq("is_selected",!1):s==="selected"&&(t=t.eq("is_selected",!0));const{data:e,error:a}=await t;if(a){console.error("加载文章失败:",a),r("加载文章失败: "+a.message);return}i=e||[],g(),await m()}catch(t){console.error("加载文章出错:",t),r("加载文章出错: "+t.message)}finally{c(!1)}}async function m(){try{const{data:t,error:e}=await l.from("articles").select("*").eq("is_selected",!0).order("created_at",{ascending:!1});if(e){console.error("加载草稿失败:",e);return}n=t||[],y()}catch(t){console.error("加载草稿出错:",t)}}function g(){const t=document.getElementById("articlesList");if(i.length===0){t.innerHTML=`
          <div class="empty-state">
            <i data-lucide="inbox" class="w-12 h-12"></i>
            <h3>暂无文章</h3>
            <p>点击"抓取RSS"获取最新文章，或尝试调整过滤条件</p>
          </div>
        `,lucide.createIcons();return}t.innerHTML=i.map(e=>`
        <div class="article-card card ${e.is_selected?"selected":""}" data-id="${e.id}">
          <div class="card-content">
            <div class="article-meta">
              <div class="badge ${v(e.score_ai)}">
                评分: ${e.score_ai||"N/A"}
              </div>
            </div>
            <a href="${e.original_article_link}" target="_blank" class="article-title">
              ${e.title}
            </a>
            <p class="article-summary">${e.summary_ai||"暂无摘要"}</p>
            <div class="article-footer">
              <span class="article-source">${e.vertical_name||"未知来源"}</span>
              <button class="btn ${e.is_selected?"btn-secondary":"btn-default"} btn-sm" 
                      onclick="toggleSelection(${e.id})"
                      ${e.is_selected?"disabled":""}>
                ${e.is_selected?"✓ 已选":"+ 选中"}
              </button>
            </div>
          </div>
        </div>
      `).join("")}function y(){const t=document.getElementById("draftsList");if(n.length===0){t.innerHTML=`
          <div class="empty-state">
            <i data-lucide="edit" class="w-12 h-12"></i>
            <h3>暂无草稿</h3>
            <p>从左侧选择文章开始编辑</p>
          </div>
        `,lucide.createIcons();return}t.innerHTML=n.map(e=>`
        <div class="draft-card card" data-id="${e.id}">
          <div class="card-content">
            <div class="draft-title">${e.title}</div>
            <textarea 
              class="draft-textarea" 
              placeholder="编辑摘要..." 
              id="textarea-${e.id}"
            >${e.final_summary||e.summary_ai||""}</textarea>
            <div class="draft-actions">
              <button class="btn btn-ghost btn-sm" onclick="saveDraftSummary(${e.id})">
                <i data-lucide="save" class="w-4 h-4"></i>
                保存修改
              </button>
              <button class="btn btn-ghost btn-sm" onclick="removeDraft(${e.id})">
                <i data-lucide="x" class="w-4 h-4"></i>
                移除
              </button>
            </div>
          </div>
        </div>
      `).join(""),lucide.createIcons()}function v(t){return t>=8?"badge-default":t>=6?"badge-secondary":t>=1?"badge-destructive":"badge-outline"}function p(){document.querySelectorAll(".tabs-trigger").forEach(t=>{t.addEventListener("click",e=>{document.querySelectorAll(".tabs-trigger").forEach(a=>a.setAttribute("data-state","")),e.target.setAttribute("data-state","active"),s=e.target.dataset.status,d()})})}function c(t){const e=document.getElementById("loadingIndicator"),a=document.getElementById("articlesList");t?(e.style.display="flex",a.style.display="none"):(e.style.display="none",a.style.display="block")}function r(t){alert("错误: "+t)}f();
