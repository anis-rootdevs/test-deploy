"use client";
import useUserProfile from "@/store/useUserProfile";
import Link from "next/link";

export default function DashboardPage() {
  const { userData } = useUserProfile();
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">
        Welcome To , Mr. {userData?.data.name}
      </h1>
      <p className="mb-6 text-gray-600">You’re logged in successfully!</p>

      <Link
        href={`/test`}
        className="border py-2 px-3 rounded-[5px] border-primary text-primary"
      >
        Go To Test
      </Link>
    </div>
  );
}
