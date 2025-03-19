"use client";
import React from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";

import moment from "moment";
import { Prisma } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const AgentInfo = ({
  data,
}: {
  data: Prisma.agentGetPayload<{ include: { agent: true } }>;
}) => {
  console.log();
  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <Image
            className="w-[65%] h-auto mx-auto"
            width={230}
            height={200}
            src={data.documents}
            alt={data.fullName}
          />
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-1">
            <li className="flex items-center gap-2">
              <span className="w-[100px] text-sm  font-semibold">
                Full Name
              </span>
              <span className="text-muted-foreground text-sm  font-medium">
                {data.fullName}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[100px] text-sm font-semibold">Email</span>
              <span className="text-muted-foreground text-sm font-medium">
                {data.email}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[100px] text-sm font-semibold">Phone</span>
              <span className="text-muted-foreground text-sm font-medium">
                {data.phone}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[100px] text-sm font-semibold">Join</span>
              <span className="text-muted-foreground text-sm font-medium">
                {moment(data.createdAt).format("MMM Do YY")}
              </span>
            </li>
          </ul>

          {data.isVerified ? (
            <Badge className="block w-full mt-4 bg-blue-500 text-white text-center py-2">
              Active User
            </Badge>
          ) : (
            <Badge className="block w-full mt-4 bg-amber-200  text-center py-2">
              Conrimation Required
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentInfo;
