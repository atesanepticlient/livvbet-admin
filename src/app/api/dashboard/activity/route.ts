import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const activities = await db.paymentHistory.findMany({
      where: { status: "SUCCESS" },
      select: { amount: true, type: true, user: { select: { email: true,wallet : {select : {currencyCode : true}} } } },
      take: 8,
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json({ payload: activities }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
