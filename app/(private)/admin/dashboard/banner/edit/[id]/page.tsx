"use client";
import { getBannerById } from "@/actions/banner/bannerActions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BannerFormData } from "../../create/page";

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
        setSelectedTheme(result.data.theme || 1);
      } else {
        toast.error("Failed to load banner");
      }
    }

    fetchBanner();
  }, []);
  console.log("initialData", initialData);
  console.log(id);
  return <div>banner ?: {id}</div>;
}
