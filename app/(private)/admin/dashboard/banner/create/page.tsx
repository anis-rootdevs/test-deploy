"use client";

import { useState } from "react";
import BannerForm from "../_components/BannerForm";
import BannerPreview from "../_components/BannerPreview";

export interface BannerFormData {
  tagline: string;
  heading: string;
  shortDesc: string;
  image?: File | string;
}

export default function BannerCreate() {
  const [previewData, setPreviewData] = useState<BannerFormData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);

  const handleFormChange = (data: BannerFormData) => {
    setPreviewData(data);
  };

  const handleThemeSelect = (themeIndex: number) => {
    setSelectedTheme(themeIndex);
  };

  const handleSubmit = async (formData: FormData, themeId: number) => {
    // Add theme ID to formData
    formData.append("themeId", themeId.toString());

    // Your API call here
    console.log("Submitting with theme:", themeId);
    // await createBanner(formData);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <BannerForm
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          selectedTheme={selectedTheme}
        />
      </div>
      <div className="col-span-2">
        <BannerPreview
          data={previewData}
          onThemeSelect={handleThemeSelect}
          selectedTheme={selectedTheme}
        />
      </div>
    </div>
  );
}
