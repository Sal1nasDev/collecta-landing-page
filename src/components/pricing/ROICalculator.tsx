import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { calculateROI } from "./pricingCalculations";
import { useAnimatedNumber } from "./useAnimatedNumber";

interface ROICalculatorProps {
  invoices: number;
  recovery: number;
  dso: number;
}

function AnimatedValue({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const animated = useAnimatedNumber(value, 800);
  return <span className="tabular-nums">{prefix}{animated.toLocaleString()}{suffix}</span>;
}

export default function ROICalculator({ invoices, recovery, dso }: ROICalculatorProps) {
  const { t } = useTranslation();
  const [hourlyRate, setHourlyRate] = useState(35);
  const [currentRate, setCurrentRate] = useState(75);
  const [targetRate, setTargetRate] = useState(90);
  const [showSliders, setShowSliders] = useState(false);

  const roi = calculateROI({
    invoices,
    recovery,
    dso,
    hourlyRate,
    currentCollectionRate: currentRate,
    targetCollectionRate: targetRate,
  });

  // Payback: monthly savings vs a rough monthly cost estimate
  const monthlySavings = roi.annualValueRecovered / 12;
  const paybackMonths = monthlySavings > 0 ? Math.max(1, Math.ceil(600 / monthlySavings * 12)) : 0;

  return (
    <div className="space-y-10 opacity-0 animate-fade-up" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
      {/* Section title */}
      <h2
        className="font-display text-[28px] font-bold text-center"
        style={{ color: "#0f172a" }}
      >
        {t("pricing.roi.title")}
      </h2>

      {/* Savings callout card */}
      <div
        className="mx-auto max-w-[400px] text-center rounded-2xl px-8 py-6 animate-scale-in"
        style={{
          background: "white",
          border: "2px solid #0d9488",
          boxShadow: "0 10px 25px -5px rgba(13,148,136,0.15)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.05em] mb-2"
          style={{ color: "#64748b" }}
        >
          {t("pricing.roi.annualValue")}
        </p>
        <p
          className="text-5xl font-extrabold tabular-nums"
          style={{ color: "#0d9488" }}
        >
          <AnimatedValue value={roi.annualValueRecovered} prefix="$" />
        </p>
        <p className="text-sm mt-2" style={{ color: "#94a3b8" }}>
          {t("pricing.roi.basedOnInputs")}
        </p>
      </div>

      {/* Comparison bars */}
      <div className="space-y-8">
        {/* Hours */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-foreground">{t("pricing.roi.hoursCollections")}</span>
            <span className="text-xs font-medium text-foreground">-{roi.savedHours} hrs/mo</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">{t("pricing.roi.current")}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: "#94a3b8" }} />
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums w-16 text-right">{roi.currentHours} hrs</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">ARMS</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${roi.currentHours > 0 ? (roi.armsHours / roi.currentHours) * 100 : 0}%`,
                    backgroundColor: "#0d9488",
                  }}
                />
              </div>
              <span className="text-[11px] text-foreground font-medium tabular-nums w-16 text-right">{roi.armsHours} hrs</span>
            </div>
          </div>
        </div>

        {/* Efficiency */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-foreground">{t("pricing.roi.collectionEfficiency")}</span>
            <span className="text-xs font-medium text-foreground">+{roi.efficiencyGain}%</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">{t("pricing.roi.current")}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${roi.currentEfficiency}%`, backgroundColor: "#94a3b8" }} />
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums w-16 text-right">{roi.currentEfficiency}%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">ARMS</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${roi.armsEfficiency}%`, backgroundColor: "#0d9488" }} />
              </div>
              <span className="text-[11px] text-foreground font-medium tabular-nums w-16 text-right">{roi.armsEfficiency}%</span>
            </div>
          </div>
        </div>

        {/* DSO */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-foreground">{t("pricing.roi.dsoReduction")}</span>
            <span className="text-xs font-medium text-foreground">-{roi.dsoReduction} {t("pricing.roi.days")}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">{t("pricing.roi.current")}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: "#94a3b8" }} />
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums w-16 text-right">{roi.currentDSO}d</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">ARMS</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${roi.currentDSO > 0 ? (roi.armsDSO / roi.currentDSO) * 100 : 0}%`,
                    backgroundColor: "#0d9488",
                  }}
                />
              </div>
              <span className="text-[11px] text-foreground font-medium tabular-nums w-16 text-right">{roi.armsDSO}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payback period */}
      {paybackMonths > 0 && paybackMonths < 100 && (
        <p className="text-center text-xl font-bold" style={{ color: "#0d9488" }}>
          {t("pricing.roi.payback", { months: paybackMonths })}
        </p>
      )}

      {/* Collapsible slider section */}
      <div>
        <button
          onClick={() => setShowSliders(!showSliders)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          {t("pricing.roi.adjustAssumptions")}
          <ChevronDown
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: showSliders ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: showSliders ? "400px" : "0px",
            opacity: showSliders ? 1 : 0,
          }}
        >
          <div className="space-y-6 pt-6">
            {/* Hourly rate */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">{t("pricing.roi.hourlyRate")}</span>
                <span
                  className="text-sm font-semibold text-white tabular-nums px-3 py-0.5 rounded-xl"
                  style={{ background: "#0d9488" }}
                >
                  ${hourlyRate}
                </span>
              </div>
              <Slider
                value={[hourlyRate]}
                onValueChange={([v]) => setHourlyRate(v)}
                min={10}
                max={100}
                step={5}
                className="[&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:border-[3px] [&_[role=slider]]:border-[#0d9488] [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-md [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.relative]:h-2 [&_[data-orientation=horizontal]_.absolute]:bg-[#0d9488]"
              />
            </div>

            {/* Current rate */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">{t("pricing.roi.currentRate")}</span>
                <span
                  className="text-sm font-semibold text-white tabular-nums px-3 py-0.5 rounded-xl"
                  style={{ background: "#0d9488" }}
                >
                  {currentRate}%
                </span>
              </div>
              <Slider
                value={[currentRate]}
                onValueChange={([v]) => setCurrentRate(v)}
                min={30}
                max={100}
                step={1}
                className="[&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:border-[3px] [&_[role=slider]]:border-[#0d9488] [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-md [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.relative]:h-2 [&_[data-orientation=horizontal]_.absolute]:bg-[#0d9488]"
              />
            </div>

            {/* Target rate */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">{t("pricing.roi.targetRate")}</span>
                <span
                  className="text-sm font-semibold text-white tabular-nums px-3 py-0.5 rounded-xl"
                  style={{ background: "#0d9488" }}
                >
                  {targetRate}%
                </span>
              </div>
              <Slider
                value={[targetRate]}
                onValueChange={([v]) => setTargetRate(v)}
                min={currentRate}
                max={100}
                step={1}
                className="[&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:border-[3px] [&_[role=slider]]:border-[#0d9488] [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-md [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.relative]:h-2 [&_[data-orientation=horizontal]_.absolute]:bg-[#0d9488]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
