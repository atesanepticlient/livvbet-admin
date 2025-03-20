"use client";
import { Prisma } from "@prisma/client";
import React, { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

const AgentsTable = ({
  agents,
}: {
  agents: Prisma.agentGetPayload<object>[];
}) => {
  return (
    <div>
      
        <Table>
          <TableCaption>A list of agents.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{agent.email}</TableCell>
                <TableCell>{agent.phone}</TableCell>
                <TableCell className="text-right">
                  <AgentAction id={agent.id}>
                    <Ellipsis className="w-5 h-5 text-white" />
                  </AgentAction>
                </TableCell>
              </TableRow>
            ))}

            {agents.length == 0 && (
              <TableRow>
                <TableCell className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
     
    </div>
  );
};

const AgentAction = ({ children, id }: { children: ReactNode; id: string }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(`/agents/${id}`)}>
          View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AgentsTable;
