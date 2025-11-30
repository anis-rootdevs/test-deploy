// app/(public)/gallery/page.tsx
import { getAllGalleries } from "@/actions/gallery/galleryActions";
import GalleryLoadMore from "@/components/gallery/GalleryLoadMore";
import MenuHeroSection from "@/components/landing-page/menu-section/MenuHeroSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LIMIT = 10;

const GalleryPage = async () => {
  let initialGallery = [];
  let initialHasMore = false;

  try {
    const res = await getAllGalleries(LIMIT, 1);
    initialGallery = res?.data?.docs || [];
    initialHasMore = res?.data?.hasNext ?? false;
  } catch (error) {
    console.error("Error fetching gallery:", error);
  }

  return (
    <>
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Gallery"
      />

      {/* Client component handles infinite scroll */}
      <GalleryLoadMore
        initialGallery={initialGallery}
        initialHasMore={initialHasMore}
      />
    </>
  );
};

export default GalleryPage;
