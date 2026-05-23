import { useHeroBanners } from "../hooks/useHeroBanners";
import { ImageSwiper } from "./ImageSwiper";

export function HomePageSwiper() {
  const banners = useHeroBanners();

  return (
    <div className="w-full md:mx-auto md:p-3">
      <ImageSwiper images={banners} />
    </div>
  );
}
