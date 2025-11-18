"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 ms-6  ">
      <header className=" bg-white h-16 flex items-center px-6 shadow-sm rounded-bl-2xl">
        <SidebarTrigger className="-ml-1 h-10 w-10 flex items-center justify-center text-gray-500 dark:text-gray-400" />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-jost font-semibold text-gray-700 dark:text-gray-300"></h1>
          <div className="flex items-center gap-2 md:gap-3">
            <UserMenu />
          </div>
        </div>
      </header>
    </div>
  );
}
