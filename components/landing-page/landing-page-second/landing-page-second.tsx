import React from "react";
import HeroSectionHome from "../hero-section/hero-section-home";
import StorySectionHome from "../story-section/story-section-home";
import ChefShapeHome from "../chef-shape/chef-shape-home";
import MenuSectionHome2 from "../menu-section/menu-section-home2";
import VisitHomeSection2 from "../visit-us-section/visit-home-section2";
import BookReservationHome2 from "../book-reserve-section/book-reservation-home2";
import ImageGalleryLanding from "@/components/gallery/image-gallery-landing";
import PopularItemsCard from "../populat-items/popular-items-card";

const LandingPageSecond = () => {
  return (
    <>
      <HeroSectionHome />
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
