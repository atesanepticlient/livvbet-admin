import { INTERNAL_SERVER_ERROR } from "@/error";
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

    const { message } = await req.json();

    const updateData: Prisma.WithdrawUpdateInput = {};
    if (change == "accept") {
      updateData.status = "ACCEPTED";
    } else if (change == "reject") {
      updateData.status = "REJECTED";
    }
    const updatedWithdraw = await db.withdraw.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    if (message) {
      await db.message.create({
        data: {
          title: message,
          user: {
            connect: {
              id: updatedWithdraw.userId,
            },
          },
        },
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
