import { StoryShowcase } from "@/lib/types";
import Image from "next/image";

export default function OurStory({
  storyShowcase,
}: {
  storyShowcase: StoryShowcase;
}) {
  return (
    <div className="max-w-[1320px] mx-auto py-10 lg:py-12 px-4">
      <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[100px] md:gap-[80px] gap-10">
        <div className="aspect-[179/247]">
          {storyShowcase?.imageTwo && (
            <Image
              width={600}
              height={600}
              src={storyShowcase.imageTwo}
              alt="Coffee cup top view"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <div className="flex flex-col items-start lg:mt-[80px] md:mt-[10px] mt-0">
            <h2 className="md:text-[28px] lg:text-[36px] text-[24px] font-semibold font-jost uppercase mb-4">
              Our Story
            </h2>
            <p className="md:text-[20px] lg:text-[24px] text-[15px] font-normal font-jost leading-[26px] md:leading-[30px] lg:leading-[40px] md:mb-[30px] mb-[22px]">
              {storyShowcase?.story || ""}
            </p>
            <h4 className="italic font-jost font-medium leading-[26px] md:leading-[34px] text-lg md:text-[24px] lg:text-[28px]">
              {storyShowcase?.tagline || ""}
            </h4>
          </div>
          <div className="aspect-[8/5] mt-10">
            {storyShowcase?.imageThree && (
              <Image
                width={600}
                height={600}
                src={storyShowcase.imageThree}
                alt="Coffee cup top view"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
