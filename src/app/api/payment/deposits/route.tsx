import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { PaymentStatus, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const gateway = searchParams.get("gateway");
    const minAmount = searchParams.get("minAmount");
    const maxAmount = searchParams.get("maxAmount");
    const status = searchParams.get("status") as PaymentStatus & "ALL";
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const where: Prisma.DepositWhereInput = {};

    if (search) {
      where.OR = [
        {
          user: {
            phone: { contains: search, mode: "insensitive" },
          },
        },
      ];
    }

    if (from || to) {
      where.createdAt = {
        ...(from && { gte: new Date(from) }),
        ...(to && { lte: new Date(to) }),
      };
    }

    if (gateway) {
      where.ewallet!.walletName = gateway;
    }

    if (minAmount || maxAmount) {
      where.amount = {
        ...(minAmount && { gte: parseFloat(minAmount) }),
        ...(maxAmount && { lte: parseFloat(maxAmount) }),
      };
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    const deposits = await db.deposit.findMany({
      where,
      include: { user: { include: { wallet: true } }, ewallet: true },
      orderBy: { createdAt: "asc" },
      take: limit,
      skip: limit * (page - 1),
    });

    const totalFound = await db.deposit.count({
      where: {},
    });

    return Response.json(
      { payload: { deposits, totalFound } },
      { status: 200 }
    );
  } catch {
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
