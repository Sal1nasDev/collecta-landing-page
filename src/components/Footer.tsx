import { useTranslation } from "react-i18next";
import armsLogo from "@/assets/arms-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img src={armsLogo} alt="ARMS" className="h-6 w-auto" />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="/#solution" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.product')}
            </a>
            <a href="/industries" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.industries')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.pricing')}
            </a>
            <a href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.careers')}
            </a>
            <a href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.partners', 'Partners')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.contact')}
            </a>
            <a href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
