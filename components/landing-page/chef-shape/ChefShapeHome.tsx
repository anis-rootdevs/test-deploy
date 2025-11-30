"use client";
import { chefs } from "@/public/sample-data/landing-page-data";
import ChefCard from "./ChefCard";
import ChefCardSlider from "./ChefCardSlider";

const ChefShapeHome = () => {
  const total = chefs.length;

  const renderContent = () => {
    // 👉 Case 1: Only 1 item → center it
    if (total === 1) {
      const c = chefs[0];
      return (
        <div className="flex justify-center max-w-[1024px] mx-auto px-4">
          <ChefCard image={c.image} name={c.name} tagline={c.tagline} />
        </div>
      );
    }
    if (total === 2) {
      return (
        <div className="grid grid-cols-2 gap-[130px] max-w-[1024px] mx-auto px-4">
          {chefs.map((chef) => (
            <ChefCard
              key={chef.id}
              image={chef.image}
              name={chef.name}
              tagline={chef.tagline}
            />
          ))}
        </div>
      );
    }

    // 👉 Case 2: <= 3 items → use grid
    if (total <= 3) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 lg:gap-[50px] max-w-[1320px] mx-auto px-4">
          {chefs.map((chef) => (
            <ChefCard
              key={chef.id}
              image={chef.image}
              name={chef.name}
              tagline={chef.tagline}
            />
          ))}
        </div>
      );
    }

    // 👉 Case 3: More than 3 items → Swiper Carousel
    return <ChefCardSlider chefs={chefs} />;
  };

  return (
    <div className="lg:py-20 py-16">
      <div className="max-w-2xl mx-auto">
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

      {renderContent()}
    </div>
  );
};

export default ChefShapeHome;
