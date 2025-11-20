"use client";

import { createOutlets, updateOutlets } from "@/actions/outlets/outletsActions";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Outlets } from "@/lib/types";
import { BadgeAlert, Loader2, Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FileUploadComponent from "../../_components/FileUploadComponent";

interface ProductsFormModalProps {
  outlet?: Outlets | null;
  isEditMode?: boolean;
}

export default function OutletsFormModal({
  outlet,
  isEditMode = false,
}: ProductsFormModalProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm<Outlets>();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (isEditMode && outlet) {
        reset({
          name: outlet.name,
          location: outlet.location,
          phone: outlet.phone,
          dialCode: outlet.dialCode,
        });
      } else {
        reset({
          name: "",
          location: "",
          phone: "",
          dialCode: "",
          image: undefined,
        });
      }
      setImageFiles([]);
    }
  }, [isDialogOpen, outlet, isEditMode, reset]);

  const onSubmit = async (data: Outlets) => {
    // Validate image only for add mode
    if (!isEditMode && imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("location", data.location || "");
      formData.append("phone", String(data.phone || ""));
      formData.append("dialCode", String(data.dialCode || ""));

      // Add image if selected
      if (imageFiles.length > 0) {
        formData.append("image", imageFiles[0]);
      }

      const loadingToast = toast.loading(
        isEditMode ? "Updating outlet..." : "Adding outlet..."
      );

      const result = isEditMode
        ? await updateOutlets(outlet?._id || "", formData)
        : await createOutlets(formData);

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save outlet");
        return;
      }

      toast.success(
        result.message ||
          (isEditMode
            ? "Outlet updated successfully!"
            : "Outlet added successfully!")
      );

      setIsDialogOpen(false);
      reset();
      setImageFiles([]);
    } catch (error: any) {
      toast.error("Error saving outlet!");
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
          <Button
            size="sm"
            className="font-jost font-medium rounded-sm h-9 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Outlet
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Outlet" : "Add New Outlet"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the outlet details below."
              : "Fill in the details to create a new outlet."}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <InputField
              name="name"
              label="Name"
              placeholder="outlet name"
              rules={{ required: "Required!" }}
            />

            {/* Phone Number */}
            <div>
              <Label className="text-sm font-jost font-medium mb-1 block">
                Phone Number
              </Label>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: "Required!" }}
                render={({ field }) => (
                  <PhoneInput
                    country={"bd"}
                    value={field.value}
                    onChange={(value, country) => {
                      field.onChange(value);
                      if (country && "dialCode" in country) {
                        methods.setValue("dialCode", `+${country.dialCode}`);
                      }
                    }}
                    containerClass="w-full"
                    inputClass={`!w-full !h-12 !text-sm !rounded-md !bg-input !text-foreground !border !border-border focus:!border-primary
          ${errors.phone ? "!border-destructive" : ""}`}
                    buttonClass={`!rounded-l-md !bg-muted !text-foreground !border !border-border ${
                      errors.phone ? "!border-destructive" : ""
                    }
        `}
                    dropdownClass="
          !bg-popover !text-foreground !border !border-border
        "
                  />
                )}
              />
              {errors.phone && (
                <div className="flex items-center mt-2 gap-1">
                  <BadgeAlert className="text-red-500 h-4 w-4" />
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-jost font-medium mb-1 block">
                Location
              </Label>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                rules={{ required: "Required!" }}
                render={({ field }) => (
                  <Textarea
                    placeholder="Espresso, steamed milk, caramel syrup..."
                    {...field}
                    className={`h-24 rounded-[4px] text-[16px] font-semibold tracking-[0.5px] font-mono focus-visible:ring-2 ${
                      errors.location
                        ? "focus-visible:ring-red-500 border-red-500"
                        : "focus-visible:ring-blue-500"
                    }`}
                  />
                )}
              />
              {errors.location && (
                <div className="flex items-center mt-2 gap-1">
                  <BadgeAlert className="text-red-500 h-4 w-4" />
                  <p className="text-red-500 text-xs">
                    {errors.location.message}
                  </p>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Outlet Image
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={5}
                maxFiles={1}
                onFilesChange={setImageFiles}
                existingImageUrl={
                  isEditMode && outlet?.image ? outlet.image : undefined
                }
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
                  "Update Outlet"
                ) : (
                  "Add Outlet"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
