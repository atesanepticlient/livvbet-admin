// import { findAdmin } from "@/data/admin";
// import { INTERNAL_SERVER_ERROR } from "@/error";
// import { db } from "@/lib/db";
// import { PromoUpdateInput } from "@/types/api";
// import { NextRequest } from "next/server";

// export const PUT = async (req: NextRequest) => {
//   try {
//     const { promo } = (await req.json()) as PromoUpdateInput;

//     const admin = await findAdmin();

//     await db.admin.update({ where: { id: admin!.id }, data: { promo } });

//     return Response.json({ message: "Promo Updated" }, { status: 200 });
//   } catch {
//     return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
//   }
// };

export const GET = () => {
  return Response.json({ message: "GET" });
};
