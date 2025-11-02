import Image from "next/image";
import Link from "next/link";
import React from "react";

const StorySectionHome = () => {
  return (
    <section className="w-full  py-12 md:py-20 lg:py-24">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3">
          {/* Left Side - Text Content */}
          <div className="space-y-6 col-span-2">
            <div>
              <h2 className="text-[32px] xl:text-[50px] font-jost uppercase font-medium">
                A STORY BREWED
                <br />
                <span className="ms-[245px]">WITH PASSION</span>
              </h2>
              <p className="font-jost text-base xl:text-lg leading-[40px] max-w-[640px] line-clamp-3 ">
                Brew & Bite Café brings people together over freshly brewed{" "}
                <br />
                coffee and handmade treats. Every sip and bite is crafted to{" "}
                <br />
                make your day cozy and delightful.
              </p>
            </div>

            <div className="flex gap-[20px] items-end">
              <div>
                <Image
                  src="/images/story/loft-style-opens-story.svg"
                  alt="Cafe Interior"
                  width={100}
                  height={100}
                  className="h-[360px] w-full object-cover rounded-md"
                />
              </div>
              <div>
                <Image
                  src="/images/story/coffee-cups.svg"
                  alt="Coffee Latte Art"
                  width={100}
                  height={100}
                  className="h-[420px] w-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Images Grid */}
          <div className="col-span-1">
            {/* Bottom Right - Cafe Seating with Badge */}
            <div className="relative h-[630px] rounded-lg">
              <Image
                src="/images/story/coffee-shop-interior.svg"
                alt="Cafe Seating"
                fill
                className="object-cover"
              />

              {/* Badge Overlay */}
              <div className="absolute top-5 w-[229px] h-[229px] -left-[150px] bg-[#C89968] rounded-full  flex flex-col items-center justify-center text-center p-4">
                <p className="font-jost md:text-lg text-base italic font-normal leading-7 absolute left-12 top-5">
                  Everyday
                </p>
                <p className="text-[50px] font-jost font-semibold leading-[40px]">
                  100+
                </p>
                <p className="font-jost text-sm uppercase leading-7 font-semibold mt-1">
                  Coffee Lovers
                </p>
                <Link
                  href={`/locations`}
                  className=" font-jost text-base mt-1 absolute font-normal italic bottom-12 right-6 leading-7"
                >
                  Visit us
                </Link>
              </div>
            </div>
            {/* Bottom Text */}
            <div className="mt-4">
              <p className=" font-jost italic text-[28px] font-medium  leading-[34px]">
                Find your favorite corner and unwind.
              </p>
            </div>
          </div>
        </div>
        {/* medium and mobile */}
        <div className=" block lg:hidden">
          <div>
            <h2 className="text-[32px] font-jost uppercase font-medium">
              A STORY BREWED <br /> WITH PASSION
            </h2>
            <p className="font-jost text-[15px] leading-[28px] ">
              Brew & Bite Café brings people together over freshly brewed <br />
              coffee and handmade treats. Every sip and bite is crafted to{" "}
              <br />
              make your day cozy and delightful.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-[18px]">
            <div className="grid-cols-1">
              <Image
                src="/images/story/loft-style-opens-story.svg"
                alt="Cafe Interior"
                width={100}
                height={100}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="grid-cols-1">
              <Image
                src="/images/story/coffee-cups.svg"
                alt="Coffee Latte Art"
                width={100}
                height={100}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="grid-cols-1">
              <div className="relative w-[172px] h-[172px]  bg-[#C89968] rounded-full  flex flex-col items-center justify-center text-center p-4 mt-2">
                <p className="font-jost md:text-lg text-base italic font-normal leading-7 absolute left-6 top-5">
                  Everyday
                </p>
                <p className="text-[50px] font-jost font-semibold leading-[40px]">
                  100+
                </p>
                <p className="font-jost text-sm uppercase leading-7 font-semibold mt-1">
                  Coffee Lovers
                </p>
                <p className=" font-jost text-base mt-1 absolute font-normal italic bottom-5 right-7 leading-7">
                  Visit us
                </p>
              </div>
              <div className="mt-5">
                <p className=" font-jost italic text-lg font-medium  leading-[25px]">
                  Find your favorite corner and unwind.
                </p>
              </div>
            </div>
            <div className="grid-cols-1">
              <Image
                src="/images/story/coffee-shop-interior.svg"
                alt="Coffee Latte Art"
                width={100}
                height={100}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySectionHome;
