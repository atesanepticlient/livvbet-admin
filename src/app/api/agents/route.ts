// app/api/agent/list/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const isActive = searchParams.get("isActive");

    const whereClause : any = {
      isVerified: true, // Only fetch verified agents
      ...(search && {
        OR: [
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
          { id: { contains: search } },
        ],
      }),
      ...(isActive && { isActive: isActive === "true" }),
    };

    const agents = await db.agent.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
        _count: {
          select: {
            users: true,
            depositRecords: true,
            withdrawRecords: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("[AGENT_LIST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
