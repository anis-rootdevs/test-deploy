"use client";
import { popularMenuItems } from "@/public/sample-data/landing-page-data";
import PopularItemsHome from "./popular-items-home";

const PopularItemsCard = () => {
  const handleExploreClick = () => {
    console.log("Explore More Menu clicked!");
    // Add your navigation logic here
    // router.push('/menu');
  };
  return (
    <>
      <PopularItemsHome
        items={popularMenuItems}
        onExploreClick={handleExploreClick}
      />
    </>
  );
};

export default PopularItemsCard;
