"use client";
import { getBannerById, updateBanner } from "@/actions/banner/bannerActions";
import DashboardLoader from "@/components/custom/DashboardLoader";
import { BannerFormData } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BannerForm from "../../_components/BannerForm";
import BannerPreview from "../../_components/BannerPreview";

export default function BannerEditPage() {
  const [initialData, setInitialData] = useState<BannerFormData | null>(null);
  const [previewData, setPreviewData] = useState<BannerFormData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchBanner() {
      if (!id) return;
      const result = await getBannerById(id as string);

      if (result?.status) {
        setInitialData(result.data);
        setPreviewData(result.data);
        setSelectedTheme(result.data.theme || "");
      } else {
        toast.error("Failed to load banner");
      }
    }

    fetchBanner();
  }, [id]);

  const handleFormChange = (data: BannerFormData) => {
    setPreviewData(data);
  };

  const handleSubmit = async (formData: FormData, themeId: number) => {
    const loadingToast = toast.loading("Updating banner...");

    try {
      formData.append("theme", String(themeId));
      formData.append("_id", String(id as string));

      const result = await updateBanner(id as string, formData);

      if (result?.status) {
        toast.success("Banner updated successfully!");
        router.push("/admin/dashboard/banner");
      } else {
        toast.error(result?.message || "Failed to update banner");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // loading state
  if (!initialData)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <DashboardLoader />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="lg:w-[400px] xl:w-[480px] flex-shrink-0">
        <BannerForm
          defaultValues={initialData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          selectedTheme={selectedTheme}
        />
      </div>

      {/* Separator - visible only on large screens */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch"></div>

      <div className="flex-1 min-w-0">
        <BannerPreview
          data={previewData}
          onThemeSelect={setSelectedTheme}
          selectedTheme={selectedTheme}
        />
      </div>
    </div>
  );
}
