"use client";
import React from "react";
import AgentsStatistics from "./agents-statistics";
import { useFetchAgentsQuery } from "@/lib/features/agentApiSlice";
import AgentsTable from "./agents-table";
import { FadeLoader } from "react-spinners";

const AgentExplor = () => {
  const { data, isLoading } = useFetchAgentsQuery();
  return (
    <div className="container mx-auto p-3 md:p-10 grid gap-6">
      {data && !isLoading && (
        <>
          <AgentsStatistics
            totalActiveAgentsCount={data.payload.totalActiveAgentsCount}
            totalPendingAgentsCount={data.payload.totalPendingAgentsCount}
          />
          <AgentsTable agents={data.payload.agents} />
        </>
      )}
      {!data ||isLoading && (
          <FadeLoader
            color="#fff"
            className="w-8 h-8 mx-auto py-5"
          ></FadeLoader>
        )}
    </div>
  );
};

export default AgentExplor;
