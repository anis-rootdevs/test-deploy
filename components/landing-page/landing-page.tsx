import { getBanner } from "@/actions/banner/bannerActions";
import { Suspense } from "react";
import ImageGalleryLanding from "../gallery/image-gallery-landing";
import BookReserveHome from "./book-reserve-section/book-reserve-home";
import ChefShapeHome from "./chef-shape/chef-shape-home";
import HeroSectionHome from "./hero-section/hero-section-home";
import HeroSectionLoader from "./hero-section/HeroSectionLoader";
import MenuHome from "./menu-section/menu-home";
import PopularItemsCard from "./populat-items/popular-items-card";
import StorySectionHome from "./story-section/story-section-home";
import VisitHomeSection from "./visit-us-section/visit-home-section";

const LandingPage = async () => {
  const banners = await getBanner();

  return (
    <>
      <Suspense fallback={<HeroSectionLoader />}>
        <HeroSectionHome banners={banners?.data} />
      </Suspense>
      <StorySectionHome />
      <PopularItemsCard />
      <MenuHome />
      <VisitHomeSection />
      <ChefShapeHome />
      <ImageGalleryLanding />
      <BookReserveHome />
    </>
  );
};

export default LandingPage;
