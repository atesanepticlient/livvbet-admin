"use client";
import { Input } from "@/components/ui/input";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserFilter } from "@/lib/store.zustand";

const UsersFilter = () => {
  const { setSearch, setUserType } = useUserFilter((state) => state);
  return (
    <div className="flex items-center justify-between gap-5">
      <Input
        placeholder="Search by Email"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select onValueChange={(value) => setUserType(value)} defaultValue="all">
        <SelectTrigger className="w-[110px] md:w-[150px]">
          <SelectValue placeholder="Select User Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="ad-ctrl">Admin Controlled</SelectItem>
          <SelectItem value="ag-ctrl">Agent Controlled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UsersFilter;
