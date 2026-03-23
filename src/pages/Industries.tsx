import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Pill, Factory, ShoppingBag, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoFlow from "@/components/demo/DemoFlow";
import AnyIndustryCard from "@/components/industries/AnyIndustryCard";
import IndustryCard from "@/components/industries/IndustryCard";
// Customer logos
import dhlLogo from "@/assets/logos/dhl.png";
import grupoEiLogo from "@/assets/logos/grupo-ei.png";
import novartisLogo from "@/assets/logos/novartis.webp";
import bauschLombLogo from "@/assets/logos/bausch-lomb.png";
import ironMountainLogo from "@/assets/logos/iron-mountain.avif";
import mitsubishiLogo from "@/assets/logos/mitsubishi.png";
import sidelLogo from "@/assets/logos/sidel.png";
import cocaColaLogo from "@/assets/logos/coca-cola.png";
import revlonLogo from "@/assets/logos/revlon.png";

const Industries = () => {
  const { t } = useTranslation();
  const [showDemoFlow, setShowDemoFlow] = useState(false);

  const industries = [
    {
      id: "transport-logistics",
      icon: Truck,
      nameKey: "industries.transportLogistics",
      challengeKeys: ["industries.challenges.transport1", "industries.challenges.transport2", "industries.challenges.transport3"],
      averageDSO: "30-45 days",
      armsDSO: "21-31 days",
      averageDSONum: 38,
      armsDSONum: 25,
      customers: [
        { name: "DHL", logo: dhlLogo },
        { name: "Grupo EI", logo: grupoEiLogo }
      ]
    },
    {
      id: "pharma",
      icon: Pill,
      nameKey: "industries.pharma",
      challengeKeys: ["industries.challenges.pharma1", "industries.challenges.pharma2", "industries.challenges.pharma3"],
      averageDSO: "55-65 days",
      armsDSO: "38-45 days",
      averageDSONum: 60,
      armsDSONum: 42,
      customers: [
        { name: "Novartis", logo: novartisLogo },
        { name: "Bausch and Lomb", logo: bauschLombLogo },
        { name: "Iron Mountain", logo: ironMountainLogo }
      ]
    },
    {
      id: "industrial",
      icon: Factory,
      nameKey: "industries.industrial",
      challengeKeys: ["industries.challenges.industrial1", "industries.challenges.industrial2", "industries.challenges.industrial3"],
      averageDSO: "45-60 days",
      armsDSO: "30-42 days",
      averageDSONum: 52,
      armsDSONum: 36,
      customers: [
        { name: "Mitsubishi", logo: mitsubishiLogo },
        { name: "Sidel", logo: sidelLogo }
      ]
    },
    {
      id: "consumer-goods",
      icon: ShoppingBag,
      nameKey: "industries.consumerGoods",
      challengeKeys: ["industries.challenges.consumer1", "industries.challenges.consumer2", "industries.challenges.consumer3"],
      averageDSO: "30-45 days",
      armsDSO: "20-30 days",
      averageDSONum: 38,
      armsDSONum: 25,
      customers: [
        { name: "Coca-Cola", logo: cocaColaLogo },
        { name: "Revlon", logo: revlonLogo }
      ]
    },
    {
      id: "professional-services",
      icon: Briefcase,
      nameKey: "industries.professionalServices",
      challengeKeys: ["industries.challenges.professional1", "industries.challenges.professional2", "industries.challenges.professional3"],
      averageDSO: "60-90 days",
      armsDSO: "42-63 days",
      averageDSONum: 75,
      armsDSONum: 53,
      customers: [
        { name: "Client 1", logo: "" },
        { name: "Client 2", logo: "" }
      ]
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t('industries.title')}
              <br />
              <span className="text-gradient-animated">{t('industries.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('industries.agnosticMessage')}
            </p>
          </div>

          {/* Anchor Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
          {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => scrollToSection(industry.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              >
                <industry.icon className="w-4 h-4 text-primary" />
                {t(industry.nameKey)}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("any-industry")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/40 text-sm font-medium text-primary hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
            >
              {t('industries.other', 'Other')}
            </button>
          </div>
        </div>
      </section>

      {/* Industry Sections */}
      <section className="py-16 bg-background">
        <div className="container-wide space-y-12">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} {...industry} />
          ))}

          {/* Special "Any Industry" card */}
          <AnyIndustryCard onRequestDemo={() => setShowDemoFlow(true)} />
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="relative rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-flowing animate-gradient-flow bg-[length:200%_200%]" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <p className="text-lg text-background/80 mb-8 leading-relaxed">
                {t('industries.agnosticMessage')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="xl" 
                  variant="secondary"
                  className="group"
                  onClick={() => setShowDemoFlow(true)}
                >
                  {t('industries.seeInAction')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="xl" 
                  variant="ghost"
                  className="border border-background/40 text-background/90 bg-transparent hover:bg-background/20 hover:text-background hover:border-background/60"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="sm:hidden">{t('industries.exploreIndustriesShort')}</span>
                  <span className="hidden sm:inline">{t('industries.exploreHow')}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showDemoFlow && <DemoFlow onClose={() => setShowDemoFlow(false)} />}

      <Footer />
    </div>
  );
};

export default Industries;
