import nodemailer from "nodemailer"

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || "Million Dollar Blueprint"} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
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
                        <p style="margin: 0 0 20px 0; color: #f1f5f9; font-size: 17px; line-height: 1.7;">
                          We received a request to reset your password for your Million Dollar Blueprint account.
                        </p>
                        <p style="margin: 0 0 30px 0; color: #f1f5f9; font-size: 17px; line-height: 1.7;">
                          Click the button below to create a new password:
                        </p>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="${resetUrl}" style="display: inline-block; padding: 18px 48px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 20px 0; color: #e2e8f0; font-size: 15px; line-height: 1.6;">
                          Or copy and paste this link into your browser:
                        </p>
                        <p style="margin: 0 0 30px 0; padding: 16px; background-color: #1e293b; border-radius: 8px; color: #22d3ee; font-size: 15px; word-break: break-all; border: 1px solid #0891b2;">
                          ${resetUrl}
                        </p>
                        
                        <p style="margin: 0 0 10px 0; color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                          This link will expire in <strong style="color: #fbbf24;">1 hour</strong> for security reasons.
                        </p>
                        <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                          If you didn't request this password reset, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="color: #cbd5e1;">The Million Dollar Blueprint Team</strong>
                        </p>
                        <p style="margin: 20px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
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
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || "Million Dollar Blueprint"} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
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
                        <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="color: #cbd5e1;">The Million Dollar Blueprint Team</strong>
                        </p>
                        <p style="margin: 20px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
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



export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || "Million Dollar Blueprint"} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to Your Transformation Journey! 🚀",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Million Dollar Blueprint</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header with Logo -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(to right, #06b6d4, #3b82f6);">
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
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          Congratulations on taking the first step towards transforming your sales career! You've just joined an elite community of sales professionals committed to excellence.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- What's Next Section -->
                    <tr>
                      <td style="padding: 0 40px 20px 40px;">
                        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 12px; padding: 25px; border: 1px solid #334155;">
                          <h3 style="margin: 0 0 15px 0; color: #06b6d4; font-size: 20px; font-weight: 600;">
                            🚀 What's Next?
                          </h3>
                          <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 15px; line-height: 1.8;">
                            <li style="margin-bottom: 10px;">Access your personalized dashboard</li>
                            <li style="margin-bottom: 10px;">Explore our comprehensive course library</li>
                            <li style="margin-bottom: 10px;">Start with our flagship MEDDPICC framework</li>
                            <li>Join our community of top performers</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="https://www.milliondollarblueprint.ai/dashboard" style="display: inline-block; padding: 18px 45px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 17px; box-shadow: 0 4px 6px rgba(6, 182, 212, 0.3);">
                                Get Started Now →
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Features Grid -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <h3 style="margin: 0 0 20px 0; color: #ffffff; font-size: 20px; font-weight: 600; text-align: center;">
                          What You'll Master
                        </h3>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="50%" style="padding: 15px; vertical-align: top;">
                              <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; height: 100%; border-left: 3px solid #06b6d4;">
                                <div style="font-size: 24px; margin-bottom: 10px;">📊</div>
                                <h4 style="margin: 0 0 8px 0; color: #06b6d4; font-size: 16px; font-weight: 600;">MEDDPICC</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                                  Master the world's most effective enterprise sales methodology
                                </p>
                              </div>
                            </td>
                            <td width="50%" style="padding: 15px; vertical-align: top;">
                              <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; height: 100%; border-left: 3px solid #3b82f6;">
                                <div style="font-size: 24px; margin-bottom: 10px;">🎯</div>
                                <h4 style="margin: 0 0 8px 0; color: #3b82f6; font-size: 16px; font-weight: 600;">SPIN Selling</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                                  Learn the art of asking powerful questions that close deals
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="50%" style="padding: 15px; vertical-align: top;">
                              <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; height: 100%; border-left: 3px solid #8b5cf6;">
                                <div style="font-size: 24px; margin-bottom: 10px;">💡</div>
                                <h4 style="margin: 0 0 8px 0; color: #8b5cf6; font-size: 16px; font-weight: 600;">Challenger Sale</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                                  Challenge customer thinking and create unique value
                                </p>
                              </div>
                            </td>
                            <td width="50%" style="padding: 15px; vertical-align: top;">
                              <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; height: 100%; border-left: 3px solid #10b981;">
                                <div style="font-size: 24px; margin-bottom: 10px;">🏆</div>
                                <h4 style="margin: 0 0 8px 0; color: #10b981; font-size: 16px; font-weight: 600;">Value Selling</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                                  Demonstrate ROI and quantify business impact
                                </p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Support Section -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border: 1px solid #334155;">
                          <h4 style="margin: 0 0 10px 0; color: #06b6d4; font-size: 16px; font-weight: 600;">
                            💬 Need Help?
                          </h4>
                          <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                            Our team is here to support your journey. If you have any questions, don't hesitate to reach out to us at 
                            <a href="mailto:hello@milliondollarblueprint.ai" style="color: #06b6d4; text-decoration: none;">hello@milliondollarblueprint.ai</a>
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 15px 0; color: #cbd5e1; font-size: 15px; line-height: 1.6; text-align: center;">
                          Ready to transform your sales career?<br>
                          <strong style="color: #06b6d4;">Let's make it happen together! 🚀</strong>
                        </p>
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.6; text-align: center;">
                          Best regards,<br>
                          <strong style="color: #94a3b8;">The Million Dollar Blueprint Team</strong>
                        </p>
                        <p style="margin: 15px 0 0 0; color: #64748b; font-size: 12px; line-height: 1.6; text-align: center;">
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
    console.error("Failed to send welcome email:", error)
    return { success: false, error }
  }
}




export async function sendAdminNewSignupNotification(adminEmail: string, studentName: string, studentEmail: string) {
  try {
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || "Million Dollar Blueprint"} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Student Signup: ${studentName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Signup Notification</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(to bottom right, #8b5cf6, #6366f1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          <span style="color: white; font-size: 40px;">👤</span>
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          New Student Signup! 🎉
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <div style="margin: 0 0 30px 0; padding: 24px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155;">
                          <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                            Student Details
                          </h3>
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Name:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 600;">${studentName}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email:</td>
                              <td style="padding: 8px 0; color: #06b6d4; font-size: 14px; text-align: right;">${studentEmail}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Signup Time:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${new Date().toLocaleString()}</td>
                            </tr>
                          </table>
                        </div>
                        
                        <p style="margin: 0 0 30px 0; color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                          A new student has created an account on Million Dollar Blueprint. They're ready to start their transformation journey!
                        </p>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://www.milliondollarblueprint.ai/admin/dashboard" style="display: inline-block; padding: 16px 40px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                View Dashboard
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          © ${new Date().getFullYear()} Million Dollar Blueprint Admin Notifications
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
    console.error("Failed to send admin signup notification:", error)
    return { success: false, error }
  }
}

