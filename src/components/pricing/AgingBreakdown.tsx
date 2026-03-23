import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAnimatedNumber } from "./useAnimatedNumber";

interface AgingBreakdownProps {
  agingCurrent: string;
  aging1to30: string;
  aging31to60: string;
  aging61to90: string;
  aging90plus: string;
  onChange: (field: string, value: string) => void;
}

function parseNum(v: string): number {
  return parseFloat(v.replace(/,/g, "")) || 0;
}

const SEGMENT_GRADIENTS = [
  { from: "#10b981", to: "#34d399" },
  { from: "#f59e0b", to: "#fbbf24" },
  { from: "#f97316", to: "#fb923c" },
  { from: "#ea580c", to: "#f97316" },
  { from: "#dc2626", to: "#ef4444" },
];

const SEGMENT_LABELS = ["current", "1to30", "31to60", "61to90", "90plus"];

export default function AgingBreakdown({
  agingCurrent,
  aging1to30,
  aging31to60,
  aging61to90,
  aging90plus,
  onChange,
}: AgingBreakdownProps) {
  const { t } = useTranslation();

  const rawValues = [agingCurrent, aging1to30, aging31to60, aging61to90, aging90plus];
  const values = rawValues.map(parseNum);
  const sum = values.reduce((a, b) => a + b, 0);
  const pct = (v: number) => (sum > 0 ? ((v / sum) * 100).toFixed(0) + "%" : "");
  const pctNum = (v: number) => (sum > 0 ? (v / sum) * 100 : 0);

  const animatedSum = useAnimatedNumber(sum, 400);

  const buckets = [
    { key: "agingCurrent", label: t("pricing.aging.current"), value: agingCurrent, placeholder: "e.g. 1,000" },
    { key: "aging1to30", label: t("pricing.aging.1to30"), value: aging1to30, placeholder: "e.g. 500" },
    { key: "aging31to60", label: t("pricing.aging.31to60"), value: aging31to60, placeholder: "e.g. 500" },
    { key: "aging61to90", label: t("pricing.aging.61to90"), value: aging61to90, placeholder: "e.g. 250" },
    { key: "aging90plus", label: t("pricing.aging.90plus"), value: aging90plus, placeholder: "e.g. 250" },
  ];

  return (
    <div className="space-y-6">
      {/* Horizontal bucket row */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {buckets.map((b) => (
          <div key={b.key} className="space-y-2 text-center">
            <span className="text-xs text-foreground font-semibold block">{b.label}</span>
            <Input
              type="text"
              inputMode="numeric"
              value={b.value}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                onChange(b.key, raw ? Number(raw).toLocaleString("en-US") : "");
              }}
              className="h-11 text-sm text-center bg-background border-2 border-border rounded-xl tabular-nums transition-all duration-150 focus:border-[#0d9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.15)] placeholder:text-muted-foreground/40"
              placeholder={b.placeholder}
            />
            {sum > 0 && parseNum(b.value) > 0 && (
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {pct(parseNum(b.value))}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Portfolio distribution bar */}
      {sum > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-xs text-muted-foreground">
            {t("pricing.steps.aging.distribution")}
          </p>
          <TooltipProvider delayDuration={100}>
            <div
              className="w-full rounded-xl overflow-hidden flex"
              style={{
                height: "24px",
                backgroundColor: "#f1f5f9",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
                gap: "2px",
              }}
            >
              {values.map((v, i) => {
                if (v <= 0) return null;
                const percentage = pctNum(v);
                const showLabel = percentage > 8;
                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <div
                        className="h-full relative flex items-center justify-center cursor-default"
                        style={{
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${SEGMENT_GRADIENTS[i].from} 0%, ${SEGMENT_GRADIENTS[i].to} 100%)`,
                          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)",
                          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                          borderRadius: i === 0 ? "12px 0 0 12px" : i === values.length - 1 || values.slice(i + 1).every(x => x <= 0) ? "0 12px 12px 0" : "0",
                        }}
                      >
                        {showLabel && (
                          <span className="text-white text-xs font-bold tabular-nums">
                            {Math.round(percentage)}%
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="text-sm"
                      style={{
                        background: "#0f172a",
                        color: "white",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">{buckets[i].label}</p>
                        <p>{v.toLocaleString("en-US")} {t("pricing.steps.aging.totalLabel")}</p>
                        <p>{Math.round(percentage)}%</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      )}

      {/* Live counter */}
      {sum > 0 && (
        <p className="text-base text-muted-foreground tabular-nums flex items-center gap-2 font-medium">
          <FileText className="w-4 h-4" />
          {animatedSum.toLocaleString("en-US")} {t("pricing.steps.aging.totalLabel")}
        </p>
      )}
    </div>
  );
}
