import Image from "next/image"
import Link from "next/link"

export default function RefundPolicy() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Refund Policy</h1>
            <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12 space-y-8 text-slate-300">
              
              <div>
                <p className="text-sm text-slate-400 mb-8">Last Updated: October 21, 2025</p>
                <p className="leading-relaxed">
                  At Million Dollar Blueprint, we stand behind the quality of our courses. We want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions for requesting a refund.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h2>
                <p className="leading-relaxed">
                  We offer a 30-day money-back guarantee on all course purchases. If you are not satisfied with your course for any reason, you may request a full refund within 30 days of your purchase date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Eligibility for Refunds</h2>
                <p className="leading-relaxed mb-4">
                  To be eligible for a refund, you must meet the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your refund request must be submitted within 30 days of your purchase date</li>
                  <li>You must provide a valid reason for your refund request</li>
                  <li>You must not have completed more than 80% of the course content</li>
                  <li>You must not have downloaded all course materials</li>
                  <li>You must not have violated our Terms of Service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">How to Request a Refund</h2>
                <p className="leading-relaxed mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact our support team at support@milliondollarblueprint.ai</li>
                  <li>Include your order number and the email address used for purchase</li>
                  <li>Provide a brief explanation of why you're requesting a refund</li>
                  <li>Allow 2-3 business days for our team to review your request</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Refund Processing</h2>
                <p className="leading-relaxed">
                  Once your refund request is approved, we will process your refund within 5-7 business days. The refund will be issued to the original payment method used for the purchase. Please note that it may take additional time for your bank or credit card company to process and post the refund to your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Non-Refundable Items</h2>
                <p className="leading-relaxed mb-4">
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Courses purchased more than 30 days ago</li>
                  <li>Courses where more than 80% of content has been completed</li>
                  <li>Courses where all materials have been downloaded</li>
                  <li>Special promotional offers or bundles (unless otherwise stated)</li>
                  <li>Gift purchases (the recipient may request a refund within the 30-day period)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Free Content and Trials</h2>
                <p className="leading-relaxed">
                  Free courses, trial periods, and promotional content are provided as-is and are not eligible for refunds. However, if you upgrade from a free trial to a paid course, the 30-day money-back guarantee applies from the date of your paid purchase.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Subscription Services</h2>
                <p className="leading-relaxed">
                  If you have a subscription-based service, you may cancel your subscription at any time. Upon cancellation, you will continue to have access to the service until the end of your current billing period. We do not provide refunds or credits for partial months of service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Abuse of Refund Policy</h2>
                <p className="leading-relaxed">
                  We reserve the right to refuse refunds if we detect abuse of our refund policy, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Repeated refund requests from the same user</li>
                  <li>Requesting refunds after consuming the majority of course content</li>
                  <li>Evidence of content piracy or unauthorized sharing</li>
                  <li>Violation of our Terms of Service</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Users who abuse our refund policy may have their accounts suspended or terminated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Technical Issues</h2>
                <p className="leading-relaxed">
                  If you experience technical issues that prevent you from accessing or using your course, please contact our support team immediately. We will work with you to resolve the issue. If we are unable to resolve the technical problem, you may be eligible for a refund regardless of the 30-day time limit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Course Updates and Changes</h2>
                <p className="leading-relaxed">
                  We regularly update our courses to ensure content remains current and valuable. Course updates and improvements do not entitle you to a refund. However, if we make significant changes that fundamentally alter the course you purchased, we will notify you and offer options including a refund if requested within 14 days of the notification.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Chargebacks</h2>
                <p className="leading-relaxed">
                  If you initiate a chargeback with your credit card company or payment provider without first contacting us to resolve the issue, we reserve the right to dispute the chargeback and provide evidence of your purchase and usage. Initiating a chargeback may result in the immediate termination of your account and access to all courses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Refund Policy</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes your acceptance of the revised policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
                <p className="leading-relaxed">
                  If you have any questions about our Refund Policy or need assistance with a refund request, please contact us:
                </p>
                <p className="mt-4 text-cyan-400">
                  Email: support@milliondollarblueprint.ai<br />
                  Website: <Link href="/contact" className="hover:text-cyan-300 underline">Contact Form</Link>
                </p>
                <p className="mt-4 leading-relaxed">
                  Our support team is available Monday through Friday, 9 AM to 5 PM EST. We typically respond to refund requests within 2-3 business days.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

