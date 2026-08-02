import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { username } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL:
    process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || 'dev-secret-do-not-use-in-production',
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: (request) => {
    const origin = request?.headers?.get('origin');
    if (process.env.NODE_ENV === 'development') return [origin || 'http://localhost:3000'];
    const allowed = [
      process.env.NEXT_PUBLIC_APP_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      origin,
    ].filter(Boolean) as string[];
    return allowed;
  },
  plugins: [username()],
  advanced: {
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
