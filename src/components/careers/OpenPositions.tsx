import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const OpenPositions = () => {
  const { t } = useTranslation();

  const positions = [
    {
      id: "1",
      titleKey: "careers.positions.fullStack.title",
      locationKey: "careers.positions.fullStack.location",
      typeKey: "careers.positions.fullStack.type",
      descriptionKey: "careers.positions.fullStack.description",
      slug: "full-stack-developer"
    },
    {
      id: "2",
      titleKey: "careers.positions.arSpecialist.title",
      locationKey: "careers.positions.arSpecialist.location",
      typeKey: "careers.positions.arSpecialist.type",
      descriptionKey: "careers.positions.arSpecialist.description",
      slug: "accounts-receivable-specialist"
    }
  ];

  return (
    <section id="open-positions" className="py-12 md:py-16 bg-secondary/20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            {t('careers.positions.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('careers.positions.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {positions.map((position) => (
            <Link
              key={position.id}
              to={`/careers/${position.slug}`}
              className="group block p-6 bg-background border border-border/40 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {t(position.titleKey)}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {t(position.locationKey)}
                    </span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">
                      {t(position.typeKey)}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {t(position.descriptionKey)}
              </p>

              <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm group-hover:gap-2.5 transition-all">
                {t('careers.positions.viewRole')}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;
