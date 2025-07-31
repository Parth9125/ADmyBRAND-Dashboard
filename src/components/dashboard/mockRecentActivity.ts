import { Activity } from "./RecentActivityTable";

export const activityData: Activity[] = [
  {
    userName: "Alice Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    action: "Signed up for the platform",
    timestamp: "2025-07-29T09:00:00Z", 
    type: "signup",
  },
  {
    userName: "Bob Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    action: "Logged in from a new device",
    timestamp: "2025-07-29T12:45:00Z",
    type: "login",
  },
  {
    userName: "Charlie Green",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    action: "Updated profile details",
    timestamp: "2025-07-28T17:30:00Z",
    type: "update",
  },
  {
    userName: "Diana Rose",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    action: "Deleted a saved dashboard",
    timestamp: "2025-07-27T14:15:00Z",
    type: "delete",
  },
];
