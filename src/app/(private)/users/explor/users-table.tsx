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

const UsersTable = ({ users }: { users: Prisma.UsersGetPayload<object>[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Control</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <span
                  className={` p-1 rounded-full ${
                    user.refererType == "ad_ctrl"
                      ? "bg-blue-700/15 text-blue-700"
                      : "bg-indigo-700/15 text-indigo-700"
                  }`}
                >
                  {user.refererType == "ad_ctrl" ? "Admin" : "Agent"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <AgentAction id={user.id}>
                  <Ellipsis className="w-5 h-5 text-white" />
                </AgentAction>
              </TableCell>
            </TableRow>
          ))}

          {users.length == 0 && (
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

export default UsersTable;
