import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import ComparisonTable from "@/components/managed/ComparisonTable";
import Footer from "@/components/Footer";
import HowWeWork from "@/components/managed/HowWeWork";
import { Button } from "@/components/ui/button";
import TalkToSalesForm from "@/components/sales/TalkToSalesForm";
import mockupLaptop from "@/assets/mockup-gestoria.png";
import {
  Building2,
  Scale,
  UserCheck,
  TrendingDown,
  Clock,
  CheckCircle2,
  Percent,
  BarChart3,
  Shield,
  Zap } from
"lucide-react";

const ManagedServices = () => {
  const { t } = useTranslation();
  const [showSalesForm, setShowSalesForm] = useState(false);

  const services = [
  { icon: Building2, titleKey: "managed.services.fullAR.title", descKey: "managed.services.fullAR.description" },
  { icon: Scale, titleKey: "managed.services.legal.title", descKey: "managed.services.legal.description" },
  { icon: UserCheck, titleKey: "managed.services.inplant.title", descKey: "managed.services.inplant.description" }];


  const metrics = [
  { icon: TrendingDown, valueKey: "managed.metrics.dsoReduction.value", labelKey: "managed.metrics.dsoReduction.label", sublabelKey: "managed.metrics.dsoReduction.sublabel" },
  { icon: Clock, valueKey: "managed.metrics.latePayments.value", labelKey: "managed.metrics.latePayments.label", sublabelKey: "managed.metrics.latePayments.sublabel" },
  { icon: CheckCircle2, valueKey: "managed.metrics.disputeAccuracy.value", labelKey: "managed.metrics.disputeAccuracy.label", sublabelKey: "managed.metrics.disputeAccuracy.sublabel" },
  { icon: Percent, valueKey: "managed.metrics.manualTasks.value", labelKey: "managed.metrics.manualTasks.label", sublabelKey: "managed.metrics.manualTasks.sublabel" }];


  const personaBenefits = [
  { icon: BarChart3, roleKey: "managed.personas.cfo.role", benefitKey: "managed.personas.cfo.benefit", color: "bg-primary/10 text-primary" },
  { icon: Zap, roleKey: "managed.personas.otc.role", benefitKey: "managed.personas.otc.benefit", color: "bg-secondary/50 text-secondary-foreground" },
  { icon: Shield, roleKey: "managed.personas.ar.role", benefitKey: "managed.personas.ar.benefit", color: "bg-accent text-accent-foreground" }];



  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent" />
        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 border border-foreground/30 mb-6">
              <span className="text-sm font-medium text-foreground">{t('managed.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-gradient-animated">AR</span> <span className="text-gradient-animated">M</span>anaged <span className="text-gradient-animated">S</span>ervice
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('managed.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Laptop mockup - centered on mobile/tablet, overlapping on desktop */}
      <div className="relative z-20">
        <div className="flex justify-center lg:justify-end -mb-8 sm:-mb-12 lg:-mb-48 lg:mr-8">
          <img
            src={mockupLaptop}
            alt="ARMS platform interface"
            className="w-52 sm:w-64 md:w-72 lg:w-[27rem]" />
          
        </div>
      </div>

      {/* Services Provided */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        
        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('managed.servicesTitle')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('managed.servicesDesc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) =>
            <div
              key={service.titleKey}
              className="group bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 text-center">
              
                <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/50 transition-colors">
                  <service.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('managed.impactTitle')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('managed.impactDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric) =>
            <div
              key={metric.labelKey}
              className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300">
              
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {t(metric.valueKey)}
                </div>
                <div className="text-foreground font-medium mb-1">
                  {t(metric.labelKey)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t(metric.sublabelKey)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonTable />

      {/* Persona Benefits */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('managed.builtForRole')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('managed.builtForRoleDesc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {personaBenefits.map((persona) =>
            <div
              key={persona.roleKey}
              className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              
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
            )}
          </div>
        </div>
      </section>

      {/* How We Work With You */}
      <HowWeWork />

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-flowing animate-gradient-flow bg-[length:200%_200%]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
                {t('managed.ctaTitle')}
              </h2>
              <p className="text-background/80 text-lg max-w-2xl mx-auto mb-8">
                {t('managed.ctaDesc')}
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8"
                onClick={() => setShowSalesForm(true)}>
                
                {t('managed.talkExperts')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {showSalesForm && <TalkToSalesForm onClose={() => setShowSalesForm(false)} />}

      <Footer />
    </div>);

};

export default ManagedServices;