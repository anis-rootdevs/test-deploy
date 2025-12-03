"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Coffee } from "lucide-react";
import { useState } from "react";

export default function AppSidebarHeader({ teams }: any) {
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent hover:shadow-none hover:text-black dark:hover:text-white"
        >
          <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm  ">
            <Coffee className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight ">
            <span className="truncate text-[24px] font-bold font-jost ">
              {activeTeam.name}
            </span>
          </div>
          {/* <ChevronsUpDown className="ml-auto" /> */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
