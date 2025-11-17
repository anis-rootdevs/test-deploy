"use client";

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

interface DeleteModalProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  itemName?: string;
  onDelete: () => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function DeleteModal({
  trigger,
  title = "Are you absolutely sure?",
  description,
  itemName,
  onDelete,
  onSuccess,
  onError,
}: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultDescription = itemName
    ? `This action cannot be undone. This will permanently delete "${itemName}".`
    : "This action cannot be undone. This will permanently delete this item.";

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Delete error:", error);
      onError?.(error as Error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
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
}
