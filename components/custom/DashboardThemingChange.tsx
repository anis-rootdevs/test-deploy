"use client";
import { SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { LuSunMoon } from "react-icons/lu";
export default function DashboardThemingChange() {
  const { theme, setTheme } = useTheme();
  if (theme === "light") {
    return (
      <SunIcon
        className="size-6 cursor-pointer"
        onClick={() => setTheme("dark")}
      />
    );
  } else {
    return (
      <LuSunMoon
        className="size-6 cursor-pointer"
        onClick={() => setTheme("light")}
      />
    );
  }
}
