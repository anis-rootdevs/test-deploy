"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm">
                {/* <activeTeam.logo className="size-4" /> */}

                <Coffee className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-[24px] font-bold font-jost">
                  {activeTeam.name}
                </span>
                {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
              </div>
              {/* <ChevronsUpDown className="ml-auto" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
