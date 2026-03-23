import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ARCycleSection from "@/components/ARCycleSection";
import { Button } from "@/components/ui/button";
import DemoFlow from "@/components/demo/DemoFlow";
import PricingPreview from "@/components/software/PricingPreview";
import { 
  BrainCircuit, 
  Bell, 
  Zap, 
  BarChart3,
  UserRoundSearch,
  Link,
  Shield
} from "lucide-react";

const SoftwareSolution = () => {
  const { t } = useTranslation();
  const [showDemoFlow, setShowDemoFlow] = useState(false);

  const capabilities = [
    { icon: BrainCircuit, titleKey: "software.capabilities.predictive.title", descKey: "software.capabilities.predictive.description", iconBg: "bg-primary/10", iconColor: "text-primary" },
    { icon: Bell, titleKey: "software.capabilities.dso.title", descKey: "software.capabilities.dso.description", iconBg: "bg-accent/10", iconColor: "text-accent" },
    { icon: Zap, titleKey: "software.capabilities.reports.title", descKey: "software.capabilities.reports.description", iconBg: "bg-primary/10", iconColor: "text-primary" },
    { icon: BarChart3, titleKey: "software.capabilities.risk.title", descKey: "software.capabilities.risk.description", iconBg: "bg-accent/10", iconColor: "text-accent" },
    { icon: UserRoundSearch, titleKey: "software.capabilities.alerts.title", descKey: "software.capabilities.alerts.description", iconBg: "bg-primary/10", iconColor: "text-primary" },
    { icon: Link, titleKey: "software.capabilities.performance.title", descKey: "software.capabilities.performance.description", iconBg: "bg-accent/10", iconColor: "text-accent" }
  ];

  const personaBenefits = [
    { icon: BarChart3, roleKey: "software.personas.cfo.role", benefitKey: "software.personas.cfo.benefit", color: "bg-primary/10 text-primary" },
    { icon: Zap, roleKey: "software.personas.otc.role", benefitKey: "software.personas.otc.benefit", color: "bg-secondary/50 text-secondary-foreground" },
    { icon: Shield, roleKey: "software.personas.ar.role", benefitKey: "software.personas.ar.benefit", color: "bg-accent text-accent-foreground" }
  ];

  const dashboardFeatures = t('software.dashboardFeatures', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">{t('software.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-gradient-animated">AR</span>{' '}<span className="text-gradient-animated">M</span>{t('software.titleManagement')}{' '}<span className="text-gradient-animated">S</span>{t('software.titleSystem')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('software.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('software.coreCapabilities')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('software.coreCapabilitiesDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {capabilities.map((capability) => (
              <div 
                key={capability.titleKey}
                className="pillar-card group p-4 md:p-8"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${capability.iconBg} flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                  <capability.icon className={`w-5 h-5 md:w-7 md:h-7 ${capability.iconColor}`} />
                </div>
                
                <h3 className="relative font-display text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                  {t(capability.titleKey)}
                </h3>
                
                <p className="relative text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t(capability.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl border border-border/50 p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t('software.dashboardTitle')}
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t('software.dashboardDesc')}
                </p>
                <div className="space-y-4">
                  {dashboardFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mock Dashboard */}
              <div className="bg-card rounded-2xl border border-border shadow-xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="h-6 md:h-8 bg-muted rounded-lg w-1/3" />
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="bg-primary/10 rounded-xl p-2 md:p-4">
                      <div className="text-base md:text-2xl font-bold text-primary">32</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{t('software.dashboardLabels.dso')}</div>
                    </div>
                    <div className="bg-secondary/30 rounded-xl p-2 md:p-4">
                      <div className="text-base md:text-2xl font-bold text-foreground">94%</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{t('software.dashboardLabels.collectionRate')}</div>
                    </div>
                    <div className="bg-accent/30 rounded-xl p-2 md:p-4">
                      <div className="text-base md:text-2xl font-bold text-foreground">$2.4M</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{t('software.dashboardLabels.cashFlow')}</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl flex items-end p-4">
                    <div className="flex items-end gap-2 w-full">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-primary/60 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AR Cycle Section */}
      <ARCycleSection />

      {/* Persona Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('software.builtForRole')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('software.builtForRoleDesc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {personaBenefits.map((persona) => (
              <div 
                key={persona.roleKey}
                className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${persona.color} flex items-center justify-center mx-auto mb-6`}>
                  <persona.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(persona.roleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(persona.benefitKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <PricingPreview />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-wide">
          <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-animated animate-gradient-flow bg-[length:200%_200%]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t('software.ctaTitle')}
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                {t('software.ctaDesc')}
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-base px-8"
                onClick={() => setShowDemoFlow(true)}
              >
                {t('software.requestDemo')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {showDemoFlow && <DemoFlow onClose={() => setShowDemoFlow(false)} />}

      <Footer />
    </div>
  );
};

export default SoftwareSolution;
