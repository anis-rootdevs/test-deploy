import ThemeToggleButton from "@/components/custom/toggle-button";
import FooterSection from "@/components/landing-page/FooterSection";
import Header from "@/components/landing-page/Header";
import type React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ThemeToggleButton />
      <main className="grow">{children}</main>
      <FooterSection />
    </div>
  );
}
