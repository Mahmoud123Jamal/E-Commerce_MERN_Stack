import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import heroSection from "../assets/heroSection.jpg";

const HeroSection = () => {
  const { t } = useTranslation();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        relative
        h-[85vh]
        rounded-2xl
        overflow-hidden
      "
    >
      <img
        src={heroSection}
        alt="Hero Background"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          text-center
          h-full
          px-4
        "
      >
        <div className="max-w-2xl text-white">
          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              mb-6
            "
          >
            {t("heroTitle")}
          </h1>

          <p
            className="
              text-lg
              md:text-2xl
              leading-relaxed
              mb-8
            "
          >
            {t("heroDescription")}
          </p>

          <Link
            to="/products"
            onClick={handleScrollTop}
            className="
              btn
              btn-primary
              btn-lg
              px-10
            "
          >
            {t("shopNow")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;