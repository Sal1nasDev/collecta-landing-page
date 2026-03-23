import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FileText, CheckCircle2, Send, ThumbsUp, Calendar, Receipt, CreditCard, AlertTriangle, RefreshCw } from "lucide-react";

const arCycleEvents = [
  { id: 1, key: "invoicing", icon: FileText, predictedDays: 0 },
  { id: 2, key: "validation", icon: CheckCircle2, predictedDays: 3 },
  { id: 3, key: "submission", icon: Send, predictedDays: 5 },
  { id: 4, key: "approval", icon: ThumbsUp, predictedDays: 12 },
  { id: 5, key: "scheduling", icon: Calendar, predictedDays: 18 },
  { id: 6, key: "receipt", icon: Receipt, predictedDays: 25 },
  { id: 7, key: "application", icon: CreditCard, predictedDays: 27 },
];

type StepStatus = 'completed' | 'in-progress' | 'predicted' | 'exception';

const getStatusColors = (status: StepStatus) => {
  switch (status) {
    case 'completed':
      return {
        bg: 'bg-emerald-500',
        bgLight: 'bg-emerald-100',
        text: 'text-white',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-700',
        glow: 'bg-emerald-500/20',
      };
    case 'in-progress':
      return {
        bg: 'bg-amber-500',
        bgLight: 'bg-amber-100',
        text: 'text-white',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-700',
        glow: 'bg-amber-500/30',
      };
    case 'predicted':
      return {
        bg: 'bg-sky-500',
        bgLight: 'bg-sky-500',
        text: 'text-white',
        iconColor: 'text-white',
        badgeBg: 'bg-sky-500',
        badgeText: 'text-white',
        glow: 'bg-sky-500/30',
      };
    case 'exception':
      return {
        bg: 'bg-destructive',
        bgLight: 'bg-destructive/10',
        text: 'text-white',
        iconColor: 'text-destructive',
        badgeBg: 'bg-destructive/10',
        badgeText: 'text-destructive',
        glow: 'bg-destructive/30',
      };
  }
};

const ARCycleSection = () => {
  const { t } = useTranslation();
  const [activeEvent, setActiveEvent] = useState(0);
  const [exceptionStep, setExceptionStep] = useState<number | null>(null);
  const [recalculating, setRecalculating] = useState(false);
  const [delayDays, setDelayDays] = useState(0);

  // Auto-advance through events - always trigger exception at approval step
  useEffect(() => {
    const interval = setInterval(() => {
      if (exceptionStep !== null) return; // Pause progression during exception
      
      setActiveEvent((prev) => {
        const next = (prev + 1) % arCycleEvents.length;
        
        // Reset delay days when cycle restarts
        if (next === 0) {
          setDelayDays(0);
        }
        
        // Always trigger exception at approval step (index 3)
        if (next === 3) {
          setExceptionStep(3);
          setRecalculating(true);
          
          // After recalculation, add 1 day delay and resolve exception
          setTimeout(() => {
            setRecalculating(false);
            setDelayDays((prev) => prev + 1); // Add 1 day to following steps
          }, 2000);
          
          setTimeout(() => {
            setExceptionStep(null);
            setActiveEvent(3);
          }, 4000);
        }
        
        return next;
      });
    }, 2500);
    
    return () => clearInterval(interval);
  }, [exceptionStep]);

  const getStepStatus = (index: number): StepStatus => {
    if (exceptionStep === index) return 'exception';
    if (index < activeEvent) return 'completed';
    if (index === activeEvent) return 'in-progress';
    return 'predicted';
  };

  const getAdjustedDays = (baseDays: number, eventIndex: number) => {
    if (eventIndex > (exceptionStep ?? activeEvent) && delayDays > 0) {
      return baseDays + delayDays;
    }
    return baseDays;
  };

  const getStatusLabel = (status: StepStatus): string => {
    return t(`arCycle.legend.${status === 'in-progress' ? 'inProgress' : status}`);
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('arCycle.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base">
            {t('arCycle.description')}
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          {[
            { status: 'completed' as StepStatus, labelKey: 'completed' },
            { status: 'in-progress' as StepStatus, labelKey: 'inProgress' },
            { status: 'predicted' as StepStatus, labelKey: 'predicted' },
            { status: 'exception' as StepStatus, labelKey: 'exception' },
          ].map(({ status, labelKey }) => {
            const colors = getStatusColors(status);
            return (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status === 'predicted' ? 'bg-sky-500' : colors.bg}`} />
                <span className="text-xs text-muted-foreground">{t(`arCycle.legend.${labelKey}`)}</span>
              </div>
            );
          })}
        </div>

        {/* Exception Alert */}
        <div
          className={`max-w-2xl mx-auto mb-10 transition-all duration-500 ${
            exceptionStep !== null
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none h-0 mb-0'
          }`}
        >
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t('arCycle.alert.title')}</p>
              <p className="text-xs text-muted-foreground">
                {t('arCycle.alert.description')}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                recalculating ? 'text-destructive' : 'text-emerald-600'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${recalculating ? 'animate-spin' : ''}`} />
              {recalculating ? t('arCycle.alert.recalculating') : t('arCycle.alert.updated')}
            </div>
          </div>
        </div>

        {/* AR Cycle Flow */}
        <div className="relative px-0 md:px-8 lg:px-16 mb-16">
          {/* Connection Line - Background (desktop only) */}
          <div className="absolute top-10 left-[8%] right-[8%] h-1 bg-muted rounded-full hidden md:block" />

          {/* Progress Line (desktop only) */}
          <div
            className="absolute top-10 left-[8%] h-1 rounded-full transition-all duration-700 ease-out hidden md:block bg-emerald-500"
            style={{
              width: `${(activeEvent / (arCycleEvents.length - 1)) * 84}%`,
            }}
          />

          {/* Desktop: single row */}
          <div className="hidden md:flex justify-between items-start relative">
            {arCycleEvents.map((event, index) => {
              const status = getStepStatus(index);
              const colors = getStatusColors(status);
              const adjustedDays = getAdjustedDays(event.predictedDays, index);
              const isActive = status === 'in-progress';
              const isException = status === 'exception';

              return (
                <div
                  key={event.id}
                  className="flex flex-col items-center group cursor-pointer relative flex-1"
                  onClick={() => !exceptionStep && setActiveEvent(index)}
                >
                  <div className="relative mb-4">
                    {(isActive || isException) && (
                      <div className={`absolute -inset-2 rounded-full ${colors.glow} animate-pulse`} />
                    )}
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${colors.bg} ${colors.text} ${isActive ? 'scale-110' : ''}`}>
                      {isException ? (
                        <AlertTriangle className="w-8 h-8" strokeWidth={1.5} />
                      ) : (
                        <event.icon className="w-8 h-8" strokeWidth={1.5} />
                      )}
                    </div>
                  </div>
                  <p className={`text-sm font-medium text-center transition-colors duration-300 mb-2 leading-tight ${isActive || isException ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {t(`arCycle.steps.${event.key}.name`)}
                  </p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition-all duration-500 ${colors.badgeBg} ${colors.badgeText}`}>
                    {status === 'completed' ? t('arCycle.status.done') : status === 'in-progress' ? t('arCycle.status.now') : status === 'exception' ? t('arCycle.status.issue') : index === 0 ? t('arCycle.status.start') : `${t('arCycle.status.day')} ${adjustedDays}`}
                  </span>
                  <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-4 w-52 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${status === 'predicted' ? 'bg-sky-500' : colors.bg}`} />
                        <span className="text-xs font-medium text-foreground">{getStatusLabel(status)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t(`arCycle.steps.${event.key}.description`)}</p>
                      {status === 'predicted' && index > 0 && (
                        <p className="text-xs text-sky-600 mt-2">{t('arCycle.tooltip.aiPredicts')} {t('arCycle.status.day')} {adjustedDays}</p>
                      )}
                      {status === 'exception' && (
                        <p className="text-xs text-destructive mt-2">{t('arCycle.tooltip.disputeResolution')}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: 2 rows - 4 on top, 3 on bottom */}
          <div className="md:hidden">
            {/* Row 1: first 4 steps */}
            <div className="relative grid grid-cols-4 gap-1 mb-4">
              {/* Connection line row 1 */}
              <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-muted rounded-full" />
              <div
                className="absolute top-5 left-[12.5%] h-0.5 rounded-full transition-all duration-700 ease-out bg-emerald-500"
                style={{ width: `${Math.min(activeEvent, 3) / 3 * 75}%` }}
              />
              {arCycleEvents.slice(0, 4).map((event, index) => {
                const status = getStepStatus(index);
                const colors = getStatusColors(status);
                const adjustedDays = getAdjustedDays(event.predictedDays, index);
                const isActive = status === 'in-progress';
                const isException = status === 'exception';

                return (
                  <div
                    key={event.id}
                    className="flex flex-col items-center cursor-pointer relative z-10"
                    onClick={() => !exceptionStep && setActiveEvent(index)}
                  >
                    <div className="relative mb-1.5">
                      {(isActive || isException) && (
                        <div className={`absolute -inset-1 rounded-full ${colors.glow} animate-pulse`} />
                      )}
                      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${colors.bg} ${colors.text}`}>
                        {isException ? (
                          <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <event.icon className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    <p className={`text-[9px] font-medium text-center leading-tight mb-1 ${isActive || isException ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {t(`arCycle.steps.${event.key}.name`)}
                    </p>
                    <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                      {status === 'completed' ? t('arCycle.status.done') : status === 'in-progress' ? t('arCycle.status.now') : status === 'exception' ? t('arCycle.status.issue') : index === 0 ? t('arCycle.status.start') : `${t('arCycle.status.day')} ${adjustedDays}`}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Row 2: last 3 steps, centered */}
            <div className="relative grid grid-cols-3 gap-1 max-w-[75%] mx-auto">
              {/* Connection line row 2 */}
              <div className="absolute top-5 left-[16.6%] right-[16.6%] h-0.5 bg-muted rounded-full" />
              <div
                className="absolute top-5 left-[16.6%] h-0.5 rounded-full transition-all duration-700 ease-out bg-emerald-500"
                style={{ width: `${Math.max(0, Math.min(activeEvent - 4, 2)) / 2 * 66.8}%` }}
              />
              {arCycleEvents.slice(4).map((event, index) => {
                const realIndex = index + 4;
                const status = getStepStatus(realIndex);
                const colors = getStatusColors(status);
                const adjustedDays = getAdjustedDays(event.predictedDays, realIndex);
                const isActive = status === 'in-progress';
                const isException = status === 'exception';

                return (
                  <div
                    key={event.id}
                    className="flex flex-col items-center cursor-pointer relative z-10"
                    onClick={() => !exceptionStep && setActiveEvent(realIndex)}
                  >
                    <div className="relative mb-1.5">
                      {(isActive || isException) && (
                        <div className={`absolute -inset-1 rounded-full ${colors.glow} animate-pulse`} />
                      )}
                      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${colors.bg} ${colors.text}`}>
                        {isException ? (
                          <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <event.icon className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    <p className={`text-[9px] font-medium text-center leading-tight mb-1 ${isActive || isException ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {t(`arCycle.steps.${event.key}.name`)}
                    </p>
                    <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                      {status === 'completed' ? t('arCycle.status.done') : status === 'in-progress' ? t('arCycle.status.now') : status === 'exception' ? t('arCycle.status.issue') : realIndex === 0 ? t('arCycle.status.start') : `${t('arCycle.status.day')} ${adjustedDays}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Supporting Callouts */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {['realtime', 'predictive', 'visibility'].map((key) => (
            <div
              key={key}
              className="text-center p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <p className="font-semibold text-foreground mb-1">{t(`arCycle.callouts.${key}.title`)}</p>
              <p className="text-sm text-muted-foreground">{t(`arCycle.callouts.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ARCycleSection;
