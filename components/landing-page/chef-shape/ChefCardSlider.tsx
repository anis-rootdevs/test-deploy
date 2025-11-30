"use client";
import "swiper/css";
import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
import { Chef } from "@/lib/types";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ChefCard from "./ChefCard";

export default function ChefCardSlider({ chefList }: { chefList: Chef[] }) {
  return (
    <div className="max-w-[1320px] mx-auto">
      <Swiper
        spaceBetween={30}
        slidesPerView={"auto"}
        breakpoints={{
          610: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // auto slide every 2 sec
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectCoverflow, Autoplay]}
      >
        {chefList.map((chef: Chef) => (
          <SwiperSlide key={chef._id}>
            <ChefCard
              image={chef.image}
              name={chef.name || ""}
              tagline={chef.tagline}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
