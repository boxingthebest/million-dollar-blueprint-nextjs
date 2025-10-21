import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { jsPDF } from "jspdf"

export async function GET(
  request: Request,
  { params }: { params: { certificateId: string } }
) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { certificateId: params.certificateId },
      include: {
        user: true,
        course: true,
      },
    })

    if (!certificate) {
      return new NextResponse("Certificate not found", { status: 404 })
    }

    // Create PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    // Set background color
    doc.setFillColor(15, 23, 42) // slate-900
    doc.rect(0, 0, 297, 210, "F")

    // Add border
    doc.setDrawColor(34, 211, 238) // cyan-500
    doc.setLineWidth(2)
    doc.rect(10, 10, 277, 190)

    // Add inner border
    doc.setDrawColor(59, 130, 246) // blue-500
    doc.setLineWidth(1)
    doc.rect(15, 15, 267, 180)

    // Certificate Title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(40)
    doc.setFont("helvetica", "bold")
    doc.text("CERTIFICATE OF COMPLETION", 148.5, 50, { align: "center" })

    // Subtitle
    doc.setFontSize(16)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(203, 213, 225) // slate-300
    doc.text("This certifies that", 148.5, 70, { align: "center" })

    // Student Name
    doc.setFontSize(32)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(34, 211, 238) // cyan-500
    doc.text(certificate.user.name || certificate.user.email || "Student", 148.5, 90, {
      align: "center",
    })

    // Description
    doc.setFontSize(16)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(203, 213, 225) // slate-300
    doc.text("has successfully completed", 148.5, 105, { align: "center" })

    // Course Name
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    const courseName = certificate.course.title
    doc.text(courseName, 148.5, 125, { align: "center" })

    // Date
    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(148, 163, 184) // slate-400
    const completionDate = new Date(certificate.completionDate).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )
    doc.text(`Completed on ${completionDate}`, 148.5, 145, { align: "center" })

    // Signature line
    doc.setDrawColor(148, 163, 184) // slate-400
    doc.setLineWidth(0.5)
    doc.line(50, 170, 120, 170)

    doc.setFontSize(12)
    doc.setTextColor(148, 163, 184)
    doc.text("Authorized Signature", 85, 177, { align: "center" })

    // Certificate ID and Verification
    doc.setFontSize(10)
    doc.setTextColor(100, 116, 139) // slate-500
    doc.text(`Certificate ID: ${certificate.certificateId}`, 148.5, 190, {
      align: "center",
    })
    doc.text(
      `Verify at: ${certificate.verificationUrl}`,
      148.5, 196,
      { align: "center" }
    )

    // Logo/Branding
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(34, 211, 238) // cyan-500
    doc.text("MILLION DOLLAR BLUEPRINT", 148.5, 30, { align: "center" })

    // Generate PDF buffer
    const pdfBuffer = doc.output("arraybuffer")

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${certificate.certificateId}.pdf"`,
      },
    })
  } catch (error) {
    console.error("PDF_GENERATION_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

