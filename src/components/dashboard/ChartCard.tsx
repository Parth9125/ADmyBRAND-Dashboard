import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

type ChartDataItem = {
  name: string;
  [key: string]: string | number;
};

export function ChartCard({
  title,
  data,
  dataKey,
}: {
  title: string;
  data: ChartDataItem[];
  dataKey: string;
}) {
  const { theme } = useTheme();

  const isEmpty = data.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis
                dataKey="name"
                stroke={theme === "dark" ? "#CBD5E1" : "#475569"}
              />
              <YAxis stroke={theme === "dark" ? "#CBD5E1" : "#475569"} />
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    theme === "dark" ? "#1e293b" : "#ffffff",
                  color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                  border: "1px solid #475569",
                }}
                labelStyle={{
                  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
                }}
                itemStyle={{
                  color: theme === "dark" ? "#cbd5e1" : "#1e293b",
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
