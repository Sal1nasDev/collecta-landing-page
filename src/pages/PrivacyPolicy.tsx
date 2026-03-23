import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container-wide pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">{t('privacy.title')}</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
          <p>
            {t('privacy.intro')}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.infoCollected.title')}</h2>
            <p>
              {t('privacy.infoCollected.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.cookies.title')}</h2>
            <p>
              {t('privacy.cookies.content1')}
            </p>
            <p>
              {t('privacy.cookies.content2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.thirdParty.title')}</h2>
            <p>
              {t('privacy.thirdParty.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.control.title')}</h2>
            <p>
              {t('privacy.control.content1')}
            </p>
            <p>
              {t('privacy.control.content2')}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
