import { useTranslation } from "react-i18next";
import { Heart, Shield, Lightbulb, Users, LucideIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import mockupDsoEn from "@/assets/mockup-dso.png";
import mockupDsoEs from "@/assets/mockup-dso-es.png";

const Experience = () => {
  const { t, i18n } = useTranslation();
  const mockupDso = i18n.language === "es" ? mockupDsoEs : mockupDsoEn;
  const laptopRef = useRef<HTMLDivElement>(null);
  const [openProgress, setOpenProgress] = useState(0); // 0 = closed, 1 = fully open

  useEffect(() => {
    const el = laptopRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.85;
      const end = windowH * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setOpenProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const benefits: { icon: LucideIcon; titleKey: string; descKey: string }[] = [
    {
      icon: Heart,
      titleKey: "experience.lessStress.title",
      descKey: "experience.lessStress.description",
    },
    {
      icon: Shield,
      titleKey: "experience.moreControl.title",
      descKey: "experience.moreControl.description",
    },
    {
      icon: Lightbulb,
      titleKey: "experience.confidentDecisions.title",
      descKey: "experience.confidentDecisions.description",
    },
    {
      icon: Users,
      titleKey: "experience.betterTeamwork.title",
      descKey: "experience.betterTeamwork.description",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/20">
      <style>{`
        @keyframes none_needed {}
        .laptop-container {
          perspective: 1200px;
          display: inline-block;
        }
        .laptop-screen {
          transform-origin: bottom center;
          backface-visibility: hidden;
        }
      `}</style>
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 mb-10">
          <div className="lg:flex-1 text-left lg:pl-12 xl:pl-20">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 w-full text-center">
              {t('experience.badge')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 lg:whitespace-nowrap text-center">
              {t('experience.title')}
            </h2>
            <p className="text-lg text-muted-foreground lg:whitespace-nowrap text-center">
              {t('experience.description')}
            </p>
          </div>
          <div className="lg:flex-1 flex justify-center lg:justify-end -mt-4 lg:-mt-8" ref={laptopRef}>
            <div className="laptop-container w-72 md:w-[22rem] lg:w-[26rem]">
              <div
                className="laptop-screen"
                style={{
                  transform: `rotateX(${90 - openProgress * 90}deg)`,
                  transition: "none",
                }}
              >
                <img 
                  src={mockupDso} 
                  alt="ARMS DSO Analytics Dashboard" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div 
              key={benefit.titleKey}
              className="relative group text-center"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                <benefit.icon className="w-6 h-6 md:w-9 md:h-9 text-accent" />
              </div>
              
              <h3 className="font-display text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                {t(benefit.titleKey)}
              </h3>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(benefit.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
