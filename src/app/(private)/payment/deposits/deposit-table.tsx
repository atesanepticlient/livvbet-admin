/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState, useTransition } from "react";
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
  useDeleteDepositMutation,
  useFetchDepositsQuery,
  useUpdateDepositMutation,
} from "@/lib/features/paymentApiSlice";
import { MdDelete } from "react-icons/md";
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
const DepositTable = () => {
  const { data, isLoading } = useFetchDepositsQuery();
  const payment = data?.payload;

  const [deleteApi, { isLoading: deleting }] = useDeleteDepositMutation();

  const handleDeleteDeposit = (id: string) => {
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
              ? "A list of your Deposits"
              : "No deposits found"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Paid At</TableHead>
              <TableHead>Paid From</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payment?.map((d, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {moment(d.createdAt).calendar()}
                </TableCell>
                <TableCell>{d.payTo}</TableCell>
                <TableCell>{d.payFrom}</TableCell>
                <TableCell>{d.methodName}</TableCell>
                <TableCell>
                  <PaymentStatusText status={d.status} />
                </TableCell>
                <TableCell>
                  {d.user.wallet?.currencyCode} {d.amount}
                </TableCell>
                <TableCell>
                  {d.status == "PENDING" && <PaymentUpdateAction deposit={d} />}
                </TableCell>
                <TableCell className="text-right ">
                  <Button
                    onClick={() => handleDeleteDeposit(d.id)}
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

const PaymentUpdateAction = ({
  deposit,
}: {
  deposit: Prisma.DepositGetPayload<{
    include: { user: { include: { wallet: true } } };
  }>;
}) => {
  const [updateApi, { isLoading: updateLoading }] = useUpdateDepositMutation();

  const [pending, startTransition] = useTransition();
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
        onClick={() => handleUpdate("accept", deposit.id)}
        className="bg-emerald-600 p-1 rounded-sm cursor-pointer"
      >
        {updateLoading ? (
          <ClipLoader size={20} color="#fff" />
        ) : (
          <FaCheck className="w-5 h-5" />
        )}
      </button>
      <button
        disabled={updateLoading}
        onClick={() => handleUpdate("reject", deposit.id)}
        className="bg-destructive  p-1 rounded-sm cursor-pointer"
      >
        {updateLoading ? (
          <ClipLoader size={20} color="#fff" />
        ) : (
          <IoMdClose className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default DepositTable;
