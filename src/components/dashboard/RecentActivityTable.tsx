"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, Edit, Trash, UserPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Define activity type
export interface Activity {
  userName: string;
  avatarUrl: string;
  action: string;
  timestamp: string;
  type: "signup" | "update" | "delete" | "login";
}

// Map icons to activity types
const iconMap: Record<string, React.JSX.Element> = {
  signup: <UserPlus className="h-5 w-5 text-green-600" />,
  update: <Edit className="h-5 w-5 text-yellow-600" />,
  delete: <Trash className="h-5 w-5 text-red-600" />,
  login: <ActivityIcon className="h-5 w-5 text-blue-600" />,
};

interface RecentActivityTableProps {
  data: Activity[];
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {data.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div>{iconMap[activity.type]}</div>
            <Avatar>
              <AvatarImage src={activity.avatarUrl} alt={activity.userName} />
              <AvatarFallback>
                {activity.userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{activity.userName}</p>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(activity.timestamp), {
                addSuffix: true,
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
