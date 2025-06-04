/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PeriodStats } from "@/types/api";
import { FaArrowUp } from "react-icons/fa6";

const StatisticCard = ({
  statistic,
  title,
}: {
  statistic: PeriodStats;
  title: string;
}) => {
  const { allTime, last30Days, last7Days } = statistic;

  return (
    <div>
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="capitalize">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">{allTime}</p>
          <p className="text-sm  text-emerald-500 flex items-center gap-1">
            {0}% <FaArrowUp className="w-3 h-3" />
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticCard;
