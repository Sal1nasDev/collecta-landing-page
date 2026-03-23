import { useTranslation } from "react-i18next";
import { Layers, Users, Clipboard, HelpCircle, LucideIcon } from "lucide-react";

const Problem = () => {
  const { t } = useTranslation();

  const problems: { icon: LucideIcon; titleKey: string; descKey: string }[] = [
    {
      icon: Layers,
      titleKey: "problem.fragmentedSystems.title",
      descKey: "problem.fragmentedSystems.description",
    },
    {
      icon: Users,
      titleKey: "problem.everyCustomer.title",
      descKey: "problem.everyCustomer.description",
    },
    {
      icon: Clipboard,
      titleKey: "problem.manualWork.title",
      descKey: "problem.manualWork.description",
    },
    {
      icon: HelpCircle,
      titleKey: "problem.lackVisibility.title",
      descKey: "problem.lackVisibility.description",
    },
  ];

  return (
    <section id="problem" className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t('problem.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('problem.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('problem.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={problem.titleKey}
              className="group p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-muted flex items-center justify-center mb-3 md:mb-5 group-hover:bg-primary/10 transition-colors">
                <problem.icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-display text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                {t(problem.titleKey)}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(problem.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
