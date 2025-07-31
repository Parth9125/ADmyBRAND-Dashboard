// src/components/dashboard/MetricCard.tsx

import React from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string; // Optional background color class
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color = "bg-white dark:bg-gray-900",
}) => {
  return (
    <div className={`shadow-md rounded-xl p-6 ${color} transition hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-1">{title}</h2>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-3xl opacity-30">{icon}</div>}
      </div>
    </div>
  );
};
