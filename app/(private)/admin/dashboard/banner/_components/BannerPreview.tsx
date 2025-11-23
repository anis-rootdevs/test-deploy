"use client";

import HeroAroma from "@/components/landing-page/hero-section/hero-aroma";
import HeroAromaCare from "@/components/landing-page/hero-section/hero-aroma-care";
import HeroArtCoffee from "@/components/landing-page/hero-section/hero-art-coffee";
import HeroStories from "@/components/landing-page/hero-section/hero-stories";
import HeroSectionLoader from "@/components/landing-page/hero-section/HeroSectionLoader";
import { BannerFormData } from "@/lib/types";
import { memo, useEffect, useState } from "react";

interface BannerPreviewProps {
  data: BannerFormData | null;
  onThemeSelect: (themeIndex: number) => void;
  selectedTheme: number | null;
}

function BannerPreview({
  data,
  onThemeSelect,
  selectedTheme,
}: BannerPreviewProps) {
  const [activeTab, setActiveTab] = useState(1);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const isIncomplete =
    !data || !data.tagline || !data.heading || !data.shortDesc || !data.image;

  // Convert File to URL for preview
  useEffect(() => {
    if (isIncomplete) return;

    // START LOADING for 5 seconds
    setLoading(true);

    let timeout: NodeJS.Timeout;

    if (data?.image instanceof File) {
      const url = URL.createObjectURL(data.image);
      setImageUrl(url);

      timeout = setTimeout(() => setLoading(false), 500);

      return () => {
        URL.revokeObjectURL(url);
        clearTimeout(timeout);
      };
    }

    if (typeof data?.image === "string") {
      setImageUrl(data.image);
      timeout = setTimeout(() => setLoading(false), 500);
    }

    return () => timeout && clearTimeout(timeout);
  }, [data?.image, isIncomplete]);

  useEffect(() => {
    if (selectedTheme !== null) {
      setActiveTab(selectedTheme);
    }
  }, [selectedTheme]);

  const handleTabClick = (index: number) => {
    const oneBased = index + 1;
    // setActiveTab(oneBased);
    onThemeSelect(oneBased);
  };

  // Define heroes array inside render - React will handle optimization
  const heroes = [
    {
      component: (
        <HeroArtCoffee
          tagline={data?.tagline}
          heading={data?.heading}
          shortDesc={data?.shortDesc}
          image={imageUrl}
        />
      ),
      label: "Art Coffee",
    },
    {
      component: (
        <HeroStories
          tagline={data?.tagline}
          heading={data?.heading}
          shortDesc={data?.shortDesc}
          image={imageUrl}
        />
      ),
      label: "Stories",
    },
    {
      component: (
        <HeroAroma
          tagline={data?.tagline}
          heading={data?.heading}
          shortDesc={data?.shortDesc}
          image={imageUrl}
        />
      ),
      label: "Aroma",
    },

    {
      component: (
        <HeroAromaCare
          tagline={data?.tagline}
          heading={data?.heading}
          shortDesc={data?.shortDesc}
          image={imageUrl}
        />
      ),
      label: "Aroma Care",
    },
  ];

  return (
    <div className="w-full p-3">
      <h2 className="text-2xl font-semibold mb-6 font-jost">Preview Banner</h2>

      {/* Show message if no data */}
      {isIncomplete && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-semibold text-primary">
            Fill in the form to see preview
          </p>
          <p className="text-sm mt-2 font-medium text-primary">
            Complete all required fields to preview your banner
          </p>
        </div>
      )}
      {/* Loader */}
      {!isIncomplete && loading && (
        <div className="py-10">
          <HeroSectionLoader />
        </div>
      )}

      {/* Show tabs and content only when data exists */}
      {!isIncomplete && !loading && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-6 overflow-x-auto">
            {heroes.map((hero, index) => {
              const tabNumber = index + 1;

              return (
                <button
                  key={tabNumber}
                  onClick={() => handleTabClick(index)}
                  className={`px-6 py-2 font-medium transition-colors cursor-pointer duration-200 whitespace-nowrap ${
                    activeTab === tabNumber
                      ? "bg-primary rounded-t-[4px] border-b-2 border-primary text-white text-base font-medium"
                      : ""
                  }`}
                >
                  Theme {tabNumber}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300 ease-in-out min-h-[400px]">
            {heroes[activeTab - 1].component}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(BannerPreview);
