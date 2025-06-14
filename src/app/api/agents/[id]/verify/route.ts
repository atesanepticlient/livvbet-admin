import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { action } = await request.json(); // 'approve' or 'reject'
    const { id } = await params;
    if (action === "approve") {
      const updatedAgent = await db.agent.update({
        where: { id: id },
        data: {
          isVerified: true,
          isActive: true,
        },
      });
      return NextResponse.json(updatedAgent);
    } else if (action === "reject") {
      await db.agent.delete({
        where: { id: id },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[AGENT_VERIFY_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
