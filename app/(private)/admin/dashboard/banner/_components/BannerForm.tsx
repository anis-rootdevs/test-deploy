"use client";

import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";
import { BannerFormData } from "../create/page";

interface BannerFormProps {
  onFormChange: (data: BannerFormData) => void;
  onSubmit: (formData: FormData, theme: number) => Promise<void>;
  selectedTheme: number | null;
}

export default function BannerForm({
  onFormChange,
  onSubmit,
  selectedTheme,
}: BannerFormProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<string>("");

  const methods = useForm<BannerFormData>({
    defaultValues: {
      tagline: "",
      heading: "",
      shortDesc: "",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  // Debounced update function to prevent multiple renders
  const updatePreview = useCallback(
    (tagline: string, heading: string, shortDesc: string, image?: File) => {
      // Clear previous timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Set new timeout for debouncing
      updateTimeoutRef.current = setTimeout(() => {
        // Only update if all required fields have values
        if (tagline && heading && shortDesc) {
          // Create a hash of current data to check if it actually changed
          const currentDataHash = JSON.stringify({
            tagline,
            heading,
            shortDesc,
            imageName: image?.name,
          });

          // Only trigger update if data actually changed
          if (currentDataHash !== lastDataRef.current) {
            lastDataRef.current = currentDataHash;
            onFormChange({
              tagline,
              heading,
              shortDesc,
              image: image || undefined,
            });
          }
        }
      }, 800);
    },
    [onFormChange]
  );

  // Watch form fields with manual update control
  const tagline = watch("tagline");
  const heading = watch("heading");
  const shortDesc = watch("shortDesc");

  // Update preview when fields change (debounced)
  useEffect(() => {
    updatePreview(tagline || "", heading || "", shortDesc || "", imageFiles[0]);

    // Cleanup on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [tagline, heading, shortDesc, imageFiles, updatePreview]);

  const handleFormSubmit = async (data: BannerFormData) => {
    // Validate image
    if (imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }

    // Validate theme selection
    if (selectedTheme === null) {
      toast.error("Please select a theme from preview!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("shortDesc", data.shortDesc);
      formData.append("image", imageFiles[0]);

      await onSubmit(formData, selectedTheme);

      reset({
        tagline: "",
        heading: "",
        shortDesc: "",
      });
      setImageFiles([]);
    } catch (error) {
      toast.error("Error creating banner!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Add New Banner</h2>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details to create a new banner.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Tagline */}
          <InputField
            name="tagline"
            label="Tagline"
            placeholder="Sip. Savor. Smile."
            rules={{ required: "Required!" }}
          />

          {/* Heading */}
          <InputField
            name="heading"
            label="Heading"
            placeholder="WHERE COMFORT MEETS AROMA"
            rules={{ required: "Required!" }}
          />

          {/* Short Description */}
          <InputField
            name="shortDesc"
            label="Short Description"
            placeholder="A cozy corner for every mood..."
            rules={{ required: "Required!" }}
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Banner Image
            </label>
            <FileUploadComponent
              accept="image"
              maxSize={5}
              maxFiles={1}
              onFilesChange={setImageFiles}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset({
                  tagline: "",
                  heading: "",
                  shortDesc: "",
                });
                setImageFiles([]);
                lastDataRef.current = "";
              }}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Banner"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
