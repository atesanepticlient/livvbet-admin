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
    const {
      walletNumber,
      walletName,
      minDeposit,
      maxDeposit,
      rules,
      isRecommended,
      isActive,
      trxType,
    } = await req.json();

    const payload: Prisma.DepositEWalletUpdateInput = {
      isRecommended: !!isRecommended,
      isActive: !!isActive,
    };

    if (walletNumber) {
      payload.walletNumber = walletNumber;
    }

    if (walletName) {
      payload.walletName = walletName;
    }

    if (minDeposit) {
      payload.minDeposit = minDeposit;
    }

    if (maxDeposit) {
      payload.maxDeposit = maxDeposit;
    }

    if (rules) {
      payload.rules = rules;
    }

    if (trxType) {
      payload.trxType = trxType;
    }

    await db.depositEWallet.update({
      where: {
        id,
      },
      data: payload,
    });

    return Response.json({ message: "Wallet Updated" }, { status: 200 });
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

    await db.depositEWallet.delete({ where: { id } });

    return Response.json({ message: "Wallet Deleted" }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
