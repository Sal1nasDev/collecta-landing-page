import { useTranslation } from "react-i18next";
import { TrendingUp, Clock, DollarSign, BarChart3 } from "lucide-react";

const statKeys = [
  { icon: DollarSign, key: "cashRecovered" },
  { icon: Clock, key: "dsoReduction" },
  { icon: TrendingUp, key: "roi" },
  { icon: BarChart3, key: "predictability" },
];

const ProofSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {statKeys.map((stat, index) => (
            <div 
              key={stat.key}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {t(`proof.${stat.key}.value`)}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {t(`proof.${stat.key}.label`)}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(`proof.${stat.key}.description`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
