import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const activeAgent = await db.agent.findMany({
      where: {
        isVerified: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const totalPendingAgentsCount = await db.agent.count({
      where: { isVerified: false },
    });

    return Response.json({
      payload: {
        totalActiveAgentsCount: activeAgent.length,
        totalPendingAgentsCount,
        agents: activeAgent,
      },
    });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
