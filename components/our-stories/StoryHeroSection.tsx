import Image from "next/image";
import { CustomButton } from "../custom/custom-button";
import { routes } from "@/config/routes";

export default function StoryHeroSection() {
  return (
    <section className="w-full  bg-[#FAF8F5]">
      <div className="max-w-[1320px] mx-auto px-4 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
          {/* Text Content */}
          <div className="w-full col-span-2 z-50">
            <h2 className="text-[24px] md:text-[28px] lg:text-[36px] font-semibold font-jost uppercase mb-4">
              BREWING MOMENTS OF COMFORT
            </h2>

            <p className="text-[15px] lg:text-[24px] md:text-[20px] font-normal font-jost leading-[18px] md:leading-[30px] lg:leading-[40px]">
              Near Café began with a simple dream — to bring people closer
              through the warmth of coffee and the joy of good food. Every cup
              is crafted with care and a touch of comfort.
            </p>

            <div className="flex items-start flex-col md:flex-row md:gap-6 gap-4 pt-[50px]">
              <CustomButton variant="filled" href={routes.publicRoutes.menu}>
                Explore Menu
              </CustomButton>
              <CustomButton
                variant="outline"
                href={routes.publicRoutes.reserveTable}
                className="border-primary text-primary"
              >
                Reserve Table
              </CustomButton>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end -mt-[150px] lg:mt-0">
            <div className="w-full aspect-square">
              <Image
                width={100}
                height={100}
                src="/images/story/story-hero.svg"
                alt="Coffee cup top view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
