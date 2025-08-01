"use client";

import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DataTable } from "./DataTable";
import { RecentActivityTable } from "./RecentActivityTable";
import { columns } from "./columns";
import { tableData } from "./mockData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { activityData } from "./mockRecentActivity";

const OverviewChart = dynamic(() =>
  import("./OverviewChart").then((mod) => mod.OverviewChart),
  { ssr: false }
);

interface TabsSwitcherProps {
  chartData: { name: string; users: number; revenue: number }[];
  selectedRange: string;
}

export const TabsSwitcher: React.FC<TabsSwitcherProps> = ({
  chartData,
  selectedRange,
}) => {
  const exportToCSV = () => {
    const csv = Papa.unparse(activityData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "recent_activity.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = Object.keys(activityData[0] || {}).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );
    const rows = activityData.map((row) => Object.values(row));

    autoTable(doc, {
      head: [headers],
      body: rows,
    });

    doc.save("recent_activity.pdf");
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="table">User Details</TabsTrigger>
        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
      </TabsList>

      {/* Overview Chart */}
      <TabsContent value="overview">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Overview – {selectedRange}
          </h2>
          {chartData.length === 0 ? (
            <EmptyState message="No chart data available for this range." />
          ) : (
            <OverviewChart data={chartData} />
          )}
        </div>
      </TabsContent>

      {/* Table View */}
      <TabsContent value="table">
        {tableData.length === 0 ? (
          <EmptyState message="No user data available to display." />
        ) : (
          <DataTable columns={columns} data={tableData} />
        )}
      </TabsContent>

      {/* Recent Activity with Export Buttons */}
      <TabsContent value="activity">
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={exportToCSV}>
              Export CSV
            </Button>
            <Button variant="outline" onClick={exportToPDF}>
              Export PDF
            </Button>
          </div>
          <RecentActivityTable data={activityData} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
