import { Resend } from 'resend';

interface SendPasswordResetEmailArgs {
  email: string;
  name?: string | null;
  resetUrl: string;
}

/**
 * Send a password-reset email via Resend.
 *
 * Returns `true` when the email was handed off to Resend successfully (or when
 * no Resend API key is configured and the reset URL was printed to the
 * terminal instead). Returns `false` when the Resend API reported an error.
 *
 * Credentials are never hardcoded — `RESEND_API_KEY` and `EMAIL_FROM` are read
 * exclusively from environment variables.
 */
export async function sendPasswordResetEmail({
  email,
  name,
  resetUrl,
}: SendPasswordResetEmailArgs): Promise<boolean> {
  const displayName = name || 'there';
  const from = process.env.EMAIL_FROM || 'BondCircle <noreply@bondcircle.com>';

  const html = renderResetEmailHtml({ displayName, resetUrl });
  const text = renderResetEmailText({ displayName, resetUrl });

  if (!process.env.RESEND_API_KEY) {
    // Development fallback (Step 6): do not crash when no email provider is
    // configured. Print the reset URL to the terminal instead.
    // eslint-disable-next-line no-console
    console.warn(
      '[Email] RESEND_API_KEY is not set — password reset email was NOT sent. ' +
        'Reset URL (dev fallback): ' +
        resetUrl
    );
    return true;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: 'Reset your BondCircle password',
    html,
    text,
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[Email] Resend send failed:', error);
    return false;
  }

  return true;
}

function renderResetEmailHtml({
  displayName,
  resetUrl,
}: {
  displayName: string;
  resetUrl: string;
}) {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reset your BondCircle password</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1e293b">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:24px 8px">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(15,23,42,0.08);overflow:hidden">
            <tr>
              <td style="background:linear-gradient(135deg,#0ea5e9,#0284c7);padding:32px;text-align:center">
                <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:14px;background-color:rgba(255,255,255,0.2)">
                  <span style="color:#ffffff;font-weight:700;font-size:20px">BC</span>
                </div>
                <h1 style="margin:16px 0 0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px">BondCircle</h1>
                <p style="margin:8px 0 0;color:#e0f2fe;font-size:15px">Reset your password</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 24px">
                <p style="margin:0 0 16px;font-size:16px;color:#1e293b">Hi ${displayName},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:24px;color:#475569">You requested to reset your BondCircle password. Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.</p>
                <p style="text-align:center;margin:24px 0">
                  <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:12px;box-shadow:0 4px 16px rgba(14,165,233,0.3)">Reset my password</a>
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-align:center">If the button above doesn't work, copy and paste this link into your browser:</p>
                <p style="margin:0 0 24px;font-size:12px;word-break:break-all;color:#94a3b8;text-align:center">${resetUrl}</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0">
                  <tr>
                    <td style="padding-top:20px">
                      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#64748b">Security notice</p>
                      <p style="margin:0;font-size:12px;line-height:20px;color:#94a3b8">We did not request this change. If you did not ask to reset your password, you can safely ignore this email. The link above will expire and revoke automatically.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;text-align:center;border-top:1px solid #f1f5f9">
                <p style="margin:0;font-size:12px;color:#cbd5e1">BondCircle — Preserving friendships through intelligent memory management.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderResetEmailText({
  displayName,
  resetUrl,
}: {
  displayName: string;
  resetUrl: string;
}) {
  return `BondCircle — Reset your password

Hi ${displayName},

You requested to reset your BondCircle password. Open the link below to choose a new password. This link expires in 1 hour.

${resetUrl}

Security notice:
If you did not request this change, you can safely ignore this email. The reset link will expire and revoke automatically.

— The BondCircle team`;
}
