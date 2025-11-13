"use client";
import useUserProfile from "@/store/useUserProfile";
import Link from "next/link";
import { useState } from "react";
import FileUploadComponent from "./_components/FileUploadComponent";

export default function DashboardPage() {
  const { userData } = useUserProfile();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  console.log("imageFiles", imageFiles);

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

      <div className="mt-5">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Image Only Upload */}
          <div className="bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Image Upload Only
            </h2>
            <FileUploadComponent
              accept="image"
              maxSize={5}
              maxFiles={1}
              onFilesChange={setImageFiles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
