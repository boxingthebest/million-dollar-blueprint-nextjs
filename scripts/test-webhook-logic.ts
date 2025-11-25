import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testWebhookLogic() {
  try {
    const customerEmail = "davidk444@gmail.com"
    const productKey = "sales-mastery"
    
    console.log("\n🔍 Testing webhook logic...")
    console.log(`Email: ${customerEmail}`)
    console.log(`Product Key: ${productKey}`)
    
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: customerEmail },
    })
    
    if (!user) {
      console.log("\n❌ User does NOT exist - webhook should create it")
      
      // This is what the webhook should do
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name: customerEmail.split("@")[0],
        },
      })
      console.log("✅ User created:", user.id)
    } else {
      console.log("\n✅ User already exists:", user.id)
    }
    
    // Map product key to course slugs
    const productToCourses: Record<string, string[]> = {
      "sales-mastery": ["sales"],
    }
    
    const courseSlugs = productToCourses[productKey]
    
    if (!courseSlugs) {
      console.log(`\n❌ Unknown product key: ${productKey}`)
      return
    }
    
    console.log(`\n📚 Course slugs for ${productKey}:`, courseSlugs)
    
    // Try to find and enroll in courses
    for (const courseSlug of courseSlugs) {
      const course = await prisma.course.findUnique({
        where: { slug: courseSlug },
      })
      
      if (!course) {
        console.log(`❌ Course not found: ${courseSlug}`)
        continue
      }
      
      console.log(`✅ Course found: ${course.title} (${course.slug})`)
      
      // Check if already enrolled
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
      })
      
      if (existingEnrollment) {
        console.log(`   ℹ️  Already enrolled`)
      } else {
        await prisma.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
          },
        })
        console.log(`   ✅ Enrolled user in ${course.title}`)
      }
    }
    
    console.log("\n✅ Webhook logic test completed successfully!")
    
  } catch (error) {
    console.error('\n❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testWebhookLogic()

