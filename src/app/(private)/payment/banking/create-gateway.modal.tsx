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

import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { walletCreateSchema, WalletCreateSchema } from "@/schema";
import { useCreatePaymentMethodMutation } from "@/lib/features/paymentApiSlice";

const CreateGatewayModal = ({ children }: { children: React.ReactNode }) => {
  const [imageUploading, setImageUploading] = useState(false);

  const form = useForm<WalletCreateSchema>({
    defaultValues: {
      walletNumber: "",
      walletImage: "",
      walletName: "",
    },
    resolver: zodResolver(walletCreateSchema),
  });

  const [createGateApi, { isLoading: creating }] =
    useCreatePaymentMethodMutation();

  const handleSubmit = (data: zod.infer<typeof walletCreateSchema>) => {
    const asyncAction = async () => {
      const response = await createGateApi({
        ...data,
      }).unwrap();
      form.reset();
      return response.success;
    };

    toast.promise(asyncAction(), {
      loading: "Creating...",
      success: () => "Gateway created",
      error: (error: any) => {
        if (error?.data?.error) {
          return `Error: ${error.data.error}`;
        } else {
          return INTERNAL_SERVER_ERROR;
        }
      },
    });
  };

  const [file, setFile] = useState<any>("");

  const uploadImage = async (file: any) => {
    if (!file) return;
    setImageUploading(true);
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signatureRes = await fetch("/api/sign-cloudinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });

      const { payload } = await signatureRes.json();
      const { signature, cloud_name, api_key } = payload;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();
      setImageUploading(false);
      return data.secure_url;
    } catch {
      setImageUploading(false);
      toast.error("Unknown Error Try again");
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage(file).then((imageUrl) => {
        if (imageUrl) {
          console.log("Image url ", imageUrl);
          form.setValue("walletImage", imageUrl);
        }
      });
    }
  }, [file]);

  const isLoading = imageUploading || creating;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Payment Gateway</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Alert>
              <IoMdAlert className="h-4 w-4" />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                You cannot change the wallet log and name further
              </AlertDescription>
            </Alert>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="walletName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          placeholder="Wallet Name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="walletImage"
                  render={({ field }) => (
                    <div>
                      <Label htmlFor="file" className="mb-2">
                        Wallet Logo
                      </Label>
                      <Input
                        disabled={isLoading}
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e?.target?.files![0])}
                      />
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="walletNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="Wallet Number"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Switch
                            disabled={isLoading}
                            id={"status"}
                            checked={false}
                            onCheckedChange={() => toast.error("Try later")}
                          />
                        </FormControl>
                        <Label
                          htmlFor="status"
                          className={`${
                            field.value ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {field.value ? "Active" : "InActive"}
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="!rounded-button cursor-pointer whitespace-nowrap text-white"
                  >
                    Create Gateway
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

export default CreateGatewayModal;
