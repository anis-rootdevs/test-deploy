"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not authorized. Please log in first.</p>;

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    toast.success("Logout Successfully!");
    router.push("/admin/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {session.user?.name || session.user?.email}
      </h1>
      <p className="mb-6 text-gray-600">You’re logged in successfully!</p>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}
