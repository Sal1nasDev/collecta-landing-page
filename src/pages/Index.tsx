import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProofSection from "@/components/ProofSection";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import CustomerLogos from "@/components/CustomerLogos";
import ValuePillars from "@/components/ValuePillars";
import Roles from "@/components/Roles";
import Experience from "@/components/Experience";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ProofSection />
        <Problem />
        <Solution />
        <CustomerLogos />
        <ValuePillars />
        <Roles />
        <Experience />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;