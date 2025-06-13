import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status") || undefined;

  const skip = (page - 1) * limit;
  try {
    const where: any = status ? { status } : {};

    const [requests, total] = await Promise.all([
      db.agentEarningWithdrawReq.findMany({
        skip,
        take: limit,
        where,
        include: {
          agent: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.agentEarningWithdrawReq.count({ where }),
    ]);

    return Response.json({
      data: requests,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch withdrawal requests" },
      { status: 500 }
    );
  }
}

