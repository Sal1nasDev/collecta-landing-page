import { useTranslation } from "react-i18next";
import { Target, Shield, Users, BookOpen, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyWorkAtARMS = () => {
  const { t } = useTranslation();

  const reasons: { icon: LucideIcon; titleKey: string; descKey: string }[] = [
    {
      icon: Target,
      titleKey: "careers.whyWork.realProblems.title",
      descKey: "careers.whyWork.realProblems.description"
    },
    {
      icon: Shield,
      titleKey: "careers.whyWork.autonomy.title",
      descKey: "careers.whyWork.autonomy.description"
    },
    {
      icon: Users,
      titleKey: "careers.whyWork.smallTeams.title",
      descKey: "careers.whyWork.smallTeams.description"
    },
    {
      icon: BookOpen,
      titleKey: "careers.whyWork.learning.title",
      descKey: "careers.whyWork.learning.description"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t('careers.whyWork.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('careers.whyWork.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <Card 
              key={index}
              className="group bg-background border-border/40 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <reason.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(reason.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkAtARMS;
