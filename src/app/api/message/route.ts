import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { message, userId } = await req.json();

    await db.message.create({
      data: {
        title: message,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log({ error });
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
