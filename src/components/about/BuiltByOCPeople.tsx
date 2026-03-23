import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import arDashboardEn from "@/assets/dashboard-screenshot-en.png";
import arDashboardEs from "@/assets/dashboard-screenshot-es.png";

const BuiltByOCPeople = () => {
  const { t, i18n } = useTranslation();
  const arDashboard = i18n.language === "es" ? arDashboardEs : arDashboardEn;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const bullets = t('about.builtByOC.bullets', { returnObjects: true }) as string[];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            <img src={arDashboard} alt="ARMS Dashboard" className="rounded-xl w-full" style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)", transform: "rotate(-2deg)" }} />
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-4 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0d9488", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
              {t('about.builtByOC.badge')}
            </p>
            <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0f172a", letterSpacing: "-0.02em", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
              {t('about.builtByOC.title')}
            </h2>
            <p className={`text-base md:text-lg leading-[1.7] mb-8 transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#64748b", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
              {t('about.builtByOC.description')}
            </p>
            <ul className="space-y-4">
              {bullets.map((bullet, i) => (
                <li key={i} className={`flex items-start gap-3 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${300 + i * 100}ms`, transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <div className="w-5 h-5 rounded-full bg-[#0d9488] flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-base" style={{ color: "#0f172a" }}>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltByOCPeople;
