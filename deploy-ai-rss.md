# 🚀 部署AI驱动RSS解析器

## 📋 部署步骤

### 1. 登录Supabase控制台
- 访问 https://supabase.com/dashboard
- 进入项目: msvgeriacsaaakmxvqye

### 2. 更新Edge Function
1. 点击左侧 **Edge Functions**
2. 找到现有的 **fetch-rss** 函数
3. 点击函数名进入编辑
4. **完全替换**现有代码为新的AI版本

### 3. 复制新代码
复制文件内容：`ai-score-first-rss-parser.ts`

### 4. 部署函数
1. 粘贴新代码
2. 点击 **Deploy** 
3. 等待部署完成

### 5. 验证部署
部署成功后，函数URL保持不变：
```
https://msvgeriacsaaakmxvqye.supabase.co/functions/v1/fetch-rss
```

## 🧪 测试新AI功能

### 测试请求：
```bash
curl -X POST 'https://msvgeriacsaaakmxvqye.supabase.co/functions/v1/fetch-rss' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "rssUrl": "https://news.google.com/rss/search?q=3D+printing&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    "sourceName": "3D Print",
    "verticalName": "3D打印"
  }'
```

### 期望返回：
```json
{
  "success": true,
  "count": 15,
  "mode": "ai-score-first",
  "message": "🚀 AI评分优先分析完成！处理 15 篇文章",
  "articles": [...]
}
```

## 🔍 AI功能验证

### 检查点：
1. ✅ **AI评分**: 不再是7-9的随机数
2. ✅ **AI摘要**: 不再是简单字符串拼接  
3. ✅ **智能分层**: 高分文章进行全文分析
4. ✅ **处理模式**: 返回analysis_mode字段

### 错误排查：
- 如果返回随机评分 → 检查GEMINI_API_KEY设置
- 如果API调用失败 → 检查Gemini配额和网络
- 如果全文抓取失败 → 检查Jina Reader可用性

## 🎯 成功标志

当你看到以下情况，说明AI功能正常：
- 评分不再是固定的7-9随机数
- 摘要内容更加精炼和专业
- 高分文章显示analysis_mode为"full-text"
- 低分文章显示analysis_mode为"quick"

## 📊 新旧对比

### 旧版本（假AI）：
```json
{
  "score_ai": 8,  // 随机数
  "summary_ai": "来源：3D Print\n\n原始描述..."  // 字符串拼接
}
```

### 新版本（真AI）：
```json
{
  "score_ai": 7,  // AI评分
  "summary_ai": "该技术突破将显著提升3D打印精度。预计将在医疗和航空领域产生重要影响。市场反应积极。",  // AI生成摘要
  "analysis_mode": "full-text"  // 分析模式
}
```

部署完成后，我们就可以测试真正的AI驱动RSS分析了！