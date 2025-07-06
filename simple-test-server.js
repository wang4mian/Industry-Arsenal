import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Test Server Working!</h1><p>If you see this, localhost is working.</p>');
});

server.listen(9999, '127.0.0.1', () => {
  console.log('🚀 Test server running at http://127.0.0.1:9999/');
});

// 自动退出
setTimeout(() => {
  console.log('✅ Test complete');
  process.exit(0);
}, 30000);