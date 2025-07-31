import { DataTable } from "@/components/dashboard/DataTable";
import { analyticsColumns } from "./analyticsColumns";

const analyticsData = [
  {
    metric: "Users",
    value: "12,500",
    change: "+12%",
    trend: "up",
  },
  {
    metric: "Revenue",
    value: "$15,300",
    change: "-3%",
    trend: "down",
  },
];

export function AnalyticsTable() {
  return <DataTable columns={analyticsColumns} data={analyticsData} />;
}
