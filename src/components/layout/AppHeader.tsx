import { Bell, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="h-14 flex items-center justify-between border-b bg-card px-4 shadow-soft">
      <SidebarTrigger className="mr-2" />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AP</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden sm:inline">Admin Priya</span>
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  );
}
