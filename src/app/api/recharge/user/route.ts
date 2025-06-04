import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { id, amount } = await req.json();

    await db.wallet.update({
      where: {
        userId: id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
