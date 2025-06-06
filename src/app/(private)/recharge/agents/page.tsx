// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";

import { useState } from "react";
import { AgentSearch } from "./agent-search";
import { DepositForm } from "./DepositForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AgentDepositPage() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Agent Wallet Deposit</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Search Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <AgentSearch onSelect={setSelectedAgent} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedAgent
                ? `Deposit to ${selectedAgent.fullName}'s Wallet`
                : "Select an agent to deposit"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAgent ? (
              <DepositForm
                selectedAgent={selectedAgent}
                onSuccess={() => setSelectedAgent(null)}
              />
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Please select an agent from the search results
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
