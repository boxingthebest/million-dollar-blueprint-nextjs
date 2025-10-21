"use client"

import { useState } from "react"
import Link from "next/link"

interface CertificateCardProps {
  courseId: string
  courseTitle: string
  courseSlug: string
  isCompleted: boolean
  existingCertificate?: {
    certificateId: string
    verificationUrl: string | null
    completionDate: Date
  }
}

export default function CertificateCard({
  courseId,
  courseTitle,
  courseSlug,
  isCompleted,
  existingCertificate,
}: CertificateCardProps) {
  const [certificate, setCertificate] = useState(existingCertificate)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const handleGenerateCertificate = async () => {
    setIsGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      const data = await response.json()
      setCertificate(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate certificate")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShareLinkedIn = () => {
    if (!certificate) return

    const linkedInUrl = new URL("https://www.linkedin.com/profile/add")
    linkedInUrl.searchParams.append("startTask", "CERTIFICATION_NAME")
    linkedInUrl.searchParams.append("name", courseTitle)
    linkedInUrl.searchParams.append("organizationName", "Million Dollar Blueprint")
    linkedInUrl.searchParams.append(
      "issueYear",
      new Date(certificate.completionDate).getFullYear().toString()
    )
    linkedInUrl.searchParams.append(
      "issueMonth",
      (new Date(certificate.completionDate).getMonth() + 1).toString()
    )
    linkedInUrl.searchParams.append("certUrl", certificate.verificationUrl || "")
    linkedInUrl.searchParams.append("certId", certificate.certificateId)

    window.open(linkedInUrl.toString(), "_blank")
  }

  if (!isCompleted) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              Certificate Locked
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Complete all lessons in this course to unlock your certificate
            </p>
            <Link
              href={`/learn/${courseSlug}`}
              className="inline-block text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              Continue Learning →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="bg-slate-900/50 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-green-500"
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
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              Course Completed! 🎉
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Congratulations! You've completed all lessons. Generate your certificate
              to share your achievement.
            </p>
            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}
            <button
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  Generate Certificate
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-cyan-900/20 border border-cyan-500/30 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-6 h-6 text-cyan-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            Certificate Earned
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            Completed on{" "}
            {new Date(certificate.completionDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/api/certificates/${certificate.certificateId}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
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
              Download PDF
            </a>
            <button
              onClick={handleShareLinkedIn}
              className="inline-flex items-center gap-2 bg-[#0077B5] hover:bg-[#006399] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Share on LinkedIn
            </button>
            <Link
              href={`/verify/${certificate.certificateId}`}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
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
              Verify
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

