import Image from "next/image";
import React from "react";

export default function OurStory() {
  return (
    <div className="max-w-[1320px] mx-auto py-10 lg:py-12 px-4">
      <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[100px] md:gap-[80px] gap-10">
        <div className="aspect-[179/247]">
          <Image
            src="/images/story/coffee-shop-interior.svg"
            alt="story"
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>
        <div>
          <div className="flex flex-col items-start lg:mt-[80px] md:mt-[10px] mt-0">
            <h2 className="md:text-[28px] lg:text-[36px] text-[24px] font-semibold font-jost uppercase mb-4">
              Our Story
            </h2>
            <p className="md:text-[20px] lg:text-[24px] text-[15px] font-normal font-jost leading-[26px] md:leading-[30px] lg:leading-[40px] md:mb-[30px] mb-[22px]">
              It all began with a passion for creating a space where coffee
              feels like home. From ethically sourced beans to freshly baked
              treats, every detail reflects our love for quality and
              comfort.Whether you’re rushing through the morning or winding down
              after a long day, our café is your cozy escape — a corner made for
              comfort, laughter, and the smell of freshly ground coffee.
            </p>
            <h4 className="italic font-jost font-medium leading-[26px] md:leading-[34px] text-lg md:text-[24px] lg:text-[28px]">
              Every cup tells a story of passion and care.
            </h4>
          </div>
          <div className="aspect-[8/5] mt-10">
            <Image
              src="/images/story/make-coffee.svg"
              alt="story"
              width={100}
              height={100}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
