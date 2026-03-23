import { useTranslation } from "react-i18next";
import { Settings2, Users2, Zap, Target, LucideIcon } from "lucide-react";

const ValuePillars = () => {
  const { t } = useTranslation();

  const pillars: { icon: LucideIcon; titleKey: string; descKey: string; iconBg: string; iconColor: string }[] = [
    {
      icon: Settings2,
      titleKey: "pillars.customization.title",
      descKey: "pillars.customization.description",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users2,
      titleKey: "pillars.collaboration.title",
      descKey: "pillars.collaboration.description",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Zap,
      titleKey: "pillars.automation.title",
      descKey: "pillars.automation.description",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Target,
      titleKey: "pillars.predictability.title",
      descKey: "pillars.predictability.description",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
  ];

  return (
    <section id="pillars" className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t('pillars.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('pillars.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('pillars.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div 
              key={pillar.titleKey}
              className="pillar-card group p-4 md:p-8"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${pillar.iconBg} flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                <pillar.icon className={`w-5 h-5 md:w-7 md:h-7 ${pillar.iconColor}`} />
              </div>
              
              <h3 className="relative font-display text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                {t(pillar.titleKey)}
              </h3>
              
              <p className="relative text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(pillar.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;
