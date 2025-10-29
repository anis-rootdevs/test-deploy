"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import CustomSwitch from "../ui/custom-switch";

const ThemeToggleSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="fixed top-1/2 left-4 -translate-y-1/2 z-[999]">
      {/* Custom Switch */}
      <CustomSwitch checked={isDark} onCheckedChange={handleToggle} />
    </div>
  );
};

export default ThemeToggleSwitch;
