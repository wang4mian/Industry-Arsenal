import { c as createComponent, b as renderTemplate, a as renderHead } from '../chunks/astro/server_DCy4IZz9.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$IndexOld = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="zh-CN" data-astro-cid-dlr55tob> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OSINT 工作台 V3.0</title>', `</head> <body data-astro-cid-dlr55tob> <div id="app" data-astro-cid-dlr55tob> <header data-astro-cid-dlr55tob> <h1 data-astro-cid-dlr55tob>🔍 OSINT 工作台 V3.0</h1> <nav data-astro-cid-dlr55tob> <button class="tab-btn active" data-tab="browse" data-astro-cid-dlr55tob>📰 浏览文章</button> <button class="tab-btn" data-tab="selected" data-astro-cid-dlr55tob>✅ 已选择</button> <button class="tab-btn" data-tab="editing" data-astro-cid-dlr55tob>✏️ 编辑中</button> <button class="tab-btn" data-tab="publish" data-astro-cid-dlr55tob>🚀 待发布</button> </nav> </header> <main data-astro-cid-dlr55tob> <!-- 浏览文章 --> <div id="browse-tab" class="tab-content active" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <div class="filters" data-astro-cid-dlr55tob> <input type="text" id="search" placeholder="搜索文章标题、关键词..." data-astro-cid-dlr55tob> <select id="score-filter" data-astro-cid-dlr55tob> <option value="" data-astro-cid-dlr55tob>所有评分</option> <option value="high" data-astro-cid-dlr55tob>高分文章 (8-10)</option> <option value="medium" data-astro-cid-dlr55tob>中分文章 (5-7)</option> <option value="low" data-astro-cid-dlr55tob>低分文章 (1-4)</option> </select> <select id="source-filter" data-astro-cid-dlr55tob> <option value="" data-astro-cid-dlr55tob>所有来源</option> </select> </div> <button class="action-btn primary" onclick="app.showRSSDialog()" data-astro-cid-dlr55tob>📥 抓取RSS</button> <button class="action-btn secondary" onclick="app.refreshArticles()" data-astro-cid-dlr55tob>🔄 刷新</button> </div> <div id="articles-grid" data-astro-cid-dlr55tob></div> </div> <!-- 已选择文章 --> <div id="selected-tab" class="tab-content" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <h2 data-astro-cid-dlr55tob>已选择的文章</h2> <button class="action-btn secondary" onclick="app.batchEdit()" data-astro-cid-dlr55tob>📝 批量编辑</button> </div> <div id="selected-articles" data-astro-cid-dlr55tob></div> </div> <!-- 编辑中文章 --> <div id="editing-tab" class="tab-content" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <h2 data-astro-cid-dlr55tob>正在编辑的文章</h2> <button class="action-btn secondary" onclick="app.autoSaveAll()" data-astro-cid-dlr55tob>💾 全部保存</button> </div> <div id="editing-articles" data-astro-cid-dlr55tob></div> </div> <!-- 待发布文章 --> <div id="publish-tab" class="tab-content" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <h2 data-astro-cid-dlr55tob>准备发布的文章</h2> <button class="action-btn primary" onclick="app.batchCopy()" data-astro-cid-dlr55tob>📋 批量复制</button> </div> <div id="publish-articles" data-astro-cid-dlr55tob></div> </div> </main> </div> <!-- RSS 抓取对话框 --> <div id="rss-dialog" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000;" data-astro-cid-dlr55tob> <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 0.5rem; min-width: 400px;" data-astro-cid-dlr55tob> <h3 style="margin-bottom: 1rem;" data-astro-cid-dlr55tob>抓取 RSS 源</h3> <div style="margin-bottom: 1rem;" data-astro-cid-dlr55tob> <label style="display: block; margin-bottom: 0.5rem;" data-astro-cid-dlr55tob>RSS URL:</label> <input type="url" id="rss-url" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="https://example.com/feed.xml" data-astro-cid-dlr55tob> </div> <div style="margin-bottom: 1rem;" data-astro-cid-dlr55tob> <label style="display: block; margin-bottom: 0.5rem;" data-astro-cid-dlr55tob>来源名称:</label> <input type="text" id="rss-source" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="例如：3D打印网" data-astro-cid-dlr55tob> </div> <div style="display: flex; gap: 1rem; justify-content: flex-end;" data-astro-cid-dlr55tob> <button class="action-btn secondary" onclick="app.hideRSSDialog()" data-astro-cid-dlr55tob>取消</button> <button class="action-btn primary" onclick="app.fetchRSS()" data-astro-cid-dlr55tob>抓取</button> </div> </div> </div> <script type="module">
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
    
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'your_supabase_url'
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key'
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    class OSINTWorkstation {
      constructor() {
        this.currentTab = 'browse'
        this.articles = []
        this.filteredArticles = []
        this.init()
      }
      
      async init() {
        await this.loadArticles()
        this.setupEventListeners()
        this.render()
      }
      
      async loadArticles() {
        try {
          const { data, error } = await supabase
            .from('OSINT Workstation')
            .select('*')
            .order('Fetch_Time', { ascending: false })
          
          if (error) throw error
          
          this.articles = data || []
          this.filteredArticles = this.articles
          this.updateSourceFilter()
        } catch (error) {
          console.error('加载文章失败:', error)
          this.showNotification('加载文章失败: ' + error.message, 'error')
        }
      }
      
      updateSourceFilter() {
        const sourceFilter = document.getElementById('source-filter')
        const sources = [...new Set(this.articles.map(a => a.InfoSource).filter(Boolean))]
        
        sourceFilter.innerHTML = '<option value="">所有来源</option>' + 
          sources.map(source => \`<option value="\${source}">\${source}</option>\`).join('')
      }
      
      setupEventListeners() {
        // 标签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            this.switchTab(e.target.dataset.tab)
          })
        })
        
        // 搜索和筛选
        document.getElementById('search').addEventListener('input', () => {
          this.applyFilters()
        })
        
        document.getElementById('score-filter').addEventListener('change', () => {
          this.applyFilters()
        })
        
        document.getElementById('source-filter').addEventListener('change', () => {
          this.applyFilters()
        })
      }
      
      applyFilters() {
        const searchTerm = document.getElementById('search').value.toLowerCase()
        const sourceFilter = document.getElementById('source-filter').value
        
        this.filteredArticles = this.articles.filter(article => {
          const matchesSearch = !searchTerm || 
            (article.Title && article.Title.toLowerCase().includes(searchTerm)) ||
            (article.InfoSource && article.InfoSource.toLowerCase().includes(searchTerm)) ||
            (article.Vertical_Name && article.Vertical_Name.toLowerCase().includes(searchTerm))
          
          const matchesSource = !sourceFilter || article.InfoSource === sourceFilter
          
          return matchesSearch && matchesSource
        })
        
        this.render()
      }
      
      switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active')
        })
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active')
        })
        
        document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active')
        document.getElementById(\`\${tabName}-tab\`).classList.add('active')
        
        this.currentTab = tabName
        this.render()
      }
      
      render() {
        switch(this.currentTab) {
          case 'browse':
            this.renderBrowseTab()
            break
          case 'selected':
            this.renderSelectedTab()
            break
          case 'editing':
            this.renderEditingTab()
            break
          case 'publish':
            this.renderPublishTab()
            break
        }
      }
      
      renderBrowseTab() {
        const grid = document.getElementById('articles-grid')
        const newArticles = this.currentTab === 'browse' ? 
          this.filteredArticles.filter(a => a.status === 'new') :
          this.filteredArticles
        
        if (newArticles.length === 0) {
          grid.innerHTML = '<div class="empty-state"><h3>暂无文章</h3><p>尝试抓取一些RSS源或调整筛选条件</p></div>'
          return
        }
        
        grid.innerHTML = newArticles.map(article => \`
          <div class="article-card">
            <h3>\${article.Title || '无标题'}</h3>
            <div class="article-meta">
              <span>来源: \${article.InfoSource || '未知'}</span>
              <span>日期: \${article.Publication_Date ? new Date(article.Publication_Date).toLocaleDateString() : '未知'}</span>
              <span>语言: \${article.Source_Language || '未知'}</span>
              <span>分类: \${article.Vertical_Name || '未分类'}</span>
            </div>
            <div class="article-actions">
              <a href="\${article.Original_Article_Link}" target="_blank" style="background: #3b82f6; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem; font-size: 0.75rem;">查看原文</a>
            </div>
          </div>
        \`).join('')
      }
      
      renderSelectedTab() {
        const container = document.getElementById('selected-articles')
        const selectedArticles = this.articles.filter(a => a.status === 'selected')
        
        if (selectedArticles.length === 0) {
          container.innerHTML = '<div class="empty-state"><h3>暂无已选择的文章</h3><p>从浏览页面选择一些文章开始编辑</p></div>'
          return
        }
        
        container.innerHTML = selectedArticles.map(article => \`
          <div class="article-card">
            <h3>\${article.title}</h3>
            <p>\${article.description || article.ai_summary || '暂无描述'}</p>
            <div class="article-meta">
              <span>评分: \${article.ai_score ? \`<span class="score-badge score-\${this.getScoreClass(article.ai_score)}">\${article.ai_score}</span>\` : 'N/A'}</span>
              <span>来源: \${article.source_name || '未知'}</span>
            </div>
            <div class="article-actions">
              <button onclick="app.startEditing('\${article.id}')">开始编辑</button>
              <button onclick="app.unselectArticle('\${article.id}')">取消选择</button>
              <a href="\${article.original_url}" target="_blank">原文</a>
            </div>
          </div>
        \`).join('')
      }
      
      renderEditingTab() {
        const container = document.getElementById('editing-articles')
        const editingArticles = this.articles.filter(a => a.status === 'editing')
        
        if (editingArticles.length === 0) {
          container.innerHTML = '<div class="empty-state"><h3>暂无正在编辑的文章</h3><p>从已选择的文章中开始编辑</p></div>'
          return
        }
        
        container.innerHTML = editingArticles.map(article => \`
          <div class="editing-area">
            <h3>\${article.title}</h3>
            <div style="margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 0.375rem; font-size: 0.875rem;">
              <strong>原文摘要:</strong> \${article.ai_summary || article.description || '无'}
            </div>
            <textarea id="content-\${article.id}" placeholder="在此编辑文章内容...">\${article.edited_content || article.content || ''}</textarea>
            <div class="article-actions" style="margin-top: 1rem;">
              <button onclick="app.saveEdit('\${article.id}')">保存</button>
              <button onclick="app.finishEditing('\${article.id}')">完成编辑</button>
              <button onclick="app.cancelEditing('\${article.id}')">取消</button>
              <a href="\${article.original_url}" target="_blank">参考原文</a>
            </div>
          </div>
        \`).join('')
      }
      
      renderPublishTab() {
        const container = document.getElementById('publish-articles')
        const publishArticles = this.articles.filter(a => a.status === 'published')
        
        if (publishArticles.length === 0) {
          container.innerHTML = '<div class="empty-state"><h3>暂无待发布的文章</h3><p>完成编辑后的文章将出现在这里</p></div>'
          return
        }
        
        container.innerHTML = publishArticles.map(article => \`
          <div class="article-card">
            <h3>\${article.title}</h3>
            <p>已完成编辑，准备发布</p>
            <div class="article-meta">
              <span>最后更新: \${new Date(article.updated_at).toLocaleString()}</span>
            </div>
            <div class="article-actions">
              <button onclick="app.copyToClipboard('\${article.id}')">复制内容</button>
              <button onclick="app.previewArticle('\${article.id}')">预览</button>
              <button onclick="app.archiveArticle('\${article.id}')">归档</button>
            </div>
          </div>
        \`).join('')
      }
      
      getScoreClass(score) {
        if (score >= 8) return 'high'
        if (score >= 5) return 'medium'
        return 'low'
      }
      
      // 文章操作方法
      async selectArticle(id) {
        await this.updateArticleStatus(id, 'selected', '文章已选择')
      }
      
      async unselectArticle(id) {
        await this.updateArticleStatus(id, 'new', '已取消选择')
      }
      
      async startEditing(id) {
        await this.updateArticleStatus(id, 'editing', '开始编辑')
        this.switchTab('editing')
      }
      
      async saveEdit(id) {
        try {
          const content = document.getElementById(\`content-\${id}\`).value
          const { error } = await supabase
            .from('articles')
            .update({ 
              edited_content: content,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
          
          if (error) throw error
          this.showNotification('内容已保存', 'success')
        } catch (error) {
          this.showNotification('保存失败: ' + error.message, 'error')
        }
      }
      
      async finishEditing(id) {
        try {
          const content = document.getElementById(\`content-\${id}\`).value
          const { error } = await supabase
            .from('articles')
            .update({ 
              edited_content: content,
              status: 'published',
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
          
          if (error) throw error
          await this.loadArticles()
          this.showNotification('编辑完成！', 'success')
          this.switchTab('publish')
        } catch (error) {
          this.showNotification('操作失败: ' + error.message, 'error')
        }
      }
      
      async cancelEditing(id) {
        if (confirm('确定取消编辑吗？未保存的内容将丢失。')) {
          await this.updateArticleStatus(id, 'selected', '已取消编辑')
        }
      }
      
      async archiveArticle(id) {
        await this.updateArticleStatus(id, 'archived', '文章已归档')
      }
      
      async analyzeWithAI(id) {
        try {
          this.showNotification('正在进行AI分析...', 'info')
          
          const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articleId: id })
          })
          
          const result = await response.json()
          
          if (result.success) {
            await this.loadArticles()
            this.showNotification('AI分析完成！', 'success')
            this.render()
          } else {
            throw new Error(result.error)
          }
        } catch (error) {
          this.showNotification('AI分析失败: ' + error.message, 'error')
        }
      }
      
      async copyToClipboard(id) {
        try {
          const article = this.articles.find(a => a.id === id)
          const content = article.edited_content || article.content || article.title
          await navigator.clipboard.writeText(content)
          this.showNotification('内容已复制到剪贴板！', 'success')
        } catch (error) {
          this.showNotification('复制失败: ' + error.message, 'error')
        }
      }
      
      previewArticle(id) {
        const article = this.articles.find(a => a.id === id)
        const content = article.edited_content || article.content || article.title
        
        const previewWindow = window.open('', '_blank', 'width=800,height=600')
        previewWindow.document.write(\`
          <html>
            <head>
              <title>预览: \${article.title}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
                h1 { color: #1f2937; }
                .content { white-space: pre-wrap; margin-top: 2rem; }
              </style>
            </head>
            <body>
              <h1>\${article.title}</h1>
              <div class="content">\${content}</div>
            </body>
          </html>
        \`)
        previewWindow.document.close()
      }
      
      // RSS 相关方法
      showRSSDialog() {
        document.getElementById('rss-dialog').style.display = 'block'
      }
      
      hideRSSDialog() {
        document.getElementById('rss-dialog').style.display = 'none'
        document.getElementById('rss-url').value = ''
        document.getElementById('rss-source').value = ''
      }
      
      async fetchRSS() {
        try {
          const rssUrl = document.getElementById('rss-url').value
          const sourceName = document.getElementById('rss-source').value
          
          if (!rssUrl) {
            this.showNotification('请输入RSS URL', 'error')
            return
          }
          
          this.showNotification('正在抓取RSS...', 'info')
          
          const response = await fetch('/api/fetch-rss', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rssUrl, sourceName })
          })
          
          const result = await response.json()
          
          if (result.success) {
            this.showNotification(result.message, 'success')
            this.hideRSSDialog()
            await this.loadArticles()
            this.render()
          } else {
            throw new Error(result.error)
          }
        } catch (error) {
          this.showNotification('RSS抓取失败: ' + error.message, 'error')
        }
      }
      
      async refreshArticles() {
        await this.loadArticles()
        this.render()
        this.showNotification('文章已刷新', 'success')
      }
      
      // 辅助方法
      async updateArticleStatus(id, status, message) {
        try {
          const { error } = await supabase
            .from('articles')
            .update({ 
              status,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
          
          if (error) throw error
          
          await this.loadArticles()
          this.showNotification(message, 'success')
          this.render()
        } catch (error) {
          this.showNotification('操作失败: ' + error.message, 'error')
        }
      }
      
      showNotification(message, type = 'info') {
        const notification = document.createElement('div')
        notification.className = \`notification \${type}\`
        notification.textContent = message
        
        document.body.appendChild(notification)
        
        setTimeout(() => {
          notification.remove()
        }, 3000)
      }
    }
    
    // 初始化应用
    const app = new OSINTWorkstation()
    window.app = app
  </script> </body> </html>`], ['<html lang="zh-CN" data-astro-cid-dlr55tob> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OSINT 工作台 V3.0</title>', `</head> <body data-astro-cid-dlr55tob> <div id="app" data-astro-cid-dlr55tob> <header data-astro-cid-dlr55tob> <h1 data-astro-cid-dlr55tob>🔍 OSINT 工作台 V3.0</h1> <nav data-astro-cid-dlr55tob> <button class="tab-btn active" data-tab="browse" data-astro-cid-dlr55tob>📰 浏览文章</button> <button class="tab-btn" data-tab="selected" data-astro-cid-dlr55tob>✅ 已选择</button> <button class="tab-btn" data-tab="editing" data-astro-cid-dlr55tob>✏️ 编辑中</button> <button class="tab-btn" data-tab="publish" data-astro-cid-dlr55tob>🚀 待发布</button> </nav> </header> <main data-astro-cid-dlr55tob> <!-- 浏览文章 --> <div id="browse-tab" class="tab-content active" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <div class="filters" data-astro-cid-dlr55tob> <input type="text" id="search" placeholder="搜索文章标题、关键词..." data-astro-cid-dlr55tob> <select id="score-filter" data-astro-cid-dlr55tob> <option value="" data-astro-cid-dlr55tob>所有评分</option> <option value="high" data-astro-cid-dlr55tob>高分文章 (8-10)</option> <option value="medium" data-astro-cid-dlr55tob>中分文章 (5-7)</option> <option value="low" data-astro-cid-dlr55tob>低分文章 (1-4)</option> </select> <select id="source-filter" data-astro-cid-dlr55tob> <option value="" data-astro-cid-dlr55tob>所有来源</option> </select> </div> <button class="action-btn primary" onclick="app.showRSSDialog()" data-astro-cid-dlr55tob>📥 抓取RSS</button> <button class="action-btn secondary" onclick="app.refreshArticles()" data-astro-cid-dlr55tob>🔄 刷新</button> </div> <div id="articles-grid" data-astro-cid-dlr55tob></div> </div> <!-- 已选择文章 --> <div id="selected-tab" class="tab-content" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <h2 data-astro-cid-dlr55tob>已选择的文章</h2> <button class="action-btn secondary" onclick="app.batchEdit()" data-astro-cid-dlr55tob>📝 批量编辑</button> </div> <div id="selected-articles" data-astro-cid-dlr55tob></div> </div> <!-- 编辑中文章 --> <div id="editing-tab" class="tab-content" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <h2 data-astro-cid-dlr55tob>正在编辑的文章</h2> <button class="action-btn secondary" onclick="app.autoSaveAll()" data-astro-cid-dlr55tob>💾 全部保存</button> </div> <div id="editing-articles" data-astro-cid-dlr55tob></div> </div> <!-- 待发布文章 --> <div id="publish-tab" class="tab-content" data-astro-cid-dlr55tob> <div class="top-actions" data-astro-cid-dlr55tob> <h2 data-astro-cid-dlr55tob>准备发布的文章</h2> <button class="action-btn primary" onclick="app.batchCopy()" data-astro-cid-dlr55tob>📋 批量复制</button> </div> <div id="publish-articles" data-astro-cid-dlr55tob></div> </div> </main> </div> <!-- RSS 抓取对话框 --> <div id="rss-dialog" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000;" data-astro-cid-dlr55tob> <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 0.5rem; min-width: 400px;" data-astro-cid-dlr55tob> <h3 style="margin-bottom: 1rem;" data-astro-cid-dlr55tob>抓取 RSS 源</h3> <div style="margin-bottom: 1rem;" data-astro-cid-dlr55tob> <label style="display: block; margin-bottom: 0.5rem;" data-astro-cid-dlr55tob>RSS URL:</label> <input type="url" id="rss-url" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="https://example.com/feed.xml" data-astro-cid-dlr55tob> </div> <div style="margin-bottom: 1rem;" data-astro-cid-dlr55tob> <label style="display: block; margin-bottom: 0.5rem;" data-astro-cid-dlr55tob>来源名称:</label> <input type="text" id="rss-source" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="例如：3D打印网" data-astro-cid-dlr55tob> </div> <div style="display: flex; gap: 1rem; justify-content: flex-end;" data-astro-cid-dlr55tob> <button class="action-btn secondary" onclick="app.hideRSSDialog()" data-astro-cid-dlr55tob>取消</button> <button class="action-btn primary" onclick="app.fetchRSS()" data-astro-cid-dlr55tob>抓取</button> </div> </div> </div> <script type="module">
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
    
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'your_supabase_url'
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key'
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    class OSINTWorkstation {
      constructor() {
        this.currentTab = 'browse'
        this.articles = []
        this.filteredArticles = []
        this.init()
      }
      
      async init() {
        await this.loadArticles()
        this.setupEventListeners()
        this.render()
      }
      
      async loadArticles() {
        try {
          const { data, error } = await supabase
            .from('OSINT Workstation')
            .select('*')
            .order('Fetch_Time', { ascending: false })
          
          if (error) throw error
          
          this.articles = data || []
          this.filteredArticles = this.articles
          this.updateSourceFilter()
        } catch (error) {
          console.error('加载文章失败:', error)
          this.showNotification('加载文章失败: ' + error.message, 'error')
        }
      }
      
      updateSourceFilter() {
        const sourceFilter = document.getElementById('source-filter')
        const sources = [...new Set(this.articles.map(a => a.InfoSource).filter(Boolean))]
        
        sourceFilter.innerHTML = '<option value="">所有来源</option>' + 
          sources.map(source => \\\`<option value="\\\${source}">\\\${source}</option>\\\`).join('')
      }
      
      setupEventListeners() {
        // 标签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            this.switchTab(e.target.dataset.tab)
          })
        })
        
        // 搜索和筛选
        document.getElementById('search').addEventListener('input', () => {
          this.applyFilters()
        })
        
        document.getElementById('score-filter').addEventListener('change', () => {
          this.applyFilters()
        })
        
        document.getElementById('source-filter').addEventListener('change', () => {
          this.applyFilters()
        })
      }
      
      applyFilters() {
        const searchTerm = document.getElementById('search').value.toLowerCase()
        const sourceFilter = document.getElementById('source-filter').value
        
        this.filteredArticles = this.articles.filter(article => {
          const matchesSearch = !searchTerm || 
            (article.Title && article.Title.toLowerCase().includes(searchTerm)) ||
            (article.InfoSource && article.InfoSource.toLowerCase().includes(searchTerm)) ||
            (article.Vertical_Name && article.Vertical_Name.toLowerCase().includes(searchTerm))
          
          const matchesSource = !sourceFilter || article.InfoSource === sourceFilter
          
          return matchesSearch && matchesSource
        })
        
        this.render()
      }
      
      switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active')
        })
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active')
        })
        
        document.querySelector(\\\`[data-tab="\\\${tabName}"]\\\`).classList.add('active')
        document.getElementById(\\\`\\\${tabName}-tab\\\`).classList.add('active')
        
        this.currentTab = tabName
        this.render()
      }
      
      render() {
        switch(this.currentTab) {
          case 'browse':
            this.renderBrowseTab()
            break
          case 'selected':
            this.renderSelectedTab()
            break
          case 'editing':
            this.renderEditingTab()
            break
          case 'publish':
            this.renderPublishTab()
            break
        }
      }
      
      renderBrowseTab() {
        const grid = document.getElementById('articles-grid')
        const newArticles = this.currentTab === 'browse' ? 
          this.filteredArticles.filter(a => a.status === 'new') :
          this.filteredArticles
        
        if (newArticles.length === 0) {
          grid.innerHTML = '<div class="empty-state"><h3>暂无文章</h3><p>尝试抓取一些RSS源或调整筛选条件</p></div>'
          return
        }
        
        grid.innerHTML = newArticles.map(article => \\\`
          <div class="article-card">
            <h3>\\\${article.Title || '无标题'}</h3>
            <div class="article-meta">
              <span>来源: \\\${article.InfoSource || '未知'}</span>
              <span>日期: \\\${article.Publication_Date ? new Date(article.Publication_Date).toLocaleDateString() : '未知'}</span>
              <span>语言: \\\${article.Source_Language || '未知'}</span>
              <span>分类: \\\${article.Vertical_Name || '未分类'}</span>
            </div>
            <div class="article-actions">
              <a href="\\\${article.Original_Article_Link}" target="_blank" style="background: #3b82f6; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem; font-size: 0.75rem;">查看原文</a>
            </div>
          </div>
        \\\`).join('')
      }
      
      renderSelectedTab() {
        const container = document.getElementById('selected-articles')
        const selectedArticles = this.articles.filter(a => a.status === 'selected')
        
        if (selectedArticles.length === 0) {
          container.innerHTML = '<div class="empty-state"><h3>暂无已选择的文章</h3><p>从浏览页面选择一些文章开始编辑</p></div>'
          return
        }
        
        container.innerHTML = selectedArticles.map(article => \\\`
          <div class="article-card">
            <h3>\\\${article.title}</h3>
            <p>\\\${article.description || article.ai_summary || '暂无描述'}</p>
            <div class="article-meta">
              <span>评分: \\\${article.ai_score ? \\\`<span class="score-badge score-\\\${this.getScoreClass(article.ai_score)}">\\\${article.ai_score}</span>\\\` : 'N/A'}</span>
              <span>来源: \\\${article.source_name || '未知'}</span>
            </div>
            <div class="article-actions">
              <button onclick="app.startEditing('\\\${article.id}')">开始编辑</button>
              <button onclick="app.unselectArticle('\\\${article.id}')">取消选择</button>
              <a href="\\\${article.original_url}" target="_blank">原文</a>
            </div>
          </div>
        \\\`).join('')
      }
      
      renderEditingTab() {
        const container = document.getElementById('editing-articles')
        const editingArticles = this.articles.filter(a => a.status === 'editing')
        
        if (editingArticles.length === 0) {
          container.innerHTML = '<div class="empty-state"><h3>暂无正在编辑的文章</h3><p>从已选择的文章中开始编辑</p></div>'
          return
        }
        
        container.innerHTML = editingArticles.map(article => \\\`
          <div class="editing-area">
            <h3>\\\${article.title}</h3>
            <div style="margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 0.375rem; font-size: 0.875rem;">
              <strong>原文摘要:</strong> \\\${article.ai_summary || article.description || '无'}
            </div>
            <textarea id="content-\\\${article.id}" placeholder="在此编辑文章内容...">\\\${article.edited_content || article.content || ''}</textarea>
            <div class="article-actions" style="margin-top: 1rem;">
              <button onclick="app.saveEdit('\\\${article.id}')">保存</button>
              <button onclick="app.finishEditing('\\\${article.id}')">完成编辑</button>
              <button onclick="app.cancelEditing('\\\${article.id}')">取消</button>
              <a href="\\\${article.original_url}" target="_blank">参考原文</a>
            </div>
          </div>
        \\\`).join('')
      }
      
      renderPublishTab() {
        const container = document.getElementById('publish-articles')
        const publishArticles = this.articles.filter(a => a.status === 'published')
        
        if (publishArticles.length === 0) {
          container.innerHTML = '<div class="empty-state"><h3>暂无待发布的文章</h3><p>完成编辑后的文章将出现在这里</p></div>'
          return
        }
        
        container.innerHTML = publishArticles.map(article => \\\`
          <div class="article-card">
            <h3>\\\${article.title}</h3>
            <p>已完成编辑，准备发布</p>
            <div class="article-meta">
              <span>最后更新: \\\${new Date(article.updated_at).toLocaleString()}</span>
            </div>
            <div class="article-actions">
              <button onclick="app.copyToClipboard('\\\${article.id}')">复制内容</button>
              <button onclick="app.previewArticle('\\\${article.id}')">预览</button>
              <button onclick="app.archiveArticle('\\\${article.id}')">归档</button>
            </div>
          </div>
        \\\`).join('')
      }
      
      getScoreClass(score) {
        if (score >= 8) return 'high'
        if (score >= 5) return 'medium'
        return 'low'
      }
      
      // 文章操作方法
      async selectArticle(id) {
        await this.updateArticleStatus(id, 'selected', '文章已选择')
      }
      
      async unselectArticle(id) {
        await this.updateArticleStatus(id, 'new', '已取消选择')
      }
      
      async startEditing(id) {
        await this.updateArticleStatus(id, 'editing', '开始编辑')
        this.switchTab('editing')
      }
      
      async saveEdit(id) {
        try {
          const content = document.getElementById(\\\`content-\\\${id}\\\`).value
          const { error } = await supabase
            .from('articles')
            .update({ 
              edited_content: content,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
          
          if (error) throw error
          this.showNotification('内容已保存', 'success')
        } catch (error) {
          this.showNotification('保存失败: ' + error.message, 'error')
        }
      }
      
      async finishEditing(id) {
        try {
          const content = document.getElementById(\\\`content-\\\${id}\\\`).value
          const { error } = await supabase
            .from('articles')
            .update({ 
              edited_content: content,
              status: 'published',
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
          
          if (error) throw error
          await this.loadArticles()
          this.showNotification('编辑完成！', 'success')
          this.switchTab('publish')
        } catch (error) {
          this.showNotification('操作失败: ' + error.message, 'error')
        }
      }
      
      async cancelEditing(id) {
        if (confirm('确定取消编辑吗？未保存的内容将丢失。')) {
          await this.updateArticleStatus(id, 'selected', '已取消编辑')
        }
      }
      
      async archiveArticle(id) {
        await this.updateArticleStatus(id, 'archived', '文章已归档')
      }
      
      async analyzeWithAI(id) {
        try {
          this.showNotification('正在进行AI分析...', 'info')
          
          const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articleId: id })
          })
          
          const result = await response.json()
          
          if (result.success) {
            await this.loadArticles()
            this.showNotification('AI分析完成！', 'success')
            this.render()
          } else {
            throw new Error(result.error)
          }
        } catch (error) {
          this.showNotification('AI分析失败: ' + error.message, 'error')
        }
      }
      
      async copyToClipboard(id) {
        try {
          const article = this.articles.find(a => a.id === id)
          const content = article.edited_content || article.content || article.title
          await navigator.clipboard.writeText(content)
          this.showNotification('内容已复制到剪贴板！', 'success')
        } catch (error) {
          this.showNotification('复制失败: ' + error.message, 'error')
        }
      }
      
      previewArticle(id) {
        const article = this.articles.find(a => a.id === id)
        const content = article.edited_content || article.content || article.title
        
        const previewWindow = window.open('', '_blank', 'width=800,height=600')
        previewWindow.document.write(\\\`
          <html>
            <head>
              <title>预览: \\\${article.title}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
                h1 { color: #1f2937; }
                .content { white-space: pre-wrap; margin-top: 2rem; }
              </style>
            </head>
            <body>
              <h1>\\\${article.title}</h1>
              <div class="content">\\\${content}</div>
            </body>
          </html>
        \\\`)
        previewWindow.document.close()
      }
      
      // RSS 相关方法
      showRSSDialog() {
        document.getElementById('rss-dialog').style.display = 'block'
      }
      
      hideRSSDialog() {
        document.getElementById('rss-dialog').style.display = 'none'
        document.getElementById('rss-url').value = ''
        document.getElementById('rss-source').value = ''
      }
      
      async fetchRSS() {
        try {
          const rssUrl = document.getElementById('rss-url').value
          const sourceName = document.getElementById('rss-source').value
          
          if (!rssUrl) {
            this.showNotification('请输入RSS URL', 'error')
            return
          }
          
          this.showNotification('正在抓取RSS...', 'info')
          
          const response = await fetch('/api/fetch-rss', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rssUrl, sourceName })
          })
          
          const result = await response.json()
          
          if (result.success) {
            this.showNotification(result.message, 'success')
            this.hideRSSDialog()
            await this.loadArticles()
            this.render()
          } else {
            throw new Error(result.error)
          }
        } catch (error) {
          this.showNotification('RSS抓取失败: ' + error.message, 'error')
        }
      }
      
      async refreshArticles() {
        await this.loadArticles()
        this.render()
        this.showNotification('文章已刷新', 'success')
      }
      
      // 辅助方法
      async updateArticleStatus(id, status, message) {
        try {
          const { error } = await supabase
            .from('articles')
            .update({ 
              status,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
          
          if (error) throw error
          
          await this.loadArticles()
          this.showNotification(message, 'success')
          this.render()
        } catch (error) {
          this.showNotification('操作失败: ' + error.message, 'error')
        }
      }
      
      showNotification(message, type = 'info') {
        const notification = document.createElement('div')
        notification.className = \\\`notification \\\${type}\\\`
        notification.textContent = message
        
        document.body.appendChild(notification)
        
        setTimeout(() => {
          notification.remove()
        }, 3000)
      }
    }
    
    // 初始化应用
    const app = new OSINTWorkstation()
    window.app = app
  </script> </body> </html>`])), renderHead());
}, "/Users/simianwang/Desktop/产业编译工作室/src/pages/index-old.astro", void 0);
const $$file = "/Users/simianwang/Desktop/产业编译工作室/src/pages/index-old.astro";
const $$url = "/index-old";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$IndexOld,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
