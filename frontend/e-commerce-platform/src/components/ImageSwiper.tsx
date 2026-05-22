import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    return <div className="text-center py-4">No images available</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="w-full h-75 md:h-137.5"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="relative h-75 md:h-137.5">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover select-none"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">
                {item.title}
              </h2>

              <p className="max-w-2xl text-sm md:text-xl text-white/90">
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
