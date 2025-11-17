"use client";

import useUserProfile from "@/store/useUserProfile";
import { useState } from "react";

export default function DashboardPage() {
  const { userData } = useUserProfile();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">
        Welcome To , Mr. {userData?.data.name}
      </h1>
      <p className="mb-6 text-gray-600">You’re logged in successfully!</p>

      <div className="my-4">
        <h1 className="text-lg font-jost my-3">Show all task list</h1>

        <div></div>
      </div>
    </div>
  );
}
