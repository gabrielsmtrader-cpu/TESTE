const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const routes = {
  '/patients': { data: [] },
  '/inventory': { data: [] },
  '/appointments': { data: [] },
  '/prices': { data: [] }
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url).pathname;

  if (routes[parsed]) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(routes[parsed]));
    return;
  }

  const filePath = path.join(__dirname, 'public', parsed === '/' ? 'index.html' : parsed);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Rota não encontrada' }));
      return;
    }

    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript'
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor VETTOOTH rodando na porta ${PORT}`);
});
