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
import {
  useFetchContactQuery,
  useUpdateContactMutation,
} from "@/lib/features/contactApiSlice";
import { contactUpdateSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FadeLoader } from "react-spinners";
import { toast } from "sonner";
import zod from "zod";
const Contact = () => {
  const { data, isLoading } = useFetchContactQuery();
  const payload = data?.payload;

  const [contactUpdateApi, { isLoading: pending }] = useUpdateContactMutation();

  const form = useForm<zod.infer<typeof contactUpdateSchema>>({
    defaultValues: {
      telegram: "",
      email: "",
      facebook: "",
    },
    resolver: zodResolver(contactUpdateSchema),
  });

  const handleUpdateContact = (data: zod.infer<typeof contactUpdateSchema>) => {
    contactUpdateApi({
      telegram: data.telegram,
      facebook: data.facebook,
      email: data.email,
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
    if (payload) {
      form.reset({
        telegram: payload.telegram || "",
        email: payload.email || "",
        facebook: payload.facebook || "",
      });
    }
  }, [payload]);

  return (
    <div className="">
      <Card className="mt-5 w-[90%] md:w-[300px] mx-auto">
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        {data && !isLoading && (
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateContact)}>
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Facebook (URL)</FormLabel>
                      <FormControl>
                        <Input
                          disabled={pending}
                          {...field}
                          placeholder="www.facebook.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Telegram (User Name)</FormLabel>
                      <FormControl>
                        <Input
                          disabled={pending}
                          {...field}
                          placeholder="@jhonedoe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input
                          disabled={pending}
                          {...field}
                          placeholder="example@gmail.com"
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

        {(!data || isLoading) && <FadeLoader
                    color="#fff"
                    className="w-8 h-8 mx-auto py-5"
                  ></FadeLoader>}
      </Card>
    </div>
  );
};

export default Contact;
