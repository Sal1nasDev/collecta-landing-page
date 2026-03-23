import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Handshake, ShieldCheck, Crown, Check, Minus, ChevronDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const stopIcons = [Handshake, ShieldCheck, Crown];
const stopKeys = ["registered", "certified", "strategic"] as const;

type Row = { featureKey: string; reg: boolean; cert: boolean; strat: boolean };
type Group = { categoryKey: string; rows: Row[] };

const groups: Group[] = [
  {
    categoryKey: "commissions",
    rows: [
      { featureKey: "standardCommission", reg: true, cert: true, strat: true },
      { featureKey: "higherCommission", reg: false, cert: true, strat: true },
      { featureKey: "premiumCommission", reg: false, cert: false, strat: true },
    ],
  },
  {
    categoryKey: "leadsAndSales",
    rows: [
      { featureKey: "opportunityRegistration", reg: true, cert: true, strat: true },
      { featureKey: "basicSalesMaterials", reg: true, cert: true, strat: true },
      { featureKey: "sharedLeadAccess", reg: false, cert: true, strat: true },
      { featureKey: "exclusivity", reg: false, cert: false, strat: true },
    ],
  },
  {
    categoryKey: "support",
    rows: [
      { featureKey: "commercialSupport", reg: true, cert: true, strat: true },
      { featureKey: "prioritySupport", reg: false, cert: true, strat: true },
      { featureKey: "dedicatedManager", reg: false, cert: false, strat: true },
    ],
  },
  {
    categoryKey: "marketing",
    rows: [
      { featureKey: "coMarketing", reg: false, cert: true, strat: true },
      { featureKey: "jointDevelopment", reg: false, cert: false, strat: true },
    ],
  },
  {
    categoryKey: "productAccess",
    rows: [
      { featureKey: "roadmapAccess", reg: false, cert: true, strat: true },
      { featureKey: "earlyAccess", reg: false, cert: false, strat: true },
    ],
  },
];

const CellMark = ({ included }: { included: boolean }) =>
  included ? (
    <Check className="w-4 h-4 text-primary mx-auto" />
  ) : (
    <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />
  );

const VisualTierProgression = () => {
  const { t } = useTranslation();
  const [tableOpen, setTableOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDrawn(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[hsl(200,85%,30%)] via-[hsl(185,70%,32%)] to-[hsl(170,60%,35%)]" ref={sectionRef}>
      <style>{`
        @keyframes flow-dash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -28; } }
        @keyframes flow-dash-vertical { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -28; } }
      `}</style>

      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            {t('partners.progression.title')}
          </h2>
          <p className="text-white/80 text-base md:text-lg">
            {t('partners.progression.subtitle')}
          </p>
        </div>

        {/* Journey Graphic */}
        <div className="relative max-w-3xl mx-auto mb-10">
          {/* Desktop horizontal */}
          <div className="hidden md:flex items-center justify-between relative">
            <svg className="absolute top-8 left-[60px] right-[60px] h-[2px] overflow-visible" style={{ width: "calc(100% - 120px)" }} preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="white" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="10 8" style={{ animation: "flow-dash 1.8s linear infinite" }} />
            </svg>
            <div className="absolute top-[3px] right-[50px] transition-opacity duration-700" style={{ opacity: drawn ? 1 : 0, transitionDelay: "0.8s" }}>
              <svg width="14" height="12" viewBox="0 0 14 12"><polygon points="0,0 14,6 0,12" fill="rgba(255,255,255,0.6)" /></svg>
            </div>
            {stopKeys.map((key, i) => {
              const Icon = stopIcons[i];
              return (
                <div key={key} className="flex flex-col items-center z-10 w-[140px]">
                  <div className="w-14 h-14 rounded-full border-2 border-white/50 bg-white/15 backdrop-blur-sm flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-display font-bold text-white text-sm tracking-wide">{t(`partners.progression.stops.${key}.name`)}</span>
                  <span className="text-xs text-white/80 text-center mt-0.5 leading-tight">{t(`partners.progression.stops.${key}.desc`)}</span>
                </div>
              );
            })}
          </div>

          {/* Mobile vertical */}
          <div className="flex md:hidden flex-col items-center gap-0">
            {stopKeys.map((key, i) => {
              const Icon = stopIcons[i];
              return (
                <div key={key} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-white/50 bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-display font-bold text-white text-sm mt-1.5 tracking-wide">{t(`partners.progression.stops.${key}.name`)}</span>
                  <span className="text-xs text-white/80 text-center mt-0.5">{t(`partners.progression.stops.${key}.desc`)}</span>
                  {i < stopKeys.length - 1 && (
                    <svg width="2" height="32" className="my-1.5">
                      <line x1="1" y1="0" x2="1" y2="32" stroke="white" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 5" style={{ animation: "flow-dash-vertical 1.8s linear infinite" }} />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compare toggle */}
        <div className="text-center mb-3">
          <Button variant="outline" className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 border-none" onClick={() => setTableOpen(!tableOpen)}>
            {t('partners.progression.compareBtn')}
            <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${tableOpen ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ maxHeight: tableOpen ? "2000px" : "0", opacity: tableOpen ? 1 : 0 }}>
          <div className="max-w-4xl mx-auto rounded-xl border border-border bg-card overflow-x-auto mt-2">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[40%]">{t('partners.progression.table.feature')}</TableHead>
                  <TableHead className="text-center w-[20%]">{t('partners.progression.stops.registered.name')}</TableHead>
                  <TableHead className="text-center w-[20%]">{t('partners.progression.stops.certified.name')}</TableHead>
                  <TableHead className="text-center w-[20%]">{t('partners.progression.stops.strategic.name')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((g) => (
                  <>
                    <TableRow key={g.categoryKey} className="hover:bg-transparent">
                      <TableCell colSpan={4} className="font-semibold text-xs uppercase tracking-wider text-muted-foreground bg-secondary/60 py-2">
                        {t(`partners.progression.table.${g.categoryKey}`)}
                      </TableCell>
                    </TableRow>
                    {g.rows.map((r) => (
                      <TableRow key={r.featureKey}>
                        <TableCell className="text-sm text-foreground">{t(`partners.progression.table.features.${r.featureKey}`)}</TableCell>
                        <TableCell className="text-center"><CellMark included={r.reg} /></TableCell>
                        <TableCell className="text-center"><CellMark included={r.cert} /></TableCell>
                        <TableCell className="text-center"><CellMark included={r.strat} /></TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualTierProgression;
