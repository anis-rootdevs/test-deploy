"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { BsShop } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import { PiHamburgerDuotone } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";

const ICONS: Record<string, any> = {
  books: MdLibraryBooks,
  products: PiHamburgerDuotone,
  categories: TbCategory,
  outlets: BsShop,
};

export default function DashboardCard({
  total,
  active,
  label,
  icon,
  link = "",
}: any) {
  const Icon = ICONS[icon];

  return (
    <Card className="@container/card h-full flex flex-col justify-between">
      <CardHeader className="flex flex-col h-full">
        {/* Title + Icon */}
        <CardDescription className="font-bold text-[15px] flex items-center gap-x-2">
          <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-sm size-10 flex items-center justify-center">
            {Icon && <Icon size={22} className="text-primary" />}
          </div>
          <span>{label}</span>
        </CardDescription>

        {/* Numbers */}
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-4">
          {active ? (
            <div>
              <span className="text-primary">{active}</span>{" "}
              <span className="text-base">/{total}</span>
            </div>
          ) : (
            total
          )}
        </CardTitle>

        {/* Button Bottom Right */}
        <CardAction className="mt-auto flex self-end">
          <Link href={link}>
            <Button size="sm" className="cursor-pointer">
              View More
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
