// components/gallery/gallery-images-details.tsx
import { Galleries } from "@/lib/types";
import GalleryImageCard from "./gallery-image-card";

function splitIntoColumns(items: Galleries[], columns: number) {
  const result: Galleries[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    result[index % columns].push(item);
  });
  return result;
}

interface GalleryImagesDetailsProps {
  gallery: Galleries[];
}

const GalleryImagesDetails = ({ gallery }: GalleryImagesDetailsProps) => {
  // ✅ Safety check with default to empty array
  const safeGallery = gallery ?? [];

  // ✅ Early return if no items
  if (safeGallery.length === 0) {
    return null;
  }

  const columns = splitIntoColumns(safeGallery, 3);

  return (
    <section className="max-w-[1320px] mx-auto py-12 md:py-20 px-4">
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {col.map((item, i) => (
              <div
                key={item._id || `item-${i}`}
                className={i % 2 === 0 ? "h-[449px]" : "h-[272px]"}
              >
                <GalleryImageCard
                  src={item.image}
                  quote={item.tagline}
                  author={item.capturedBy}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {safeGallery.map((item, i) => (
          <div key={item._id || `mobile-item-${i}`} className="h-[300px]">
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

export default GalleryImagesDetails;
