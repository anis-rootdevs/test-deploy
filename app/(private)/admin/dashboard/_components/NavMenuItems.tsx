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
import { useEffect, useState } from "react";

interface NavItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  items?: NavItem[];
}

export default function NavMenuItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;
          const isActive = item.url && pathname === item.url;

          const isChildActive =
            hasChildren &&
            item.items!.some(
              (child) =>
                child.url &&
                (pathname === child.url || pathname.startsWith(child.url + "/"))
            );

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible
                  defaultOpen={isChildActive}
                  className="group/collapsible   active:hover:text-white"
                >
                  <CollapsibleTrigger asChild className="active:text-white ">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`font-jost font-medium h-9 rounded-sm flex items-center gap-2 ${
                        isChildActive
                          ? "text-primary  hover:!bg-primary hover:!text-white"
                          : "hover:bg-accent hover:!text-white"
                      }`}
                    >
                      {item.icon && <item.icon className="!size-5" />}
                      <span className={`font-jost font-medium `}>
                        {item.title}
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 
                        group-data-[state=open]/collapsible:rotate-90 cursor-pointer group-data-[state=open]:hover:text-primary"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((sub) => {
                        const subActive = sub.url === pathname;
                        return (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="active:text-white"
                            >
                              <Link
                                href={sub.url!}
                                className={` font-jost font-medium h-9 rounded-sm  ${
                                  subActive
                                    ? "text-white bg-primary hover:!bg-primary hover:text-white px-4"
                                    : "hover:bg-accent hover:text-white"
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
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="active:text-white"
                >
                  <Link
                    href={item.url!}
                    className={`
                      font-jost font-medium h-9 rounded-sm flex items-center gap-2 
                      ${
                        isActive
                          ? "text-white bg-primary hover:!bg-primary hover:text-white"
                          : "hover:bg-accent hover:text-white"
                      }
                    `}
                  >
                    {item.icon && <item.icon className="!size-5" />}
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
