"use client";
import { useFetchUsersQuery } from "@/lib/features/userApiSlice";
import React from "react";
import UsersStatistics from "./user-statistics";
import UsersTable from "./users-table";
import UsersFilter from "./users-filter";
import { FadeLoader } from "react-spinners";

const UserExplor = () => {
  const { data, isLoading } = useFetchUsersQuery({ search: "" });
  return (
    <div className="container mx-auto p-3 md:p-10 grid gap-6">
      {data && !isLoading && (
        <>
          <UsersStatistics
            totalUserCount={data.payload.totalUserCount}
            totalActiveUserCount={data.payload.totalActiveUserCount}
            totalBannedUserCount={data.payload.totalBannedUserCount}
          />
          <UsersFilter />
          <UsersTable users={data.payload.users} />
        </>
      )}
      {(!data || isLoading) && (
              <FadeLoader color="#fff" className="w-8 h-8 mx-auto py-5"></FadeLoader>
            )}
    </div>
  );
};

export default UserExplor;
