import React from "react";
import ChefCard from "./chef-card";
import { chefs } from "@/public/sample-data/landing-page-data";

const ChefShapeHome = () => {
  return (
    <div className="lg:py-20 py-16 ">
      <div className="max-w-2xl mx-auto ">
        <div className="text-center mb-[36px] md:mb-[50px] px-4">
          <h2 className="font-jost text-[24px] md:text-[36px] font-semibold capitalize mb-[9px]">
            The soul behind every flavor.
          </h2>
          <p className="md:text-base text-sm font-normal font-jost">
            From rich brews to handmade bakes, every creation carries a touch of
            warmth and care. Our chef brings comfort to the table, one flavor at
            a time.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-12 lg:gap-[159px] max-w-[1024px] mx-auto px-4">
        {chefs.map((chef) => (
          <ChefCard
            key={chef.id}
            image={chef.image}
            name={chef.name}
            tagline={chef.tagline}
          />
        ))}
      </div>
    </div>
  );
};

export default ChefShapeHome;
