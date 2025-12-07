import { CustomButton } from "../custom-button";

export default function NotFoundPage() {
  return (
    <div className="boxShadow px-10 w-full lg:flex-row gap-[30px] lg:gap-0 flex-col flex items-center justify-evenly py-20 rounded-xl">
      <div className="w-[80%] lg:w-[40%]">
        <img
          src="https://i.ibb.co/HdHH4Pb/Frame-6.png"
          alt="illustration"
          className="w-full"
        />
      </div>

      <div className="w-full lg:w-[30%] text-center lg:text-start">
        <h1 className="text-[2.5rem] dark:text-{#abc2d3] sm:text-[4rem] font-[800] text-primary leading-[80px]">
          OOPS!
        </h1>

        <h3 className=" dark:text-slate-400 text-[0.9rem] sm:text-[1.2rem]">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </h3>

        <CustomButton
          href="/"
          className="py-3 px-6 sm:px-8 text-[0.9rem] sm:text-[1rem] rounded-full bg-primary text-white mt-8 cursor-pointer"
        >
          Back To Home
        </CustomButton>
      </div>
    </div>
  );
}
