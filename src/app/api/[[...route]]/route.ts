import { Hono, Context } from 'hono';
import { handle } from 'hono/vercel';
import images from './images';
import users from './users';
import test from './test';
import { cors } from 'hono/cors';
import { AuthConfig, initAuthConfig } from '@hono/auth-js';
import authConfig from '@/auth.config';
import dotenv from 'dotenv';

dotenv.config();

// bhai revert krlena agar edge pr chalana ho kyuki drizzle chalana haina
export const runtime = 'nodejs';

function getAuthConfig(c: Context): AuthConfig {
  return {
    // yeh dekhna padega
    secret: process.env.AUTH_SECRET,
    ...(authConfig as AuthConfig),
  };
}

const app = new Hono().basePath('/api');
app.use(
  '*',
  initAuthConfig(getAuthConfig),
  cors({
    origin: '*', // Allow all origins
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  })
);

const routes = app
  .route('/images', images)
  .route('/users', users)
  .route('/test', test);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
