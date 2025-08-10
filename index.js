const http = require('http');
const url = require('url');

const routes = {
  '/patients': { data: [] },
  '/inventory': { data: [] },
  '/appointments': { data: [] },
  '/prices': { data: [] }
};

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  if (routes[path]) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(routes[path]));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor VETTOOTH rodando na porta ${PORT}`);
});
