/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INTERNAL_SERVER_ERROR } from "@/error";
import useCurrentUser from "@/hooks/useCurrentUser";

import { useUpdatePromoMutation } from "@/lib/features/promoApiSlice";
import { promoCodeUpdateSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zod from "zod";

const Bonus = () => {
  const admin = useCurrentUser();

  const [promoUpdateApi, { isLoading: pending }] = useUpdatePromoMutation();

  const form = useForm<zod.infer<typeof promoCodeUpdateSchema>>({
    defaultValues: {
      promo: "",
    },
    resolver: zodResolver(promoCodeUpdateSchema),
  });

  const handleUpdateContact = (
    data: zod.infer<typeof promoCodeUpdateSchema>
  ) => {
    promoUpdateApi({
      promo: data.promo,
    })
      .unwrap()
      .then((res) => {
        if (res.message) {
          toast.success(res.message);
        }
      })
      .catch((error) => {
        if (error.data.message) {
          toast.error(error.data.message);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };

  useEffect(() => {
    if (admin) {
      form.reset({
        promo: admin!.promo,
      });
    }
  }, [admin]);

  return (
    <div className="">
      <Card className="mt-5 w-[90%] md:w-[300px] mx-auto">
        <CardHeader>
          <CardTitle>Bonus</CardTitle>
        </CardHeader>
        {admin && (
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateContact)}>
                <FormField
                  control={form.control}
                  name="promo"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Promo</FormLabel>
                      <FormControl>
                        <Input
                          disabled={pending}
                          {...field}
                          placeholder="Enter Promo Code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={pending} className="mt-2 w-full">
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Bonus;
