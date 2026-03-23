import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const AboutHero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "2021", label: t('about.hero.stats.founded') },
    { number: "$2.4B+", label: t('about.hero.stats.cashRecovered') },
    { number: "500+", label: t('about.hero.stats.companiesHelped') },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-[80vh] md:min-h-[80vh] flex items-center justify-center relative pt-[120px] pb-[80px]"
      style={{ background: "linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)" }}
    >
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-6 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0d9488", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
          {t('about.hero.badge')}
        </p>
        <h1 className={`text-4xl md:text-[56px] font-extrabold leading-[1.1] mb-8 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0f172a", letterSpacing: "-0.02em", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
          {t('about.hero.headline')}
        </h1>
        <p className={`text-xl leading-[1.6] max-w-[640px] mx-auto mb-12 transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#64748b", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
          {t('about.hero.subheadline')}
        </p>
        <div className={`bg-white border border-[#e2e8f0] rounded-2xl py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center max-w-[720px] mx-auto gap-8 md:gap-0 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[48px] font-extrabold leading-none" style={{ color: "#0d9488" }}>{stat.number}</div>
              <div className="text-sm mt-2" style={{ color: "#64748b" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
