import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import { ArrowLeft, MapPin, Briefcase } from "lucide-react";

const FullStackDeveloper = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatYoullDo = t("careers.jobPages.roles.fullStack.whatYoullDo", {
    returnObjects: true,
  }) as string[];

  const whatWeLookFor = t("careers.jobPages.roles.fullStack.whatWeLookFor", {
    returnObjects: true,
  }) as string[];

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
            {t("careers.jobPages.backAll")}
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Role Header */}
              <header>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  {t("careers.positions.fullStack.title")}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t("careers.positions.fullStack.location")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {t("careers.jobPages.department.engineering")}
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">
                    {t("careers.positions.fullStack.type")}
                  </span>
                </div>
              </header>

              {/* About the Role */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("careers.jobPages.sections.about")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("careers.jobPages.roles.fullStack.about")}
                </p>
              </section>

              {/* What You Will Do */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("careers.jobPages.sections.whatYoullDo")}
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  {whatYoullDo.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* What We Look For */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("careers.jobPages.sections.whatWeLookFor")}
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  {whatWeLookFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* How We Work */}
              <section className="p-6 bg-muted/30 rounded-xl border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  {t("careers.jobPages.sections.howWeWork")}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("careers.jobPages.howWeWorkBody")}
                </p>
              </section>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 p-6 bg-card border border-border rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {t("careers.jobPages.apply")}
                </h3>
                <JobApplicationForm jobTitle={t("careers.positions.fullStack.title")} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FullStackDeveloper;

