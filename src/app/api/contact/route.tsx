import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { ContactUpdateInput } from "@/types/api";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    let contact = await db.contact.findFirst({ where: {} });
    
    if (!contact) {
      contact = await db.contact.create({ data: {} });
    }

    return Response.json({ payload: contact }, { status: 200 });
  } catch  {
    
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as ContactUpdateInput;

    const contact = await db.contact.findFirst({ where: {} });

    await db.contact.update({ where: { id: contact!.id }, data: data });

    return Response.json({ message: "Contact Updated" }, { status: 200 });
  } catch {

    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
