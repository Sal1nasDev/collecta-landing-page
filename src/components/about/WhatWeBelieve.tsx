import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserCheck, Eye, Handshake } from "lucide-react";

const valueKeys = ["practitioner", "transparency", "partnership"] as const;
const valueIcons = [UserCheck, Eye, Handshake];

const WhatWeBelieve = () => {
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

  return (
    <section ref={sectionRef} className="py-[100px] border-t border-b border-[#e2e8f0]" style={{ background: "#f8fafc" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-4 transition-all duration-[600ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0d9488", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.believe.badge')}
          </p>
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 transition-all duration-[600ms] delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0f172a", letterSpacing: "-0.02em", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.believe.title')}
          </h2>
          <p className={`text-base md:text-lg leading-[1.6] transition-all duration-[600ms] delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#64748b", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.believe.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueKeys.map((key, i) => {
            const Icon = valueIcons[i];
            return (
              <div
                key={key}
                className={`bg-white border border-[#e2e8f0] rounded-2xl p-8 md:p-10 h-full transition-all duration-[600ms] hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)] cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)", transitionDelay: `${(i + 1) * 100 + 200}ms` }}
              >
                <Icon className="w-12 h-12 mb-6" style={{ color: "#0d9488" }} />
                <h3 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>{t(`about.believe.values.${key}.title`)}</h3>
                <p className="text-base leading-[1.6]" style={{ color: "#64748b" }}>{t(`about.believe.values.${key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;
