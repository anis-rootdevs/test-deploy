"use client";
import { getProductList } from "@/actions/product/productActions";
import { updateOfferShowcase } from "@/actions/showcase/showcaseActions";
import DatePickerField from "@/components/custom/DatePickerFiled";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { OfferShowcase, Products } from "@/lib/types";
import { Loader2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Product search states
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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

  const fetchProducts = useCallback(async (search: string) => {
    try {
      setIsSearching(true);
      const result = await getProductList(1, 10, search, {});
      setProducts(result?.data?.docs || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDropdownOpen) {
        fetchProducts(searchText);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, isDropdownOpen, fetchProducts]);

  useEffect(() => {
    if (showCase) {
      reset({
        tagline: showCase.tagline || "",
        heading: showCase.heading || "",
        deadline: showCase.deadline || "",
      });

      // Set selected products if they exist in showCase
      if (showCase.products && Array.isArray(showCase.products)) {
        setSelectedProducts(showCase.products);
      }
    } else {
      reset({
        tagline: "",
        heading: "",
        deadline: "",
      });
      setSelectedProducts([]);
    }
    setImageFiles([]);
  }, [showCase, reset]);

  // Load initial products
  useEffect(() => {
    fetchProducts("");
  }, [fetchProducts]);

  const handleProductSelect = (product: Products) => {
    // Check if product is already selected
    const isAlreadySelected = selectedProducts.some(
      (p) => p._id === product._id
    );

    if (!isAlreadySelected) {
      setSelectedProducts([...selectedProducts, product]);
    }

    setSearchText("");
    setIsDropdownOpen(false);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
  };

  const onSubmit = async (data: ReservationShowcaseFormData) => {
    // Validate selected products
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product!");
      return;
    }

    try {
      const loadingToast = toast.loading(
        isEditMode ? "Updating showcase..." : "Update Offer showcase..."
      );

      const formData = new FormData();

      // Append all text fields
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("deadline", data.deadline);

      // Append selected product IDs
      selectedProducts.forEach((product, index) => {
        formData.append(`products[${index}]`, product._id);
      });

      // IMAGE LOGIC
      if (imageFiles.length > 0) {
        const file = imageFiles[0];
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
        setImageFiles([]);
        setSelectedProducts([]);
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

          <InputField
            name="heading"
            label="Heading"
            placeholder="A STORY BREWED WITH PASSION"
            rules={{ required: "Required!" }}
          />

          <DatePickerField
            name="deadline"
            control={methods.control}
            label="DeadLine"
            placeholder="Select reservation date and time"
            required
            enableTime={false}
            time_24hr={false}
            minuteIncrement={15}
            dateFormat="Y-m-d"
            minDate="today"
            rules={{ required: "Required!" }}
            error={methods.formState.errors.deadline}
            containerClassName="w-full"
            errorBadge={false}
            labelClassName="text-sm"
          />

          {/* Product Search and Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Products</label>

            {/* Selected Products Display */}
            {selectedProducts.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border">
                {selectedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm"
                  >
                    <span className="text-sm">{product.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(product._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Search Dropdown */}
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                      <p className="text-sm mt-2">Searching...</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No products found
                    </div>
                  ) : (
                    products.map((product) => {
                      const isSelected = selectedProducts.some(
                        (p) => p._id === product._id
                      );
                      return (
                        <button
                          key={product._id}
                          type="button"
                          onClick={() => handleProductSelect(product)}
                          disabled={isSelected}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0 ${
                            isSelected
                              ? "bg-gray-100 cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Product Image */}
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-md border"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-xs text-gray-400">
                                  No img
                                </span>
                              </div>
                            )}

                            {/* Product Details */}
                            <div className="flex-1">
                              <div className="font-medium">{product.name}</div>
                              {product.price && (
                                <div className="text-sm text-gray-500">
                                  ${product.price}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Image</label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageFiles}
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
                "Update Offer"
              ) : (
                "Update Offer Showcase"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
