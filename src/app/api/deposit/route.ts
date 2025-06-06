// app/api/agent/deposit/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findAdmin } from "@/data/admin";

export async function POST(req: Request) {
  try {
    const admin = await findAdmin();
    if (!admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { agentId, amount, currencyCode } = body;

    if (!agentId || !amount || !currencyCode) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Start transaction
    const result = await db.$transaction(async (db) => {
      // 1. Find the agent wallet
      const agentWallet = await db.agentWallet.findUnique({
        where: { agentId },
      });

      if (!agentWallet) {
        throw new Error("Agent wallet not found");
      }

      // 2. Update the wallet balance
      const updatedWallet = await db.agentWallet.update({
        where: { agentId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return { wallet: updatedWallet };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[AGENT_DEPOSIT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Helper function to search agents
export async function GET(req: Request) {
  try {
    const admin = await findAdmin();
    if (!admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    const agents = await db.agent.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query } },
          { fullName: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        agent: {
          select: {
            balance: true,
            currencyCode: true,
          },
        },
      },
      take: 10,
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("[AGENT_SEARCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
