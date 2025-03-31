/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useTransition } from "react";
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
  useDeleteWithdrawMutation,
  useFetchWithdrawsQuery,
  useUpdateWithdrawMutation,
} from "@/lib/features/paymentApiSlice";

import moment from "moment";
import { PaymentStatus, Prisma } from "@prisma/client";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { FetchQueryError } from "@/types/error";
import { INTERNAL_SERVER_ERROR } from "@/error";
import ClipLoader from "react-spinners/esm/ClipLoader";
import { FadeLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";

const WithdrawTable = () => {
  const { data, isLoading } = useFetchWithdrawsQuery();
  const payment = data?.payload;
  const [deleteApi, { isLoading: deleting }] = useDeleteWithdrawMutation();


  const handleDeleteWithdraw = (id: string) => {
    deleteApi({ id })
      .then((res) => {
        if (res) {
          toast.success(res.data?.message);
        }
      })
      .catch((error) => {
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error(error.message);
        }
      });
  };
  return (
    <div>
      {!isLoading && data && (
        <Table>
          <TableCaption>
            {payment!.length > 0
              ? "A list of your Withdraws"
              : "No withdraws found"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Wallet Number</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payment?.map((w, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {moment(w.createdAt).calendar()}
                </TableCell>
                <TableCell>{w.payTo}</TableCell>

                <TableCell>{w.methodName}</TableCell>
                <TableCell>
                  <PaymentStatusText status={w.status} />
                </TableCell>
                <TableCell>
                  {w.user.wallet?.currencyCode} {w.amount}
                </TableCell>
                <TableCell>
                  {w.status == "PENDING" && (
                    <WithdrawActionButton withdraw={w} />
                  )}
                </TableCell>
                <TableCell className="text-right ">
                  <Button
                    onClick={() => handleDeleteWithdraw(w.id)}
                    variant={"destructive"}
                  >
                    <MdDelete className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {(!data || isLoading) && (
        <FadeLoader color="#fff" className="w-8 h-8 mx-auto py-5"></FadeLoader>
      )}
    </div>
  );
};
const PaymentStatusText = ({ status }: { status: PaymentStatus }) => {
  return (
    <span
      className={`${
        status === "PENDING"
          ? "text-[FFC107]"
          : status === "ACCEPTED"
          ? "text-emerald-700"
          : "text-destructive"
      }`}
    >
      {status}
    </span>
  );
};

const WithdrawActionButton = ({
  withdraw,
}: {
  withdraw: Prisma.WithdrawGetPayload<{
    include: { user: { include: { wallet: true } } };
  }>;
}) => {
  const [pending, startTransition] = useTransition();

  const [updateApi, { isLoading: updateLoading }] = useUpdateWithdrawMutation();

  const handleUpdate = (change: "accept" | "reject", id: string) => {
    startTransition(() => {
      updateApi({ change, id })
        .unwrap()
        .then((res) => {
          if (res.message) {
            toast(res.message);
          }
        })
        .catch((error: FetchQueryError) => {
          if (error?.data.message) {
            toast(`Oh! ${error.data.message}`);
          } else {
            toast(`Oh! ${INTERNAL_SERVER_ERROR}`);
          }
        });
    });
  };

  return (
    <div className="flex gap-1">
      <button
        disabled={updateLoading}
        onClick={() => handleUpdate("accept", withdraw.id)}
        className="bg-emerald-600   p-1 rounded-sm cursor-pointer"
      >
        {updateLoading ? (
          <ClipLoader size={20} color="#fff" />
        ) : (
          <FaCheck className="w-6 h-6" />
        )}
      </button>
      <button
        disabled={updateLoading}
        onClick={() => handleUpdate("reject", withdraw.id)}
        className="bg-destructive  p-1 rounded-sm cursor-pointer"
      >
        {updateLoading ? (
          <ClipLoader size={20} color="#fff" />
        ) : (
          <IoMdClose className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default WithdrawTable;
