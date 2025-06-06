// components/agent/AgentSearch.tsx
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchAgentsQuery } from "@/lib/features/agentApiSlice";
import { Input } from "@/components/ui/input";
import { AgentList } from "./AgentList";

interface Agent {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  agent?: {
    balance: number;
    currencyCode: string;
  };
}

export const AgentSearch = ({
  onSelect,
}: {
  onSelect: (agent: Agent) => void;
}) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useSearchAgentsQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
  });

  useEffect(() => {
    console.log("Agent data:", data);
  }, [data]);

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search agents by email, phone or name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

      {isLoading ? (
        <div className="py-6 text-center text-sm">Searching...</div>
      ) : error ? (
        <div className="py-6 text-center text-sm text-red-500">
          Error searching agents
        </div>
      ) : data?.length === 0 ? (
        <div className="py-6 text-center text-sm">No agents found</div>
      ) : data ? (
        <AgentList agents={data} onSelect={onSelect} />
      ) : null}
    </div>
  );
};
