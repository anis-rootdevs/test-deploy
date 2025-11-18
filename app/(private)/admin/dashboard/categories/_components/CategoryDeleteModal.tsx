"use client";

import { deleteCategory } from "@/actions/categories/categoriesActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

interface CategoryDeleteModalProps {
  trigger: ReactNode;
  categoryId: string;
  title?: string;
}

const CategoryDeleteModal = ({
  trigger,
  categoryId,
  title = "Delete Category?",
}: CategoryDeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultDescription = `This action cannot be undone. This will permanently delete`;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const loadingToast = toast.loading("Deleting banner...");

      const response = await deleteCategory(categoryId);

      toast.dismiss(loadingToast);

      // Check if response indicates success
      if (!response?.ok) {
        toast.error(response?.message || "Failed to delete banner");
        setIsDeleting(false);
        return;
      }

      toast.success(response?.message || "Banner deleted successfully!");

      // Close modal on success
      setIsDeleting(false);
      setOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete banner"
      );
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{defaultDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDeleteModal;
