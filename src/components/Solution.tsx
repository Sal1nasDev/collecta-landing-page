import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Eye, GitBranch, Compass, Monitor, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Solution = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'software' | 'managed' | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: Eye,
      titleKey: 'solution.seeEverything.title',
      descKey: 'solution.seeEverything.description',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      arrowColor: 'text-primary/40',
    },
    {
      icon: GitBranch,
      titleKey: 'solution.connectDots.title',
      descKey: 'solution.connectDots.description',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent',
      arrowColor: 'text-accent/40',
    },
    {
      icon: Compass,
      titleKey: 'solution.knowNext.title',
      descKey: 'solution.knowNext.description',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      arrowColor: 'text-primary/40',
    },
  ];

  const softwareFeatures = t('about.workWith.software.features', { returnObjects: true }) as string[];
  const managedFeatures = t('about.workWith.managed.features', { returnObjects: true }) as string[];

  return (
    <section id="solution" className="section-padding bg-secondary/20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t('solution.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('solution.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('solution.description')}
          </p>
        </div>

        {/* Flow visualization */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.titleKey}
                className={`text-center cursor-pointer md:cursor-default p-3 md:p-0 rounded-xl md:rounded-none border md:border-0 transition-all duration-200 ${
                  activeStep === index
                    ? 'border-primary/40 bg-primary/5 shadow-md'
                    : 'border-border/50 bg-card md:bg-transparent'
                }`}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              >
                <div className={`relative inline-flex items-center justify-center w-10 h-10 md:w-20 md:h-20 rounded-lg md:rounded-2xl ${step.bgColor} mb-2 md:mb-6`}>
                  <step.icon className={`w-5 h-5 md:w-10 md:h-10 ${step.iconColor}`} />
                  {index < 2 && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                      <ArrowRight className={`w-6 h-6 ${step.arrowColor}`} />
                    </div>
                  )}
                </div>
                <h3 className="font-display text-xs md:text-xl font-semibold text-foreground mb-0 md:mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed hidden md:block">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile expanded card */}
          {activeStep !== null && (
            <div className="md:hidden mt-4 p-4 rounded-xl bg-card border border-border/50 shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${steps[activeStep].bgColor} flex items-center justify-center flex-shrink-0`}>
                  {(() => { const Icon = steps[activeStep].icon; return <Icon className={`w-5 h-5 ${steps[activeStep].iconColor}`} />; })()}
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-foreground mb-1">
                    {t(steps[activeStep].titleKey)}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(steps[activeStep].descKey)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 -z-10" />
        </div>

        {/* One platform. Two ways to work. */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {t('about.workWith.title')}
            </h3>
            <p className="text-muted-foreground text-lg">
              {t('about.workWith.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Software option */}
            <button
              onClick={() => setActiveTab(activeTab === 'software' ? null : 'software')}
              className={`group text-left p-8 rounded-2xl border-2 transition-all duration-300 ${
                activeTab === 'software'
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                  activeTab === 'software' ? 'bg-primary' : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  <Monitor className={`w-7 h-7 transition-colors ${
                    activeTab === 'software' ? 'text-primary-foreground' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    {t('about.workWith.software.title')}
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    {t('about.workWith.software.description')}
                  </p>
                  <Link
                    to="/solutions/software"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    onClick={(e) => { e.stopPropagation(); window.scrollTo(0, 0); }}
                  >
                    {t('about.workWith.learnMore')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className={`mt-6 pt-6 border-t border-border/50 overflow-hidden transition-all duration-300 ${
                activeTab === 'software' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {softwareFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </button>

            {/* Managed option */}
            <button
              onClick={() => setActiveTab(activeTab === 'managed' ? null : 'managed')}
              className={`group text-left p-8 rounded-2xl border-2 transition-all duration-300 ${
                activeTab === 'managed'
                  ? 'border-secondary bg-secondary/10 shadow-lg'
                  : 'border-border hover:border-secondary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                  activeTab === 'managed' ? 'bg-secondary' : 'bg-secondary/20 group-hover:bg-secondary/30'
                }`}>
                  <Users className={`w-7 h-7 transition-colors ${
                    activeTab === 'managed' ? 'text-secondary-foreground' : 'text-secondary-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    {t('about.workWith.managed.title')}
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    {t('about.workWith.managed.description')}
                  </p>
                  <Link
                    to="/solutions/managed-services"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    onClick={(e) => { e.stopPropagation(); window.scrollTo(0, 0); }}
                  >
                    {t('about.workWith.learnMore')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className={`mt-6 pt-6 border-t border-border/50 overflow-hidden transition-all duration-300 ${
                activeTab === 'managed' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {managedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
