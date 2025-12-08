"use client";

import { updateStoryShowcase } from "@/actions/showcase/showcaseActions";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StoryShowcase } from "@/lib/types";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../../_components/FileUploadComponent";

interface ValueItem {
  _id?: string;
  title: string;
  shortDesc: string;
  icon?: File | null;
  existingIconUrl?: string;
  _delete?: boolean;
}

interface StoryShowcaseFormData {
  tagline: string;
  heading: string;
  shortDesc: string;
  story: string;
  valueShortDesc: string;
}

interface StoryShowcaseFormProps {
  showCase?: StoryShowcase | null;
  isEditMode?: boolean;
}

export default function StoryShowcaseForm({
  showCase,
  isEditMode = false,
}: StoryShowcaseFormProps) {
  const [imageOneFiles, setImageOneFiles] = useState<File[]>([]);
  const [imageTwoFiles, setImageTwoFiles] = useState<File[]>([]);
  const [imageThreeFiles, setImageThreeFiles] = useState<File[]>([]);
  const [values, setValues] = useState<ValueItem[]>([]);

  const methods = useForm<StoryShowcaseFormData>({
    defaultValues: {
      tagline: "",
      heading: "",
      shortDesc: "",
      story: "",
      valueShortDesc: "",
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
        story: showCase.story || "",
        valueShortDesc: showCase.valueShortDesc || "",
      });

      // Set values from showcase
      if (showCase.values && Array.isArray(showCase.values)) {
        setValues(
          showCase.values.map((val: any) => ({
            _id: val._id,
            title: val.title || "",
            shortDesc: val.shortDesc || "",
            existingIconUrl: val.icon || "",
            icon: null,
          }))
        );
      }
    } else {
      reset({
        tagline: "",
        heading: "",
        shortDesc: "",
        story: "",
        valueShortDesc: "",
      });
      setValues([]);
    }
    setImageOneFiles([]);
    setImageTwoFiles([]);
    setImageThreeFiles([]);
  }, [showCase, reset]);

  // Add new value item
  const handleAddValue = () => {
    setValues([
      ...values,
      {
        title: "",
        shortDesc: "",
        icon: null,
      },
    ]);
  };

  // Remove value item
  const handleRemoveValue = (index: number) => {
    const value = values[index];

    // If it has an _id, mark for deletion instead of removing
    if (value._id) {
      const updatedValues = [...values];
      updatedValues[index] = { ...value, _delete: true };
      setValues(updatedValues);
    } else {
      // If no _id, just remove it from the array
      setValues(values.filter((_, i) => i !== index));
    }
  };

  // Update value field
  const handleValueChange = (
    index: number,
    field: keyof ValueItem,
    value: any
  ) => {
    const updatedValues = [...values];
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value,
    };
    setValues(updatedValues);
  };

  // Handle icon file change
  const handleIconChange = (index: number, files: File[]) => {
    if (files.length > 0) {
      handleValueChange(index, "icon", files[0]);
    }
  };

  const onSubmit = async (data: StoryShowcaseFormData) => {
    try {
      const loadingToast = toast.loading(
        isEditMode ? "Updating story showcase..." : "Adding story showcase..."
      );

      const formData = new FormData();

      // Append all text fields
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("shortDesc", data.shortDesc);
      formData.append("story", data.story);
      formData.append("valueShortDesc", data.valueShortDesc);

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

      // Add values array
      values.forEach((value, index) => {
        formData.append(`values[${index}].title`, value.title);
        formData.append(`values[${index}].shortDesc`, value.shortDesc);

        if (value._id) {
          formData.append(`values[${index}]._id`, value._id);
        }

        if (value._delete) {
          formData.append(`values[${index}]._delete`, "true");
        }

        if (value.icon instanceof File) {
          formData.append(`values[${index}].icon`, value.icon, value.icon.name);
        }
      });

      // Use showCase._id for update, or empty string for create
      const showcaseId = showCase?._id || "";
      const result = await updateStoryShowcase(showcaseId, formData);

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save story showcase");
        return;
      }

      toast.success(
        result.message ||
          `Story Showcase ${isEditMode ? "updated" : "added"} successfully!`
      );

      // Reset form and images on success (only in create mode)
      if (!isEditMode) {
        reset();
        setImageOneFiles([]);
        setImageTwoFiles([]);
        setImageThreeFiles([]);
        setValues([]);
      }
    } catch (error: any) {
      toast.error("Error saving showcase!");
    }
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="w-full">
            <Label className="text-sm font-jost font-medium mb-1 block">
              Story
            </Label>
            <Textarea
              {...methods.register("story", {
                required: "Required!",
              })}
              name="story"
              placeholder="Brew & Bite Café brings people together..."
            />
          </div>
          <div className="w-full">
            <Label className="text-sm font-jost font-medium mb-1 block">
              Value Description
            </Label>
            <Textarea
              {...methods.register("valueShortDesc", {
                required: "Required!",
              })}
              name="story"
              placeholder="At Neer, we believe great experiences..."
            />
          </div>

          <InputField
            name="tagline"
            label="Tagline"
            placeholder="Find your favorite corner and unwind."
            rules={{ required: "Required!" }}
          />

          {/* Image Uploads */}
          <div className="grid md:grid-cols-3 items-center gap-4">
            {/* Image Upload 1 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Story Image 1
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageOneFiles}
                existingImageUrl={
                  showCase?.imageOne ? showCase?.imageOne : undefined
                }
                onRemoveExisting={() => {}}
              />
            </div>

            {/* Image Upload 2 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Story Image 2
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageTwoFiles}
                existingImageUrl={
                  showCase?.imageTwo ? showCase?.imageTwo : undefined
                }
                onRemoveExisting={() => {}}
              />
            </div>

            {/* Image Upload 3 */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Story Image 3
              </label>
              <FileUploadComponent
                accept="image"
                maxSize={10}
                maxFiles={1}
                onFilesChange={setImageThreeFiles}
                existingImageUrl={
                  showCase?.imageThree ? showCase?.imageThree : undefined
                }
                onRemoveExisting={() => {}}
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-jost font-semibold dark:text-white">
                Values
              </Label>
              <Button
                type="button"
                onClick={handleAddValue}
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Value
              </Button>
            </div>

            {/* Values Cards */}
            <div className="space-y-3 grid md:grid-cols-3 grid-cols-1 gap-2">
              {values.map(
                (value, index) =>
                  !value._delete && (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-black"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-white">
                          Value {index + 1}
                        </h4>
                        <Button
                          type="button"
                          onClick={() => handleRemoveValue(index)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium mb-1 block">
                            Title
                          </Label>
                          <Input
                            type="text"
                            value={value.title}
                            onChange={(e) =>
                              handleValueChange(index, "title", e.target.value)
                            }
                            placeholder="Quality Beans"
                            className="w-full px-3 h-11 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-1 block">
                            Short Description
                          </Label>
                          <Textarea
                            value={value.shortDesc}
                            onChange={(e) =>
                              handleValueChange(
                                index,
                                "shortDesc",
                                e.target.value
                              )
                            }
                            placeholder="Ethically sourced and freshly roasted..."
                            className="resize-none"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-1 block">
                            Icon
                          </Label>
                          <FileUploadComponent
                            accept="image"
                            maxSize={5}
                            maxFiles={1}
                            onFilesChange={(files) =>
                              handleIconChange(index, files)
                            }
                            existingImageUrl={value.existingIconUrl}
                            onRemoveExisting={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}

              {values.filter((v) => !v._delete).length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                  <p className="text-sm">
                    No values added yet. Click "Add Value" to create one.
                  </p>
                </div>
              )}
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
                "Update Story Showcase"
              ) : (
                "Add Story Showcase"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
