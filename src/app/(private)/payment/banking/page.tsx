/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import CookieLoader from "@/components/loader/cooki-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDeletePaymentMethodMutation,
  useFetchPaymentMethosQuery,
} from "@/lib/features/paymentApiSlice";
// import CreateGatewayModal from "./create-gateway.modal";
import { Button } from "@/components/ui/button";
// import UpdateGatewayModal from "./update-gateway";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateGatewayModal from "./update-gateway";
import CreateGatewayModal from "./create-gateway.modal";
import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";

const Methods = () => {
  const { data, isLoading } = useFetchPaymentMethosQuery();

  const eWallets = data?.payload.methods[0];

  const [deleteWalletApi] = useDeletePaymentMethodMutation();

  const getActiveCount = (data: any[]) => {
    return data.filter((item) => item.isActive).length;
  };

  const handleDelete = (id: string) => {
    const confirmation = window.confirm("are you sure to delete?");
    if (!confirmation) return 1;
    const asyncAction = async () => {
      const response = await deleteWalletApi({
        id: id,
      }).unwrap();
      return response.success;
    };

    toast.promise(asyncAction(), {
      loading: "Deleting...",
      success: () => "Gateway Deleted",
      error: (error: any) => {
        if (error?.data?.error) {
          return `Error: ${error.data.error}`;
        } else {
          return INTERNAL_SERVER_ERROR;
        }
      },
    });
  };

  const renderStatisticsBar = (data: any) => {
    const totalCount = data.methodData.length;
    const activeCount = getActiveCount(data.methodData);
    const inactiveCount = totalCount - activeCount;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Gateways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Gateways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Gateways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inactiveCount}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTable = (data: any) => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Left Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((gateway: any) => (
              <TableRow key={gateway.id}>
                <TableCell>
                  <img
                    src={gateway.walletImage}
                    alt={gateway.walletName}
                    className="w-10 h-10 object-contain rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {gateway.walletName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`${
                        gateway.isActive ? "text-emerald-700" : "text-red-500"
                      } text-sm`}
                    >
                      {" "}
                      {gateway.isActive ? "Active" : "InActive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    title={
                      gateway.minDeposit &&
                      gateway.maxDeposit &&
                      gateway.trxType &&
                      "Ready to manage Deposits "
                    }
                    className={
                      gateway.minDeposit &&
                      gateway.maximumDeposit &&
                      gateway.trxType
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }
                  >
                    {gateway.minDeposit &&
                    gateway.maximumDeposit &&
                    gateway.trxType
                      ? "Ok"
                      : "Action Required"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <UpdateGatewayModal
                      label={{
                        image: gateway.walletImage,
                        name: gateway.walletName,
                        wallet: gateway.walletNumber,
                      }}
                      defaultValues={{
                        maxDeposit: gateway.maxDeposit.toString(),
                        minDeposit: gateway.minDeposit.toString(),
                        trxType: gateway.trxType,
                        rules: gateway.rules || "",
                        isActive: gateway.isActive,
                        wallet: gateway.walletNumber,
                        isRecommended: gateway.isRecommended,
                      }}
                      id={gateway.id}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button cursor-pointer whitespace-nowrap"
                      >
                        <i className="fas fa-edit mr-1"></i> Update
                      </Button>
                    </UpdateGatewayModal>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                      onClick={() => handleDelete(gateway.id)}
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-3 md:p-10 grid gap-6">
      {data && !isLoading && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Banking Management</h1>
            <div className="text-sm text-gray-500">
              <span>Today: May 19, 2025</span>
            </div>
          </div>
          <Tabs defaultValue="e-wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="e-wallet"
                className="!rounded-button cursor-pointer whitespace-nowrap"
              >
                E-Wallet
              </TabsTrigger>
              <TabsTrigger
                value="card-crypto"
                className="!rounded-button cursor-pointer whitespace-nowrap"
              >
                Card & Crypto
              </TabsTrigger>
              <TabsTrigger
                value="payment-methods"
                className="!rounded-button cursor-pointer whitespace-nowrap"
              >
                Payment Methods
              </TabsTrigger>
            </TabsList>
            <TabsContent value="e-wallet">
              {eWallets && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      E-Wallet Payment Gateways
                    </h2>
                    <CreateGatewayModal>
                      <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                        <i className="fas fa-plus mr-2"></i> Create New Gateway
                      </Button>
                    </CreateGatewayModal>
                  </div>
                  {renderStatisticsBar(eWallets)}
                  {renderTable(eWallets.methodData)}
                </>
              )}

              {(eWallets && eWallets!.length == 0) && (
                <div className="text-center py-5">No Wallets Found</div>
              )}
            </TabsContent>
            <TabsContent value="card-crypto">
              <span className="text-sm text-white block text-center pt-8">
                No Payment Gateway Found
              </span>
              {/* {cryptoWallets && cryptoWallets.length > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Card & Crypto Payment Gateways
                      </h2>
                      <Button
                        onClick={handleCreateClick}
                        variant={"primary"}
                        className="!rounded-button cursor-pointer whitespace-nowrap"
                      >
                        <i className="fas fa-plus mr-2"></i> Create New Gateway
                      </Button>
                    </div>
                    {renderStatisticsBar(cardCryptoData)}
                    {renderTable(cardWallets)}
                  </>
                )}
                {(!cryptoWallets || cryptoWallets.length < 0) && (
                  <div className="text-center py-5">No Wallets Found</div>
                )} */}
            </TabsContent>
            <TabsContent value="payment-methods">
              <span className="text-sm text-white block text-center pt-8">
                No Payment Gateway Found
              </span>
              {/* {cardCryptoData && cardCryptoData.length > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Other Payment Methods
                      </h2>
                      <Button
                        variant={"primary"}
                        onClick={handleCreateClick}
                        className="!rounded-button cursor-pointer whitespace-nowrap"
                      >
                        <i className="fas fa-plus mr-2"></i> Create New Gateway
                      </Button>
                    </div>
                    {renderStatisticsBar(paymentMethodsData)}
                    {renderTable(paymentMethodsData)}
                  </>
                )}

                {(!cardCryptoData || cardCryptoData.length < 0) && (
                  <div className="text-center py-5">No Wallets Found</div>
                )} */}
            </TabsContent>
          </Tabs>
          {/* {renderUpdateModal()}
            {renderCreateModal()} */}
        </div>
      )}

      {(!data || isLoading) && <CookieLoader />}
    </div>
  );
};

export default Methods;
