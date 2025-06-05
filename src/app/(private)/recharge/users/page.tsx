"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchUsersQuery } from "@/lib/features/userApiSlice";
import React, { useEffect, useState, useTransition } from "react";
import { IoSearch } from "react-icons/io5";
import UserItemsCheck from "./user-items-check";
import { FadeLoader } from "react-spinners";
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
import { useForm } from "react-hook-form";
import {  MultipleRecharge } from "@/schema";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { multipleUsersRecharge } from "@/action/recharge";

const RechargeUser = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useFetchUsersQuery({
    search: search,
    limit: search ? 10 : 0,
    status: "ALL",
    page: 1,
  });

  const users = data?.payload.users;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSelect = (type: "select" | "deselect", id: string) => {
    if (type == "select") {
      setSelectedUsers((state) => {
        return [...state, id];
      });
    } else if (type == "deselect") {
      setSelectedUsers((state) => {
        const newState = state.filter((sId) => sId !== id);
        return newState;
      });
    }
  };

  const [pending, startTr] = useTransition();
  const form = useForm<MultipleRecharge>({
    defaultValues: {
      amount: "",
      message: "",
      users: [...selectedUsers],
    },
  });

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      users: selectedUsers,
    });
  }, [selectedUsers, form]);

  const handleRecharge = (data: MultipleRecharge) => {
    const asyncAction = async () => {
      const response = await multipleUsersRecharge(data);
      if (response.error) {
        throw new Error(response.error);
      }
      setSelectedUsers([]);
      form.reset();
      return response.success;
    };

    startTr(() => {
      toast.promise(asyncAction(), {
        loading: "Sending...",
        success: () => "Balance added to the all users",
        error: (error) => {
          return `${error.message}`;
        },
      });
    });
  };

  return (
    <div className="max-h-screen gap-10 flex-col md:flex-row flex py-8 lg:py-14">
      <div className="w-full md:w-[45%] ">
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full "
            placeholder="Player Id or Email"
          />
          <Button>
            <IoSearch className="w-5 h-5" />
            Search
          </Button>
        </div>

        <div className="py-5">
          {!isFetching && users && users.length > 0 && (
            <ul>
              <li className="flex items-center justify-between py-2 px-1 border rounded-sm">
                <span className="text-sm font-semibold text-white flex-1">
                  Select
                </span>
                <span className="text-sm font-semibold text-white flex-1">
                  Email
                </span>
                <span className="text-sm font-semibold text-white flex-1">
                  Player ID
                </span>
                <span className="text-sm font-semibold text-white flex-1">
                  Balance
                </span>
              </li>
              {users.map((user, i) => (
                <UserItemsCheck
                  key={i}
                  playerId={user.playerId}
                  balance={+user.wallet!.balance}
                  email={user.email}
                  id={user.id}
                  onDeselect={(id) => handleSelect("deselect", id)}
                  onSelect={(id) => handleSelect("select", id)}
                />
              ))}
            </ul>
          )}

          {!isFetching && users && users.length == 0 && !search && (
            <div className=" text-center py-4 text-sm text-white/75">
              Search User By Player Id or Email
            </div>
          )}

          {!isFetching && users && users.length == 0 && search && (
            <div className=" text-center py-4 text-sm text-white/75">
              Not Found
            </div>
          )}

          {isFetching && (
            <div className="flex justify-center py-10 ">
              <FadeLoader
                color={"#fff"}
                loading={true}
                margin={1}
                width={4}
                height={7}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-[55%]">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRecharge)}>
              <CardHeader>
                <CardTitle className="text-center">Recharge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 mt-5">
                <FormField
                  name="users"
                  control={form.control}
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        {form.watch("users").length} Users Seleted
                      </FormLabel>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter amount"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message to users</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Write a message" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end mt-5">
                <Button
                  disabled={
                    form.watch("amount") == "" ||
                    form.watch("users").length == 0 ||
                    pending
                  }
                >
                  Send
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RechargeUser;
