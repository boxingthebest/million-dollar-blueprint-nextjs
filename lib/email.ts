import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password - Million Dollar Blueprint",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          Reset Your Password
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          We received a request to reset your password for your Million Dollar Blueprint account.
                        </p>
                        <p style="margin: 0 0 30px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          Click the button below to create a new password:
                        </p>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 20px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          Or copy and paste this link into your browser:
                        </p>
                        <p style="margin: 0 0 30px 0; padding: 12px; background-color: #1e293b; border-radius: 6px; color: #06b6d4; font-size: 14px; word-break: break-all; border: 1px solid #334155;">
                          ${resetUrl}
                        </p>
                        
                        <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          This link will expire in <strong style="color: #cbd5e1;">1 hour</strong> for security reasons.
                        </p>
                        <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          If you didn't request this password reset, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="color: #94a3b8;">The Million Dollar Blueprint Team</strong>
                        </p>
                        <p style="margin: 20px 0 0 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          © ${new Date().getFullYear()} Million Dollar Blueprint. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return { success: false, error }
  }
}

export async function sendPasswordChangedEmail(email: string) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <onboarding@resend.dev>",
      to: email,
      subject: "Password Changed Successfully - Million Dollar Blueprint",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <div style="width: 64px; height: 64px; margin: 0 auto 20px; background: linear-gradient(to bottom right, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          <span style="color: white; font-size: 32px;">✓</span>
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          Password Changed Successfully
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          Your password has been successfully changed for your Million Dollar Blueprint account.
                        </p>
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          You can now log in with your new password.
                        </p>
                        
                        <div style="margin: 30px 0; padding: 20px; background-color: #1e293b; border-radius: 8px; border-left: 4px solid #06b6d4;">
                          <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                            <strong style="color: #cbd5e1;">🔒 Security Tip:</strong><br>
                            If you didn't make this change, please contact our support team immediately.
                          </p>
                        </div>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://www.milliondollarblueprint.ai/auth/signin" style="display: inline-block; padding: 16px 40px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                Log In to Your Account
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="color: #94a3b8;">The Million Dollar Blueprint Team</strong>
                        </p>
                        <p style="margin: 20px 0 0 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          © ${new Date().getFullYear()} Million Dollar Blueprint. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send password changed email:", error)
    return { success: false, error }
  }
}

