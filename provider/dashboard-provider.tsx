"use client";
import DashboardLoader from "@/components/custom/DashboardLoader";
import useUserProfile from "@/store/useUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { fetchUserData, userData } = useUserProfile();
  const [mainLoading, setMainLoading] = useState(true);

  const token = session?.token;

  useEffect(() => {
    if (token && !userData) {
      fetchUserData(token);
    }
    if (userData) {
      setMainLoading(false);
    }
  }, [fetchUserData, token, userData]);

  // Block everything until userData is ready
  if (mainLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <DashboardLoader />
      </div>
    );
  }

  return <>{children}</>;
}
