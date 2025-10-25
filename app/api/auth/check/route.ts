import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const payload = await verifyToken(token.value);
    
    if (!payload) {
      return NextResponse.json({ isAuthenticated: false });
    }

    return NextResponse.json({ 
      isAuthenticated: true,
      userId: payload.userId 
    });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false });
  }
}

