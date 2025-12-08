"use client";

import {
  createProduct,
  getProductById,
  updateProduct,
} from "@/actions/product/productActions";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/config/routes";
import { Category, Products } from "@/lib/types";
import { BadgeAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";
import FormSkeletonLoader from "./FormSkeletonLoader";
import FormSwitch from "./FormSwitch";

interface ProductFormData {
  name: string;
  price: string;
  shortDesc: string;
  category: string;
  image: FileList;
  mostLoved: boolean;
  featured: boolean;
  new: boolean;
}

interface ProductFormProps {
  categories: Category[];
  productId?: string;
}

export default function ProductForm({
  categories,
  productId,
}: ProductFormProps) {
  const isEditMode = Boolean(productId);

  const [loading, setLoading] = useState(isEditMode);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [product, setProduct] = useState<Products | null>(null);
  const router = useRouter();

  const methods = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: "",
      shortDesc: "",
      category: "",
      image: {} as FileList,
      mostLoved: false,
      featured: false,
      new: false,
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);
      const res = await getProductById(productId);
      if (res?.status && res.data) {
        const product = res.data;
        setProduct(product);

        reset({
          name: product.name,
          price: product.price.toString(),
          shortDesc: product.shortDesc,
          category:
            categories.find((category) => category.name === product.category)
              ?._id || "",
          mostLoved: product.mostLoved || false,
          featured: product.featured || false,
          new: product.new || false,
        });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId, reset, categories]);

  const onSubmit = async (data: ProductFormData) => {
    // Validate image for create mode
    if (!isEditMode && imageFiles.length === 0) {
      toast.error("Please upload a product image!");
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
      formData.append("new", String(data.new));

      if (imageFiles.length > 0) {
        formData.append("image", imageFiles[0]);
      }

      const loadingToast = toast.loading(
        isEditMode ? "Updating product..." : "Creating product..."
      );

      const res = isEditMode
        ? await updateProduct(productId!, formData)
        : await createProduct(formData);

      toast.dismiss(loadingToast);

      if (!res.status) {
        toast.error(res.message || "Failed to save product!");
        return;
      }

      toast.success(
        res.message ||
          (isEditMode
            ? "Product updated successfully!"
            : "Product created successfully!")
      );
      //   redirect to products home
      router.push(routes.privateRoutes.admin.products.home);

      // Reset form and files on success (only for create mode)
      if (!isEditMode) {
        reset();
        setImageFiles([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="lg:w-1/2 md:w-2/3 w-full">
        <FormSkeletonLoader />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* NAME + PRICE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="name"
            label="Product Name"
            placeholder="Burger"
            rules={{ required: "Required!" }}
          />

          <InputField
            name="price"
            label="Price"
            placeholder="120"
            rules={{
              required: "Required!",
            }}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label className="text-sm font-jost font-medium mb-1 block">
            Description
          </Label>
          <Controller
            name="shortDesc"
            control={control}
            rules={{ required: "Required!" }}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Enter product description"
                className="mt-1.5"
              />
            )}
          />
          {errors.shortDesc && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <BadgeAlert className="h-4 w-4" /> {errors.shortDesc.message}
            </p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <Label className="text-sm font-jost font-medium mb-1 block">
            Category
          </Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Required!" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="mt-1.5 !h-12 rounded-[4px] w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <BadgeAlert className="h-4 w-4" /> {errors.category.message}
            </p>
          )}
        </div>

        {/* SWITCHES */}
        <div>
          <Label className="text-sm font-jost font-medium mb-1 block">
            Tags
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormSwitch
              label="Most Loved"
              name="mostLoved"
              description="Show this product in the Most Loved section"
            />
            <FormSwitch
              label="Featured"
              name="featured"
              description="Show this product in the Featured Products section"
            />
            <FormSwitch
              label="New Arrival"
              name="new"
              description="Show this product in the New Arrival Products section"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="text-sm font-jost font-medium mb-1 block">
            Product Image
          </label>
          <FileUploadComponent
            accept="image"
            maxSize={10}
            maxFiles={1}
            onFilesChange={setImageFiles}
            existingImageUrl={
              isEditMode && product?.image ? product.image : undefined
            }
            onRemoveExisting={() => {}}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
