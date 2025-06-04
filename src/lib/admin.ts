import { auth } from "@/auth";
import { db } from "./db";

export const findAdmin = async () => await db.admin.findFirst({ where: {} });


export const findCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};
