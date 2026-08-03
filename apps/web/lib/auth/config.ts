import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL:
    process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || 'dev-secret-do-not-use-in-production',
  emailAndPassword: {
    enabled: true,
    /**
     * Fires for every password-reset request.
     *
     * - Production: sends a branded email through Resend via sendPasswordResetEmail().
     * - Development (no RESEND_API_KEY configured): prints the reset URL to the
     *   terminal instead so the flow can be tested end-to-end without an email
     *   provider. Never crashes when email delivery is unavailable.
     *
     * No credentials are hardcoded — Resend is initialized strictly from the
     * RESEND_API_KEY / EMAIL_FROM environment variables.
     */
    sendResetPassword: async ({ user, url, token }) => {
      if (!process.env.RESEND_API_KEY) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        // eslint-disable-next-line no-console
        console.warn(
          `[Auth] RESEND_API_KEY is not set — reset email NOT sent.\n` +
            `[Auth] Password Reset URL: ${appUrl}/reset-password?token=${token}`
        );
        return;
      }

      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetUrl: url,
      });
    },
    resetPasswordTokenExpiresIn: 3600,
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
  advanced: {
    database: {
      generateId: 'uuid',
    },
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
