import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export function ImageSwiper({
  images,
}: {
  images: {
    image: string;
    title: string;
    description: string;
  }[];
}) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No images available</div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-900">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[300px] md:h-[550px]"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />

            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover select-none"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 transition-all">
              <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white tracking-wide drop-shadow-md">
                {item.title}
              </h2>

              <p className="max-w-2xl text-sm md:text-xl text-gray-200 drop-shadow-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
