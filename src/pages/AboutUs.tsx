import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import OriginStory from "@/components/about/OriginStory";
import WhatWeBelieve from "@/components/about/WhatWeBelieve";
import BuiltByOCPeople from "@/components/about/BuiltByOCPeople";
import TwoWaysToWork from "@/components/about/TwoWaysToWork";
import AboutClosing from "@/components/about/AboutClosing";

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      <Navigation />
      <AboutHero />
      <OriginStory />
      <WhatWeBelieve />
      <BuiltByOCPeople />
      <TwoWaysToWork />
      <AboutClosing />
      <Footer />
    </div>
  );
};

export default AboutUs;
