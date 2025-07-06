# OSINT 工作台 V3.0

基于 Astro + Supabase + Gemini AI 的极简新闻工作台

## 🎯 项目目标

为内容运营实习生提供一个集成的 Web 工作台，完成 **看->选->编->发** 的完整工作流。

## 🏗️ 技术栈

- **前端**: Astro (静态生成 + 客户端交互)
- **后端**: Supabase (PostgreSQL 数据库 + 自动 API)
- **AI处理**: Google Gemini API
- **部署**: Vercel

## 🚀 快速开始

### 1. 设置 Supabase

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL Editor 中执行 `supabase-schema.sql` 创建数据表
3. 获取项目的 URL 和 anon key

### 2. 设置 Gemini API

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 创建 API Key

### 3. 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 API 密钥

# 3. 启动开发服务器
npm run dev
```

### 4. 部署到 Vercel

1. 连接 GitHub 仓库到 Vercel
2. 在 Vercel 项目设置中添加环境变量
3. 自动部署完成

## 📋 环境变量

在 `.env` 文件中配置：

```bash
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## 🔧 核心功能

### 📰 浏览文章
- 展示所有新抓取的文章
- 支持搜索和筛选（评分、来源）
- AI 自动分析和评分
- 一键选择文章进入编辑流程

### ✅ 已选择
- 查看已选择的文章
- 批量操作功能
- 开始编辑流程

### ✏️ 编辑中
- 内嵌文本编辑器
- 实时保存功能
- 参考原文链接
- 完成编辑后进入发布队列

### 🚀 待发布
- 一键复制编辑好的内容
- 预览功能
- 归档管理

## 🤖 AI 功能

使用 Google Gemini API 提供：
- 文章摘要生成
- 关键词提取
- 重要程度评分 (1-10)
- 推荐操作建议

## 📊 数据库结构

### articles 表
- `id`: 主键
- `title`: 文章标题
- `original_url`: 原文链接
- `description`: 文章描述
- `content`: 文章内容
- `source_name`: 来源名称
- `status`: 工作流状态 (new/selected/editing/published/archived)
- `ai_summary`: AI 生成摘要
- `ai_keywords`: AI 提取关键词
- `ai_score`: AI 评分
- `edited_content`: 编辑后内容
- 时间戳字段

## 🔄 工作流程

1. **RSS 抓取**: 从外部 RSS 源抓取文章
2. **AI 分析**: 使用 Gemini 分析文章内容
3. **筛选**: 根据评分和关键词筛选文章
4. **编辑**: 编辑文章内容
5. **发布**: 复制最终内容用于发布

## 🛠️ 开发说明

### 项目结构
```
osint-workstation/
├── src/
│   ├── pages/
│   │   ├── index.astro          # 主页面
│   │   └── api/
│   │       ├── fetch-rss.js     # RSS 抓取 API
│   │       └── gemini.js        # Gemini AI API
│   └── scripts/
│       └── supabase.js          # Supabase 客户端
├── supabase-schema.sql          # 数据库建表脚本
├── astro.config.mjs            # Astro 配置
└── package.json
```

### API 端点
- `POST /api/fetch-rss`: 抓取 RSS 源
- `POST /api/gemini`: AI 分析文章

## 🎨 界面特色

- 📱 响应式设计，支持移动端
- 🎯 简洁的单页面应用
- 🔄 实时数据同步
- 💡 直观的工作流标签页
- 🚀 快速操作按钮

## 💰 成本估算

- **Supabase**: 免费额度足够小团队使用
- **Gemini API**: 按使用量计费，成本极低
- **Vercel**: 免费额度支持个人项目
- **总体成本**: 几乎为零

## 🔮 未来扩展

- [ ] 批量操作功能
- [ ] 多用户权限管理
- [ ] 更多 AI 模型支持
- [ ] 社交媒体集成
- [ ] 数据导出功能

## 📞 支持

如有问题，请查看：
1. Supabase 官方文档
2. Astro 官方文档
3. Gemini API 文档

---

**快速、简单、高效的内容工作台，让内容运营更专注于创作！**