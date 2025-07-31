export const chartDataMap: Record<
  string,
  { name: string; users: number; revenue: number }[]
> = {
  last7days: [
    { name: "Day 1", users: 300, revenue: 1200 },
    { name: "Day 2", users: 450, revenue: 1500 },
    { name: "Day 3", users: 500, revenue: 1700 },
    { name: "Day 4", users: 400, revenue: 1400 },
    { name: "Day 5", users: 600, revenue: 1600 },
    { name: "Day 6", users: 700, revenue: 1800 },
    { name: "Day 7", users: 800, revenue: 2000 },
  ],
  last30days: [
    { name: "Week 1", users: 1200, revenue: 4500 },
    { name: "Week 2", users: 1500, revenue: 5000 },
    { name: "Week 3", users: 1300, revenue: 4800 },
    { name: "Week 4", users: 1700, revenue: 5200 },
  ],
  thisMonth: [
    { name: "1-10", users: 800, revenue: 3000 },
    { name: "11-20", users: 1000, revenue: 4000 },
    { name: "21-31", users: 1400, revenue: 5000 },
  ],
  custom: [],
};
