import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DemoFlow from "@/components/demo/DemoFlow";

const AboutClosing = () => {
  const { t } = useTranslation();
  const [demoOpen, setDemoOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-[100px] text-center" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)" }}>
        <div className="max-w-[640px] mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#0f172a", letterSpacing: "-0.02em", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.closing.title')}
          </h2>
          <p className={`text-lg mb-10 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ color: "#64748b", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {t('about.closing.subtitle')}
          </p>
          <div className={`transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            <button onClick={() => setDemoOpen(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-bold text-lg transition-all duration-200 hover:opacity-90 cursor-pointer" style={{ background: "#0d9488" }}>
              {t('about.closing.cta')} <ArrowRight className="w-5 h-5" />
            </button>
            <div className="mt-6">
              <Link to="/pricing" className="text-base font-medium transition-all duration-200 hover:underline" style={{ color: "#0d9488" }} onClick={() => window.scrollTo(0, 0)}>
                {t('about.closing.pricingLink')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      {demoOpen && <DemoFlow onClose={() => setDemoOpen(false)} />}
    </>
  );
};

export default AboutClosing;
