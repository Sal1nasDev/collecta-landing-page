import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const comparisonRows = [
  { featureKey: "managed.comparison.predictiveAnalytics", software: true, managed: true },
  { featureKey: "managed.comparison.realtimeDashboards", software: true, managed: true },
  { featureKey: "managed.comparison.automatedAlerts", software: true, managed: true },
  { featureKey: "managed.comparison.collectionsOps", software: false, managed: true },
  { featureKey: "managed.comparison.legalHandling", software: false, managed: true },
  { featureKey: "managed.comparison.onsiteSupport", software: false, managed: true },
  { featureKey: "managed.comparison.dedicatedTeam", software: false, managed: true },
];

const ComparisonTable = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      setTriggered(true);
      return;
    }
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

  // Flatten all checkmarks with their delays
  // Each row has up to 2 checks (software col, managed col)
  // We stagger all visible checkmarks sequentially
  let checkIndex = 0;
  const rowChecks = comparisonRows.map((row) => {
    const softwareDelay = row.software ? checkIndex++ : -1;
    const managedDelay = row.managed ? checkIndex++ : -1;
    return { softwareDelay, managedDelay };
  });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("managed.comparisonTitle")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("managed.comparisonDesc")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto" ref={sectionRef}>
          <style>{`
            .cmp-check {
              opacity: 0;
              transform: scale(0.3);
              will-change: transform, opacity;
            }
            .cmp-triggered .cmp-check {
              animation: cmp-check-pop 0.35s ease-out forwards;
            }
            @keyframes cmp-check-pop {
              0% { opacity: 0; transform: scale(0.3); }
              70% { opacity: 1; transform: scale(1.15); }
              100% { opacity: 1; transform: scale(1); }
            }
            .cmp-empty {
              opacity: 0;
            }
            .cmp-triggered .cmp-empty {
              animation: cmp-fade-in 0.25s ease-out forwards;
            }
            @keyframes cmp-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>

          <div className={`bg-card border border-border/50 rounded-2xl overflow-hidden ${triggered ? "cmp-triggered" : ""}`}>
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted/50">
              <div className="p-4 text-center border-r border-border/50">
                {/* Empty - no "Feature" label */}
              </div>
              <div className="p-4 text-center border-r border-border/50">
                <span className="text-sm font-medium text-primary">Software</span>
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-foreground">
                  {t("managed.badge")}
                </span>
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, index) => {
              const delays = rowChecks[index];
              const staggerBase = 0.12; // seconds between each checkmark

              return (
                <div
                  key={row.featureKey}
                  className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                >
                  <div className="p-4 border-r border-border/50">
                    <span className="text-sm text-foreground">{t(row.featureKey)}</span>
                  </div>
                  <div className="p-4 text-center border-r border-border/50">
                    {row.software ? (
                      <CheckCircle2
                        className="cmp-check w-5 h-5 text-primary mx-auto"
                        style={{ animationDelay: `${delays.softwareDelay * staggerBase}s` }}
                      />
                    ) : (
                      <div
                        className="cmp-empty w-5 h-5 rounded-full border border-border mx-auto"
                        style={{ animationDelay: `${delays.softwareDelay >= 0 ? delays.softwareDelay : index}  * ${staggerBase}s` }}
                      />
                    )}
                  </div>
                  <div className="p-4 text-center">
                    {row.managed ? (
                      <CheckCircle2
                        className="cmp-check w-5 h-5 text-primary mx-auto"
                        style={{ animationDelay: `${delays.managedDelay * staggerBase}s` }}
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-border mx-auto" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
