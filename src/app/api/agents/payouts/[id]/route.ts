import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { status } = await request.json();
  const { id } = await params;
  if (!["CLEARED", "UNCLEARED"].includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updatedRequest = await db.agentEarningWithdrawReq.update({
      where: { id: id },
      data: { status },
      include: {
        agent: true,
      },
    });

    return Response.json(updatedRequest);
  } catch {
    return Response.json(
      { error: "Failed to update withdrawal request" },
      { status: 500 }
    );
  }
}
