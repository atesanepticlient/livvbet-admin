import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const route = new URL(req.url);

    const search = route.searchParams.get("search") || "";
    const userType = route.searchParams.get("userType") || "all";

    const query: Prisma.UsersWhereInput = {};

    if (search) {
      query.email = { contains: search };
    }

    if (userType && userType !== "all") {
      query.refererType = userType;
    }

    const users = await db.users.findMany({
      where: query,
    });

    const totalUserCount = await db.users.count({ where: {} });
    const totalActiveUserCount = await db.users.count({
      where: { isBanned: false },
    });
    const totalBannedUserCount = await db.users.count({
      where: { isBanned: true },
    });

    return Response.json({
      payload: {
        users,
        totalUserCount,
        totalActiveUserCount,
        totalBannedUserCount,
      },
    });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
