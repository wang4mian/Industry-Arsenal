# 🔧 Localhost开发环境修复指南

## 🎯 问题诊断结果

### ✅ 已修复的问题：
1. **端口配置错误** - 从3000改为4321
2. **主机绑定限制** - 从127.0.0.1改为0.0.0.0
3. **自动打开浏览器** - 设置为true

### ✅ 项目结构正常：
- package.json ✅
- astro.config.mjs ✅ (已更新)
- node_modules ✅
- src/pages/index.astro ✅

## 🚀 启动开发环境

### 方法1: 使用启动脚本 (推荐)
```bash
cd "/Users/simianwang/Desktop/产业编译工作室/osint-workstation"
./start-dev.sh
```

### 方法2: 手动启动
```bash
cd "/Users/simianwang/Desktop/产业编译工作室/osint-workstation"
npm run dev
```

### 方法3: 指定端口启动
```bash
cd "/Users/simianwang/Desktop/产业编译工作室/osint-workstation"
npm run dev -- --port 4321 --host 0.0.0.0
```

## 🌐 访问地址

启动成功后，访问以下任一地址：
- **http://localhost:4321** (主要)
- **http://127.0.0.1:4321** (备用)
- **http://0.0.0.0:4321** (如果上面不行)

## 🔍 故障排除

### 问题1: 端口被占用
```bash
# 查看端口占用
lsof -i :4321

# 杀死占用进程
kill -9 <PID>

# 或使用其他端口
npm run dev -- --port 3000
```

### 问题2: 权限问题
```bash
# 检查文件权限
ls -la "/Users/simianwang/Desktop/产业编译工作室/osint-workstation"

# 修复权限
chmod -R 755 "/Users/simianwang/Desktop/产业编译工作室/osint-workstation"
```

### 问题3: 依赖问题
```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### 问题4: 缓存问题
```bash
# 清理缓存
rm -rf dist .astro
npm run dev
```

## 🎯 验证开发环境

### 成功启动的标志：
```
 astro  v4.16.18 ready in 54 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose

watching for file changes...
```

### 功能验证清单：
- [ ] 页面正常加载
- [ ] RSS抓取按钮工作
- [ ] 数据库连接正常
- [ ] AI功能可用
- [ ] 热重载工作

## 🔄 开发流程

### 1. 启动开发环境
```bash
./start-dev.sh
```

### 2. 访问应用
打开 http://localhost:4321

### 3. 测试AI RSS功能
点击"抓取RSS"按钮，验证：
- AI评分不是随机数
- 摘要不是简单拼接
- 高分文章显示full-text模式

### 4. 开发调试
- 修改代码自动热重载
- 查看浏览器控制台日志
- 检查网络请求状态

## 📋 配置文件对比

### 修复前 (有问题):
```javascript
server: {
  port: 3000,
  host: '127.0.0.1',
  open: false
}
```

### 修复后 (正常):
```javascript
server: {
  port: 4321,
  host: '0.0.0.0',
  open: true
}
```

## 🎉 修复完成

现在localhost开发环境应该完全正常工作了！

如果还有问题，检查：
1. Node.js版本 (建议18+)
2. 网络代理设置
3. 防火墙配置
4. 系统权限

---

**开发环境修复完成！现在可以正常进行本地开发和测试了。**