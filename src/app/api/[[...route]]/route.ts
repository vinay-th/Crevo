import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import images from './images';

// bhai revert krlena agar edge pr chalana ho kyuki drizzle chalana haina
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const routes = app.route('/images', images);

export const GET = handle(app);

export type AppType = typeof routes;
