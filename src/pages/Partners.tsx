import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  ArrowRight,
  Handshake,
  ShieldCheck,
  Crown,
  Briefcase,
  RefreshCw,
  Zap,
  TrendingUp,
} from "lucide-react";
import PartnerApplicationModal from "@/components/partners/PartnerApplicationModal";
import VisualTierProgression from "@/components/partners/VisualTierProgression";
import PartnerMap from "@/components/partners/PartnerMap";
import PartnerFAQ from "@/components/partners/PartnerFAQ";

const statIcons = [Briefcase, RefreshCw, Zap, TrendingUp];
const statKeys = ["levels", "recurring", "onboarding", "firstDeal"] as const;

const pathKeys = ["registered", "certified", "strategic"] as const;
const pathIcons = [Handshake, ShieldCheck, Crown];
const pathCtaVariants = ["outline", "cta", "outline"] as const;
const pathFeatured = [false, true, false];

const Partners = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLevel, setModalLevel] = useState("not-sure");

  const openModal = (level: string) => {
    setModalLevel(level);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,85%,20%)] via-[hsl(190,70%,25%)] to-[hsl(175,60%,28%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-wide relative z-10 text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
            {t('partners.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('partners.hero.subtitle')}
          </p>
          <Button variant="cta" size="xl" onClick={() => openModal("not-sure")}>
            {t('partners.hero.cta')}
            <ArrowRight className="ml-1" />
          </Button>
        </div>
      </section>

      {/* ── WHY PARTNER STATS ── */}
      <section className="py-14 bg-secondary/40 border-y border-border/50">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {statKeys.map((key, i) => {
              const Icon = statIcons[i];
              return (
                <div key={key} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                    {t(`partners.stats.${key}.value`)}
                  </div>
                  <div className="text-sm text-muted-foreground">{t(`partners.stats.${key}.label`)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARTNER PATHS ── */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('partners.paths.title')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('partners.paths.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {pathKeys.map((key, idx) => {
              const Icon = pathIcons[idx];
              const featured = pathFeatured[idx];
              const whatYouDo = t(`partners.paths.${key}.whatYouDo`, { returnObjects: true }) as string[];
              const whatYouGet = t(`partners.paths.${key}.whatYouGet`, { returnObjects: true }) as string[];

              return (
                <div
                  key={key}
                  className={`relative flex flex-col rounded-2xl border-2 p-8 lg:px-10 lg:py-9 transition-shadow duration-300 ${
                    featured ? "border-primary bg-[hsl(185,40%,97%)] shadow-lg" : "border-border bg-card hover:shadow-md"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${featured ? "bg-primary/15" : "bg-secondary"}`}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{t(`partners.paths.${key}.name`)}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{t(`partners.paths.${key}.tagline`)}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(`partners.paths.${key}.description`)}</p>

                  <div className="border-t border-border/60 pt-4 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t('partners.paths.whatYouDo')}</p>
                    <ul className="space-y-2">
                      {whatYouDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border/60 pt-4 mb-6 flex-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t('partners.paths.whatYouGet')}</p>
                    <ul className="space-y-2">
                      {whatYouGet.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant={pathCtaVariants[idx]} size="lg" className="w-full" onClick={() => openModal(key)}>
                    {t(`partners.paths.${key}.cta`)}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <VisualTierProgression />
      <PartnerMap />
      <PartnerFAQ />

      <PartnerApplicationModal open={modalOpen} onOpenChange={setModalOpen} defaultLevel={modalLevel} />
      <Footer />
    </div>
  );
};

export default Partners;
