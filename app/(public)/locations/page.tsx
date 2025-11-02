import MenuHeroSection from "@/components/landing-page/menu-section/menu-hero-section";
import LocationCardComponents from "@/components/locations/location-card-components";
import { cafesLocationData } from "@/public/sample-data/landing-page-data";

const LocationsHomePage = () => {
  return (
    <div className="">
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Location"
      />
      <div className="mt-16">
        {cafesLocationData.map((cafe, index) => (
          <LocationCardComponents
            key={cafe.id}
            cafeData={cafe}
            imagePosition={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationsHomePage;
