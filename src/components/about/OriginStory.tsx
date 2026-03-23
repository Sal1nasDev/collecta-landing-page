import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const years = ["2021", "2022", "2023", "2026"] as const;

const TimelineCard = ({ year, index, total }: { year: string; index: number; total: number }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10 pb-12 last:pb-0">
      <div className="flex flex-col items-center">
        <div className={`px-4 py-2 rounded-full text-sm font-bold text-white shrink-0 z-10 transition-colors duration-300 ${isVisible ? "bg-[#0f172a]" : "bg-[#0d9488]"}`} style={{ minWidth: 64, textAlign: "center" }}>
          {year}
        </div>
        {index < total - 1 && <div className="w-0.5 flex-1 bg-[#e2e8f0] mt-3" />}
      </div>
      <div className={`flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 md:p-8 mb-6 transition-all duration-[600ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "#0d9488" }}>
          {t(`about.origin.timeline.${year}.phase`)}
        </p>
        <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
          {t(`about.origin.timeline.${year}.headline`)}
        </h3>
        <p className="text-base leading-[1.6]" style={{ color: "#64748b" }}>
          {t(`about.origin.timeline.${year}.description`)}
        </p>
      </div>
    </div>
  );
};

const OriginStory = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-[100px] bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-4 transition-all duration-[600ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0d9488", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.origin.badge')}
          </p>
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 transition-all duration-[600ms] delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0f172a", letterSpacing: "-0.02em", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.origin.title')}
          </h2>
          <p className={`text-base md:text-lg leading-[1.6] transition-all duration-[600ms] delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#64748b", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.origin.subtitle')}
          </p>
        </div>
        <div>
          {years.map((year, index) => (
            <TimelineCard key={year} year={year} index={index} total={years.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
