"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { routes } from "@/config/routes";
import useUserProfile from "@/store/useUserProfile";
import { ChevronDown, Lock, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditProfileModal from "./EditProfileModal";
import PasswordChangeModal from "./PasswordChangeModal";

export default function UserMenu() {
  const { data: session } = useSession();
  const { isLoading, userData, clearUserData } = useUserProfile();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();

  //   logout function
  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    toast.success("Logout Successfully!");
    clearUserData();
    router.push(routes.publicRoutes.adminLogin);
  };

  return (
    <>
      {/* Password Modal */}
      <PasswordChangeModal open={modalOpen} setOpen={setModalOpen} />
      <EditProfileModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 rounded-md text-sm font-medium focus:outline-none cursor-pointer ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span> {userData?.name}</span>
            <ChevronDown
              className={`h-5 w-5 transform transition-transform duration-200 cursor-pointer ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="mt-3.5 w-[240px] rounded-xl border border-gray-100 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {userData?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userData?.email}
            </p>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setEditModalOpen(true);
              setOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Lock className="h-4 w-4" />
            Edit Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          {/* ✅ Change Password */}
          <DropdownMenuItem
            onClick={() => {
              setModalOpen(true);
              setOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Lock className="h-4 w-4" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild onClick={() => handleLogout()}>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
