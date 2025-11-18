"use client";

import {
  createCategory,
  updateCategory,
} from "@/actions/categories/categoriesActions";
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
import { Category } from "@/lib/types";
import { Loader2, Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface categoriesFormModalProps {
  category?: Category | null;
  isEditMode?: boolean;
}

export default function CategoriesFormModal({
  category,
  isEditMode,
}: categoriesFormModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<Category>();

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { isSubmitting },
  } = methods;

  // Watch the name field
  const nameValue = watch("name");

  // Function to generate slug from name
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Auto-generate slug when name changes
  useEffect(() => {
    if (nameValue) {
      const slug = generateSlug(nameValue);
      setValue("slug", slug, {
        shouldValidate: true,
        shouldTouch: true,
      });
      clearErrors("slug");
    }
  }, [nameValue, setValue]);

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (isEditMode && category) {
        reset({
          name: category.name,
          slug: category.slug,
        });
      } else {
        reset({
          name: "",
          slug: "",
        });
      }
    }
  }, [isDialogOpen, category, isEditMode, reset]);

  const onSubmit = async (data: Category) => {
    try {
      const payload = {
        ...data,
      };

      const result = isEditMode
        ? await updateCategory(category?._id || "", payload)
        : await createCategory(payload);

      const loadingToast = toast.loading(
        isEditMode ? "Updating Category..." : "Adding Category..."
      );

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save category");
        return;
      }

      toast.success(
        result.message ||
          (isEditMode
            ? "Category updated successfully!"
            : "Category added successfully!")
      );

      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast.error("Error saving Category!");
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
            Add New Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the category details below."
              : "Fill in the details to create a new category."}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tagline */}
            <InputField
              name="name"
              label="Name"
              placeholder="soft Drinks"
              rules={{ required: "Required!" }}
            />

            {/* Heading */}
            <InputField
              name="slug"
              label="Slug"
              placeholder="soft-drinks"
              rules={{ required: "Required!" }}
            />
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
                  "Update Category"
                ) : (
                  "Add Category"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
