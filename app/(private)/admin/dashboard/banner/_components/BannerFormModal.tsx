"use client";

import { revalidateBanners } from "@/actions/revalidateTag";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Banner } from "@/lib/types";
import { Loader2, Plus, SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";

interface BannerFormData {
  tagline: string;
  heading: string;
  shortDesc: string;
}

interface BannerFormModalProps {
  banner?: Banner | null;
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export default function BannerFormModal({
  banner,
  isEditMode = false,
  onSuccess,
}: BannerFormModalProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<BannerFormData>();
  const { data: session } = useSession();
  const token = session?.token;

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (isEditMode && banner) {
        reset({
          tagline: banner.tagline,
          heading: banner.heading,
          shortDesc: banner.shortDesc,
        });
      } else {
        reset({
          tagline: "",
          heading: "",
          shortDesc: "",
        });
      }
      setImageFiles([]);
    }
  }, [isDialogOpen, banner, isEditMode, reset]);

  const onSubmit = async (data: BannerFormData) => {
    // Validate image only for add mode
    if (!isEditMode && imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("shortDesc", data.shortDesc);

      // Add image if selected
      if (imageFiles.length > 0) {
        formData.append("image", imageFiles[0]);
      }

      const url = isEditMode
        ? `/api/admin/banner/${banner?._id}`
        : "/api/admin/banner";

      const method = isEditMode ? "PUT" : "POST";

      const loadingToast = toast.loading(
        isEditMode ? "Updating banner..." : "Adding banner..."
      );

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      toast.dismiss(loadingToast);

      if (!res.ok) {
        toast.error(result.message || "Failed to save banner");
        return;
      }

      toast.success(
        result.message ||
          (isEditMode
            ? "Banner updated successfully!"
            : "Banner added successfully!")
      );

      setIsDialogOpen(false);
      reset();
      setImageFiles([]);

      await revalidateBanners();
    } catch (error: any) {
      console.error(error);
      toast.error("Error saving banner!");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="icon">
            <SquarePen className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Banner
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Banner" : "Add New Banner"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the banner details below."
              : "Fill in the details to create a new banner."}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tagline */}
            <InputField
              name="tagline"
              label="Tagline"
              placeholder="Sip. Savor. Smile."
              rules={{ required: "Tagline is required" }}
            />

            {/* Heading */}
            <InputField
              name="heading"
              label="Heading"
              placeholder="WHERE COMFORT MEETS AROMA"
              rules={{ required: "Heading is required" }}
            />

            {/* Short Description */}
            <InputField
              name="shortDesc"
              label="Short Description"
              placeholder="A cozy corner for every mood..."
              rules={{ required: "Description is required" }}
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Banner Image{" "}
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={5}
                maxFiles={1}
                onFilesChange={setImageFiles}
                existingImageUrl={
                  isEditMode && banner?.image ? banner.image : undefined
                }
                onRemoveExisting={() => {
                  // Optional: Handle when user removes existing image
                  console.log("Existing image removed");
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Adding..."}
                  </>
                ) : isEditMode ? (
                  "Update Banner"
                ) : (
                  "Add Banner"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
