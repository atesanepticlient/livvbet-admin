import { INTERNAL_SERVER_ERROR } from "@/error";
import { createMessage } from "@/helpers/message";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const change = new URL(req.url).searchParams.get("change") as
      | "accept"
      | "reject";
    if (change !== "accept" && change !== "reject") {
      return Response.json({ message: "Invalid Route" });
    }
    const updateData: Prisma.WithdrawUpdateInput = {};
    const historyUpdate: Prisma.PaymentHistoryUpdateInput = {};
    if (change == "accept") {
      updateData.status = "ACCEPTED";
      historyUpdate.status = "SUCCESS";
    } else if (change == "reject") {
      updateData.status = "REJECTED";
      historyUpdate.status = "FAILED";
    }
    const updatedWithdraw = await db.withdraw.update({
      where: {
        id,
      },
      data: { ...updateData, transactions: { update: historyUpdate } },
    });

    if (change == "accept") {
      await createMessage({
        title: "Deposit",
        description: `Amount withdraw ${updatedWithdraw.amount}`,
        userId: updatedWithdraw.userId,
      });
    }

    return Response.json({ message: "Withdraw Updated" });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    await db.withdraw.delete({ where: { id } });
    return Response.json({ message: "Deposit Deleted" }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
