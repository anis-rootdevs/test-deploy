import { deleteReserveList } from "@/actions/reverse/reverseTableActions";
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
import { useTableState } from "@/store/useTableStore";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

interface ReserveListDeleteModalProps {
  trigger: ReactNode;
  reserveId: string;
  title?: string;
}

export default function ReverseListDeleteModal({
  trigger,
  reserveId,
  title = "Delete Reserve List?",
}: ReserveListDeleteModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const tableId = "reserve";
  const { handleRefresh } = useTableState(tableId);

  const defaultDescription = `This action cannot be undone. This will permanently delete`;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const loadingToast = toast.loading("Deleting reserve list...");

      const response = await deleteReserveList(reserveId);

      toast.dismiss(loadingToast);

      // Check if response indicates success
      if (!response?.status === true) {
        toast.error(response?.message || "Failed to delete reserve list");
        setIsDeleting(false);
        return;
      }

      toast.success(response?.message || "Reserve list deleted successfully!");

      // Trigger refresh callback
      handleRefresh();
      // Close modal on success
      setIsDeleting(false);
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete reserve list"
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
}
