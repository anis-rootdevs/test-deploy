"use client";

import { updateReservationShowcase } from "@/actions/showcase/showcaseActions";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { ReservationShowcase } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../../_components/FileUploadComponent";

interface ReservationShowcaseFormData {
  tagline: string;
  heading: string;
  cta: string;
  featured: boolean;
}

interface ReservationShowcaseFormProps {
  showCase?: ReservationShowcase | null;
  isEditMode?: boolean;
}

export default function ReservationShowcaseForm({
  showCase,
  isEditMode = false,
}: ReservationShowcaseFormProps) {
  const [lightImageFiles, setLightImageFiles] = useState<File[]>([]);
  const [darkImageFiles, setDarkImageFiles] = useState<File[]>([]);

  const methods = useForm<ReservationShowcaseFormData>({
    defaultValues: {
      tagline: "",
      heading: "",
      cta: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Reset form when component mounts or showCase changes
  useEffect(() => {
    if (showCase) {
      reset({
        tagline: showCase.tagline || "",
        heading: showCase.heading || "",
        cta: showCase.cta || "",
      });
    } else {
      reset({
        tagline: "",
        heading: "",
        cta: "",
      });
    }
    setLightImageFiles([]);
    setDarkImageFiles([]);
  }, [showCase, reset]);

  const onSubmit = async (data: ReservationShowcaseFormData) => {
    try {
      const loadingToast = toast.loading(
        isEditMode ? "Updating showcase..." : "Adding showcase..."
      );

      const formData = new FormData();

      // Append all text fields
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("cta", data.cta);

      // Add images if selected
      if (lightImageFiles.length > 0) {
        const file = lightImageFiles[0];
        formData.append("lightImage", file, file.name);
      }

      if (darkImageFiles.length > 0) {
        const file = darkImageFiles[0];
        formData.append("darkImage", file, file.name);
      }

      // Use showCase._id for update, or empty string for create
      const showcaseId = showCase?._id || "";
      const result = await updateReservationShowcase(showcaseId, formData);

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save showcase");
        return;
      }

      toast.success(
        result.message ||
          `Showcase ${isEditMode ? "updated" : "added"} successfully!`
      );

      // Reset form and images on success (only in create mode)
      if (!isEditMode) {
        reset();
        setDarkImageFiles([]);
        setLightImageFiles([]);
      }
    } catch (error: any) {
      toast.error("Error saving showcase!");
    }
  };
  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            name="cta"
            label="Call To Action"
            placeholder="cta"
            rules={{ required: "Required!" }}
          />
          <InputField
            name="tagline"
            label="Tagline"
            placeholder="Find your favorite corner and unwind."
            rules={{ required: "Required!" }}
          />

          {/* Heading */}
          <InputField
            name="heading"
            label="Heading"
            placeholder="A STORY BREWED WITH PASSION"
            rules={{ required: "Required!" }}
          />

          {/* Image Uploads */}
          <div className="flex items-center gap-4">
            {/* Image Upload 1 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Light Mode Image
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setLightImageFiles}
                existingImageUrl={
                  showCase?.lightImage ? showCase?.lightImage : undefined
                }
                onRemoveExisting={() => {
                  console.log("Image one removed");
                }}
              />
            </div>

            {/* Image Upload 2 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Dark Mode Image
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setDarkImageFiles}
                existingImageUrl={
                  showCase?.darkImage ? showCase?.darkImage : undefined
                }
                onRemoveExisting={() => {
                  console.log("Image removed");
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : isEditMode ? (
                "Update Reservation"
              ) : (
                "Add Reservation"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
