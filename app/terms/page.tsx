import Image from "next/image"
import Link from "next/link"

export default function TermsOfService() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
            <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12 space-y-8 text-slate-300">
              
              <div>
                <p className="text-sm text-slate-400 mb-8">Last Updated: October 21, 2025</p>
                <p className="leading-relaxed">
                  Welcome to Million Dollar Blueprint. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using Million Dollar Blueprint's website, courses, and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Use of Services</h2>
                <p className="leading-relaxed mb-4">
                  Our services are intended for personal, non-commercial use. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information when creating an account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not share your account access with others</li>
                  <li>Not reproduce, distribute, or create derivative works from our content without permission</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Course Access and Content</h2>
                <p className="leading-relaxed">
                  When you purchase a course, you receive a non-exclusive, non-transferable license to access the course content for personal use. All course materials, including videos, documents, and resources, are protected by copyright and intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Payment and Billing</h2>
                <p className="leading-relaxed">
                  All prices are in USD. Payment is required at the time of purchase. We accept major credit cards and other payment methods as indicated on our website. All sales are final unless otherwise stated in our Refund Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Refund Policy</h2>
                <p className="leading-relaxed">
                  We offer a 30-day money-back guarantee on all course purchases. For full details, please refer to our <Link href="/refund-policy" className="text-cyan-400 hover:text-cyan-300 underline">Refund Policy</Link>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content, trademarks, logos, and intellectual property on Million Dollar Blueprint are owned by us or our licensors. You may not use, copy, reproduce, or distribute any content without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">7. User Conduct</h2>
                <p className="leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Upload or transmit viruses or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our services</li>
                  <li>Harass, abuse, or harm other users</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
                <p className="leading-relaxed">
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or completely secure. We make no warranties about the accuracy, reliability, or completeness of any content.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the maximum extent permitted by law, Million Dollar Blueprint shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                <p className="leading-relaxed">
                  You agree to indemnify and hold harmless Million Dollar Blueprint and its affiliates, officers, agents, and employees from any claim, demand, loss, or damages, including reasonable attorneys' fees, arising out of your use of our services or violation of these terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
                <p className="leading-relaxed">
                  We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
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

