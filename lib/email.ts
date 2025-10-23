import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
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
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
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



export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
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
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(to bottom right, #06b6d4, #3b82f6); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          <span style="color: white; font-size: 40px;">🚀</span>
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; background: linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                          Welcome, ${name}!
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 18px;">
                          Your Transformation Journey Starts NOW
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          Congratulations on taking the first step toward building your million-dollar future! 🎉
                        </p>
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          You've joined thousands of ambitious individuals who are committed to mastering the skills that create real wealth and lasting success.
                        </p>
                        
                        <div style="margin: 30px 0; padding: 24px; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); border-radius: 12px;">
                          <h2 style="margin: 0 0 12px 0; color: #ffffff; font-size: 20px; font-weight: bold;">
                            💪 Your Breakthrough Awaits
                          </h2>
                          <p style="margin: 0; color: #e0f2fe; font-size: 15px; line-height: 1.6;">
                            Every lesson you complete brings you one step closer to the life you deserve. Don't wait—momentum is everything!
                          </p>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                          🎯 What's Next?
                        </h3>
                        <ul style="margin: 0 0 30px 0; padding: 0 0 0 20px; color: #cbd5e1; font-size: 15px; line-height: 1.8;">
                          <li style="margin-bottom: 10px;">Browse our transformational courses</li>
                          <li style="margin-bottom: 10px;">Set your learning goals in your dashboard</li>
                          <li style="margin-bottom: 10px;">Start your first lesson today</li>
                          <li>Join our community of high achievers</li>
                        </ul>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://www.milliondollarblueprint.ai/dashboard" style="display: inline-block; padding: 18px 48px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.4);">
                                Go to My Dashboard →
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <div style="margin: 30px 0; padding: 20px; background-color: #1e293b; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                          <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                            <strong style="color: #ffffff;">💡 Pro Tip:</strong> The most successful students commit to learning for just 30 minutes a day. Small, consistent actions lead to massive results!
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          To your success,<br>
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
    console.error("Failed to send welcome email:", error)
    return { success: false, error }
  }
}

export async function sendCoursePurchaseEmail(email: string, name: string, courseTitle: string, coursePrice: number) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
      to: email,
      subject: `🎉 Welcome to ${courseTitle}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Course Purchase Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(to bottom right, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          <span style="color: white; font-size: 40px;">✓</span>
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          Congratulations, ${name}! 🎉
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 16px;">
                          You've Just Invested in Your Future
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          Thank you for enrolling in <strong style="color: #06b6d4;">${courseTitle}</strong>! This is more than just a purchase—it's a commitment to your transformation.
                        </p>
                        
                        <!-- Course Details Box -->
                        <div style="margin: 30px 0; padding: 24px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155;">
                          <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                            📚 Course Details
                          </h3>
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Course:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 600;">${courseTitle}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Investment:</td>
                              <td style="padding: 8px 0; color: #10b981; font-size: 14px; text-align: right; font-weight: 700;">$${coursePrice}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Access:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 600;">Lifetime</td>
                            </tr>
                          </table>
                        </div>
                        
                        <div style="margin: 30px 0; padding: 24px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); border-radius: 12px;">
                          <h2 style="margin: 0 0 12px 0; color: #ffffff; font-size: 20px; font-weight: bold;">
                            🔥 Time to Take Action!
                          </h2>
                          <p style="margin: 0; color: #e0e7ff; font-size: 15px; line-height: 1.6;">
                            Your course is ready. Don't let this investment sit idle—start your first lesson TODAY and build the momentum that leads to breakthrough results!
                          </p>
                        </div>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://www.milliondollarblueprint.ai/dashboard" style="display: inline-block; padding: 18px 48px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.4);">
                                Start Learning Now →
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 0 0; color: #94a3b8; font-size: 14px; line-height: 1.6; text-align: center;">
                          Need help? Reply to this email and we'll get back to you within 24 hours.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          To your success,<br>
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
    console.error("Failed to send course purchase email:", error)
    return { success: false, error }
  }
}

export async function sendCourseCompletionEmail(email: string, name: string, courseTitle: string) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
      to: email,
      subject: `🏆 You Did It! ${courseTitle} Complete!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Course Completion</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <div style="width: 100px; height: 100px; margin: 0 auto 20px; background: linear-gradient(to bottom right, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);">
                          <span style="color: white; font-size: 50px;">🏆</span>
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; background: linear-gradient(to right, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                          CONGRATULATIONS, ${name}!
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 18px;">
                          You've Completed ${courseTitle}!
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          This is HUGE! 🎉 You've just proven that you have what it takes to commit, learn, and grow.
                        </p>
                        <p style="margin: 0 0 30px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                          Most people never finish what they start. But you're not most people. You're a finisher. A doer. A champion.
                        </p>
                        
                        <div style="margin: 30px 0; padding: 32px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; text-align: center;">
                          <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                            💪 Your Transformation is Underway
                          </p>
                          <p style="margin: 0; color: #fef3c7; font-size: 16px; line-height: 1.6;">
                            The knowledge you've gained is just the beginning. Now it's time to APPLY what you've learned and watch your life transform!
                          </p>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                          🚀 What's Next?
                        </h3>
                        <ul style="margin: 0 0 30px 0; padding: 0 0 0 20px; color: #cbd5e1; font-size: 15px; line-height: 1.8;">
                          <li style="margin-bottom: 10px;">Apply what you've learned immediately</li>
                          <li style="margin-bottom: 10px;">Share your wins with the community</li>
                          <li style="margin-bottom: 10px;">Continue your journey with another course</li>
                          <li>Teach others what you've mastered</li>
                        </ul>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://www.milliondollarblueprint.ai/dashboard" style="display: inline-block; padding: 18px 48px; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.4);">
                                Continue Your Journey →
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <div style="margin: 30px 0; padding: 20px; background-color: #1e293b; border-radius: 8px; border-left: 4px solid #10b981;">
                          <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                            <strong style="color: #ffffff;">🌟 Remember:</strong> Knowledge without action is just entertainment. Take what you've learned and make it REAL in your life!
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; border-top: 1px solid #334155;">
                        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                          Proud of you,<br>
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
    console.error("Failed to send course completion email:", error)
    return { success: false, error }
  }
}

export async function sendAdminSaleNotification(adminEmail: string, studentName: string, studentEmail: string, courseTitle: string, amount: number) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
      to: adminEmail,
      subject: `💰 New Sale: $${amount} - ${courseTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Sale Notification</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(to bottom right, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                          <span style="color: white; font-size: 40px;">💰</span>
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          New Sale! 🎉
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #10b981; font-size: 24px; font-weight: bold;">
                          $${amount}
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <div style="margin: 0 0 30px 0; padding: 24px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155;">
                          <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                            Sale Details
                          </h3>
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Student:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 600;">${studentName}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email:</td>
                              <td style="padding: 8px 0; color: #06b6d4; font-size: 14px; text-align: right;">${studentEmail}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Course:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 600;">${courseTitle}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Amount:</td>
                              <td style="padding: 8px 0; color: #10b981; font-size: 14px; text-align: right; font-weight: 700;">$${amount}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Time:</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${new Date().toLocaleString()}</td>
                            </tr>
                          </table>
                        </div>
                        
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
    console.error("Failed to send admin sale notification:", error)
    return { success: false, error }
  }
}


export async function sendAdminNewSignupNotification(adminEmail: string, studentName: string, studentEmail: string) {
  try {
    await resend.emails.send({
      from: "Million Dollar Blueprint <hello@milliondollarblueprint.ai>",
      to: adminEmail,
      subject: `🎉 New Signup: ${studentName}`,
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

