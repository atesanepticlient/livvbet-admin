import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const eWallets = await db.eWallet.findMany({
      where: {},
      include: { admin: true },
    });

    return Response.json(
      {
        payload: { methods: { methodData: eWallets, methodName: "E-Wallet" } },
      },
      { status: 200 }
    );
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
