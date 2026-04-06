"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, X } from "lucide-react";
import { submitHubSpotForm } from "@/lib/hubspot";

const DEMO_FORM_GUID = import.meta.env.VITE_HUBSPOT_DEMO_FORM_GUID as string;

interface DemoFlowProps {
  onClose: () => void;
}

interface StepOption {
  value: string;
  labelKey: string;
}

interface Step {
  id: string;
  questionKey: string;
  options: StepOption[];
}

const steps: Step[] = [
  {
    id: "company-size",
    questionKey: "demoFlow.steps.companySize.question",
    options: [
      { value: "1-50", labelKey: "demoFlow.steps.companySize.options.small" },
      { value: "51-200", labelKey: "demoFlow.steps.companySize.options.medium" },
      { value: "201-1000", labelKey: "demoFlow.steps.companySize.options.large" },
      { value: "1000+", labelKey: "demoFlow.steps.companySize.options.enterprise" },
    ],
  },
  {
    id: "industry",
    questionKey: "demoFlow.steps.industry.question",
    options: [
      { value: "manufacturing", labelKey: "demoFlow.steps.industry.options.manufacturing" },
      { value: "transport-logistics", labelKey: "demoFlow.steps.industry.options.transportLogistics" },
      { value: "pharma", labelKey: "demoFlow.steps.industry.options.pharma" },
      { value: "services", labelKey: "demoFlow.steps.industry.options.services" },
      { value: "retail", labelKey: "demoFlow.steps.industry.options.retail" },
      { value: "other", labelKey: "demoFlow.steps.industry.options.other" },
    ],
  },
  {
    id: "invoice-volume",
    questionKey: "demoFlow.steps.invoiceVolume.question",
    options: [
      { value: "under-500", labelKey: "demoFlow.steps.invoiceVolume.options.under500" },
      { value: "500-2000", labelKey: "demoFlow.steps.invoiceVolume.options.500to2000" },
      { value: "2000-10000", labelKey: "demoFlow.steps.invoiceVolume.options.2000to10000" },
      { value: "10000+", labelKey: "demoFlow.steps.invoiceVolume.options.over10000" },
    ],
  },
  {
    id: "delay-reason",
    questionKey: "demoFlow.steps.delayReason.question",
    options: [
      { value: "disputes", labelKey: "demoFlow.steps.delayReason.options.disputes" },
      { value: "follow-up", labelKey: "demoFlow.steps.delayReason.options.followUp" },
      { value: "visibility", labelKey: "demoFlow.steps.delayReason.options.visibility" },
      { value: "manual-processes", labelKey: "demoFlow.steps.delayReason.options.manualProcesses" },
      { value: "customer-behavior", labelKey: "demoFlow.steps.delayReason.options.customerBehavior" },
    ],
  },
  {
    id: "current-tools",
    questionKey: "demoFlow.steps.currentTools.question",
    options: [
      { value: "erp", labelKey: "demoFlow.steps.currentTools.options.erp" },
      { value: "spreadsheets", labelKey: "demoFlow.steps.currentTools.options.spreadsheets" },
      { value: "ar-software", labelKey: "demoFlow.steps.currentTools.options.arSoftware" },
      { value: "manual", labelKey: "demoFlow.steps.currentTools.options.manual" },
    ],
  },
  {
    id: "timeline",
    questionKey: "demoFlow.steps.timeline.question",
    options: [
      { value: "immediate", labelKey: "demoFlow.steps.timeline.options.immediate" },
      { value: "1-3-months", labelKey: "demoFlow.steps.timeline.options.1to3months" },
      { value: "3-6-months", labelKey: "demoFlow.steps.timeline.options.3to6months" },
      { value: "exploring", labelKey: "demoFlow.steps.timeline.options.exploring" },
    ],
  },
];

const DemoFlow = ({ onClose }: DemoFlowProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [otherIndustry, setOtherIndustry] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleOptionSelect = (value: string) => {
    if (value === "other" && steps[currentStep].id === "industry") {
      setShowOtherInput(true);
      setAnswers({ ...answers, [steps[currentStep].id]: value });
      return;
    }
    
    setAnswers({ ...answers, [steps[currentStep].id]: value });
    setShowOtherInput(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowContactForm(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleOtherSubmit = () => {
    if (!otherIndustry.trim()) return;
    setAnswers({ ...answers, industry: `other: ${otherIndustry}` });
    setShowOtherInput(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowContactForm(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await submitHubSpotForm(DEMO_FORM_GUID, [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
        { name: "company", value: formData.company },
        { name: "company_size", value: answers["company-size"] ?? "" },
        { name: "industry", value: answers["industry"] ?? "" },
        { name: "invoice_volume", value: answers["invoice-volume"] ?? "" },
        { name: "delay_reason", value: answers["delay-reason"] ?? "" },
        { name: "current_tools", value: answers["current-tools"] ?? "" },
        { name: "implementation_timeline", value: answers["timeline"] ?? "" },
      ]);
      setIsSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6 animate-fade-in">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            {t('demoFlow.success.title')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('demoFlow.success.message')}
          </p>
          <Button onClick={onClose} variant="default" size="lg">
            {t('demoFlow.success.close')}
          </Button>
        </div>
      </div>
    );
  }

  if (showContactForm) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="sr-only">Close</span>
          <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {t('demoFlow.contactForm.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('demoFlow.contactForm.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('demoFlow.contactForm.firstName')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('demoFlow.contactForm.lastName')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('demoFlow.contactForm.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{t('demoFlow.contactForm.company')}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            {submitError && (
              <p className="text-sm text-destructive text-center">
                {t('demoFlow.contactForm.error')}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full mt-6" disabled={isSubmitting}>
              {isSubmitting ? t('demoFlow.contactForm.submitting') : t('demoFlow.contactForm.submit')}
              {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in overflow-y-auto">
      {/* Header with progress */}
      <div className="sticky top-0 bg-background px-6 py-4 border-b border-border z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t('demoFlow.stepIndicator', { current: currentStep + 1, total: totalSteps })}
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">Close</span>
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl">
          <div
            key={currentStep}
            className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
              {t(steps[currentStep].questionKey)}
            </h2>

            <div className="grid gap-3 pb-6">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full p-4 sm:p-5 text-left rounded-xl border-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                    answers[steps[currentStep].id] === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <span className="text-base sm:text-lg font-medium text-foreground">
                    {t(option.labelKey)}
                  </span>
                </button>
              ))}
              
              {showOtherInput && steps[currentStep].id === "industry" && (
                <div className="mt-2 flex gap-3 animate-fade-in">
                  <Input
                    autoFocus
                    value={otherIndustry}
                    onChange={(e) => setOtherIndustry(e.target.value)}
                    placeholder={t('demoFlow.steps.industry.otherPlaceholder')}
                    className="flex-1 h-12 text-base rounded-xl"
                    onKeyDown={(e) => e.key === "Enter" && handleOtherSubmit()}
                  />
                  <Button
                    onClick={handleOtherSubmit}
                    disabled={!otherIndustry.trim()}
                    size="lg"
                    className="rounded-xl"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoFlow;
