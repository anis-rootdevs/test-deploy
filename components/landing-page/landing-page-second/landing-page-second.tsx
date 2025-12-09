import { getBanner } from "@/actions/banner/bannerActions";
import { getAllFeaturedGallery } from "@/actions/gallery/galleryActions";
import {
  getFeaturedProducts,
  getMostLovedProducts,
  getNewProducts,
} from "@/actions/product/productActions";
import { getAllChefList } from "@/actions/shapeAction/shapeActions";
import {
  getAllReservationShowcase,
  getShowcase,
} from "@/actions/showcase/showcaseActions";
import ImageGalleryLanding from "@/components/gallery/image-gallery-landing";
import { Suspense } from "react";
import BookReservationHome2 from "../book-reserve-section/BookReservationHome2";
import ChefShapeHome from "../chef-shape/ChefShapeHome";
import HeroSectionHome from "../hero-section/hero-section-home";
import HeroSectionLoader from "../hero-section/HeroSectionLoader";
import { MenuItemCardSkeleton } from "../menu-section/menu-items-card-loader";
import MenuSectionHome2 from "../menu-section/menu-section-home2";
import PopularItemsCard from "../populat-items/popular-items-card";
import StorySectionHome from "../story-section/StorySectionHome";
import VisitHomeSectionTwo from "../visit-us-section/VisitHomeSectionTwo";

const LandingPageSecond = async () => {
  const banners = await getBanner();
  const mostLovedProducts = await getMostLovedProducts(5);
  const featuredProducts = await getFeaturedProducts(6);
  const gallery = await getAllFeaturedGallery(6);
  const chefList = await getAllChefList();
  const showCase = await getShowcase();
  const newProducts = await getNewProducts(5);
  const reservationShowcase = await getAllReservationShowcase();
  return (
    <>
      <Suspense fallback={<HeroSectionLoader />}>
        <HeroSectionHome banners={banners?.data || []} />
      </Suspense>
      <Suspense fallback={<p>loading..................</p>}>
        <StorySectionHome showCase={showCase?.data || []} />
      </Suspense>
      <Suspense fallback={<p>loading..................</p>}>
        <VisitHomeSectionTwo newProducts={newProducts?.data || []} />
      </Suspense>
      <Suspense fallback={<p>loading....</p>}>
        <PopularItemsCard mostLovedProducts={mostLovedProducts.data || []} />
      </Suspense>

      <Suspense fallback={<MenuItemCardSkeleton />}>
        <MenuSectionHome2 featuredProducts={featuredProducts?.data || []} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <ChefShapeHome chefList={chefList?.data || []} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <ImageGalleryLanding gallery={gallery?.data || []} />
      </Suspense>
      <Suspense fallback={<p>Loading...................</p>}>
        <BookReservationHome2
          reservationShowcase={reservationShowcase?.data || []}
        />
      </Suspense>
    </>
  );
};

export default LandingPageSecond;
