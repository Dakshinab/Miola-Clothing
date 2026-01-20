import express from 'express';

const app = express();
const PORT = 5000;

console.log('[STARTUP] Starting server...');

app.get('/', (req, res) => {
  console.log('[GET /] Received request');
  res.json({ message: 'Hello' });
});

const server = app.listen(PORT, () => {
  console.log('[STARTUP] Server listening on port ' + PORT);
});

server.on('error', (err) => {
  console.error('[SERVER ERROR]', err);
});

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT]', err);
});
