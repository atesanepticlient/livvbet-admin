import { findAdmin } from "@/data/admin";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const admin = await findAdmin();

    const withdraws = await db.withdraw.findMany({
      where: {
        user: {
          refererId: admin!.id,
        },
      },
      include: { user: { include: { wallet: true } } },
      orderBy: { createdAt: "asc" },
    });

    return Response.json({ payload: withdraws }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
