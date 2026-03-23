import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AlwaysOpen = () => {
  const { t } = useTranslation();

  return (
    <section id="always-open" className="py-12 md:py-16 bg-background">
      <div className="container-wide">
        <Card className="max-w-4xl mx-auto border-0 shadow-lg overflow-hidden relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-animated opacity-100" />
          <div className="absolute inset-0 bg-gradient-animated-overlay" />
          <CardContent className="p-10 md:p-16 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 bg-primary-foreground/10 text-primary-foreground rounded-full text-sm font-medium mb-6">
              {t('careers.alwaysOpen.badge')}
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              {t('careers.alwaysOpen.title')}
            </h2>
            
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('careers.alwaysOpen.description')}
            </p>
            
            <Link to="/careers/open-application">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group text-base px-8"
              >
                {t('careers.alwaysOpen.cta')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AlwaysOpen;
