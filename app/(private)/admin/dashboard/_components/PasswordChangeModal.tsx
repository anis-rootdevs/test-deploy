"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import PasswordField from "@/components/form/PasswordField";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { passwordSchema } from "@/lib/validation-schema";

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordChangeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function PasswordChangeModal({
  open,
  setOpen,
}: PasswordChangeModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const token = session?.token;

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setLoading(true);

    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await fetch("/api/admin/auth/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to change password");
      }

      toast.success(result.message || "Password changed successfully!");
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new password
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <div className="grid gap-4 py-4">
            <PasswordField
              name="oldPassword"
              label="Old Password"
              prefix={<Lock size={16} />}
            />
            <PasswordField
              name="newPassword"
              label="New Password"
              prefix={<Lock size={16} />}
            />
            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              prefix={<Lock size={16} />}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
