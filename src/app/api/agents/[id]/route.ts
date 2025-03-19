import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const agent = await db.agent.findUnique({
      where: { id },
      include: { agent: true },
    });

    agent!.password = "";

    return Response.json({ payload: agent }, { status: 200 });
  } catch (error) {
    console.log("ERROR ", error)
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
