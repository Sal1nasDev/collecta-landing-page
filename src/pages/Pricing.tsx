import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import armsLogo from "@/assets/ar-ms-logo-simple.png";
import PricingContactModal from "@/components/pricing/PricingContactModal";
import DemoFlow from "@/components/demo/DemoFlow";
import AgingBreakdown from "@/components/pricing/AgingBreakdown";
import PricingCards from "@/components/pricing/PricingCards";

import { calculatePCI, calculatePricing } from "@/components/pricing/pricingCalculations";

interface FormValues {
  invoices: string;
  recovery: string;
  peakThreshold: string;
  agingCurrent: string;
  aging1to30: string;
  aging31to60: string;
  aging61to90: string;
  aging90plus: string;
  debtors: string;
  dso: string;
}

const INITIAL: FormValues = {
  invoices: "",
  recovery: "",
  peakThreshold: "",
  agingCurrent: "",
  aging1to30: "",
  aging31to60: "",
  aging61to90: "",
  aging90plus: "",
  debtors: "",
  dso: ""
};

function parseNum(v: string): number {
  return parseFloat(v.replace(/,/g, "")) || 0;
}

const STEP_LABELS = ["volume", "aging", "operations", "pricing"] as const;

function StepIndicator({ current, total }: {current: number;total: number;}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-3 mb-16">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={step} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-400 ${
                isDone ?
                "bg-foreground text-background" :
                isActive ?
                "border-2 border-foreground text-foreground" :
                "border border-border text-muted-foreground"}`
                }>
                
                {isDone ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              <span className={`text-[10px] transition-colors ${isActive || isDone ? "text-foreground" : "text-muted-foreground"}`}>
                {t(`pricing.stepLabels.${STEP_LABELS[i]}`)}
              </span>
            </div>
            {step < total &&
            <div className={`w-12 h-px transition-colors duration-400 mb-5 ${isDone ? "bg-foreground" : "bg-border"}`} />
            }
          </div>);

      })}
    </div>);

}

function StepWrapper({
  visible,
  children



}: {visible: boolean;children: React.ReactNode;}) {
  if (!visible) return null;
  return <div className="animate-fade-up">{children}</div>;
}

function FieldGroup({
  label,
  helper,
  prefix,
  placeholder,
  value,
  onChange







}: {label: string;helper?: string;prefix?: string;placeholder: string;value: string;onChange: (v: string) => void;}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {prefix && value &&
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        }
        <Input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            onChange(raw ? Number(raw).toLocaleString("en-US") : "");
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`h-14 text-base bg-background rounded-xl border-2 border-border tabular-nums transition-all duration-150 ${
          prefix && value ? "pl-8" : ""} ${
          focused ? "border-[#0d9488] shadow-[0_0_0_3px_rgba(13,148,136,0.15)]" : ""}`}
          placeholder={placeholder} />
        
      </div>
      {helper && focused &&
      <p className="text-xs text-muted-foreground animate-fade-in">{helper}</p>
      }
    </div>);

}

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number }>({ name: "", price: 0 });
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [step, setStep] = useState(1);
  const [pricing, setPricing] = useState({ essential: 200, professional: 600, enterprise: 1200 });
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const agingSum =
  parseNum(values.agingCurrent) +
  parseNum(values.aging1to30) +
  parseNum(values.aging31to60) +
  parseNum(values.aging61to90) +
  parseNum(values.aging90plus);

  const totalDocs = agingSum;

  const step1Valid =
  parseNum(values.invoices) > 0 &&
  parseNum(values.recovery) > 0 &&
  parseNum(values.peakThreshold) > 0;

  const step2Valid = agingSum > 0;

  const step3Valid =
  parseNum(values.debtors) > 0 && parseNum(values.dso) > 0;

  const recalc = useCallback(() => {
    const pci = calculatePCI({
      invoices: parseNum(values.invoices),
      recovery: parseNum(values.recovery),
      totalDocuments: totalDocs,
      peakThreshold: parseNum(values.peakThreshold),
      agingCurrent: parseNum(values.agingCurrent),
      aging1to30: parseNum(values.aging1to30),
      aging31to60: parseNum(values.aging31to60),
      aging61to90: parseNum(values.aging61to90),
      aging90plus: parseNum(values.aging90plus),
      debtors: parseNum(values.debtors),
      dso: parseNum(values.dso)
    });
    setPricing(calculatePricing(pci.total));
  }, [values, totalDocs]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(recalc, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [recalc]);

  const handleContinue = () => {
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-[640px] mx-auto px-6">
          {/* Header - only on Step 1 */}
          {step === 1 &&
          <div
            className="mb-12 animate-fade-up -mx-6 px-8 pt-12 pb-10 border-b rounded-b-3xl text-center"
            style={{
              background: "linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)",
              borderColor: "#e2e8f0"
            }}>
            
              <div className="flex flex-col items-center mb-4">
                <img src={armsLogo} alt="ARMS" className="h-20 md:h-24 shrink-0 mb-2" />
                <h1
                className="text-[26px] md:text-[34px] font-extrabold"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#0f172a",
                  letterSpacing: "-0.025em",
                   textShadow: "0 1px 2px rgba(0,0,0,0.05)"
                 }}>{t("pricing.header.title")}
               </h1>
              </div>
              <p
              className="text-lg mx-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#64748b",
                lineHeight: 1.6,
                maxWidth: "600px"
              }}>
                {t("pricing.header.subtitle")}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#64748b" }}>
                  {t("pricing.header.managedLabel")}
              </span>
                <button
                onClick={() => navigate("/solutions/managed-services")}
                className="inline-flex items-center gap-1.5 font-semibold text-base group"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#0d9488",
                  borderBottom: "2px solid #0d9488",
                  paddingBottom: "2px"
                }}>
                
                  {t("pricing.header.managedLink")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          }

          <StepIndicator current={step} total={4} />

          {/* Step 1: Monthly Volume */}
          <StepWrapper visible={step === 1}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-12">
              {t("pricing.steps.volume.title")}
            </h2>
            <div className="space-y-8">
              <FieldGroup
                label={t("pricing.inputs.invoices")}
                placeholder="e.g. 1,500"
                value={values.invoices}
                onChange={(v) => handleChange("invoices", v)} />
              
              <FieldGroup
                label={t("pricing.inputs.recovery")}
                prefix="$"
                placeholder="e.g. $100,000"
                value={values.recovery}
                onChange={(v) => handleChange("recovery", v)} />
              
              <FieldGroup
                label={t("pricing.inputs.peakThreshold")}
                placeholder="e.g. 2,000"
                value={values.peakThreshold}
                onChange={(v) => handleChange("peakThreshold", v)}
                helper={t("pricing.inputs.peakThresholdHelp")} />
              
            </div>
            <div className="mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={handleContinue}
                disabled={!step1Valid}
                className={`transition-all duration-300 ${
                step1Valid ? "border-foreground text-foreground" : "opacity-50 cursor-not-allowed"}`
                }>
                
                {t("pricing.steps.continue")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </StepWrapper>

          {/* Step 2: Portfolio Aging */}
          <StepWrapper visible={step === 2}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-12">
              {t("pricing.steps.aging.title")}
            </h2>
            <AgingBreakdown
              agingCurrent={values.agingCurrent}
              aging1to30={values.aging1to30}
              aging31to60={values.aging31to60}
              aging61to90={values.aging61to90}
              aging90plus={values.aging90plus}
              onChange={handleChange} />
            
            <div className="mt-12 flex items-center gap-3">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 w-4 h-4" />
                {t("pricing.steps.back")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleContinue}
                disabled={!step2Valid}
                className={`transition-all duration-300 ${
                step2Valid ? "border-foreground text-foreground" : "opacity-50 cursor-not-allowed"}`}>
                {t("pricing.steps.continue")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </StepWrapper>

          {/* Step 3: Operational Structure */}
          <StepWrapper visible={step === 3}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-12">
              {t("pricing.steps.operations.title")}
            </h2>
            <div className="space-y-8">
              <FieldGroup
                label={t("pricing.inputs.debtors")}
                placeholder="e.g. 45"
                value={values.debtors}
                onChange={(v) => handleChange("debtors", v)} />
              
              <FieldGroup
                label={t("pricing.inputs.dso")}
                placeholder="e.g. 45"
                value={values.dso}
                onChange={(v) => handleChange("dso", v)}
                helper={t("pricing.inputs.dsoHelp")} />
              
            </div>
            <div className="mt-12 flex items-center gap-3">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 w-4 h-4" />
                {t("pricing.steps.back")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleContinue}
                disabled={!step3Valid}
                className={`transition-all duration-300 ${
                step3Valid ? "border-foreground text-foreground" : "opacity-50 cursor-not-allowed"}`}>
                {t("pricing.steps.seePricing")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </StepWrapper>

          {/* Step 4: Results */}
          <StepWrapper visible={step === 4}>
            <div className="space-y-16" style={{ width: "90vw", maxWidth: "1400px", marginLeft: "50%", transform: "translateX(-50%)" }}>
              <PricingCards
                pricing={pricing}
                invoices={parseNum(values.invoices)}
                onTalkToSales={(planName, planPrice) => {
                  setSelectedPlan({ name: planName, price: planPrice });
                  setShowContactModal(true);
                }} />

              <div className="flex justify-center mb-8">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  {t("pricing.steps.back")}
                </Button>
              </div>
              {/* Final CTA */}
              <div className="text-center pt-4 pb-16">
                <button
                  onClick={() => setShowDemo(true)}
                  className="inline-flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "#0d9488",
                    boxShadow: "0 4px 6px -1px rgba(13,148,136,0.2), 0 2px 4px -1px rgba(13,148,136,0.1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#0f766e";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(13,148,136,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0d9488";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(13,148,136,0.2), 0 2px 4px -1px rgba(13,148,136,0.1)";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.background = "#115e59";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.background = "#0f766e";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}>
                  {t("pricing.cta.button")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </StepWrapper>
        </div>
      </main>
      <Footer />
      {showContactModal && (
        <PricingContactModal
          onClose={() => setShowContactModal(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
      {showDemo && <DemoFlow onClose={() => setShowDemo(false)} />}
    </div>);

};

export default Pricing;