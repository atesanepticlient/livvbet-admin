"use client";
import { useFetchUnVerifiedAgentsQuery } from "@/lib/features/agentApiSlice";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TableSkeleton from "./table-skeleton";

export default function DemoPage() {
  const { data, isLoading } = useFetchUnVerifiedAgentsQuery();

  return (
    <div className="container mx-auto p-3 md:p-10">
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
