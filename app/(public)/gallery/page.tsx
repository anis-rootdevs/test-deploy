import GalleryImagesDetails from "@/components/gallery/gallery-images-details";
import MenuHeroSection from "@/components/landing-page/menu-section/menu-hero-section";
import React from "react";

const GalleryHome = () => {
  return (
    <div>
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Gallery"
      />
      <GalleryImagesDetails />
    </div>
  );
};

export default GalleryHome;
