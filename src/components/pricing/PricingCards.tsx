import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Minus, Zap, Gauge, Crown } from "lucide-react";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { formatCurrency } from "./pricingCalculations";

interface PricingCardsProps {
  pricing: { essential: number; professional: number; enterprise: number };
  invoices: number;
  onTalkToSales: (planName: string, planPrice: number) => void;
}

const TIER_ICONS = { essential: Zap, professional: Gauge, enterprise: Crown };

const FEATURE_KEYS = [
  { key: "coreWorkflows", essential: true, professional: true, enterprise: true },
  { key: "multiCurrency", essential: true, professional: true, enterprise: true },
  { key: "invoiceTracking", essential: true, professional: true, enterprise: true },
  { key: "automationEngine", essential: false, professional: true, enterprise: true },
  { key: "dsoAnalytics", essential: false, professional: true, enterprise: true },
  { key: "scheduledExports", essential: false, professional: false, enterprise: true },
  { key: "apiAccess", essential: false, professional: false, enterprise: true },
  { key: "tailoredReporting", essential: false, professional: false, enterprise: true },
];

function AnimatedPrice({ price }: { price: number }) {
  const animated = useAnimatedNumber(price, 800);
  return (
    <span className="text-3xl font-bold text-foreground tabular-nums">
      {formatCurrency(animated)}
    </span>
  );
}

function FeatureCheck({ included }: { included: boolean }) {
  return included ? (
    <Check className="w-3.5 h-3.5 text-foreground mx-auto" />
  ) : (
    <Minus className="w-3.5 h-3.5 text-border mx-auto" />
  );
}

export default function PricingCards({ pricing, invoices, onTalkToSales }: PricingCardsProps) {
  const { t } = useTranslation();
  const costPer = (price: number) => (invoices > 0 ? (price / invoices).toFixed(2) : "—");

  const tierKeys = ["essential", "professional", "enterprise"] as const;

  const tiers = tierKeys.map((key) => ({
    key,
    tier: t(`pricing.tiers.${key}`),
    price: pricing[key],
    bestFor: t(`pricing.cards.bestFor.${key}`),
    ctaLabel: t("pricing.cards.getStarted"),
    isPrimary: true,
    isPopular: key === "professional",
  }));

  return (
    <div className="space-y-10">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto"
        style={{ maxWidth: "80%", minWidth: 0 }}
      >
        {tiers.map((tier, i) => {
          const Icon = TIER_ICONS[tier.key];
          const bullets = t(`pricing.cards.tierMeta.${tier.key}.bullets`, { returnObjects: true }) as string[];

          return (
            <div
              key={tier.key}
              className={`relative rounded-xl px-10 py-8 opacity-0 animate-fade-up flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                tier.isPopular
                  ? "border-primary/40 shadow-lg"
                  : "border-border/50 shadow-md"
              }`}
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: "forwards",
                background: tier.isPopular ? "#f0fafb" : "hsl(var(--card))",
              }}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-primary-foreground">
                  {t("pricing.cards.mostPopular")}
                </span>
              )}

              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-primary" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {tier.tier}
                </p>
              </div>

              <p className="text-[11px] italic text-muted-foreground/60 mb-5">
                {t(`pricing.cards.tierMeta.${tier.key}.tagline`)}
              </p>

              <div className="mb-2">
                <AnimatedPrice price={tier.price} />
                <span className="text-sm text-muted-foreground ml-1">{t("pricing.cards.perMonth", "/mo")}</span>
              </div>

              <p className="text-[11px] text-muted-foreground/50 mb-1">
                {t("pricing.cards.costPerInvoice")}: ${costPer(tier.price)}
              </p>

              <p className="text-sm text-primary leading-relaxed mb-6">
                {tier.bestFor}
              </p>

              <div className="border-t border-border/40 pt-4 mb-6 space-y-2">
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground leading-snug">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-2">
                <Button
                  variant={tier.isPrimary ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTalkToSales(tier.tier, tier.price)}
                  className={`w-full text-xs ${
                    tier.isPrimary ? "" : "border-foreground text-foreground"
                  }`}
                >
                  {tier.ctaLabel}
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
                {t(`pricing.cards.tierMeta.${tier.key}.socialProof`)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Feature comparison */}
      <div className="pt-8 mx-auto" style={{ maxWidth: "80%" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-xs font-medium text-muted-foreground w-2/5" />
              {tiers.map((tier) => (
                <th key={tier.key} className="text-center py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {tier.tier}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_KEYS.map((feat) => (
              <tr key={feat.key} className="border-b border-border/50">
                <td className="py-3 text-sm text-muted-foreground">
                  {t(`pricing.cards.features.${feat.key}`)}
                </td>
                <td className="py-3 text-center"><FeatureCheck included={feat.essential} /></td>
                <td className="py-3 text-center"><FeatureCheck included={feat.professional} /></td>
                <td className="py-3 text-center"><FeatureCheck included={feat.enterprise} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
