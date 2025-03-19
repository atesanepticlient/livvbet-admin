import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersRound } from "lucide-react";
import React from "react";

interface UsersStatisticsProps {
  totalUserCount: number;
  totalActiveUserCount: number;
  totalBannedUserCount: number;
}

const UsersStatistics = ({
  totalUserCount,
  totalActiveUserCount,
  totalBannedUserCount,
}: UsersStatisticsProps) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Card className="relative gap-1.5 w-[200px] md:w-[250px]">
        <UsersRound className="text-muted-foreground p-2 w-8 h-8 absolute top-4 right-2 rounded-sm" />
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">+{totalUserCount}</p>
        </CardContent>
      </Card>

      <Card className="relative gap-1.5 w-[200px] md:w-[250px]">
        <UsersRound className=" text-muted-foreground p-2 w-8 h-8 absolute top-4 right-2 rounded-sm" />

        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">
            +{totalActiveUserCount}
          </p>
        </CardContent>
      </Card>

      <Card className="relative gap-1.5 w-[200px] md:w-[250px]">
        <UsersRound className=" text-muted-foreground p-2 w-8 h-8 absolute top-4 right-2 rounded-sm" />

        <CardHeader>
          <CardTitle>Banned Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">
            +{totalBannedUserCount}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersStatistics;
