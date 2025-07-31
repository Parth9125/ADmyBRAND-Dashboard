import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      {/* Left: Page title or logo */}
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Middle: Search bar */}
      <div className="flex items-center gap-2 max-w-sm w-full">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          className="w-full"
        />
      </div>

      {/* Right: Notifications, Theme Toggle, and Profile */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-muted" /> {/* Profile Avatar */}
      </div>
    </header>
  );
}
