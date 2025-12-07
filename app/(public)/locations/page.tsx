export const dynamic = "force-dynamic";
import { getAllOutlets } from "@/actions/outlets/outletsActions";
import { getAllSettingsDetails } from "@/actions/settings/settingsActions";
import MenuHeroSection from "@/components/landing-page/menu-section/MenuHeroSection";
import LocationCardComponents from "@/components/locations/location-card-components";
import { Outlets } from "@/lib/types";

const LocationsHomePage = async () => {
  const allOutlets = await getAllOutlets();
  const data: Outlets[] = allOutlets?.data || [];
  const settings = await getAllSettingsDetails("pageBanner");

  return (
    <div className="">
      <MenuHeroSection
        imageSrc={
          settings?.data?.location ||
          "/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        }
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
