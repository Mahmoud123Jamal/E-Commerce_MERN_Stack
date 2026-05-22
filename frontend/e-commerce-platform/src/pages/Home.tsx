import { useTranslation } from "react-i18next";
import Divider from "../components/Divider";
import HeroSection from "../components/Hero";
import { HomePageSwiper } from "../components/HomePageSwiper";
import TopRatedProducts from "../components/TopRatedProducts";

function Home() {
  const { i18n } = useTranslation();
  return (
    <div>
      <HomePageSwiper key={i18n.language} />
      <Divider />
      <HeroSection />
      <Divider />
      <TopRatedProducts />
    </div>
  );
}

export default Home;
