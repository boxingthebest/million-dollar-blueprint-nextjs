// Universal Welcome Email Template for All Course Purchases

export function getWelcomeEmailHTML(name: string, passwordSetupUrl: string, courseName?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Million Dollar Blueprint!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                
                <!-- Header with Success Icon -->
                <tr>
                  <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(to right, #10b981, #06b6d4);">
                    <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: rgba(255,255,255,0.3); border-radius: 50%; position: relative;">
                      <svg width="80" height="80" viewBox="0 0 80 80" style="position: absolute; top: 0; left: 0;">
                        <circle cx="40" cy="40" r="35" fill="rgba(255,255,255,0.2)" stroke="#ffffff" stroke-width="2"/>
                        <path d="M25 40 L35 50 L55 30" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                      Welcome to Million Dollar Blueprint! 🎉
                    </h1>
                  </td>
                </tr>
                
                <!-- Personal Greeting -->
                <tr>
                  <td style="padding: 30px 40px 20px 40px;">
                    <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                      Hi ${name}! 👋
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 17px; line-height: 1.7;">
                      Your payment was successful${courseName ? ` and you now have access to <strong style="color: #06b6d4;">${courseName}</strong>` : ''}. Let's get you started!
                    </p>
                  </td>
                </tr>
                
                <!-- Set Password CTA -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 12px; padding: 30px; border: 1px solid #334155;">
                      <h3 style="margin: 0 0 15px 0; color: #06b6d4; font-size: 20px; font-weight: 600;">
                        🔐 Set Your Password (Takes 30 Seconds)
                      </h3>
                      <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                        Click the button below to create your password and access your courses:
                      </p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 10px 0 20px 0;">
                            <a href="${passwordSetupUrl}" style="display: inline-block; padding: 18px 45px; background: linear-gradient(to right, #10b981, #06b6d4); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">
                              Set My Password →
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                        Or copy and paste this link: <span style="color: #22d3ee; word-break: break-all;">${passwordSetupUrl}</span>
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- What's Next Section -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <h3 style="margin: 0 0 20px 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                      What Happens Next?
                    </h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 15px; vertical-align: top;">
                          <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border-left: 3px solid #06b6d4;">
                            <div style="font-size: 24px; margin-bottom: 10px;">1️⃣</div>
                            <h4 style="margin: 0 0 8px 0; color: #06b6d4; font-size: 16px; font-weight: 600;">Set Your Password</h4>
                            <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                              Click the button above to create your password
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px; vertical-align: top;">
                          <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border-left: 3px solid #10b981;">
                            <div style="font-size: 24px; margin-bottom: 10px;">2️⃣</div>
                            <h4 style="margin: 0 0 8px 0; color: #10b981; font-size: 16px; font-weight: 600;">Access Your Dashboard</h4>
                            <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                              You'll be automatically logged in and taken to your courses
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px; vertical-align: top;">
                          <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border-left: 3px solid #8b5cf6;">
                            <div style="font-size: 24px; margin-bottom: 10px;">3️⃣</div>
                            <h4 style="margin: 0 0 8px 0; color: #8b5cf6; font-size: 16px; font-weight: 600;">Start Learning</h4>
                            <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                              Begin your first lesson and start your transformation
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Quick Access Link -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border: 1px solid #334155; text-align: center;">
                      <p style="margin: 0 0 10px 0; color: #cbd5e1; font-size: 15px;">
                        Already set your password? Login here:
                      </p>
                      <a href="https://www.milliondollarblueprint.ai/auth/signin" style="color: #06b6d4; text-decoration: none; font-weight: 600; font-size: 16px;">
                        https://www.milliondollarblueprint.ai/auth/signin
                      </a>
                    </div>
                  </td>
                </tr>
                
                <!-- Important Notes -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border-left: 4px solid #fbbf24;">
                      <p style="margin: 0 0 10px 0; color: #fbbf24; font-size: 14px; font-weight: 600;">
                        ⚡ Important Notes:
                      </p>
                      <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                        <li style="margin-bottom: 8px;">This password setup link expires in 24 hours</li>
                        <li style="margin-bottom: 8px;">All your purchases will appear in one dashboard</li>
                        <li>You can access your courses anytime at milliondollarblueprint.ai</li>
                      </ul>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                    <p style="margin: 0 0 15px 0; color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                      Questions? Just reply to this email and we'll help you out.
                    </p>
                    <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                      Best regards,<br>
                      <strong style="color: #cbd5e1;">Dana Penza</strong><br>
                      <span style="color: #64748b;">Founder, Million Dollar Blueprint</span>
                    </p>
                    <p style="margin: 20px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.6;">
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
  `;
}

export function getWelcomeEmailText(name: string, passwordSetupUrl: string, courseName?: string) {
  return `
Welcome to Million Dollar Blueprint! 🎉

Hi ${name}!

Your payment was successful${courseName ? ` and you now have access to ${courseName}` : ''}. Let's get you started!

SET YOUR PASSWORD (Takes 30 Seconds)
Click this link to create your password and access your courses:
${passwordSetupUrl}

WHAT HAPPENS NEXT?

1. Set Your Password
   Click the link above to create your password

2. Access Your Dashboard
   You'll be automatically logged in and taken to your courses

3. Start Learning
   Begin your first lesson and start your transformation

Already set your password? Login here:
https://www.milliondollarblueprint.ai/auth/signin

IMPORTANT NOTES:
- This password setup link expires in 24 hours
- All your purchases will appear in one dashboard
- You can access your courses anytime at milliondollarblueprint.ai

Questions? Just reply to this email and we'll help you out.

Best regards,
Dana Penza
Founder, Million Dollar Blueprint

© ${new Date().getFullYear()} Million Dollar Blueprint. All rights reserved.
  `;
}
