import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PromoSection from "./components/PromoSection";
import SponsorPreview from "./components/SponsorPreview";
import Kolaborasi from "./components/Kolaborasi";
import Paket from "./components/Paket";
import Testimoni from "./components/Testimoni";
import AboutSection from "./components/AboutSection";
import Footer from "../../components/common/Footer";

const LandingPage = () => {

  return (
    <>
      <Navbar />
      <HeroSection />
      <PromoSection />
      <SponsorPreview />
      <Kolaborasi />
      <Paket />
      <Testimoni />
      <AboutSection />
      <Footer />
    </>
  );
};

export default LandingPage;
