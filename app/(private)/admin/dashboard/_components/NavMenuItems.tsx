"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  items?: NavItem[];
}

export default function NavMenuItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;
          const isActive = item.url === pathname;

          const isChildActive =
            hasChildren && item.items!.some((child) => child.url === pathname);

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible
                  defaultOpen={isChildActive}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="font-jost font-medium h-9 rounded-sm"
                    >
                      {item.icon && <item.icon />}
                      <span
                        className={`font-jost font-medium ${
                          isChildActive ? "text-primary" : ""
                        }`}
                      >
                        {item.title}
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 
                        group-data-[state=open]/collapsible:rotate-90 cursor-pointer"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((sub) => {
                        const subActive = sub.url === pathname;
                        return (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={sub.url!}
                                className={` font-jost font-medium h-9 rounded-sm ${
                                  subActive
                                    ? "text-primary font-semibold"
                                    : "hover:text-primary"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link
                    href={item.url!}
                    className={`
                      font-jost font-medium h-9 rounded-sm flex items-center gap-2
                      ${
                        isActive
                          ? "text-white bg-primary hover:!bg-primary hover:text-white"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }
                    `}
                  >
                    {item.icon && <item.icon className="" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
