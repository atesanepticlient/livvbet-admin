import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClockArrowUp, ShieldCheck } from "lucide-react";
import React from "react";

interface AgentsStatisticsProps {
  totalActiveAgentsCount: number;
  totalPendingAgentsCount: number;
}

const AgentsStatistics = ({
  totalActiveAgentsCount,
  totalPendingAgentsCount,
}: AgentsStatisticsProps) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Card className="relative gap-1.5 w-[200px] md:w-[250px]">
        <ShieldCheck className="text-muted-foreground p-2 w-8 h-8 absolute top-4 right-2 rounded-sm" />
        <CardHeader>
          <CardTitle>Active Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">
            +{totalActiveAgentsCount}
          </p>
        </CardContent>
      </Card>

      <Card className="relative gap-1.5 w-[200px] md:w-[250px]">
        <ClockArrowUp className=" text-muted-foreground p-2 w-8 h-8 absolute top-4 right-2 rounded-sm" />

        <CardHeader>
          <CardTitle>Requested</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">
            +{totalPendingAgentsCount}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsStatistics;
