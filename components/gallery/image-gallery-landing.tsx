"use client";

import { Galleries } from "@/lib/types";
import GalleryImageCard from "./gallery-image-card";
import GalleryIntroCard from "./gallery-intro-card";

const ImageGalleryLanding = ({ gallery }: { gallery: Galleries[] }) => {

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
          {gallery[0] && (
            <div className="h-[272px]">
              <GalleryImageCard
                src={gallery[0].image}
                quote={gallery[0].tagline}
                author={gallery[0].capturedBy}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          {gallery[1] && (
            <div className="h-[272px]">
              <GalleryImageCard
                src={gallery[1].image}
                quote={gallery[1].tagline}
                author={gallery[1].capturedBy}
                className="h-full"
              />
            </div>
          )}
          {gallery[2] && (
            <div className="h-[449px]">
              <GalleryImageCard
                src={gallery[2].image}
                quote={gallery[2].tagline}
                author={gallery[2].capturedBy}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          {gallery[3] && (
            <div className="h-[449px]">
              <GalleryImageCard
                src={gallery[3].image}
                quote={gallery[3].tagline}
                author={gallery[3].capturedBy}
                className="h-full"
              />
            </div>
          )}
          {gallery[4] && (
            <div className="h-[272px]">
              <GalleryImageCard
                src={gallery[4].image}
                quote={gallery[4].tagline}
                author={gallery[4].capturedBy}
                className="h-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout (2-column grid) */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        <div className="h-[449px]">
          <GalleryIntroCard />
        </div>
        {gallery.map((item, i) => (
          <div key={i} className="h-[300px]">
            <GalleryImageCard
              src={item.image}
              quote={item.tagline}
              author={item.capturedBy}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGalleryLanding;
