/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Minus, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateVerifiedAgentsMutation } from "@/lib/features/agentApiSlice";
import ClipLoader from "react-spinners/esm/ClipLoader";
import { useRouter } from "next/navigation";

export type Payment = {
  id: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [updateAgent, { isLoading }] = useUpdateVerifiedAgentsMutation();
      const router = useRouter();
      const handleUpdate = async (type: "reject" | "accept") => {
        await updateAgent({ updateType: type, users: [user.id] });
      };

      return (
        <>
          {isLoading && (
            <div className="fixed w-full h-screen top-0 left-0 bg-black/25 flex justify-center items-center">
              <ClipLoader size={25} color="#fff" />
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/agents/${user.id}`)}
              >
                View Request
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdate("accept")}>
                <Plus className="text-white" />
                Accept Request
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdate("reject")}>
                <Minus className="text-white" />
                Reject Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
];
