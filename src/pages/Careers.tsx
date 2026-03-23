import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import WhyWorkAtARMS from "@/components/careers/WhyWorkAtARMS";
import AlwaysOpen from "@/components/careers/AlwaysOpen";
import OpenPositions from "@/components/careers/OpenPositions";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <CareersHero />
        <WhyWorkAtARMS />
        <AlwaysOpen />
        <OpenPositions />
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
