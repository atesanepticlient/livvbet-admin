// components/agent/AgentList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface AgentListProps {
  agents: Agent[];
  onSelect: (agent: Agent) => void;
}

export const AgentList = ({ agents, onSelect }: AgentListProps) => {
  return (
    <ScrollArea className="h-60 rounded-md border">
      <div className="divide-y">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => onSelect(agent)}
            className="p-4 hover:bg-gray-950/15 cursor-pointer transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-medium">{agent.fullName}</span>
              <span className="text-sm text-muted-foreground">
                {agent.email} • {agent.phone}
              </span>
              {agent.agent && (
                <span className="text-sm">
                  Balance: {agent.agent.balance} {agent.agent.currencyCode}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
