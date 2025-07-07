# 🚀 Vercel部署指南

## 📋 部署步骤

### 1. 访问Vercel
1. 打开 [vercel.com](https://vercel.com)
2. 用GitHub账号登录

### 2. 导入项目
1. 点击 **New Project**
2. 选择 **Import Git Repository**
3. 找到 `wang4mian/osint-workstation-v3`
4. 点击 **Import**

### 3. 配置项目
- **Framework Preset**: Astro (应该自动检测)
- **Build Command**: `npm run build` (已在vercel.json中配置)
- **Output Directory**: `dist` (已在vercel.json中配置)
- **Install Command**: `npm install` (已在vercel.json中配置)

### 4. 环境变量 (重要!)
在 **Environment Variables** 部分添加：

```

```

### 5. 部署
1. 点击 **Deploy**
2. 等待构建完成 (约1-2分钟)
3. 获得部署URL

## 🔍 验证部署

### 访问站点
部署完成后，你会得到一个URL，类似：
```
https://osint-workstation-v3-xxx.vercel.app
```

### 测试AI功能
1. **访问部署的网站**
2. **点击"抓取RSS"按钮**
3. **验证AI功能**：
   - ✅ 评分不再是7-9随机数
   - ✅ 摘要不再是简单拼接
   - ✅ 高分文章显示"full-text"模式
   - ✅ 低分文章显示"quick"模式

### 检查控制台
打开浏览器开发者工具，查看：
- 网络请求是否成功
- Supabase连接是否正常
- AI API调用是否工作

## 🎯 预期结果

### 成功部署的标志：
- ✅ 网站正常加载
- ✅ RSS抓取按钮可点击
- ✅ 数据库连接正常
- ✅ AI评分和摘要正常工作

### 如果出现问题：
1. **构建失败** - 检查代码语法
2. **环境变量错误** - 确认Supabase配置
3. **AI功能不工作** - 检查Gemini API Key设置

## 📝 部署后测试清单

- [ ] 网站正常访问
- [ ] 点击"抓取RSS"按钮
- [ ] 查看文章列表是否加载
- [ ] 验证评分不是随机数
- [ ] 检查摘要是否AI生成
- [ ] 测试文章选择功能
- [ ] 测试内容生成功能

## 🚀 GitHub仓库
https://github.com/wang4mian/osint-workstation-v3

## 🎉 准备就绪！
代码已推送到GitHub，现在可以在Vercel中导入并部署了！