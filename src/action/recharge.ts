"use server"
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { agentRechargeSchema } from "@/schema";
import zod from "zod";

export const makeRecharge = async (
  data: zod.infer<typeof agentRechargeSchema>,
  id: string
) => {
  try {
    const { amount } = data;

    const agent = await db.agent.findUnique({ where: { id } });

    if (!agent) {
      return { error: "Agent not found" };
    }

    await db.agent.update({
      where: { id },
      data: { agent: { update: { balance: amount } } },
    });

    return { success: true };
  } catch (error){
    console.log("ERROR", error)
    return { error: INTERNAL_SERVER_ERROR };
  }
};
