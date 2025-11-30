"use client";

import { createGallery, updateGallery } from "@/actions/gallery/galleryActions";
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
import { Galleries } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { Loader2, Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";
import FormSwitch from "../../products/_components/FormSwitch";
interface GalleryFormData {
  tagline: string;
  capturedBy: string;
  featured: boolean;
}
interface GalleryFormModalProps {
  gallery?: Galleries | null;
  isEditMode?: boolean;
}

export default function GalleryFormModal({
  gallery,
  isEditMode = false,
}: GalleryFormModalProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<GalleryFormData>();
  const { handleRefresh } = useTableState("gallery");

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (isEditMode && gallery) {
        reset({
          tagline: gallery.tagline,
          capturedBy: gallery.capturedBy,
          featured: gallery.featured || false,
        });
      } else {
        reset({
          tagline: "",
          capturedBy: "",
          featured: false,
        });
      }
      setImageFiles([]);
    }
  }, [isDialogOpen, gallery, isEditMode, reset]);

  const onSubmit = async (data: GalleryFormData) => {
    // Validate image only for add mode
    if (!isEditMode && imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }
    console.log("data svg", data);

    try {
      const formData = new FormData();
      formData.append("tagline", data.tagline);
      formData.append("capturedBy", data.capturedBy);
      formData.append("featured", String(data.featured));

      // Add image if selected
      if (imageFiles.length > 0) {
        const file = imageFiles[0];
        formData.append("image", file, file.name);
      }

      const result = isEditMode
        ? await updateGallery(gallery?._id || "", formData)
        : await createGallery(formData);

      const loadingToast = toast.loading(
        isEditMode ? "Updating Gallery..." : "Adding Gallery..."
      );

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save Gallery");
        return;
      }

      toast.success(
        result.message ||
          (isEditMode
            ? "Gallery updated successfully!"
            : "Gallery added successfully!")
      );
      handleRefresh();

      setIsDialogOpen(false);
      reset();
      setImageFiles([]);
    } catch (error: any) {
      console.error(error);
      toast.error("Error saving gallery!");
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="icon" className="cursor-pointer">
            <SquarePen className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            className="font-jost font-medium rounded-sm h-9 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Gallery Image" : "Add New Gallery Image"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the gallery details below."
              : "Fill in the details to create a new gallery."}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tagline */}
            <InputField
              name="tagline"
              label="Tagline"
              placeholder="gallery"
              rules={{ required: "Required!" }}
            />

            {/* Heading */}
            <InputField
              name="capturedBy"
              label="Captured By"
              placeholder="Name"
              rules={{ required: "Required!" }}
            />
            <FormSwitch
              label="Mark as Featured"
              name="featured"
              description="Show this gallery in the Featured Gallery section"
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Gallery Image{" "}
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageFiles}
                existingImageUrl={
                  isEditMode && gallery?.image ? gallery.image : undefined
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
                  "Update Gallery"
                ) : (
                  "Add Gallery"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
