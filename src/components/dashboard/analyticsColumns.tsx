import { ColumnDef } from "@tanstack/react-table";

type AnalyticsMetric = {
  metric: string;
  value: string;
  change: string;
  trend: string;
};

export const analyticsColumns: ColumnDef<AnalyticsMetric>[] = [
  {
    accessorKey: "metric",
    header: "Metric",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "change",
    header: "Change",
  },
  {
    accessorKey: "trend",
    header: "Trend",
  },
];
