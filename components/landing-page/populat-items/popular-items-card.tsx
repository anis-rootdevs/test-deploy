"use client";
import { MostLovedItems } from "@/lib/types";
import PopularItemsHome from "./popular-items-home";

const PopularItemsCard = ({
  mostLovedProducts,
}: {
  mostLovedProducts: MostLovedItems[];
}) => {
  const handleExploreClick = () => {
    // Add your navigation logic here
    // router.push('/menu');
  };
  return (
    <>
      <PopularItemsHome
        items={mostLovedProducts}
        onExploreClick={handleExploreClick}
      />
    </>
  );
};

export default PopularItemsCard;
