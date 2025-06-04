/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import zod from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoMdAlert } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { Textarea } from "@/components/ui/textarea";
import { walletUpdateSchema, WalletUpdateSchema } from "@/schema";
import { useUpdatePaymentMethodMutation } from "@/lib/features/paymentApiSlice";
import { TrxType } from "@prisma/client";

const UpdateGatewayModal = ({
  children,
  defaultValues,
  id,
  label,
}: {
  children: React.ReactNode;
  id: string;
  defaultValues: any;
  label: {
    image: string;
    name: string;
    wallet: string;
  };
}) => {
  const form = useForm<WalletUpdateSchema>({
    defaultValues: {
      isActive: false,
      isRecommended: false,
      trxType: "",
      minDeposit: "",
      maxDeposit: "",
      rules: "",
      walletNumber: "",
    },
    resolver: zodResolver(walletUpdateSchema),
  });

  const [updateGatewayApi, { isLoading: updateing }] =
    useUpdatePaymentMethodMutation();

  const handleSubmit = (data: WalletUpdateSchema) => {
    const asyncAction = async () => {
      const response = await updateGatewayApi({
        id: id,
        body: {
          maxDeposit: +data.maxDeposit,
          minDeposit: +data.minDeposit,
          trxType: data.trxType,
          rules: data.rules,
          isActive: data.isActive,
          walletNumber: data.walletNumber,
        },
      }).unwrap();
      form.reset();
      return response.success;
    };

    toast.promise(asyncAction(), {
      loading: "Updating...",
      success: () => "Gateway Updated",
      error: (error: any) => {
        if (error?.data?.error) {
          return `Error: ${error.data.error}`;
        } else {
          return INTERNAL_SERVER_ERROR;
        }
      },
    });
  };

  const isLoading = false;

  useEffect(() => {
    console.log({ defaultValues });
    if (defaultValues) {
      form.reset({
        ...form.getValues(),
        ...defaultValues,
        walletNumber: defaultValues.wallet,
      });
    }
  }, [defaultValues]);

  useEffect(() => {
    const { formState } = form;
    console.log("error ", formState.errors);
  }, [form]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Upate Payment Gateway</DialogTitle>
            <div className="flex items-center justify-between py-1 px-3 mt-2 border rounded-md">
              <div className="">
                <img src={label.image} alt={label.name} className="w-[60px]" />
                <span className="text-xs text-gray-300 block mt-2 ">
                  {label.wallet}
                </span>
              </div>

              <span className="text-sm font-semibold text-white capitalize">
                {label.name}
              </span>
            </div>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleSubmit, (formErrors) => {
                  console.log("Form has errors:", formErrors);
                })}
              >
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="walletNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Wallet</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Wallet address or ID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trxType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Transaction Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value={TrxType.SENDMONEY}>
                                Send Money
                              </SelectItem>
                              <SelectItem value={TrxType.CASHOUT}>
                                Cash Out
                              </SelectItem>
                              <SelectItem value={TrxType.PAYMENT}>
                                Payment
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="minDeposit"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Minimum Deposit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Minimum deposit amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxDeposit"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Maximum Deposit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Maximum deposit amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="rules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Optional instructions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel>Is Active</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isRecommended"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel>Is Recommended</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant={"secondary"}
                    className="!rounded-button cursor-pointer whitespace-nowrap text-white"
                  >
                    Update Gateway
                  </Button>
                </DialogFooter>
              </form>
            </Form>

            {/* {specificFields} */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateGatewayModal;
