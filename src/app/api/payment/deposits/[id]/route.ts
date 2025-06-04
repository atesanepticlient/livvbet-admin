import { INTERNAL_SERVER_ERROR } from "@/error";
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
    console.log({ change });
    if (change !== "accept" && change !== "reject") {
      return Response.json({ message: "Invalid Route" }, { status: 400 });
    }

    const { message } = await req.json();

    const updateData: Prisma.DepositUpdateInput = {};

    if (change == "accept") {
      updateData.status = "ACCEPTED";
    } else if (change == "reject") {
      updateData.status = "REJECTED";
    }

    const updatedDeposit = await db.deposit.update({
      where: {
        id,
      },
      data: { ...updateData },
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
    }

    if (message) {
      await db.message.create({
        data: {
          title: message,
          user: {
            connect: {
              id: updatedDeposit.userId,
            },
          },
        },
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
