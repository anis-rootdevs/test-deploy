"use client";
import DashboardLoader from "@/components/custom/DashboardLoader";
import useUserProfile from "@/store/useUserProfile";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { isLoading, fetchUserData, userData } = useUserProfile();

  const token = session?.token;

  useEffect(() => {
    if (token && !userData) {
      fetchUserData(token);
    }
  }, [token, userData]);

  // Block everything until userData is ready
  if (isLoading || (token && !userData)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <DashboardLoader />
      </div>
    );
  }

  return <>{children}</>;
}
