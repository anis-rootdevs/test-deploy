"use client";
import { updateOfferShowcase } from "@/actions/showcase/showcaseActions";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { OfferShowcase } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../../_components/FileUploadComponent";
interface ReservationShowcaseFormData {
  tagline: string;
  heading: string;
  deadline: string;
}

interface ReservationShowcaseFormProps {
  showCase?: OfferShowcase | null;
  isEditMode?: boolean;
}

export default function OfferShowcaseForm({
  showCase,
  isEditMode = false,
}: ReservationShowcaseFormProps) {
  const [lightImageFiles, setLightImageFiles] = useState<File[]>([]);

  const methods = useForm<ReservationShowcaseFormData>({
    defaultValues: {
      tagline: "",
      heading: "",
      deadline: "",
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
        deadline: showCase.deadline || "",
      });
    } else {
      reset({
        tagline: "",
        heading: "",
        deadline: "",
      });
    }
    setLightImageFiles([]);
  }, [showCase, reset]);

  const onSubmit = async (data: ReservationShowcaseFormData) => {
    // Validate at least one image for create mode
    // if (imageOneFiles.length === 0) {
    //   toast.error("Please upload at least one image!");
    //   return;
    // }

    try {
      const loadingToast = toast.loading(
        isEditMode ? "Updating showcase..." : "Adding showcase..."
      );

      const formData = new FormData();

      // Append all text fields
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("deadline", data.deadline);

      // Add images if selected
      if (lightImageFiles.length > 0) {
        const file = lightImageFiles[0];
        formData.append("image", file, file.name);
      }

      // Use showCase._id for update, or empty string for create
      const showcaseId = showCase?._id || "";
      const result = await updateOfferShowcase(showcaseId, formData);

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
                existingImageUrl={showCase?.image ? showCase?.image : undefined}
                onRemoveExisting={() => {
                  console.log("Image one removed");
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
