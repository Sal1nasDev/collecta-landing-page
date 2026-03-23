import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featureKeys = [
  "predictiveAnalytics", "realtimeDashboards", "automatedWorkflows",
  "collectionsOps", "legalHandling", "onsiteSupport", "dedicatedTeam",
] as const;

const featureData: { key: string; software: boolean | "software"; managed: boolean | "managed" }[] = [
  { key: "predictiveAnalytics", software: true, managed: true },
  { key: "realtimeDashboards", software: true, managed: true },
  { key: "automatedWorkflows", software: true, managed: true },
  { key: "collectionsOps", software: "software", managed: "managed" },
  { key: "legalHandling", software: false, managed: true },
  { key: "onsiteSupport", software: false, managed: true },
  { key: "dedicatedTeam", software: false, managed: true },
];

const TwoWaysToWork = () => {
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

  const renderCell = (value: boolean | "software" | "managed") => {
    if (value === true) return <Check className="w-5 h-5 mx-auto" style={{ color: "#0d9488" }} />;
    if (value === false) return <Minus className="w-5 h-5 mx-auto" style={{ color: "#cbd5e1" }} />;
    if (value === "software") return <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{t('about.twoWays.features.collectionsOpsSoftware')}</span>;
    return <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{t('about.twoWays.features.collectionsOpsManaged')}</span>;
  };

  return (
    <section ref={sectionRef} className="py-[100px] bg-white">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-4 transition-all duration-[600ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0d9488", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.twoWays.badge')}
          </p>
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 transition-all duration-[600ms] delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0f172a", letterSpacing: "-0.02em", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.twoWays.title')}
          </h2>
          <p className={`text-base md:text-lg leading-[1.6] transition-all duration-[600ms] delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#64748b", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.twoWays.subtitle')}
          </p>
        </div>

        <div className={`border-2 border-[#e2e8f0] rounded-2xl overflow-hidden transition-all duration-[600ms] delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
          <div className="grid grid-cols-3 bg-[#f8fafc]">
            <div className="p-5 font-bold text-sm" style={{ color: "#0f172a" }}>{t('about.twoWays.headers.feature')}</div>
            <div className="p-5 font-bold text-sm text-center" style={{ color: "#0f172a" }}>{t('about.twoWays.headers.software')}</div>
            <div className="p-5 font-bold text-sm text-center" style={{ color: "#0f172a" }}>{t('about.twoWays.headers.managed')}</div>
          </div>

          {featureData.map((feature, i) => (
            <div key={feature.key} className="grid grid-cols-3 border-t border-[#e2e8f0]" style={{ background: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
              <div className="p-5 text-sm" style={{ color: "#0f172a" }}>{t(`about.twoWays.features.${feature.key}`)}</div>
              <div className="p-5 text-center">{renderCell(feature.software)}</div>
              <div className="p-5 text-center">{renderCell(feature.managed)}</div>
            </div>
          ))}

          <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-8 text-center">
            <p className="text-base mb-4" style={{ color: "#64748b" }}>{t('about.twoWays.ctaText')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/solutions/software" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 border-2 border-primary text-primary hover:bg-primary/5" onClick={() => window.scrollTo(0, 0)}>
                {t('about.twoWays.softwareCta')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/solutions/managed-services" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 bg-primary hover:opacity-90" onClick={() => window.scrollTo(0, 0)}>
                {t('about.twoWays.managedCta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoWaysToWork;
