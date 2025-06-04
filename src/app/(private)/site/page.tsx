/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { updateSiteAction } from "@/action/site";
import CookieLoader from "@/components/loader/cooki-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetchSiteQuery } from "@/lib/features/siteApiSlice";
import { siteUpdateSchema, SiteUpdateSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Site = () => {
  const { data, isLoading } = useFetchSiteQuery();
  const site = data?.payload;

  const form = useForm<SiteUpdateSchema>({
    defaultValues: {
      firstDepositBonus: "",
      maxAgWithdraw: "",
      maxWithdraw: "",
      minAgWithdraw: "",
      minWithdraw: "",
      referBonuse: "",
      signupBonus: "",
      turnover: "",
    },
    resolver: zodResolver(siteUpdateSchema),
  });

  const handleSubmit = (data: SiteUpdateSchema) => {
    const asyncAction = async () => {
      const response = await updateSiteAction(data);
      if (response.error || !response.success) {
        throw new Error("Failed to update site info.");
      }
      return true;
    };

    toast.promise(asyncAction(), {
      loading: "Saving...",
      success: () => "Site Updated",
      error: (error: any) => {
        return error.message;
      },
    });
  };

  useEffect(() => {
    if (site) {
      form.reset({
        firstDepositBonus: site.firstDepositBonus?.toString() || "",
        maxAgWithdraw: site.maxAgWithdraw?.toString() || "",
        maxWithdraw: site.maxWithdraw?.toString() || "",
        minAgWithdraw: site.minAgWithdraw?.toString() || "",
        minWithdraw: site.minWithdraw?.toString() || "",
        referBonuse: site.referBonuse?.toString() || "",
        signupBonus: site.signupBonus?.toString() || "",
        turnover: site.firstDepositBonus?.toString() || "",
      });
    }
  }, [site]);

  return (
    <div>
      {(!site || isLoading) && (
        <div className="flex w-full h-[85vh] justify-center items-center">
          <CookieLoader />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[300px] md:w-[350px] lg:w-[420px]">
            <CardHeader>
              <CardTitle>Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="minWithdraw"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Min Withdraw</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:100"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxWithdraw"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Max Withdraw</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:100"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minAgWithdraw"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Min Withdraw (Agent)</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:100"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxAgWithdraw"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Max Withdraw (Agent) </FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:100"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="turnover"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Deposit Turnover [%]</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:10%"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signupBonus"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Signup Bonus [%]</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:10%"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referBonuse"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Refer Bonus [%]</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:10%"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstDepositBonus"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Fisrt Deposit Bonus [%]</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[100px]"
                          placeholder="Ex:10%"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Site;
