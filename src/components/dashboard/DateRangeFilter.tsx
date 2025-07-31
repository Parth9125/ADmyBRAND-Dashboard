"use client";

import { useState } from "react";
import { toast } from "sonner";

interface DateRangeFilterProps {
  onChange: (range: string, fromDate?: string, toDate?: string) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState("last7days");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedRange(value);

    if (value !== "custom") {
      toast.success(`Date range changed to: ${value}`);
      onChange(value);
    }
  };

  const handleCustomChange = () => {
    if (fromDate && toDate) {
      toast.success(`Custom range: ${fromDate} to ${toDate}`);
      onChange("custom", fromDate, toDate);
    } else {
      toast.error("Please select both from and to dates");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <select
        value={selectedRange}
        onChange={handleSelectChange}
        className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="thisMonth">This Month</option>
        <option value="custom">Custom</option>
      </select>

      {selectedRange === "custom" && (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleCustomChange}
            className="bg-primary text-white px-4 py-2 rounded dark:bg-blue-600"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
