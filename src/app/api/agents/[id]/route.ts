// app/api/agent/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: agentId } = await params;

    // Get site configuration for earnings percentages
    const site = await db.site.findFirst({
      select: {
        agentDepositEarning: true,
        agentWithdrawEarning: true,
      },
    });

    // Get agent basic info
    const agent = await db.agent.findUnique({
      where: { id: agentId, isVerified: true },
      include: {
        agent: true,
        withdrawAddress: true,
      },
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Get aggregated data
    const [
      totalUsers,
      totalDeposits,
      totalWithdraws,
      depositRecords,
      withdrawRecords,
      earningRequests,
    ] = await Promise.all([
      db.users.count({ where: { agentId } }),
      db.agentDepositRecord.aggregate({
        where: { agentId },
        _sum: { amount: true },
      }),
      db.agentWithdrawRecord.aggregate({
        where: { agentId },
        _sum: { amount: true },
      }),
      db.agentDepositRecord.findMany({
        where: { agentId },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      db.agentWithdrawRecord.findMany({
        where: { agentId },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      db.agentEarningWithdrawReq.findMany({
        where: { agentId },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Calculate earnings
    const depositEarnings = depositRecords.reduce(
      (sum, record) =>
        sum + Number(record.amount) * (Number(site?.agentDepositEarning) / 100),
      0
    );
    const withdrawEarnings = withdrawRecords.reduce(
      (sum, record) =>
        sum +
        Number(record.amount) * (Number(site?.agentWithdrawEarning) / 100),
      0
    );
    const totalEarnings = depositEarnings + withdrawEarnings;

    // Prepare chart data
    const earningsByDate: Record<
      string,
      { deposits: number; withdraws: number }
    > = {};

    [...depositRecords, ...withdrawRecords].forEach((record) => {
      const date = record.createdAt.toISOString().split("T")[0];
      if (!earningsByDate[date]) {
        earningsByDate[date] = { deposits: 0, withdraws: 0 };
      }

      if ("withdrawCode" in record) {
        earningsByDate[date].withdraws += Number(record.amount);
      } else {
        earningsByDate[date].deposits += Number(record.amount);
      }
    });

    const chartData = Object.entries(earningsByDate)
      .map(([date, amounts]) => ({
        date,
        deposits: amounts.deposits,
        withdraws: amounts.withdraws,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      agent,
      statistics: {
        totalUsers,
        totalDeposits: totalDeposits._sum.amount || 0,
        totalWithdraws: totalWithdraws._sum.amount || 0,
        totalEarnings,
        depositEarnings,
        withdrawEarnings,
      },
      recentActivity: {
        deposits: depositRecords,
        withdraws: withdrawRecords,
        earningRequests,
      },
      chartData,
    });
  } catch (error) {
    console.error("[AGENT_DETAILS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.agent.delete({
      where: { id: id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[AGENT_DELETE_ERROR]", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
