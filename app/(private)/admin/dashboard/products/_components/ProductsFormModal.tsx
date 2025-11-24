"use client";

import { createProduct, updateProduct } from "@/actions/product/productActions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, Products } from "@/lib/types";
import { BadgeAlert, Loader2, Plus, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";
import FormSwitch from "./FormSwitch";

interface ProductFormData {
  name: string;
  price: string;
  shortDesc: string;
  category: string;
  image: FileList;
  mostLoved: boolean;
  featured: boolean;
}

interface ProductsFormModalProps {
  product?: Products | null;
  isEditMode?: boolean;
  categories?: Category[];
}

export default function ProductsFormModal({
  product,
  isEditMode = false,
  categories = [],
}: ProductsFormModalProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const methods = useForm<ProductFormData>();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const router = useRouter();

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (isEditMode && product) {
        const matchedCategory = categories.find(
          (cat) => cat.name === product.category
        );
        reset({
          name: product.name,
          price: product.price?.toString(),
          shortDesc: product.shortDesc,
          category: matchedCategory?._id || "",
          mostLoved: product.mostLoved || false,
          featured: product.featured || false,
        });
      } else {
        reset({
          name: "",
          price: "",
          shortDesc: "",
          category: "",
          image: undefined,
          mostLoved: false,
          featured: false,
        });
      }
      setImageFiles([]);
    }
  }, [isDialogOpen, product, isEditMode, reset]);

  const onSubmit = async (data: ProductFormData) => {
    // Validate image only for add mode
    if (!isEditMode && imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("shortDesc", data.shortDesc);
      formData.append("category", data.category);
      formData.append("mostLoved", String(data.mostLoved));
      formData.append("featured", String(data.featured));

      // Add image if selected
      if (imageFiles.length > 0) {
        formData.append("image", imageFiles[0]);
      }

      const result = isEditMode
        ? await updateProduct(product?._id || "", formData)
        : await createProduct(formData);

      const loadingToast = toast.loading(
        isEditMode ? "Updating banner..." : "Adding banner..."
      );

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save banner");
        return;
      }

      toast.success(
        result.message ||
          (isEditMode
            ? "Banner updated successfully!"
            : "Banner added successfully!")
      );
      router.refresh();
      setIsDialogOpen(false);
      reset();
      setImageFiles([]);
    } catch (error: any) {
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
          <Button
            size="sm"
            className="font-jost font-medium rounded-sm h-9 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product" : "Add New Product"}
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
            <div className="md:flex  gap-4">
              <InputField
                name="name"
                label="Name"
                placeholder="Cold Drinks"
                rules={{ required: "Required!" }}
                className="mb-6 md:mb-0"
              />

              {/* Heading */}
              <InputField
                name="price"
                label="Price"
                placeholder="Enter Price"
                rules={{ required: "Required!" }}
              />
            </div>

            {/* Short Description */}
            <div>
              <Label className="text-sm font-jost font-medium mb-1 block">
                Short Description <span className="text-red-500"></span>
              </Label>
              <Controller
                name="shortDesc"
                control={control}
                defaultValue=""
                rules={{ required: "Required!" }}
                render={({ field }) => (
                  <Textarea
                    placeholder="A cozy corner for every mood..."
                    {...field}
                    className="h-24 rounded-[4px]"
                  />
                )}
              />
              {errors.shortDesc && (
                <div className="flex items-center mt-2 gap-1">
                  <BadgeAlert className="text-red-500 h-4 w-4" />
                  <p className="text-red-500 text-xs">
                    {errors.shortDesc.message}
                  </p>
                </div>
              )}
            </div>
            <div className="md:flex justify-between space-y-4 md:space-y-0">
              <FormSwitch
                label="Most Loved"
                name="mostLoved"
                description="Active Most Loved Products"
              />
              <FormSwitch
                label="Featured Products"
                name="featured"
                description="Active featured Products"
              />
            </div>
            <div></div>

            {/* Category Dropdown */}
            <div className="w-full">
              <Label className="text-sm font-jost font-medium mb-1 block">
                Category <span className="text-red-500"></span>
              </Label>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Required!" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={loadingCategories}
                  >
                    <SelectTrigger className="h-12 rounded-[4px] w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategories ? (
                        <div className="flex items-center justify-center py-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : categories.length === 0 ? (
                        <div className="py-2 px-2 text-sm text-gray-500">
                          No categories available
                        </div>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <div className="flex items-center mt-2 gap-1">
                  <BadgeAlert className="text-red-500 h-4 w-4" />
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Image{" "}
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageFiles}
                existingImageUrl={
                  isEditMode && product?.image ? product.image : undefined
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
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
