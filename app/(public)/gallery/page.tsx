// app/(public)/gallery/page.tsx
import { getAllGalleries } from "@/actions/gallery/galleryActions";
import GalleryLoadMore from "@/components/gallery/GalleryLoadMore";
import MenuHeroSection from "@/components/landing-page/menu-section/menu-hero-section";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LIMIT = 10;

const GalleryPage = async () => {
  // ✅ Fetch initial data server-side
  let initialGallery = [];
  let initialHasMore = false;

  try {
    const res = await getAllGalleries(LIMIT, 0);
    initialGallery = res?.data?.docs || [];
    initialHasMore = res?.data?.hasNext ?? false;
  } catch (error) {
    console.error("Error fetching gallery:", error);
  }

  return (
    <div>
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Gallery"
      />

      {/* ✅ Client component handles infinite scroll */}
      <GalleryLoadMore
        initialGallery={initialGallery}
        initialHasMore={initialHasMore}
      />
    </div>
  );
};

export default GalleryPage;
