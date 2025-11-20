"use client";

import HeroAroma from "@/components/landing-page/hero-section/hero-aroma";
import HeroAromaCare from "@/components/landing-page/hero-section/hero-aroma-care";
import HeroArtCoffee from "@/components/landing-page/hero-section/hero-art-coffee";
import HeroStories from "@/components/landing-page/hero-section/hero-stories";
import { memo, useEffect, useState } from "react";
import { BannerFormData } from "../create/page";

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

  // Convert File to URL for preview
  useEffect(() => {
    if (data?.image instanceof File) {
      const url = URL.createObjectURL(data.image);
      setImageUrl(url);

      // Cleanup function
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (typeof data?.image === "string") {
      setImageUrl(data.image);
    } else {
      setImageUrl(undefined);
    }
  }, [data?.image]);

  const handleTabClick = (index: number) => {
    const oneBased = index + 1;
    setActiveTab(oneBased);
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Banner Preview</h1>

      {/* Show message if no data */}
      {!data && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Fill in the form to see preview</p>
          <p className="text-sm mt-2">
            Complete all required fields to preview your banner
          </p>
        </div>
      )}

      {/* Show tabs and content only when data exists */}
      {data && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-6 overflow-x-auto">
            {heroes.map((hero, index) => {
              const tabNumber = index + 1;

              return (
                <button
                  key={tabNumber}
                  onClick={() => handleTabClick(index)}
                  className={`px-6 py-3 font-medium transition-colors duration-200 whitespace-nowrap
        ${
          activeTab === tabNumber
            ? "text-amber-700 border-b-2 border-amber-700 bg-amber-50"
            : "text-gray-600"
        }
        ${
          selectedTheme === tabNumber
            ? "bg-green-50 border-b-2 border-green-500"
            : ""
        }
      `}
                >
                  Theme {tabNumber}: {hero.label}
                  {selectedTheme === tabNumber && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                      Selected
                    </span>
                  )}
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
