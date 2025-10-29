import React from "react";
import HeroSectionHome from "./hero-section/hero-section-home";
import StorySectionHome from "./story-section/story-section-home";
import MenuHome from "./menu-section/menu-home";

const LandingPage = () => {
  return (
    <div>
      <HeroSectionHome />
      <StorySectionHome />
      <MenuHome />
    </div>
  );
};

export default LandingPage;
