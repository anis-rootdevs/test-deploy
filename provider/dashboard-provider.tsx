"use client";
import { useEffect } from "react";
import useUserProfile from "@/store/useUserProfile";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

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

  console.log("userData", userData);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        <span className="ml-3 text-gray-700 font-medium">
          Loading session...
        </span>
      </div>
    );
  }

  return <div>{children}</div>;
}
