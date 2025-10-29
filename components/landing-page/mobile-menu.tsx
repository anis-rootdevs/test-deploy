import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { navItems } from "@/public/sample-data/landing-page-data";
import { usePathname } from "next/navigation";

const MobileMenuSection = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden cursor-pointer">
          <Menu className=" text-primary h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white dark:bg-black h-[400px] overflow-y-auto rounded-br-[60px] dark:border-r dark:border-b border-primary"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <Link href="/">
              <h2 className="font-think text-[31px] uppercase">Neer</h2>
            </Link>

            <button
              className="border rounded-full border-primary dark:border-primary p-1 h-[25px] w-[25px] flex items-center justify-center cursor-pointer"
              onClick={handleNavClick}
            >
              <X className="text-primary h-5 w-5" />
            </button>
          </div>
        </SheetHeader>
        <div className="md:hidden bg-white dark:bg-black border-t dark:border-white border-black ">
          <div className="container px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => {
              // ✅ Clean route-only active detection
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-[15px] font-outfit font-semibold hover:text-primary transition-colors ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuSection;
