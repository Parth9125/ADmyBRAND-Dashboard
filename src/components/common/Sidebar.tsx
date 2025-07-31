import { Home, LineChart, Users, Settings } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-muted text-muted-foreground border-r">
      <div className="h-16 flex items-center justify-center text-xl font-semibold border-b">
        ADmyBRAND
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
