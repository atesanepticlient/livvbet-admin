"use client";
import React from "react";
import AgentInfo from "./agent-info";
import AgentWallet from "./agent-wallet";
import { useFetchAgentQuery } from "@/lib/features/agentApiSlice";
import { useParams } from "next/navigation";
import { FadeLoader } from "react-spinners";

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

      {!data || isLoading && <FadeLoader
                  color="#fff"
                  className="w-8 h-8 mx-auto py-5"
                ></FadeLoader>}
    </div>
  );
};

export default SingleAgent;
