const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('请求:', req.url);
  
  if (req.url === '/' || req.url === '/index.html') {
    try {
      const indexPath = path.join(__dirname, 'osint-workstation/dist/index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    } catch (err) {
      console.error('读取文件错误:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('服务器错误: ' + err.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('页面未找到');
  }
});

const PORT = 8080;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`测试服务器运行在 http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  console.error('服务器错误:', err);
});