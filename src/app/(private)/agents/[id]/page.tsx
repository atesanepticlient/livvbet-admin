"use client";
import React from "react";
import AgentInfo from "./agent-info";
import AgentWallet from "./agent-wallet";
import { useFetchAgentQuery } from "@/lib/features/agentApiSlice";
import { useParams } from "next/navigation";

const SingleAgent = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchAgentQuery({ id: id!.toString() });
  console.log({data})
  return (
    <div className="container mx-auto p-3 md:p-10">
      {data && !isLoading && (
        <div className="flex gap-2 md:gap-5 flex-col md:flex-row flex-wrap">
          <AgentInfo data={data.payload} />
          <AgentWallet data={data.payload.agent!} agentVerified={data.payload.isVerified} />
        </div>
      )}
    </div>
  );
};

export default SingleAgent;
