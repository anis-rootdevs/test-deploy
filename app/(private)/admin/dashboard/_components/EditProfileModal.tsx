"use client";

import { CustomButton } from "@/components/custom/custom-button";
import InputField from "@/components/form/InputField";
import z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adminFrontendProfileSchema } from "@/lib/validation-schema";
import useUserProfile from "@/store/useUserProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

type AdminProfilesFormValues = z.infer<typeof adminFrontendProfileSchema>;

interface ProfileChangeModalProps {
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
}

export default function EditProfileModal({
  editModalOpen,
  setEditModalOpen,
}: ProfileChangeModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { userData, fetchUserData } = useUserProfile();

  const token = session?.token;

  const form = useForm<AdminProfilesFormValues>({
    resolver: zodResolver(adminFrontendProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // profile form when userData is available
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: AdminProfilesFormValues) => {
    setLoading(true);

    const payload = {
      name: data.name,
    };

    try {
      const response = await fetch("/api/admin/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      toast.success(result.message || "Profile Update successfully!");
      form.reset();

      await fetchUserData(token as string);

      setEditModalOpen(false);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    }
  };

  const handleCancel = () => {
    form.reset();
    setEditModalOpen(false);
  };
  return (
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Update Your Profile</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputField
                name="name"
                label="Name"
                prefix={<User size={16} />}
                rules={{ required: "Required!" }}
              />
              <InputField
                name="email"
                label="Email"
                prefix={<Mail size={16} />}
                className=" cursor-not-allowed"
                rules={{ disabled: true }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <CustomButton
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="border-red-500 text-red-500 rounded-[4px] hover:bg-transparent hover:border-red-500 hover:text-red-500"
                >
                  Cancel
                </CustomButton>
              </DialogClose>
              <CustomButton
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={loading}
                className="rounded-[4px]"
                loadingIcon={true}
              >
                {loading ? (
                  <span className="flex items-center">
                    Updating
                    <ImSpinner9 className="ml-2 transition-all animate-spin duration-300" />
                  </span>
                ) : (
                  "Update"
                )}
              </CustomButton>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
