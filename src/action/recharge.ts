"use server";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { agentRechargeSchema, MultipleRecharge } from "@/schema";
import { Prisma } from "@prisma/client";
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
  } catch (error) {
    console.log("ERROR", error);
    return { error: INTERNAL_SERVER_ERROR };
  }
};

export const multipleUsersRecharge = async (data: MultipleRecharge) => {
  try {
    const { amount, users, message } = data;

    if (!amount || users.length == 0) {
      return { error: "Invalid input type" };
    }

    await db.wallet.updateMany({
      where: {
        id: {
          in: [...users],
        },
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    if (message) {
      const args: Prisma.MessageCreateManyArgs = { data: [] };

      const data = users.map((user) => ({ title: message, userId: user }));
      args.data = data;
      await db.message.createMany({
        ...args,
      });
    }

    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};
