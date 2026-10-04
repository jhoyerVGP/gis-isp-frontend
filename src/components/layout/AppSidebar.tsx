import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/sidebar/NavUser";
import { useMe } from "@/features/auth/hooks/useMe";
import HeaderSidebar from "../sidebar/HeaderSidebar";

import { ShieldCheck, LayoutDashboard, Folder, Map, Users } from "lucide-react";
import { NavButton } from "../sidebar/NavButton";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
  },
  {
    title: "Mapa",
    url: "/map",
    icon: Map,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: ShieldCheck,
  },
];

export function AppSidebar() {
  // hook get user cache
  const { data: User, isError, isLoading } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !User) {
    return <div>Error loading user data</div>;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <NavButton items={navMain} />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={User} />
      </SidebarFooter>
    </Sidebar>
  );
}
