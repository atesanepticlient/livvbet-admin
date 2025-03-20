"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EwalletsTables from "./ewallets-table";
import { useFetchPaymentMethosQuery } from "@/lib/features/paymentApiSlice";
import { FadeLoader } from "react-spinners";

const MethodsTabs = () => {
  const { data, isLoading } = useFetchPaymentMethosQuery();

  return (
    <>
      {data && !isLoading && (
        <Tabs defaultValue="e-wallets" className="w-full">
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

      {(!data || isLoading) && (
        <FadeLoader color="#fff" className="w-8 h-8 mx-auto py-5"></FadeLoader>
      )}
    </>
  );
};

export default MethodsTabs;
