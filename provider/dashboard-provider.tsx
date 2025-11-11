"use client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession();

  const token = session?.token;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [status, session]);

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
