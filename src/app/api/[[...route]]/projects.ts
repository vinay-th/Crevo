import { db } from '@/db/drizzle';
import { projectsInsertSchema, projects } from '@/db/schema';
import { verifyAuth } from '@hono/auth-js';
import { zValidator } from '@hono/zod-validator';
import { eq, and, desc, asc } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono()
  .get(
    'templates',
    verifyAuth(),
    zValidator(
      'query',
      z.object({ page: z.coerce.number(), limit: z.coerce.number() })
    ),
    async (c) => {
      const auth = c.get('authUser');

      const { page, limit } = c.req.valid('query');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.isPro), desc(projects.updatedAt));

      return c.json({
        data,
      });
    }
  )
  .delete(
    '/:id',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (!data[0]) {
        return c.json({ error: 'Project not found' }, 404);
      }

      return c.json({ data: { id: data[0].id } });
    }
  )
  .post(
    '/:id/duplicate',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (!data[0]) {
        return c.json({ error: 'Project not found' }, 404);
      }

      const project = data[0];

      const duplicatedProject = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return c.json({ data: duplicatedProject[0] });
    }
  )
  .get(
    '/',
    verifyAuth(),
    zValidator(
      'query',
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get('authUser');

      const { page, limit } = c.req.valid('query');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.createdAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    '/:id',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() })),
    zValidator(
      'json',
      projectsInsertSchema
        .partial()
        .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
    ),
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();
      if (!data[0]) {
        return c.json({ error: 'Project not found' }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .get(
    '/:id',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data?.length === 0) {
        return c.json({ error: 'Project not found' }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    '/',
    verifyAuth(),
    zValidator(
      'json',
      projectsInsertSchema.pick({
        name: true,
        json: true,
        height: true,
        width: true,
      })
    ),
    async (c) => {
      const auth = c.get('authUser');
      const { name, json, height, width } = c.req.valid('json');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .insert(projects)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!data[0]) {
        return c.json({ error: 'Something went wrong' }, 400);
      }

      return c.json({ data: data[0] });
    }
  );

export default app;
