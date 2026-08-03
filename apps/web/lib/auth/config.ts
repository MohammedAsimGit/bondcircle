import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';

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
     * Sends the password reset email.
     *
     * - Development: logs the reset link to the terminal so the flow can be
     *   tested without an email provider.
     * - Production: sends the email via Resend (RESEND_API_KEY) if configured,
     *   otherwise logs a warning so the failure is observable.
     *
     * Credentials are NEVER hardcoded — only environment variables are read.
     */
    sendResetPassword: async ({ user, url }) => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(`[Auth] Password reset requested for: ${user.email}`);
        // eslint-disable-next-line no-console
        console.log(`[Auth] Reset link: ${url}`);
        return;
      }

      if (!process.env.RESEND_API_KEY) {
        // eslint-disable-next-line no-console
        console.warn('[Auth] RESEND_API_KEY is not set; reset email was NOT sent for', user.email);
        return;
      }

      const from = process.env.EMAIL_FROM || 'BondCircle <noreply@bondcircle.com>';

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: user.email,
          subject: 'Reset your BondCircle password',
          html: `<p>Hello ${user.name || ''},</p><p>Click <a href="${url}">here</a> to reset your password. This link expires in 1 hour.</p><p>If you didn't request this, you can safely ignore this email.</p>`,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        // eslint-disable-next-line no-console
        console.error('[Auth] Failed to send reset email:', res.status, body);
      }
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
