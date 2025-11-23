"use client";
import AppSidebar from "@/app/(private)/admin/dashboard/_components/AppSidebar";
import Header from "@/app/(private)/admin/dashboard/_components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardProvider from "@/provider/dashboard-provider";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-auto h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}
