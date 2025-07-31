"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  status: "active" | "inactive" | string;
};

interface TopProductsTableProps {
  products: Product[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="border rounded-xl dark:border-gray-700 p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border rounded-xl dark:border-gray-700 p-6"
      >
        <EmptyState message="No top products available." />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto rounded-xl border dark:border-gray-700"
    >
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Product</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Sales</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Revenue</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {product.name}
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                {product.sales}
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                ₹{product.revenue.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3">
                <Badge variant={product.status === "active" ? "default" : "secondary"}>
                  {product.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
