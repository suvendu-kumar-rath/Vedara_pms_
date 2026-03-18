import { LayoutDashboard, Users, FolderKanban, ScrollText, Hexagon } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Activity Logs", url: "/activity", icon: ScrollText }
];
function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  return <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <div className={`flex items-center gap-2.5 px-4 py-5 ${collapsed ? "justify-center" : ""}`}>
          <Hexagon className="h-7 w-7 text-primary flex-shrink-0" strokeWidth={1.5} />
          {!collapsed && <span className="text-lg font-bold tracking-tight text-foreground">
              Atelier<span className="text-primary">PMS</span>
            </span>}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
    const active = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
    return <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
      to={item.url}
      end={item.url === "/"}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent"
      activeClassName="bg-primary/10 text-primary"
    >
                        <item.icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.5} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
  })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}
export {
  AppSidebar
};
