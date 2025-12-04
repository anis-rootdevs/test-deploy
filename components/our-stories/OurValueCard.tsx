import Image from "next/image";

export default function OurValueCard({ item }: any) {
  return (
    <div className="group [perspective:1000px] w-full  h-[288px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-[#FAF8F5] dark:bg-[#181C20] flex flex-col items-center p-6 text-center ">
          <Image
            src={item?.icon}
            width={500}
            height={500}
            alt="value images"
            className="text-[#E6B17E] h-[68px] w-[68px]"
          />
          <h2 className="font-jost font-semibold text-[20px] mt-[50px] mb-3 ">
            {item?.title || ""}
          </h2>
          <p className="text-lg font-normal font-jost">
            {item?.shortDesc || ""}
          </p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full dark:bg-[#222831] h-full bg-[#1B2A41] text-[#FAF8F5] flex flex-col items-center p-6 text-center  shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] ">
          <Image
            src={item?.icon}
            width={500}
            height={500}
            alt="value images"
            className="text-[#E6B17E] h-[68px] w-[68px]"
          />
          <h2 className="font-jost font-semibold text-[20px] mt-[50px] mb-3 ">
            {item?.title || ""}
          </h2>
          <p className="text-lg font-normal font-jost">
            {item?.shortDesc || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
