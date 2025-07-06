# 🔧 Localhost问题诊断

## 问题现象
- Astro显示服务器启动成功
- 但浏览器显示 ERR_CONNECTION_REFUSED
- curl也连接失败

## 可能原因

### 1. macOS网络安全设置
可能被macOS防火墙阻止了

### 2. Astro版本问题
当前版本v4.16.18，可能与Node.js v22.16.0不兼容

### 3. 端口绑定问题
虽然显示监听，但实际没有绑定成功

## 🎯 建议解决方案

### 方案1: 使用Vercel部署（推荐）
既然你说要用Vercel一键部署，我们可以：
1. 推送代码到Git
2. 用Vercel部署
3. 直接在线测试AI功能

### 方案2: 使用不同的开发方式
创建简单的HTML文件直接测试

### 方案3: 检查系统设置
检查macOS防火墙设置

## 🚀 快速测试方案

创建一个简单的静态页面直接测试AI功能：

```bash
# 构建静态文件
npm run build

# 用Python简单服务器运行
cd dist
python3 -m http.server 8000

# 访问 http://localhost:8000
```

## 下一步
你想用哪种方案？我推荐直接用Vercel部署测试。