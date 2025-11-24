import { getAllOutlets } from "@/actions/outlets/outletsActions";
import MenuHeroSection from "@/components/landing-page/menu-section/menu-hero-section";
import LocationCardComponents from "@/components/locations/location-card-components";
import { Outlets } from "@/lib/types";

const LocationsHomePage = async () => {
  const allOutlets = await getAllOutlets(2);
  const data: Outlets[] = allOutlets?.data?.docs || [];

  return (
    <div className="">
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Location"
      />
      <div className="mt-16">
        {data.map((cafe: Outlets, index: number) => (
          <LocationCardComponents
            key={cafe._id}
            cafeData={cafe}
            imagePosition={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationsHomePage;
