import Image from "next/image"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Navigation */}
      <nav className="bg-[#0f1729]/95 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:drop-shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <Image 
                src="/logo-main-desktop.png" 
                alt="Million Dollar Blueprint" 
                width={600} 
                height={274} 
                className="h-12 w-auto md:h-14 transition-all hover:scale-105" 
                style={{imageRendering: 'auto'}}
              />
            </Link>
            <Link 
              href="/#courses"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-orange-500/30 text-sm md:text-base"
            >
              All Courses
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
            <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12 space-y-8 text-slate-300">
              
              <div>
                <p className="text-sm text-slate-400 mb-8">Last Updated: October 21, 2025</p>
                <p className="leading-relaxed">
                  At Million Dollar Blueprint, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Personal Information</h3>
                <p className="leading-relaxed mb-4">
                  We collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Register for an account</li>
                  <li>Purchase a course</li>
                  <li>Sign up for our newsletter or free content</li>
                  <li>Contact us through our contact form</li>
                  <li>Fill out surveys or provide feedback</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  This information may include: name, email address, phone number, billing address, payment information, company name, job title, and any other information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
                <p className="leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process your transactions and send you related information</li>
                  <li>Send you course materials and updates</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Send you marketing and promotional communications (with your consent)</li>
                  <li>Improve and personalize your experience</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues and fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Share Your Information</h2>
                <p className="leading-relaxed mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (e.g., payment processors, email service providers, hosting providers)</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                  <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking Technologies</h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                <p className="leading-relaxed mb-4">
                  We use third-party services to help us operate our business, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Mailchimp:</strong> For email marketing and list management</li>
                  <li><strong>Payment Processors:</strong> For processing payments securely</li>
                  <li><strong>Analytics Services:</strong> To understand how users interact with our website</li>
                  <li><strong>Hosting Services:</strong> To host our website and store data</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  These third parties have their own privacy policies governing their use of your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                <p className="leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
                <p className="leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to object to or restrict processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                  <li>The right to opt-out of marketing communications</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  To exercise these rights, please contact us at support@milliondollarblueprint.ai
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to such transfers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
                <p className="leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <p className="mt-4 text-cyan-400">
                  Email: support@milliondollarblueprint.ai<br />
                  Website: <Link href="/contact" className="hover:text-cyan-300 underline">Contact Form</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

