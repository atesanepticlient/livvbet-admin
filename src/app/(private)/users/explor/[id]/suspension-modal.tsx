/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { suspensionSchema, SuspensionSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUserSuspentionMutation } from "@/lib/features/userApiSlice";
import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";
const SuspensionModal = ({
  children,
  currentStatus,
  id,
}: {
  children: React.ReactNode;
  currentStatus: any;
  id: string;
}) => {
  const form = useForm<SuspensionSchema>({
    defaultValues: {
      id: "",
      message: "",
    },
    resolver: zodResolver(suspensionSchema),
  });
  const [suspensionApi, { isLoading }] = useUserSuspentionMutation();

  const handleSubmit = async (data: SuspensionSchema) => {
    const asyncAction = async () => {
      const response = await suspensionApi({
        actionType: currentStatus == true ? "UNBAN" : "BAN",
        message: data.message,
        id: data.id,
      }).unwrap();
      return response.success;
    };

    toast.promise(asyncAction(), {
      loading: "Updating...",
      success: () => `User ${currentStatus == "BAN" ? "Unbanned" : "Baned"}`,
      error: (error: any) => {
        if (error?.data?.error) {
          return `Error: ${error.data.error}`;
        } else {
          return INTERNAL_SERVER_ERROR;
        }
      },
    });
  };

  useEffect(() => {
    if (currentStatus || id) {
      form.reset({
        ...form.getValues(),
        id,
      });
    }
  }, [currentStatus, id]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <Textarea {...field} placeholder="Write a message" />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isLoading}
                  className="w-full mt-6"
                  variant={"secondary"}
                >
                  Recharge
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuspensionModal;
