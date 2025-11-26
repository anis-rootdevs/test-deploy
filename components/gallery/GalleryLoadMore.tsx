// components/gallery/gallery-load-more.tsx
"use client";

import { getAllGalleries } from "@/actions/gallery/galleryActions";
import { Galleries } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryImagesDetails from "./GalleryImagesDetails";

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
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchGallery = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;

      setLoading(true);

      try {
        const res = await getAllGalleries(LIMIT, pageNum);

        const docs = res?.data?.docs || [];
        const hasNextPage = res?.data?.hasNext ?? false;

        if (docs.length > 0) {
          setGallery((prev) => [...prev, ...docs]);
        }

        setHasMore(hasNextPage);

        if (hasNextPage) {
          setPage(pageNum + 1); // next page index
        }
      } catch (error) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            fetchGallery(page);
          }, 500); // 500ms debounce
        }
      },
      {
        threshold: 0.1,
        rootMargin: "120px",
      }
    );

    const currentRef = loaderRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [page, hasMore, loading, fetchGallery]);

  return (
    <>
      <GalleryImagesDetails gallery={gallery} loading={loading} />

      {/* Empty state */}
      {!loading && gallery.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-400 text-sm">No gallery items available</p>
        </div>
      )}

      <div ref={loaderRef} className="h-12 flex justify-center items-center">
        {!loading && !hasMore && gallery.length > 0 && (
          <p className="text-lg font-jost font-medium text-primary">
            No more items to show
          </p>
        )}
      </div>
    </>
  );
};

export default GalleryLoadMore;
