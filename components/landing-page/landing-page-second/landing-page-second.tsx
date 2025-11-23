import { getBanner } from "@/actions/banner/bannerActions";
import ImageGalleryLanding from "@/components/gallery/image-gallery-landing";
import { Suspense } from "react";
import BookReservationHome2 from "../book-reserve-section/book-reservation-home2";
import ChefShapeHome from "../chef-shape/chef-shape-home";
import HeroSectionHome from "../hero-section/hero-section-home";
import HeroSectionLoader from "../hero-section/HeroSectionLoader";
import MenuSectionHome2 from "../menu-section/menu-section-home2";
import PopularItemsCard from "../populat-items/popular-items-card";
import StorySectionHome from "../story-section/story-section-home";
import VisitHomeSection2 from "../visit-us-section/visit-home-section2";

const LandingPageSecond = async () => {
  const banners = await getBanner();
  return (
    <>
      <Suspense fallback={<HeroSectionLoader />}>
        <HeroSectionHome banners={banners?.data} />
      </Suspense>
      <StorySectionHome />
      <VisitHomeSection2 />
      <PopularItemsCard />
      <MenuSectionHome2 />
      <ChefShapeHome />
      <ImageGalleryLanding />
      <BookReservationHome2 />
    </>
  );
};

export default LandingPageSecond;
