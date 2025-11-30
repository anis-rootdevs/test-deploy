"use client";

import { createShape, updateShape } from "@/actions/shapeAction/shapeActions";
import PhoneInputField from "@/components/custom/PhoneInputField";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChefShape } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { Loader2, Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";

interface ShapeFormData {
  tagline: string;
  _id: string;
  name: string;
  location?: string;
  dialCode?: string;
  phone?: string;
  image?: string;
  gender?: string;
  status?: boolean;
}

interface ShapeFormModalProps {
  shape?: ChefShape | null;
  isEditMode?: boolean;
}

export default function ShapeFormModal({
  shape,
  isEditMode = false,
}: ShapeFormModalProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<ShapeFormData>();
  const { handleRefresh } = useTableState("shape");

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (isEditMode && shape) {
        reset({
          tagline: shape.tagline,
          name: shape.name,
          phone: shape.phone,
          dialCode: shape.dialCode,
          gender: shape.gender,
        });
      } else {
        reset({
          tagline: "",
          name: "",
          phone: "",
          dialCode: "+880",
          gender: "",
          image: undefined,
        });
      }
      setImageFiles([]);
    }
  }, [isDialogOpen, shape, isEditMode, reset]);

  const onSubmit = async (data: ShapeFormData) => {
    // Validate image only for add mode
    if (!isEditMode && imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tagline", data.tagline);
      formData.append("name", data.name);

      let cleanPhone = String(data.phone || "");
      const dialCode = String(data.dialCode || "").replace("+", "");

      // If phone starts with dial code, remove it
      if (cleanPhone.startsWith(dialCode)) {
        cleanPhone = cleanPhone.substring(dialCode.length);
      }

      formData.append("phone", cleanPhone);
      formData.append("dialCode", String(data.dialCode || ""));
      formData.append("gender", data.gender || "");

      // Add image if selected
      if (imageFiles.length > 0) {
        const file = imageFiles[0];
        formData.append("image", file, file.name);
      }

      const loadingToast = toast.loading(
        isEditMode ? "Updating Shape..." : "Adding Shape..."
      );

      const result = isEditMode
        ? await updateShape(shape?._id || "", formData)
        : await createShape(formData);

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save Shape");
        return;
      }

      toast.success(
        result.message ||
          (isEditMode
            ? "Shape updated successfully!"
            : "Shape added successfully!")
      );
      handleRefresh();

      setIsDialogOpen(false);
      reset();
      setImageFiles([]);
    } catch (error: any) {
      console.error(error);
      toast.error("Error saving shape!");
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
            Add New Shape
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Shape Details" : "Add New Shape"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the Shape details below."
              : "Fill in the details to create a new Shape."}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tagline */}
            <InputField
              name="tagline"
              label="Tagline"
              placeholder="WHERE COMFORT MEETS AROMA"
              rules={{ required: "Tagline is required!" }}
            />

            {/* Name */}
            <InputField
              name="name"
              label="Name"
              placeholder="Mr. Chef Doctor"
              rules={{ required: "Name is required!" }}
            />

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Gender</label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required!" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full !h-11">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-sm text-red-500">
                  {errors.gender.message as string}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <PhoneInputField
              name="phone"
              dialCodeName="dialCode"
              label="Phone Number"
              required={true}
              defaultCountry="bd"
              className="mt-2"
              errorBadge={false}
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Shape Image
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageFiles}
                existingImageUrl={
                  isEditMode && shape?.image ? shape.image : undefined
                }
                onRemoveExisting={() => {
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
                  "Update Shape"
                ) : (
                  "Add Shape"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
