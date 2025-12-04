import { StoryShowcase } from "@/lib/types";
import OurValueCard from "./OurValueCard";

export default function OurValue({
  storyShowcase,
}: {
  storyShowcase: StoryShowcase;
}) {
  return (
    <div className="max-w-[1320px] mx-auto lg:py-16 py-10 px-4">
      <div className="text-center w-full max-w-[550px] mx-auto">
        <h2 className="md:text-[28px] lg:text-[36px] text-[24px] font-semibold font-jost uppercase mb-4">
          Our Value
        </h2>
        <p className="md:text-[20px] lg:text-[24px] text-[15px] font-normal font-jost leading-[26px] md:leading-[30px] lg:leading-[40px] md:mb-[30px] mb-[22px]">
          {storyShowcase?.valueShortDesc || ""}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 grid-cols-1 lg:mt-[30px] md:mt-[25px] mt-5">
        {storyShowcase?.values?.map((item) => (
          <OurValueCard key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
}
