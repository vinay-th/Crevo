import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';

const app = new Hono().get('/', verifyAuth(), async (c) => {
  const auth = c.get('authUser');

  return c.json({ message: `Hello World`, auth });
});

export default app;
