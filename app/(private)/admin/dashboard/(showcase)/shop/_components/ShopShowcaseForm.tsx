"use client";

import { updateShopShowcase } from "@/actions/showcase/showcaseActions";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShopShowcase } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../../_components/FileUploadComponent";

interface ShopShowcaseFormData {
  tagline: string;
  heading: string;
  shortDesc: string;
  coffeeLovers: string;
  featured: boolean;
}

interface ShopShowcaseFormProps {
  showCase?: ShopShowcase | null;
  isEditMode?: boolean;
}

export default function ShopShowcaseForm({
  showCase,
  isEditMode = false,
}: ShopShowcaseFormProps) {
  const [imageOneFiles, setImageOneFiles] = useState<File[]>([]);
  const [imageTwoFiles, setImageTwoFiles] = useState<File[]>([]);
  const [imageThreeFiles, setImageThreeFiles] = useState<File[]>([]);

  const methods = useForm<ShopShowcaseFormData>({
    defaultValues: {
      tagline: "",
      heading: "",
      shortDesc: "",
      coffeeLovers: "",
      featured: false,
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
        shortDesc: showCase.shortDesc || "",
        coffeeLovers: String(showCase.coffeeLovers || ""),
      });
    } else {
      reset({
        tagline: "",
        heading: "",
        shortDesc: "",
        coffeeLovers: "",
      });
    }
    setImageOneFiles([]);
    setImageTwoFiles([]);
    setImageThreeFiles([]);
  }, [showCase, reset]);

  const onSubmit = async (data: ShopShowcaseFormData) => {
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
      formData.append("shortDesc", data.shortDesc);
      formData.append("coffeeLovers", data.coffeeLovers);
      formData.append("featured", String(data.featured));

      // Add images if selected
      if (imageOneFiles.length > 0) {
        const file = imageOneFiles[0];
        formData.append("imageOne", file, file.name);
      }

      if (imageTwoFiles.length > 0) {
        const file = imageTwoFiles[0];
        formData.append("imageTwo", file, file.name);
      }

      if (imageThreeFiles.length > 0) {
        const file = imageThreeFiles[0];
        formData.append("imageThree", file, file.name);
      }

      // Use showCase._id for update, or empty string for create
      const showcaseId = showCase?._id || "";
      const result = await updateShopShowcase(showcaseId, formData);

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
        setImageOneFiles([]);
        setImageTwoFiles([]);
        setImageThreeFiles([]);
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

          <div className="w-full">
            <Label className="text-sm font-jost font-medium mb-1 block">
              Short Description
            </Label>
            <Textarea
              {...methods.register("shortDesc", {
                required: "Required!",
              })}
              name="shortDesc"
              placeholder="Brew & Bite Café brings people together..."
            />
          </div>

          {/* Coffee Lovers Count */}
          <InputField
            name="coffeeLovers"
            label="Coffee Lovers Count"
            placeholder="100"
            type="number"
            rules={{
              required: "Coffee lovers count is required!",
              min: { value: 0, message: "Must be a positive number" },
            }}
          />

          {/* Image Uploads */}
          <div className="flex items-center gap-4">
            {/* Image Upload 1 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Showcase Image 1{" "}
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageOneFiles}
                existingImageUrl={
                  showCase?.imageOne ? showCase?.imageOne : undefined
                }
                onRemoveExisting={() => {
                  console.log("Image one removed");
                }}
              />
            </div>

            {/* Image Upload 2 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Showcase Image 2
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageTwoFiles}
                existingImageUrl={
                  showCase?.imageTwo ? showCase?.imageTwo : undefined
                }
                onRemoveExisting={() => {
                  console.log("Image two removed");
                }}
              />
            </div>

            {/* Image Upload 3 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Showcase Image 3
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageThreeFiles}
                existingImageUrl={
                  showCase?.imageThree ? showCase?.imageThree : undefined
                }
                onRemoveExisting={() => {
                  console.log("Image three removed");
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
                "Update Showcase"
              ) : (
                "Add Showcase"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
