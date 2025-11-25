// components/gallery/gallery-load-more.tsx
"use client";

import { getAllGalleries } from "@/actions/gallery/galleryActions";
import { Galleries } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryImagesDetails from "./gallery-images-details";

const LIMIT = 10;

interface GalleryLoadMoreProps {
  initialGallery: Galleries[];
  initialHasMore: boolean;
}

const GalleryLoadMore = ({
  initialGallery,
  initialHasMore,
}: GalleryLoadMoreProps) => {
  const [gallery, setGallery] = useState<Galleries[]>(initialGallery);
  const [page, setPage] = useState(2); // Start at page 2 (page 1 already loaded)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchGallery = useCallback(
    async (pageNum: number) => {
      if (loading) return;

      setLoading(true);

      try {
        const offset = (pageNum - 1) * LIMIT;
        console.log("Fetching page:", pageNum, "offset:", offset);

        const res = await getAllGalleries(LIMIT, offset);
        const docs = res?.data?.docs || [];
        const hasNextPage = res?.data?.hasNext ?? false;

        console.log("API Response:", {
          docsCount: docs.length,
          hasNext: hasNextPage,
          currentPage: res?.data?.page,
          totalPages: res?.data?.totalPage,
        });

        if (docs.length > 0) {
          setGallery((prev) => [...prev, ...docs]);
        }

        setHasMore(hasNextPage);

        if (hasNextPage) {
          setPage(pageNum + 1);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    if (!loaderRef.current || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          console.log("Loader visible, fetching page:", page);
          fetchGallery(page);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const currentLoader = loaderRef.current;
    observer.observe(currentLoader);

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading, hasMore, page, fetchGallery]);

  return (
    <>
      <GalleryImagesDetails gallery={gallery} />

      {/* Show empty state only if no items at all */}
      {!loading && gallery.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-400 text-sm">No gallery items available</p>
        </div>
      )}

      {/* Loader + Status messages */}
      <div
        ref={loaderRef}
        className="h-12 flex justify-center items-center mt-4"
      >
        {loading && <p className="text-gray-500 text-sm">Loading more...</p>}
        {!loading && !hasMore && gallery.length > 0 && (
          <p className="text-gray-400 text-sm">No more items to show</p>
        )}
      </div>
    </>
  );
};

export default GalleryLoadMore;
