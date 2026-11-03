const { createServer } = require('node:http');
const { createReadStream, existsSync } = require('node:fs');
const { join } = require('node:path');

const routes = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/park.png', ['park.png', 'image/png']]
]);

createServer((request, response) => {
  const route = routes.get(new URL(request.url, 'http://localhost').pathname);
  const file = route && join(__dirname, 'dist', route[0]);
  if (!file || !existsSync(file)) {
    response.writeHead(404).end('Not found. Run npm run build first.');
    return;
  }
  response.writeHead(200, { 'Content-Type': route[1] });
  createReadStream(file).pipe(response);
}).listen(4173, '127.0.0.1', () => {
  console.log('http://127.0.0.1:4173');
});
