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
    <header
      className={`w-full border-b-[2px] border-[#E0E0E0] md:py-4 py-2 bg-transparent  z-50`}
    >
      <div className="container max-w-[1520px] mx-auto h-[80px] px-4">
        <div
          className={`md:justify-between flex items-center h-full ${
            isMobileMenuOpen ? "justify-between" : ""
          }`}
        >
          {/* Mobile View */}
          <div className="flex items-center justify-between w-full md:hidden">
            <div className="flex items-center">
              {/* <ThemeToggleButton /> */}
              <MobileMenuSection />
              <Link href="/">
                <Image
                  src="/images/doctor-protal-logo.svg"
                  alt="logo"
                  height={40}
                  width={40}
                  className="h-[40px] w-[40px] aspect-square"
                />
              </Link>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center lg:gap-x-[41px] gap-x-[30px] w-full">
            <div>
              <Link href="/">
                <Image
                  src="/images/doctor-protal-logo.svg"
                  alt="logo"
                  height={80}
                  width={80}
                  className="h-[80px] w-[80px] object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between w-full">
              {/* Navigation Items */}
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-[14px] font-jost font-bold  hover:text-primary uppercase transition-colors ${
                      isActive ? "text-primary font-bold" : "text-[#FBFBFB]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
