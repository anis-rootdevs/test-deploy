"use client";

import React from "react";
import GalleryImageCard from "./gallery-image-card";
import GalleryIntroCard from "./gallery-intro-card";
import { galleryItems } from "@/public/sample-data/landing-page-data";

const ImageGalleryLanding = () => {
  return (
    <section className="max-w-[1320px] mx-auto py-12 md:py-20 px-4">
      {/* Desktop & Tablet Layout (3-column grid) */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="h-[449px]">
            <GalleryIntroCard />
          </div>
          {/* Image below intro */}
          <div className="h-[272px]">
            <GalleryImageCard
              src={galleryItems[0].src}
              quote={galleryItems[0].quote}
              author={galleryItems[0].author}
              className="h-full"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <div className="h-[272px]">
            <GalleryImageCard
              src={galleryItems[1].src}
              quote={galleryItems[1].quote}
              author={galleryItems[1].author}
              className="h-full"
            />
          </div>
          <div className="h-[449px]">
            <GalleryImageCard
              src={galleryItems[2].src}
              quote={galleryItems[2].quote}
              author={galleryItems[2].author}
              className="h-full"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <div className="h-[449px] border">
            <GalleryImageCard
              src={galleryItems[3].src}
              quote={galleryItems[3].quote}
              author={galleryItems[3].author}
              className="h-full"
            />
          </div>
          <div className="h-[272px]">
            <GalleryImageCard
              src={galleryItems[4].src}
              quote={galleryItems[4].quote}
              author={galleryItems[4].author}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile layout (2-column grid) */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        <div className="h-[449px]">
          <GalleryIntroCard />
        </div>
        {galleryItems.map((item, i) => (
          <div key={i} className="h-[300px]">
            <GalleryImageCard
              src={item.src}
              quote={item.quote}
              author={item.author}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGalleryLanding;
