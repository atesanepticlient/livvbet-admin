import { INTERNAL_SERVER_ERROR } from "@/error";
import { createMessage } from "@/helpers/message";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
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

    const updateData: Prisma.DepositUpdateInput = {};
    const historyUpdate: Prisma.PaymentHistoryUpdateInput = {};

    if (change == "accept") {
      updateData.status = "ACCEPTED";
      historyUpdate.status = "SUCCESS";
    } else if (change == "reject") {
      updateData.status = "REJECTED";
      historyUpdate.status = "FAILED";
    }

    const updatedDeposit = await db.deposit.update({
      where: {
        id,
      },
      data: { ...updateData, transactions: { update: historyUpdate } },
    });

    if (change == "accept") {
      await db.wallet.update({
        where: {
          userId: updatedDeposit.userId,
        },
        data: {
          balance: {
            increment: Decimal(updatedDeposit!.amount),
          },
        },
      });
      await createMessage({
        title: "Deposit",
        description: `Amount deposited ${updatedDeposit.amount}`,
        userId: updatedDeposit.userId,
      });
    }

    return Response.json({ message: "Deposit Updated" });
  } catch (error) {
    console.log({ error });
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    await db.deposit.delete({ where: { id } });
    return Response.json({ message: "Deposit Deleted" }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
