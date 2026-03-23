import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PartnerFAQ = () => {
  const { t } = useTranslation();
  const items = t('partners.faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('partners.faq.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('partners.faq.subtitle')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-0">
          {items.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/60">
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PartnerFAQ;
