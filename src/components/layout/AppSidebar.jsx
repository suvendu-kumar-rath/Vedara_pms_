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
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Activity Logs", url: "/activity", icon: ScrollText },
];

function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar py-2">
        {/* Logo */}
        <div className={`flex items-center gap-3 px-5 py-4 ${collapsed ? "justify-center px-2" : ""}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary flex-shrink-0 overflow-hidden">
            <img src="/vedara-logo.svg" alt="Vedara" className="h-8 w-8 object-contain" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-sidebar-primary-foreground">
              VEDARA PMS
            </span>
          )}
        </div>

        {/* Nav */}
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {menuItems.map((item) => {
                const active =
                  item.url === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                          active
                            ? "bg-sidebar-accent text-sidebar-primary-foreground"
                            : "text-sidebar-muted hover:text-sidebar-primary-foreground hover:bg-sidebar-accent/60"
                        }`}
                      >
                        <item.icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
