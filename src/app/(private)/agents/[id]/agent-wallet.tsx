"use client";
import React from "react";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Prisma } from "@prisma/client";
import { currencyFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AgentRecharge from "@/components/agent-recharge";

const AgentWallet = ({
  data,
  agentVerified,
}: {
  agentVerified?: boolean;
  data: Prisma.agentWalletGetPayload<object>;
}) => {
  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Agent Wallet</CardTitle>
        </CardHeader>

        <CardContent>
          <h3 className="text-center text-lg md:text-5xl font-bold">
            {currencyFormatter(data.balance, data.currencyCode)}
          </h3>
          <div className="flex justify-center my-3">
            {agentVerified ? (
              <Badge className="bg-blue-500 mx-auto text-center text-white">
                Active
              </Badge>
            ) : (
              <Badge className="bg-destructive mx-auto text-center text-white">
                InActive
              </Badge>
            )}
          </div>
          <AgentRecharge id={data.agentId} isAgentVerified={agentVerified!}>
            <Button className="w-full mt-6">Recharge</Button>
          </AgentRecharge>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentWallet;
