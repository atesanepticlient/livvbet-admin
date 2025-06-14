// components/agent/AgentDetails.tsx
"use client";

import { useFetchAgentQuery } from "@/lib/features/agentApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useBanAgentMutation,
  useDeleteAgentMutation,
} from "@/lib/features/agentApiSlice";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { INTERNAL_SERVER_ERROR } from "@/error";
import CookieLoader from "@/components/loader/cooki-loader";

export default function AgentDetails({ id }: { id: string }) {
  const { data, isLoading, isError, error } = useFetchAgentQuery({ id });
  console.log({ data });
  const [rechargeAmount, setRechargeAmount] = useState("");
  const router = useRouter();

  const [banAgent] = useBanAgentMutation();
  const [deleteAgent] = useDeleteAgentMutation();

  const handleBanAgent = async () => {
    const asyncAction = async () => {
      const res = await banAgent(id).unwrap();
      return true;
    };

    toast.promise(asyncAction(), {
      loading: "Requesting...",
      success: "Agent status updated successfully",
      error: (error) => {
        return `${error.data.error || INTERNAL_SERVER_ERROR}`;
      },
    });
  };

  const handleDeleteAgent = async () => {
    const confirm = window.confirm("Are you sure to delete the agent?");
    if (!confirm) return false;

    const asyncAction = async () => {
      const res = await deleteAgent(id).unwrap();
      return true;
    };

    toast.promise(asyncAction(), {
      loading: "Deleting...",
      success: "Agent deleted successfully",
      error: (error) => {
        return `${error.data.error || INTERNAL_SERVER_ERROR}`;
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <CookieLoader />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-500">Error loading agent details</div>;
  }

  if (isError) {
    if ((error as any)?.status === 404) {
      return <p>User not found.</p>;
    }

    return <p>An error occurred</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {data.agent.fullName}'s Dashboard
        </h1>
        <div className="flex gap-2">
          <Button
            variant={data.agent.isActive ? "destructive" : "default"}
            onClick={handleBanAgent}
          >
            {data.agent.isActive ? "Ban Agent" : "Activate Agent"}
          </Button>
          <Button variant="outline" onClick={handleDeleteAgent}>
            Delete Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.statistics.totalUsers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{data.statistics.totalDeposits}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Withdraws
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{data.statistics.totalWithdraws}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{data.statistics.totalEarnings}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Deposits</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentActivity.deposits.map((deposit: any) => (
                      <TableRow key={deposit.id}>
                        <TableCell>৳{Number(deposit.amount)}</TableCell>
                        <TableCell>
                          {format(new Date(deposit.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-medium mb-2">Withdraws</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentActivity.withdraws.map((withdraw: any) => (
                      <TableRow key={withdraw.id}>
                        <TableCell>৳{Number(withdraw.amount)}</TableCell>
                        <TableCell>{withdraw.withdrawCode}</TableCell>
                        <TableCell>
                          {format(new Date(withdraw.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(new Date(date), "MMM dd")}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`৳${value}`, "Amount"]}
                    labelFormatter={(date) => format(new Date(date), "PPP")}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="deposits"
                    stroke="#8884d8"
                    activeDot={{ r: 6 }}
                    name="Deposits"
                  />
                  <Line
                    type="monotone"
                    dataKey="withdraws"
                    stroke="#82ca9d"
                    activeDot={{ r: 6 }}
                    name="Withdraws"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Basic Info</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {data.agent.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {data.agent.phone}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      data.agent.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data.agent.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Joined:</span>{" "}
                  {format(new Date(data.agent.createdAt), "PPP")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Wallet</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Balance:</span>{" "}
                  {data.agent.agent ? `৳${+data.agent.agent.balance}` : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Currency:</span>{" "}
                  {data.agent.agent?.currencyCode || "N/A"}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Link href="/recharge/agents">
                    <Button>Recharge</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {data.agent.documents && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Documents</h3>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={data.agent.documents} target="_blank">
                    View Documents
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
