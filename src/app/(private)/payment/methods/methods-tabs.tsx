"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EwalletsTables from "./ewallets-table";
import { useFetchPaymentMethosQuery } from "@/lib/features/paymentApiSlice";

const MethodsTabs = () => {
  const { data, isLoading } = useFetchPaymentMethosQuery();
  console.log({ data });
  return (
    <>
      {data && !isLoading && (
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="e-wallets">E-Wallets</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
          </TabsList>
          <TabsContent value="e-wallets">
            <EwalletsTables wallets={data.payload.methods.methodData} />
          </TabsContent>
          <TabsContent value="card">Card</TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default MethodsTabs;
