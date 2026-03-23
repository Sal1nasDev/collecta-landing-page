import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const CareersHero = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            {t('careers.hero.title1')}{" "}
            <span className="text-gradient-animated">{t('careers.hero.title2')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            {t('careers.hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('always-open')}
              className="text-base px-8"
            >
              {t('careers.hero.tellUs')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('open-positions')}
              className="text-base px-8"
            >
              {t('careers.hero.openPositions')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
