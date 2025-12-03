"use client";

import useUserProfile from "@/store/useUserProfile";

export default function DashboardPage() {
  const { userData } = useUserProfile();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">
        Welcome To , Mr. {userData?.data.name}
      </h1>
      <p className="mb-6 text-gray-600">You’re logged in successfully!</p>

      <div className="my-4"></div>
    </div>
  );
}
