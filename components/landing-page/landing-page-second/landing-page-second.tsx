import { getBanner } from "@/actions/banner/bannerActions";
import { getAllFeaturedGallery } from "@/actions/gallery/galleryActions";
import {
  getFeaturedProducts,
  getMostLovedProducts,
} from "@/actions/product/productActions";
import ImageGalleryLanding from "@/components/gallery/image-gallery-landing";
import { Suspense } from "react";
import BookReservationHome2 from "../book-reserve-section/book-reservation-home2";
import ChefShapeHome from "../chef-shape/ChefShapeHome";
import HeroSectionHome from "../hero-section/hero-section-home";
import HeroSectionLoader from "../hero-section/HeroSectionLoader";
import { MenuItemCardSkeleton } from "../menu-section/menu-items-card-loader";
import MenuSectionHome2 from "../menu-section/menu-section-home2";
import PopularItemsCard from "../populat-items/popular-items-card";
import StorySectionHome from "../story-section/story-section-home";
import VisitHomeSection2 from "../visit-us-section/visit-home-section2";

const LandingPageSecond = async () => {
  const banners = await getBanner();
  const mostLovedProducts = await getMostLovedProducts(5);
  const featuredProducts = await getFeaturedProducts(6);
  const gallery = await getAllFeaturedGallery(6);
  return (
    <>
      <Suspense fallback={<HeroSectionLoader />}>
        <HeroSectionHome banners={banners?.data || []} />
      </Suspense>
      <StorySectionHome />
      <VisitHomeSection2 />
      <Suspense fallback={<p>loading..................</p>}>
        <PopularItemsCard mostLovedProducts={mostLovedProducts.data || []} />
      </Suspense>

      <Suspense fallback={<MenuItemCardSkeleton />}>
        <MenuSectionHome2 featuredProducts={featuredProducts?.data || []} />
      </Suspense>

      <ChefShapeHome />
      <Suspense fallback={<p>Loading...</p>}>
        <ImageGalleryLanding gallery={gallery?.data || []} />
      </Suspense>
      <BookReservationHome2 />
    </>
  );
};

export default LandingPageSecond;
