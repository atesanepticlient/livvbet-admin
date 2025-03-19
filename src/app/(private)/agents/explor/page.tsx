"use client";
import React from "react";
import AgentsStatistics from "./agents-statistics";
import { useFetchAgentsQuery } from "@/lib/features/agentApiSlice";
import AgentsTable from "./agents-table";

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
    </div>
  );
};

export default AgentExplor;
