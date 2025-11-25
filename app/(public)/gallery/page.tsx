"use client";

import { getAllGalleries } from "@/actions/gallery/galleryActions";
import GalleryImagesDetails from "@/components/gallery/gallery-images-details";
import MenuHeroSection from "@/components/landing-page/menu-section/menu-hero-section";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 10;

const GalleryHome = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [page, setPage] = useState(1); // Start at 1 (first page)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchGallery = useCallback(
    async (pageNum: number) => {
      if (loading) return;

      setLoading(true);

      try {
        // Calculate offset: (page - 1) * LIMIT
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

        // Update hasMore based on API response
        setHasMore(hasNextPage);

        // Update page for next fetch
        if (hasNextPage) {
          setPage(pageNum + 1);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
        if (initialLoad) setInitialLoad(false);
      }
    },
    [loading, initialLoad]
  );

  // Initial load on mount
  useEffect(() => {
    fetchGallery(1);
  }, []); // Empty dependency - only run once

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // Don't set up observer during initial load or if no more data
    if (initialLoad || !loaderRef.current || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Only fetch if loader is visible, not loading, and has more data
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
  }, [initialLoad, loading, hasMore, page, fetchGallery]);

  return (
    <div>
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Gallery"
      />

      <GalleryImagesDetails gallery={gallery} />

      {/* Loader + Status messages */}
      <div
        ref={loaderRef}
        className="h-12 flex justify-center items-center mt-4"
      >
        {loading && <p className="text-gray-500 text-sm">Loading more...</p>}
        {!loading && !hasMore && gallery.length > 0 && (
          <p className="text-gray-400 text-sm">No more items to show</p>
        )}
        {!loading && !hasMore && gallery.length === 0 && (
          <p className="text-gray-400 text-sm">No items found</p>
        )}
      </div>
    </div>
  );
};

export default GalleryHome;
