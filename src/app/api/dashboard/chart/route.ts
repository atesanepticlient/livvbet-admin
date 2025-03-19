import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const currentDate = new Date();
    const last6MonthsData = [];

    for (let i = 0; i < 6; i++) {
      const monthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i + 1,
        1
      );

      // Get total deposit for the month
      const deposit =
        (
          await db.deposit.aggregate({
            where: {
              status: "ACCEPTED",
              createdAt: {
                gte: monthStart,
                lt: monthEnd,
              },
            },
            _sum: {
              amount: true,
            },
          })
        )._sum.amount || 0;

      // Get total withdraw for the month
      const withdraw =
        (
          await db.withdraw.aggregate({
            where: {
              status: "ACCEPTED",
              createdAt: {
                gte: monthStart,
                lt: monthEnd,
              },
            },
            _sum: {
              amount: true,
            },
          })
        )._sum.amount || 0;

      // Push the result
      last6MonthsData.unshift({
        month: monthStart.toLocaleString("en-US", { month: "long" }),
        withdraw,
        deposit,
      });
    }

    return Response.json({ payload: last6MonthsData }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
