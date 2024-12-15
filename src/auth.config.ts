import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import bycrypt from 'bcryptjs';

import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/drizzle';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { users } from './db/schema';

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bycrypt.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return user;
      },
    }),
    GitHub,
    Google,
  ],
  pages: {
    signIn: '/login',
    error: '/login',
    // signOut: '/logout',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
