"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems } from "@/public/sample-data/landing-page-data";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/shared/socials-links";
import { Icons } from "@/components/custom/icons";
import MobileMenuSection from "./mobile-menu";
import Image from "next/image";

// Navigation items configuration

const Header = () => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: any) => {
    setActiveSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`w-full bg-black h-[100px] flex items-center`}>
      <div className="max-w-[1320px] mx-auto w-full px-4">
        <div className="flex items-center justify-between w-full">
          {/* Mobile View */}
          <div className="flex items-center justify-between w-full md:hidden">
            <Link href="/">
              <h2 className="font-think text-[31px] uppercase text-[#FAF8F5]">
                Neer
              </h2>
            </Link>
            <MobileMenuSection />
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h2 className="font-think text-[31px] uppercase text-[#FAF8F5]">
                  Neer
                </h2>
              </Link>
            </div>

            {/* Navigation Items - Evenly Spaced */}
            <nav className="flex items-center lg:gap-16 xl:gap-20 gap-10">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-base font-jost font-normal hover:text-primary capitalize transition-colors ${
                      isActive ? "text-primary font-bold" : "text-[#FAF8F5]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
