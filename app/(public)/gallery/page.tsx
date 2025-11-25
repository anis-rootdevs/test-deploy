"use client";

import { getAllGalleries } from "@/actions/gallery/galleryActions";
import GalleryImagesDetails from "@/components/gallery/gallery-images-details";
import MenuHeroSection from "@/components/landing-page/menu-section/menu-hero-section";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 5;

const GalleryHome = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [page, setPage] = useState(0); // Start at 0
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchGallery = useCallback(async () => {
    // Guard: prevent duplicate calls and check if more data exists
    if (loading || !hasMore) {
      console.log("Fetch blocked:", { loading, hasMore });
      return;
    }

    setLoading(true);

    try {
      // Calculate offset based on current page
      const offset = page * LIMIT;
      console.log("Fetching page:", page, "offset:", offset);

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
        setPage((prev) => prev + 1); // Increment for next fetch
      }

      // Set hasMore based on API response
      setHasMore(hasNextPage);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setHasMore(false); // Stop trying if there's an error
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Initial load on mount
  useEffect(() => {
    fetchGallery();
  }, []); // Only run once on mount

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // Don't set up observer if no more data
    if (!loaderRef.current || !hasMore) {
      console.log("Observer not set up:", {
        hasRef: !!loaderRef.current,
        hasMore,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Only fetch if the loader is visible and conditions are met
        if (entries[0].isIntersecting && !loading && hasMore) {
          console.log("Loader visible, triggering fetch");
          fetchGallery();
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: "100px", // Start loading 100px before reaching the loader
      }
    );

    const currentLoader = loaderRef.current;
    observer.observe(currentLoader);
    console.log("Observer set up for infinite scroll");

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
        console.log("Observer cleaned up");
      }
    };
  }, [loading, hasMore, fetchGallery]);

  return (
    <div>
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Gallery"
      />

      <GalleryImagesDetails gallery={gallery} />

      {/* Loader + No more items message */}
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
