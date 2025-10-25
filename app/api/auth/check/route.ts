import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ isAuthenticated: false });
    }

    return NextResponse.json({ 
      isAuthenticated: true,
      userId: session.user.id 
    });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false });
  }
}

