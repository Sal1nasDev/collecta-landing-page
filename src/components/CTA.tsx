import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DemoFlow from "./demo/DemoFlow";
import TalkToSalesForm from "./sales/TalkToSalesForm";

const CTA = () => {
  const { t } = useTranslation();
  const [showDemoFlow, setShowDemoFlow] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);

  return (
    <>
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div 
              className="absolute inset-0 animate-gradient-flow"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 40%, hsl(var(--accent) / 0.8) 100%)',
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* Subtle pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto">
                {t('cta.title')}
              </h2>
              
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                {t('cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  variant="hero" 
                  size="xl"
                  className="bg-background text-primary hover:bg-background/90"
                  onClick={() => setShowDemoFlow(true)}
                >
                  {t('cta.getDemo')}
                  <ArrowRight className="ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="xl" 
                  className="text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  onClick={() => setShowSalesForm(true)}
                >
                  {t('cta.talkSales')}
                </Button>
              </div>

              <p className="mt-8 text-sm text-primary-foreground/60">
                {t('cta.noCommitment')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {showDemoFlow && <DemoFlow onClose={() => setShowDemoFlow(false)} />}
      {showSalesForm && <TalkToSalesForm onClose={() => setShowSalesForm(false)} />}
    </>
  );
};

export default CTA;
