import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import images from './images';
import { cors } from 'hono/cors';

// bhai revert krlena agar edge pr chalana ho kyuki drizzle chalana haina
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');
app.use(
  '*',
  cors({
    origin: '*', // Allow all origins
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  })
);

const routes = app.route('/images', images);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
