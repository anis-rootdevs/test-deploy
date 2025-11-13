"use client";

import InputField from "@/components/form/InputField";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../_components/FileUploadComponent";

// ✅ Declare form data type
interface BannerFormData {
  tagline: string;
  heading: string;
  shortDesc: string;
}

export default function AddBanner() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const methods = useForm<BannerFormData>();
  const { data: session } = useSession();
  const token = session?.token;
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = methods;

  console.log("sahfkshfhsagh", imageFiles[0]);

  // ✅ Form Submit
  const onSubmit = async (data: BannerFormData) => {
    if (imageFiles.length === 0) {
      toast.error("Please upload an image!");
      return;
    }
    console.log("data", data);

    try {
      const formData = new FormData();
      formData.append("tagline", data.tagline);
      formData.append("heading", data.heading);
      formData.append("shortDesc", data.shortDesc);
      formData.append("image", imageFiles[0]); // single file

      console.log("formData", formData);

      const res = await fetch("/api/admin/banner", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload banner");
      }

      const result = await res.json();
      console.log("✅ Banner Added:", result);
      alert("Banner added successfully!");
    } catch (error: any) {
      console.error(error);
      alert("Error adding banner!");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tagline */}
          <InputField
            name="tagline"
            label="Tagline"
            placeholder="Sip. Savor. Smile."
            rules={{ required: "Tagline is required" }}
          />

          {/* Heading */}
          <InputField
            name="heading"
            label="Heading"
            placeholder="WHERE COMFORT MEETS AROMA"
            rules={{ required: "Heading is required" }}
          />

          {/* Short Description */}
          <InputField
            name="shortDesc"
            label="Short Description"
            placeholder="A cozy corner for every mood..."
            rules={{ required: "Description is required" }}
          />

          {/* Image Upload */}
          <FileUploadComponent
            accept="image"
            maxSize={5}
            maxFiles={1}
            onFilesChange={setImageFiles}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            {isSubmitting ? "Uploading..." : "Add Banner"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
