import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const pendingAgents = await db.agent.findMany({
      where: {
        isVerified: false,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        documents: true,
        createdAt: true,
        promo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pendingAgents);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
