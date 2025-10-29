import React from "react";
import HeroSectionHome from "./hero-section/hero-section-home";
import StorySectionHome from "./story-section/story-section-home";
import MenuHome from "./menu-section/menu-home";
import ChefShapeHome from "./chef-shape/chef-shape-home";
import BookReserveHome from "./book-reserve-section/book-reserve-home";

const LandingPage = () => {
  return (
    <div>
      <HeroSectionHome />
      <StorySectionHome />
      <MenuHome />
      <ChefShapeHome />
      <BookReserveHome />
    </div>
  );
};

export default LandingPage;
