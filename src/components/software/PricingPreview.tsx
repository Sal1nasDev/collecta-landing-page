import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const planKeys = ["essential", "professional", "enterprise"] as const;
const ctaVariants = { essential: "outline", professional: "default", enterprise: "outline" } as const;

export default function PricingPreview() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('software.pricingPreview.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('software.pricingPreview.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planKeys.map((key, i) => {
            const badge = t(`software.pricingPreview.${key}.badge`, { defaultValue: "" });
            const features = t(`software.pricingPreview.${key}.features`, { returnObjects: true }) as string[];

            return (
              <div
                key={key}
                className={`relative bg-card rounded-xl p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 animate-fade-up ${
                  badge
                    ? "border-primary/40 shadow-lg"
                    : "border-border/50 shadow-md"
                }`}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
              >
                {badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    {badge}
                  </span>
                )}

                <h3 className="text-xl font-bold text-foreground mb-1">
                  {t(`software.pricingPreview.${key}.name`)}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t(`software.pricingPreview.${key}.description`)}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={ctaVariants[key]}
                  className="w-full"
                  onClick={() => { navigate("/pricing"); window.scrollTo(0, 0); }}
                >
                  {t(`software.pricingPreview.${key}.cta`)}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm mb-2">
            {t('software.pricingPreview.customQuote')}
          </p>
          <button
            onClick={() => { navigate("/pricing"); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline group"
          >
            {t('software.pricingPreview.calculatePrice')}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
