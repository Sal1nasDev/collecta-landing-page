"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";

interface TalkToSalesFormProps {
  onClose: () => void;
}

const TalkToSalesForm = ({ onClose }: TalkToSalesFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sales contact:", formData);
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
            {t('salesForm.success.title')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('salesForm.success.message')}
          </p>
          <Button onClick={onClose} variant="default" size="lg">
            {t('salesForm.success.close')}
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
            <span className="sr-only">Close</span>
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {t('salesForm.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('salesForm.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sales-firstName">{t('salesForm.firstName')}</Label>
                <Input
                  id="sales-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sales-lastName">{t('salesForm.lastName')}</Label>
                <Input
                  id="sales-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-email">{t('salesForm.email')}</Label>
              <Input
                id="sales-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-company">{t('salesForm.company')}</Label>
              <Input
                id="sales-company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-role">{t('salesForm.role')}</Label>
              <Input
                id="sales-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-message">
                {t('salesForm.message')} <span className="text-muted-foreground font-normal">({t('salesForm.optional')})</span>
              </Label>
              <Textarea
                id="sales-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">
              {t('salesForm.submit')}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              {t('salesForm.responseTime')}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TalkToSalesForm;
