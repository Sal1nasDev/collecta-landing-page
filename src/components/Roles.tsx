import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, Layers, CheckSquare, LucideIcon } from "lucide-react";

const Roles = () => {
  const { t } = useTranslation();
  const [activeRole, setActiveRole] = useState<number | null>(null);

  const roles: { icon: LucideIcon; titleKey: string; benefitsKey: string; quoteKey: string }[] = [
    {
      icon: LineChart,
      titleKey: "roles.cfo.title",
      benefitsKey: "roles.cfo.benefits",
      quoteKey: "roles.cfo.quote",
    },
    {
      icon: Layers,
      titleKey: "roles.otc.title",
      benefitsKey: "roles.otc.benefits",
      quoteKey: "roles.otc.quote",
    },
    {
      icon: CheckSquare,
      titleKey: "roles.ar.title",
      benefitsKey: "roles.ar.benefits",
      quoteKey: "roles.ar.quote",
    },
  ];

  return (
    <section id="roles" className="py-12 md:py-16 bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t('roles.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('roles.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('roles.description')}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const benefits = t(role.benefitsKey, { returnObjects: true }) as string[];
            return (
              <div
                key={role.titleKey}
                className={`group relative p-3 md:p-8 rounded-xl md:rounded-2xl bg-card border transition-all duration-300 hover:shadow-xl cursor-pointer md:cursor-default ${
                  activeRole === index
                    ? 'border-primary/40 shadow-md'
                    : 'border-border/50 hover:border-primary/20'
                }`}
                onClick={() => setActiveRole(activeRole === index ? null : index)}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/15 transition-colors">
                  <role.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                
                <h3 className="font-display text-sm md:text-xl font-semibold text-foreground mb-2 md:mb-5">
                  {t(role.titleKey)}
                </h3>
                
                <ul className="space-y-1 md:space-y-3 mb-3 md:mb-6 hidden md:block">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-3 md:pt-6 border-t border-border/50 hidden md:block">
                  <p className="text-sm italic text-muted-foreground">
                    "{t(role.quoteKey)}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile expanded card */}
        {activeRole !== null && (
          <div className="md:hidden mt-4 p-4 rounded-xl bg-card border border-border/50 shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-200 max-w-6xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                {(() => { const Icon = roles[activeRole].icon; return <Icon className="w-5 h-5 text-primary" />; })()}
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base font-semibold text-foreground mb-2">
                  {t(roles[activeRole].titleKey)}
                </h4>
                <ul className="space-y-1.5 mb-3">
                  {(t(roles[activeRole].benefitsKey, { returnObjects: true }) as string[]).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm italic text-muted-foreground">
                    "{t(roles[activeRole].quoteKey)}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Roles;
