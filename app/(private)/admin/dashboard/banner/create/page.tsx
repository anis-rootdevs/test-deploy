"use client";

import { createBanner } from "@/actions/banner/bannerActions";
import { routes } from "@/config/routes";
import { BannerFormData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import BannerForm from "../_components/BannerForm";
import BannerPreview from "../_components/BannerPreview";

export default function BannerCreate() {
  const [previewData, setPreviewData] = useState<BannerFormData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<number>(1);

  const handleFormChange = (data: BannerFormData) => {
    setPreviewData(data);
  };

  const handleThemeSelect = (themeIndex: number) => {
    setSelectedTheme(themeIndex);
  };

  const router = useRouter();

  const handleSubmit = async (formData: FormData, themeId: number) => {
    const loadingToast = toast.loading("Creating banner...");

    try {
      formData.append("theme", String(themeId));

      const result = await createBanner(formData);

      if (result?.status) {
        toast.success(result.message || "Banner created successfully!");
        setPreviewData(null);
        setSelectedTheme(1);
        router.push(routes.privateRoutes.admin.banner.home);
      } else {
        toast.error(result?.message || "Failed to create banner");
      }

      return result;
    } catch (error) {
      toast.error("An error occurred while creating the banner");
      throw error;
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Form Section */}
      <div className="lg:w-[400px] xl:w-[480px] flex-shrink-0">
        <BannerForm
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          selectedTheme={selectedTheme}
        />
      </div>

      <div className="hidden lg:block w-px bg-gray-200 self-stretch"></div>

      {/* Preview Section */}
      <div className="flex-1 min-w-0">
        <BannerPreview
          data={previewData}
          onThemeSelect={handleThemeSelect}
          selectedTheme={selectedTheme}
        />
      </div>
    </div>
  );
}
