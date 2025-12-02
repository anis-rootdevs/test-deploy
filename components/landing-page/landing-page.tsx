import { getBanner } from "@/actions/banner/bannerActions";
import { getAllFeaturedGallery } from "@/actions/gallery/galleryActions";
import {
  getFeaturedProducts,
  getMostLovedProducts,
} from "@/actions/product/productActions";
import { getAllChefList } from "@/actions/shapeAction/shapeActions";
import { getShowcase } from "@/actions/showcase/showcaseActions";
import { Suspense } from "react";
import ImageGalleryLanding from "../gallery/image-gallery-landing";
import BookReserveHome from "./book-reserve-section/book-reserve-home";
import ChefShapeHome from "./chef-shape/ChefShapeHome";
import HeroSectionHome from "./hero-section/hero-section-home";
import HeroSectionLoader from "./hero-section/HeroSectionLoader";
import MenuHome from "./menu-section/menu-home";
import { MenuItemCardSkeleton } from "./menu-section/menu-items-card-loader";
import PopularItemsCard from "./populat-items/popular-items-card";
import StorySectionHome from "./story-section/story-section-home";
import VisitHomeSection from "./visit-us-section/visit-home-section";

const LandingPage = async () => {
  const banners = await getBanner();
  const mostLovedProducts = await getMostLovedProducts(5);
  const featuredProducts = await getFeaturedProducts(6);
  const gallery = await getAllFeaturedGallery(6);
  const chefList = await getAllChefList();
  const showCase = await getShowcase();

  return (
    <>
      <Suspense fallback={<HeroSectionLoader />}>
        <HeroSectionHome banners={banners?.data} />
      </Suspense>
      <Suspense fallback={<p>loading..................</p>}>
        <StorySectionHome showCase={showCase?.data} />
      </Suspense>
      <Suspense fallback={<p>loading..................</p>}>
        <PopularItemsCard mostLovedProducts={mostLovedProducts.data || []} />
      </Suspense>
      <Suspense fallback={<MenuItemCardSkeleton />}>
        <MenuHome featuredProducts={featuredProducts?.data || []} />
      </Suspense>
      <VisitHomeSection />
      <Suspense fallback={<p>Loading...</p>}>
        <ChefShapeHome chefList={chefList?.data} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <ImageGalleryLanding gallery={gallery?.data || []} />
      </Suspense>
      <BookReserveHome />
    </>
  );
};

export default LandingPage;
