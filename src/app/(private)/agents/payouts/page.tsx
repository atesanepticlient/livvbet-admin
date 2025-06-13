// app/dashboard/withdrawal-requests/page.tsx
"use client";

import { useState } from "react";
import {
  useGetAgentsPayoutRequestsQuery,
  useUpdateWithdrawalRequestStatusMutation,
} from "@/lib/features/agentApiSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function WithdrawalRequestsPage() {
  const [page, setPage] = useState(1);
  const limit = 10
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAgentsPayoutRequestsQuery(
    {
      page,
      limit,
      status: statusFilter,
    }
  );
  //   const [updateStatus] = useUpdateWithdrawalRequestStatusMutation();

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (data?.pagination && page < data.pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value === "ALL" ? undefined : value);
    setPage(1);
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateWithdrawalRequestStatusMutation();

  // Update the handleStatusUpdate function in your page component
  const handleStatusUpdate = async (status: "CLEARED" | "UNCLEARED") => {
    if (!selectedRequest) return;

    try {
      await updateStatus({
        id: selectedRequest.id,
        status,
      }).unwrap();

      // Show success toast/notification
      toast.success(
        `Request ${status === "CLEARED" ? "approved" : "rejected"} successfully`
      );

      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update request status");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Withdrawal Requests</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search by agent name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/4">
            <Select onValueChange={handleStatusFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CLEARED">Cleared</SelectItem>
                <SelectItem value="UNCLEARED">Uncleared</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Withdrawal Amount</TableHead>
                <TableHead>Deposit Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[50px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-red-500 py-4"
                  >
                    Failed to load withdrawal requests
                  </TableCell>
                </TableRow>
              ) : data?.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No withdrawal requests found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((request: any) => (
                  <TableRow key={request.id}>
                    <TableCell>BDT {request.amount.toString()}</TableCell>
                    <TableCell>BDT {request.wdAmount.toString()}</TableCell>
                    <TableCell>BDT {request.dpAmount.toString()}</TableCell>
                    <TableCell>
                      <Badge>{request.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(request)}
                          >
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {data ? (
              <>
                Showing{" "}
                <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(page * limit, data.pagination.total)}
                </span>{" "}
                of <span className="font-medium">{data.pagination.total}</span>{" "}
                requests
              </>
            ) : (
              <Skeleton className="h-4 w-[200px]" />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={
                !data || page >= data.pagination.totalPages || isLoading
              }
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Withdrawal Request Details</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Agent Name</p>
                  <p className="font-medium">
                    {selectedRequest.agent.fullName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Agent Email</p>
                  <p className="font-medium">
                    {selectedRequest.agent.email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Request ID</p>
                  <p className="font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Date</p>
                  <p className="font-medium">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">
                    BDT {selectedRequest.amount.toString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Withdrawal Amount
                  </p>
                  <p className="font-medium">
                    BDT {selectedRequest.wdAmount.toString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Deposit Amount
                  </p>
                  <p className="font-medium">
                    BDT {selectedRequest.dpAmount.toString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge>{selectedRequest.status}</Badge>
              </div>

              {selectedRequest.status === "PENDING" && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusUpdate("UNCLEARED")}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Processing..." : "Reject"}
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate("CLEARED")}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Processing..." : "Approve"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
