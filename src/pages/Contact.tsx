import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import DemoFlow from "@/components/demo/DemoFlow";
import { submitHubSpotForm } from "@/lib/hubspot";

const CONTACT_FORM_GUID = import.meta.env.VITE_HUBSPOT_CONTACT_FORM_GUID as string;

const Contact = () => {
  const { t } = useTranslation();
  const [showDemoFlow, setShowDemoFlow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await submitHubSpotForm(CONTACT_FORM_GUID, [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
        { name: "company", value: formData.company },
        { name: "jobtitle", value: formData.role },
        { name: "message", value: formData.message },
      ]);
      setIsSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-tight text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Two Column Section */}
        <section className="pb-20 md:pb-28">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: Contact Info */}
              <div>
                <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-10" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                    {t('contact.info.title')}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('contact.info.emailLabel')}</p>
                        <a href="mailto:info@ar-ms.tech" className="text-foreground font-medium hover:text-primary transition-colors">
                          info@ar-ms.tech
                        </a>
                      </div>
                    </div>


                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('contact.info.locationsLabel')}</p>
                        <p className="text-foreground font-medium">Mexico City</p>
                        <p className="text-foreground font-medium">Madrid</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {t('contact.info.locationsNote')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div>
                <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-10" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                        {t('contact.form.successTitle')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('contact.form.successMessage')}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                        {t('contact.form.title')}
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contact-firstName">{t('contact.form.firstName')}</Label>
                            <Input
                              id="contact-firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contact-lastName">{t('contact.form.lastName')}</Label>
                            <Input
                              id="contact-lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact-email">{t('contact.form.email')}</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact-company">{t('contact.form.company')}</Label>
                          <Input
                            id="contact-company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact-role">
                            {t('contact.form.role')} <span className="text-muted-foreground font-normal">({t('contact.form.optional')})</span>
                          </Label>
                          <Input
                            id="contact-role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact-message">{t('contact.form.message')}</Label>
                          <Textarea
                            id="contact-message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={5}
                            className="resize-none"
                            required
                          />
                        </div>

                        {submitError && (
                          <p className="text-sm text-destructive text-center">
                            {t('contact.form.error')}
                          </p>
                        )}
                        <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                          {t('contact.form.responseTime')}
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="pb-20 md:pb-28">
          <div className="container-tight">
            <div className="bg-secondary/30 rounded-2xl border border-border/50 p-10 md:p-14 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t('contact.cta.title')}
              </h2>
              <Button variant="cta" size="xl" onClick={() => setShowDemoFlow(true)}>
                {t('contact.cta.button')}
                <ArrowRight className="ml-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showDemoFlow && <DemoFlow onClose={() => setShowDemoFlow(false)} />}
    </div>
  );
};

export default Contact;
