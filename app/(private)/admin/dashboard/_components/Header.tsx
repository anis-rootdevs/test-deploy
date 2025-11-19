"use client";
import DashboardThemingChange from "@/components/custom/DashboardThemingChange";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 ms-6  ">
      <header className="h-16 flex justify-between items-center px-6 shadow-sm rounded-bl-xl border-b">
        <SidebarTrigger className="-ml-1 h-10 w-10 flex items-center justify-center " />
        <div className="flex items-center gap-2 md:gap-4">
          <DashboardThemingChange />
          <UserMenu />
        </div>
      </header>
    </div>
  );
}
