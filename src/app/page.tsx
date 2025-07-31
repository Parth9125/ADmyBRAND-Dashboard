"use client";

import Head from "next/head";
import { useState } from "react";
import { toast } from "sonner";

import { Shell } from "@/components/layout/Shell";
import { DateRangeFilter } from "@/components/dashboard/DateRangeFilter";
import { TabsSwitcher } from "@/components/dashboard/TabsSwitcher";
import { TopProductsTable } from "@/components/dashboard/TopProductsTable";
import { TopMetricsCards } from "@/components/dashboard/TopMetricsCards";
import { chartDataMap } from "@/components/dashboard/mockChartData";
import { topProducts } from "@/components/dashboard/mockAnalyticsData";

export default function HomePage() {
  const [selectedRange, setSelectedRange] = useState("last7days");
  const [chartData, setChartData] = useState(chartDataMap["last7days"]);

  const handleRangeChange = (range: string, fromDate?: string, toDate?: string) => {
    setSelectedRange(range);

    if (range === "custom") {
      if (fromDate && toDate) {
        setChartData([
          { name: `${fromDate}`, users: 500, revenue: 2000 },
          { name: `${toDate}`, users: 800, revenue: 3000 },
        ]);
        toast.success(`Custom range set: ${fromDate} → ${toDate}`);
      } else {
        toast.error("Please provide both From and To dates for custom range.");
      }
    } else {
      setChartData(chartDataMap[range] || []);
      toast.success(`Date range set to ${range}`);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | My App</title>
        <meta name="description" content="Your personalized analytics dashboard." />
      </Head>

      <Shell>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">Here’s an overview of your metrics.</p>
          </div>
          <DateRangeFilter onChange={handleRangeChange} />
        </div>

        {/* Top Metrics Section */}
        <section className="mt-10">
          <TopMetricsCards />
        </section>

        {/* Charts Section */}
        <section className="mt-10">
          <TabsSwitcher chartData={chartData} selectedRange={selectedRange} />
        </section>

        {/* Top Products Table */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Top Products</h2>
          <TopProductsTable products={topProducts} />
        </section>
      </Shell>
    </>
  );
}
