import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const depositsWallets = await db.depositEWallet.findMany({
      where: {},
    });

    return Response.json(
      {
        payload: {
          methods: [{ methodData: depositsWallets, methodName: "E-Wallet" }],
        },
      },
      { status: 200 }
    );
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { walletImage, walletName, walletNumber } = await req.json();

    await db.depositEWallet.create({
      data: {
        walletImage,
        walletName,
        walletNumber,
        minDeposit: 100,
        maxDeposit: 1000,
      },
    });

    return Response.json({ message: "Wallet created" }, { status: 201 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
