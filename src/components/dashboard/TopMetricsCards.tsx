"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, DollarSign, LineChart, Activity } from "lucide-react";

type Metric = {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
};

const initialMetrics: Metric[] = [
  {
    title: "Total Users",
    value: "12,340",
    growth: "+12%",
    icon: <User className="text-blue-600 h-6 w-6" />,
  },
  {
    title: "Revenue",
    value: "$34,000",
    growth: "+8.2%",
    icon: <DollarSign className="text-green-600 h-6 w-6" />,
  },
  {
    title: "Active Sessions",
    value: "890",
    growth: "-5.4%",
    icon: <Activity className="text-yellow-600 h-6 w-6" />,
  },
  {
    title: "Conversion Rate",
    value: "3.4%",
    growth: "+1.2%",
    icon: <LineChart className="text-purple-600 h-6 w-6" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function getRandomGrowth(base: number): string {
  const delta = Math.random() * 5 - 2.5;
  const sign = delta >= 0 ? "+" : "-";
  return `${sign}${Math.abs(delta).toFixed(1)}%`;
}

function generateNewMetrics(): Metric[] {
  return [
    {
      title: "Total Users",
      value: (12000 + Math.floor(Math.random() * 1000)).toLocaleString(),
      growth: getRandomGrowth(12),
      icon: <User className="text-blue-600 h-6 w-6" />,
    },
    {
      title: "Revenue",
      value: `$${(30000 + Math.floor(Math.random() * 10000)).toLocaleString()}`,
      growth: getRandomGrowth(8),
      icon: <DollarSign className="text-green-600 h-6 w-6" />,
    },
    {
      title: "Active Sessions",
      value: `${800 + Math.floor(Math.random() * 300)}`,
      growth: getRandomGrowth(5),
      icon: <Activity className="text-yellow-600 h-6 w-6" />,
    },
    {
      title: "Conversion Rate",
      value: `${(2.5 + Math.random() * 2).toFixed(1)}%`,
      growth: getRandomGrowth(1),
      icon: <LineChart className="text-purple-600 h-6 w-6" />,
    },
  ];
}

export const TopMetricsCards = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 1000);
    const updateInterval = setInterval(() => {
      setMetrics(generateNewMetrics());
    }, 10000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-4 shadow-sm border dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-md">
            <div className="p-0 flex justify-between items-center">
              {loading ? (
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                    <p
                      className={`text-xs mt-1 ${
                        metric.growth.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.growth} from last month
                    </p>
                  </div>
                  <div>{metric.icon}</div>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
