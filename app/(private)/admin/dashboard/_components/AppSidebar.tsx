"use client";

import { adminDashboardMenu } from "@/public/sample-data/landing-page-data";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import NavMenuItems from "./NavMenuItems";
import AppSidebarFooter from "./AppSidebarFooter";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppSidebarHeader teams={adminDashboardMenu.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenuItems items={adminDashboardMenu.navMain} />
        {/* <NavProjects projects={adminDashboardMenu.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter user={adminDashboardMenu.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
