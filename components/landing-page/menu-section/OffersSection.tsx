import CustomSeparator from "@/components/custom/custom-separator";
import { OfferShowcase } from "@/lib/types";
import { format } from "date-fns";
import Image from "next/image";
import MenuItemCard from "./MenuItemCard";

const OffersSection = ({ offerShowcase }: { offerShowcase: OfferShowcase }) => {
  const {
    image: offerImage,
    deadline,
    heading,
    products = [],
    tagline,
  } = offerShowcase || {};
  console.log("offerShowcase", offerShowcase);
  const formattedDate = format(new Date(deadline), "dd MMMM, yy");
  return (
    <div className="max-w-[1320px] mx-auto w-full px-4 pb-10">
      <CustomSeparator title="Offers" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={
              offerImage ||
              "/images/menu-items/table-ice-cream-parlor-banner.svg"
            } // replace with your image path
            alt="Limited time offer desserts"
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />

          {/* Overlay container */}
          <div className="absolute inset-0 bg-black/40 text-white flex flex-col justify-between p-6">
            {/* Top Left Heading */}
            <h2 className="text-2xl md:text-[28px] font-semibold  uppercase  max-w-sm">
              {heading || ""}
            </h2>

            {/* Bottom Left Text */}
            <p className="text-sm md:text-[15px] opacity-90 font-normal uppercase font-jost">
              {tagline || ""}
              <p> ** Till {formattedDate}</p>
            </p>
          </div>
        </div>
        <div>
          <div className="grid lg:gap-x-[80px] md:gap-x-[40px] grid-cols-1">
            {products.slice(0, 4).map((item, index, arr) => (
              <div key={item._id}>
                <MenuItemCard
                  image={item.image || ""}
                  title={item.name}
                  description={item.shortDesc || ""}
                  price={item.price || ""}
                  className="bg-[#FAF8F5] dark:bg-[#181C20]"
                />

                {/* Add line except for the last item */}
                {index !== arr.length - 1 && (
                  <div className="h-[1px] bg-[#E2E2E2] dark:bg-[#222831] my-3 w-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-4">
        {products.slice(4).map((item) => (
          <div key={item._id}>
            <MenuItemCard
              image={item.image || ""}
              title={item.name}
              description={item.shortDesc || ""}
              price={item.price || ""}
              className="bg-[#FAF8F5] dark:bg-[#181C20]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
