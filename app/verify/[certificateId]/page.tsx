import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default async function VerifyCertificatePage({
  params,
}: {
  params: { certificateId: string }
}) {
  const certificate = await prisma.certificate.findUnique({
    where: { certificateId: params.certificateId },
    include: {
      user: true,
      course: true,
    },
  })

  if (!certificate) {
    notFound()
  }

  const completionDate = new Date(certificate.completionDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Image
              src="/logo-main-desktop.png"
              alt="Million Dollar Blueprint"
              width={200}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900/50 border-2 border-green-500/50 rounded-lg p-8 md:p-12">
          {/* Verification Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Certificate Verified
          </h1>
          <p className="text-slate-400 text-center mb-8">
            This is an authentic certificate issued by Million Dollar Blueprint
          </p>

          {/* Certificate Details */}
          <div className="space-y-6 bg-slate-950/50 rounded-lg p-6 mb-8">
            <div>
              <p className="text-sm text-slate-500 mb-1">Student Name</p>
              <p className="text-xl font-semibold text-white">
                {certificate.user.name || certificate.user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-1">Course Completed</p>
              <p className="text-xl font-semibold text-white">
                {certificate.course.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Completion Date</p>
                <p className="text-lg text-white">{completionDate}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-1">Certificate ID</p>
                <p className="text-lg text-white font-mono">
                  {certificate.certificateId}
                </p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center">
            <a
              href={`/api/certificates/${certificate.certificateId}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Certificate PDF
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-500 text-center mt-8">
            This certificate can be verified at any time using the certificate ID
            above
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

