import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { formatCurrency } from "./pricingCalculations";

interface PricingContactModalProps {
  onClose: () => void;
  planName: string;
  planPrice: number;
}

const PricingContactModal = ({ onClose, planName, planPrice }: PricingContactModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.company.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
        <div className="text-center max-w-md bg-card p-8 rounded-2xl border border-border shadow-lg animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            {t("pricing.contactModal.thankYou")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("pricing.contactModal.thankYouDesc")}
          </p>
          <Button onClick={onClose} variant="default" size="lg">
            {t("pricing.contactModal.close")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="min-h-full flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-lg bg-card p-8 rounded-2xl border border-border shadow-lg relative animate-slide-up">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">{t("pricing.contactModal.close")}</span>
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {t("pricing.contactModal.title")}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pc-firstName">{t("pricing.contactModal.firstName")}</Label>
                <Input
                  id="pc-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pc-lastName">{t("pricing.contactModal.lastName")}</Label>
                <Input
                  id="pc-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pc-email">{t("pricing.contactModal.email")}</Label>
              <Input
                id="pc-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                maxLength={255}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pc-company">{t("pricing.contactModal.company")}</Label>
              <Input
                id="pc-company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pc-phone">{t("pricing.contactModal.phone")}</Label>
              <Input
                id="pc-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={30}
              />
            </div>

            {/* Locked plan details */}
            <div className="rounded-xl bg-muted/50 border border-border p-4 space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("pricing.contactModal.selectedPlan")}</span>
                <span className="text-sm font-semibold text-foreground">{planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("pricing.contactModal.price")}</span>
                <span className="text-sm font-semibold text-foreground">{formatCurrency(planPrice)}/mo</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className="w-full mt-2 bg-[hsl(174,82%,33%)] hover:bg-[hsl(174,82%,28%)] text-white"
            >
              {t("pricing.contactModal.submit")}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              {t("pricing.contactModal.disclaimer")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PricingContactModal;
