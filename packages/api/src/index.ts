import { Hono, type Context } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { cardsRouter } from './routes/cards';
import { boardsRouter } from './routes/boards';
import { setupWebSocket } from './websocket';

const app = new Hono();

// Middleware
app.use('*', cors());

// API Routes
app.route('/api/cards', cardsRouter);
app.route('/api/boards', boardsRouter);

// Health check
app.get('/health', (c: Context) => c.json({ status: 'ok' }));

// WebSocket setup
setupWebSocket(app);

// Serve static files from the web package (for production/preview)
// Based on vite.config.ts base path '/vanilla-cards/'
app.use('/vanilla-cards/*', serveStatic({ 
  root: '../web/dist',
  rewriteRequestPath: (path: string) => path.replace(/^\/vanilla-cards/, '')
}));

// Fallback for SPA
app.get('/vanilla-cards/*', serveStatic({ path: '../web/dist/index.html' }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;
