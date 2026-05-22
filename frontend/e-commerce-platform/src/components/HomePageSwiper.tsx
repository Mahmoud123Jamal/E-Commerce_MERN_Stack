import { useTranslation } from "react-i18next";

import { ImageSwiper } from "./ImageSwiper";

import banner1 from "../assets/banners/banner-slide1.jpg";
import banner2 from "../assets/banners/banner-slide2.jpg";
import banner3 from "../assets/banners/banner-slide3.jpg";

export function HomePageSwiper() {
  const { t } = useTranslation();

  const heroBanners = [
    {
      image: banner1,
      title: t("banners.banner1.title"),
      description: t("banners.banner1.description"),
    },

    {
      image: banner2,
      title: t("banners.banner2.title"),
      description: t("banners.banner2.description"),
    },

    {
      image: banner3,
      title: t("banners.banner3.title"),
      description: t("banners.banner3.description"),
    },
  ];

  return (
    <div className="w-full md:mx-auto md:p-3">
      <ImageSwiper images={heroBanners} />
    </div>
  );
}
