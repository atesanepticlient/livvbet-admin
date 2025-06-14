"use server";

import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const userDelete = async (userId: string) => {
  try {
    const user = await db.users.findUnique({ where: { id: userId } });

    if (!user) return { error: "User not found" };

    await db.$transaction([
      db.users.delete({
        where: { id: userId },
      }),
      db.wallet.delete({
        where: { userId: userId },
      }),
      db.bonusWallet.delete({
        where: { userId: userId },
      }),
      db.referral.delete({
        where: { userId: userId },
      }),
      db.message.deleteMany({
        where: { userId: userId },
      }),
    ]);

    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};
