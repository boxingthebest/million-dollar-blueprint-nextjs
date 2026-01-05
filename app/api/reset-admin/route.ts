export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, secret } = await request.json()
    
    // Security check
    if (secret !== 'reset-admin-mdb-2026') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      // Update existing user to be admin with new password
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: 'admin',
          emailVerified: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        action: 'updated',
        message: `User ${email} updated to admin with new password`,
        userId: updatedUser.id,
        role: updatedUser.role
      })
    } else {
      // Create new admin user
      const newUser = await prisma.user.create({
        data: {
          email,
          name: 'Admin User',
          password: hashedPassword,
          role: 'admin',
          emailVerified: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        action: 'created',
        message: `New admin user ${email} created`,
        userId: newUser.id,
        role: newUser.role
      })
    }
  } catch (error: any) {
    console.error('Reset admin error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
