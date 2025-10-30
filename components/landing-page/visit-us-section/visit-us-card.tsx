import React from "react";

const VisitUsCard = ({ product }: any) => {
  return (
    <>
      <div className="bg-[#1B2A41] p-5 sm:p-4 lg:p-6 flex flex-col justify-center  h-full max-w-[624px] w-full">
        <h3 className="text-[24px] lg:text-[36px] uppercase font-jost md:text-[28px] font-semibold mb-2 lg:mb-3 text-[#FAF8F5]">
          {product.name}
        </h3>
        <p className="text-sm sm:text-base text-[#E2E2E2] font-medium mb-4 lg:mb-6">
          {product.description}
        </p>
        {product?.price && (
          <p className="md:text-2xl text-xl font-bold text-primary font-jost">
            {product.price}
          </p>
        )}
      </div>
    </>
  );
};

export default VisitUsCard;
