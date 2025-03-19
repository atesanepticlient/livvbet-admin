import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { AgentsUpdateInput } from "@/types/api";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const agents = await db.agent.findMany({
      where: {
        isVerified: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json({ payload: agents }, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { updateType, users } = (await req.json()) as AgentsUpdateInput;

    if (updateType == "accept") {
      users.forEach(
        async (user) =>
          await db.agent.update({
            where: { id: user },
            data: { isVerified: true },
          })
      );
    } else if (updateType === "reject") {
      console.log("Rejected");
      users.forEach(
        async (user) => await db.agent.delete({ where: { id: user } })
      );
    }

    return Response.json({}, { status: 200 });
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
