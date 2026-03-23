import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import { ArrowLeft, Target, Compass, BookOpen, Wrench } from "lucide-react";

const OpenApplication = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Target,
      titleKey: "careers.openApplication.values.ownership.title",
      descriptionKey: "careers.openApplication.values.ownership.description"
    },
    {
      icon: Compass,
      titleKey: "careers.openApplication.values.ambiguity.title",
      descriptionKey: "careers.openApplication.values.ambiguity.description"
    },
    {
      icon: BookOpen,
      titleKey: "careers.openApplication.values.curiosity.title",
      descriptionKey: "careers.openApplication.values.curiosity.description"
    },
    {
      icon: Wrench,
      titleKey: "careers.openApplication.values.operational.title",
      descriptionKey: "careers.openApplication.values.operational.description"
    }
  ];

  const steps = t('careers.openApplication.steps', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container-wide">
          {/* Back link */}
          <Link 
            to="/careers" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('careers.openApplication.backLink')}
          </Link>

          {/* Opening Section */}
          <div className="max-w-3xl mb-20">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              {t('careers.openApplication.badge')}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {t('careers.openApplication.title')}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              {t('careers.openApplication.description')}
            </p>
          </div>

          {/* What We Value Section */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              {t('careers.openApplication.valuesTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="p-5 bg-secondary/30 rounded-xl border border-transparent"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(value.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How This Works Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              {t('careers.openApplication.stepsTitle')}
            </h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-4 py-2.5 bg-muted/50 rounded-lg"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-foreground text-sm">{step}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              {t('careers.openApplication.stepsNote')}
            </p>
          </div>

          {/* Application Form */}
          <div className="max-w-2xl">
            <div className="p-8 bg-card border border-border rounded-xl">
              <JobApplicationForm isOpenApplication />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpenApplication;
