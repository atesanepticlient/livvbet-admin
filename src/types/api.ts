import { Prisma } from "@prisma/client";

export interface AgentsUpdateInput {
  updateType: "accept" | "reject";
  users: string[];
}

export interface AgentsDataOutput {
  payload: {
    totalActiveAgentsCount: number;
    totalPendingAgentsCount: number;
    agents: Prisma.agentGetPayload<object>[];
  };
}

export interface UsersDataOutput {
  payload: {
    totalUserCount: number;
    totalActiveUserCount: number;
    totalBannedUserCount: number;
    users: Prisma.UsersGetPayload<object>[];
  };
}

interface PaymentsMethods {
  methodData: Prisma.eWalletGetPayload<{ include: { admin: true } }>[];
  methodName: string;
}

export interface PaymentDataOutput {
  payload: {
    methods: PaymentsMethods;
  };
}

export interface DepositsOutput {
  payload: Prisma.DepositGetPayload<{
    include: { user: { include: { wallet: true } } };
  }>[];
}

export interface WithdrawsOutput {
  payload: Prisma.WithdrawGetPayload<{
    include: { user: { include: { wallet: true } } };
  }>[];
}

export interface Chart {
  month: string;
  withdraw: number;
  deposit: number;
}
export interface ChartDataOutput {
  payload: Chart[];
}

export interface ActivityDataOutput {
  payload: Prisma.PaymentHistoryGetPayload<{
    select: {
      amount: true;
      type: true;
      user: {
        select: { email: true; wallet: { select: { currencyCode: true } } };
      };
    };
  }>[];
}

export interface StatisticsDataOutput {
  payload: {
    title: string;
    value: number;
    change: number;
    message: string;
  }[];
}
