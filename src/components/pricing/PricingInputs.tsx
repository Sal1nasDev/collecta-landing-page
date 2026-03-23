import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, DollarSign, Layers, AlertTriangle, Users, Clock } from "lucide-react";
import AgingBreakdown from "./AgingBreakdown";

export interface PricingFormValues {
  invoices: string;
  recovery: string;
  totalDocuments: string;
  peakThreshold: string;
  agingCurrent: string;
  aging1to30: string;
  aging31to60: string;
  aging61to90: string;
  aging90plus: string;
  debtors: string;
  dso: string;
}

interface PricingInputsProps {
  values: PricingFormValues;
  onChange: (field: string, value: string) => void;
  filledCount: number;
}

const TOTAL_FIELDS = 7;

function ProgressRing({ filled, total }: { filled: number; total: number }) {
  const { t } = useTranslation();
  const pct = filled / total;
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const isComplete = filled === total;

  const microcopy = isComplete
    ? t("pricing.progress.ready")
    : filled >= 5
    ? t("pricing.progress.almostThere")
    : t("pricing.progress.fieldsToComplete", { count: total - filled });

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative w-16 h-16 shrink-0">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={isComplete ? "hsl(var(--accent))" : "hsl(var(--primary))"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
          {isComplete ? "✓" : `${filled}/${total}`}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{microcopy}</p>
        <p className="text-xs text-muted-foreground">
          {t("pricing.progress.pricesUpdate")}
        </p>
      </div>
    </div>
  );
}

export default function PricingInputs({ values, onChange, filledCount }: PricingInputsProps) {
  const { t } = useTranslation();

  const fields = [
    {
      key: "invoices",
      label: t("pricing.inputs.invoices"),
      help: t("pricing.inputs.invoicesHelp"),
      placeholder: "1,500",
      icon: FileText,
    },
    {
      key: "recovery",
      label: t("pricing.inputs.recovery"),
      help: t("pricing.inputs.recoveryHelp"),
      placeholder: "100,000",
      prefix: "$",
      icon: DollarSign,
    },
    {
      key: "totalDocuments",
      label: t("pricing.inputs.totalDocuments"),
      help: t("pricing.inputs.totalDocumentsHelp"),
      placeholder: "2,500",
      icon: Layers,
    },
    {
      key: "peakThreshold",
      label: t("pricing.inputs.peakThreshold"),
      help: t("pricing.inputs.peakThresholdHelp"),
      placeholder: "2,000",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-5">
      <ProgressRing filled={filledCount} total={TOTAL_FIELDS} />

      {/* Top 4 number fields */}
      {fields.map((f) => {
        const Icon = f.icon;
        return (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4 text-muted-foreground" />
              {f.label}
            </Label>
            <div className="relative">
              {f.prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {f.prefix}
                </span>
              )}
              <Input
                id={f.key}
                type="number"
                min={0}
                value={values[f.key as keyof PricingFormValues]}
                onChange={(e) => onChange(f.key, e.target.value)}
                className={`h-12 text-base transition-all duration-200 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] ${f.prefix ? "pl-7" : ""}`}
                placeholder={f.placeholder}
              />
            </div>
            <p className="text-xs text-muted-foreground">{f.help}</p>
          </div>
        );
      })}

      {/* Aging Breakdown */}
      <AgingBreakdown
        agingCurrent={values.agingCurrent}
        aging1to30={values.aging1to30}
        aging31to60={values.aging31to60}
        aging61to90={values.aging61to90}
        aging90plus={values.aging90plus}
        onChange={onChange}
      />

      {/* Active Debtors */}
      <div className="space-y-1.5">
        <Label htmlFor="debtors" className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          {t("pricing.inputs.debtors")}
        </Label>
        <Input
          id="debtors"
          type="number"
          min={0}
          value={values.debtors}
          onChange={(e) => onChange("debtors", e.target.value)}
          className="h-12 text-base transition-all duration-200 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]"
          placeholder="45"
        />
        <p className="text-xs text-muted-foreground">{t("pricing.inputs.debtorsHelp")}</p>
      </div>

      {/* DSO */}
      <div className="space-y-1.5">
        <Label htmlFor="dso" className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          {t("pricing.inputs.dso")}
        </Label>
        <Input
          id="dso"
          type="number"
          min={1}
          max={365}
          value={values.dso}
          onChange={(e) => onChange("dso", e.target.value)}
          className="h-12 text-base transition-all duration-200 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]"
          placeholder="45"
        />
        <p className="text-xs text-muted-foreground">{t("pricing.inputs.dsoHelp")}</p>
      </div>
    </div>
  );
}
