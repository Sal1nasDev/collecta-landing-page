import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";

// Reusable counter: animates from 0 to target over duration ms with ease-out
function useCountUp(target: number, duration: number, started: boolean, delay = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (!started) return;
    timeoutRef.current = window.setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.round(eased * target));
        if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started, target, duration, delay]);

  return value;
}

export interface IndustryCardProps {
  id: string;
  icon: LucideIcon;
  nameKey: string;
  challengeKeys: string[];
  averageDSO: string;
  armsDSO: string;
  averageDSONum: number;
  armsDSONum: number;
  customers: { name: string; logo: string }[];
}

const IndustryCard = ({
  id,
  icon: Icon,
  nameKey,
  challengeKeys,
  averageDSO,
  armsDSO,
  averageDSONum,
  armsDSONum,
  customers,
}: IndustryCardProps) => {
  const { t } = useTranslation();
  const [triggered, setTriggered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer — fires once at 20% visibility
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animation 1 — DSO count-up
  const leftCount = useCountUp(averageDSONum, 1400, triggered, 0);
  const rightCount = useCountUp(armsDSONum, 1100, triggered, 300);

  return (
    <div id={id} className="scroll-mt-24" ref={cardRef}>
      <div
        className={`industry-card relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-[250ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] ${
          triggered ? "card-triggered" : ""
        }`}
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      >
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="industry-icon-box w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center border border-primary/10 transition-all duration-[250ms] ease-out">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {t(nameKey)}
            </h2>
          </div>

          {/* Main Content: Challenges + DSO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Collection Challenges — Animation 2 */}
            <div className="lg:col-span-2">
              <h3
                className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 transition-all duration-400 ease-out"
                style={{
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {t("industries.collectionChallenges")}
              </h3>
              <ul className="space-y-3">
                {challengeKeys.map((key, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 transition-all duration-400 ease-out"
                    style={{
                      opacity: triggered ? 1 : 0,
                      transform: triggered ? "translateY(0)" : "translateY(12px)",
                      transitionDelay: `${idx * 150}ms`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: DSO Comparison — Animation 1 */}
            <div className="flex flex-col gap-3 items-center justify-start self-start -mt-6">
              <TooltipProvider delayDuration={200}>
                {/* Average DSO */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center justify-center px-6 py-4 rounded-lg bg-muted/40 border border-border/50 cursor-default hover:bg-muted/60 hover:scale-[1.02] transition-all duration-300">
                      <span className="text-xs font-semibold text-muted-foreground/70 mb-1">
                        {t("industries.averageDSO")}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-foreground/50 tabular-nums">
                          {triggered ? leftCount : 0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("industries.anyIndustry.days")}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground/50 mt-0.5">
                        ({averageDSO})
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[200px] text-center">
                    <p>{t("industries.averageDSOTooltip")}</p>
                  </TooltipContent>
                </Tooltip>

                {/* ARMS DSO */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center justify-center px-6 py-4 rounded-lg bg-teal-500/20 border-2 border-teal-500/60 cursor-default hover:bg-teal-500/30 hover:scale-[1.03] hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
                      <span className="text-xs font-semibold text-sky-800 dark:text-sky-300 mb-1">
                        {t("industries.dsoWithARMS")}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-sky-900 dark:text-sky-200 tabular-nums">
                          {triggered ? rightCount : 0}
                        </span>
                        <span className="text-xs text-sky-800/60 dark:text-sky-300/60">
                          {t("industries.anyIndustry.days")}
                        </span>
                      </div>
                      <span className="text-[10px] text-sky-800/50 dark:text-sky-300/50 mt-0.5">
                        ({armsDSO})
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[200px] text-center">
                    <p>{t("industries.armsDSOTooltip")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IndustryCard;
