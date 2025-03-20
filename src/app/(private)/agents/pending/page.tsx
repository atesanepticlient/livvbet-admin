"use client";
import { useFetchUnVerifiedAgentsQuery } from "@/lib/features/agentApiSlice";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TableSkeleton from "./table-skeleton";

import { FadeLoader } from "react-spinners";

export default function DemoPage() {
  const { data, isLoading } = useFetchUnVerifiedAgentsQuery();

  return (
    <div className="container mx-auto p-3 md:p-10">
      {(!data || isLoading) && <FadeLoader color="#fff" className="w-8 h-8 mx-auto py-5"></FadeLoader>}
      {!isLoading && data && (
        <div>
          <DataTable
            columns={columns}
            data={data.payload.map((d) => ({ email: d.email, id: d.id }))}
          />
        </div>
      )}

      {isLoading && <TableSkeleton />}
    </div>
  );
}
