import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import IndustryMapSVG from "./IndustryMapSVG";

const INDUSTRIES = [
"Manufacturing", "Retail", "Education", "Construction",
"Real Estate", "Agriculture", "Technology", "Food & Beverage",
"Energy", "Logistics", "Healthcare", "Financial Services",
"Any Industry"];


const LAST_INDEX = INDUSTRIES.length - 1;
const TYPE_DELAY = 65;
const DELETE_DELAY = 35;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_LAST = 3000;
const PAUSE_AFTER_DELETE = 300;

const DSO_SCENARIOS = [
{ label: "General Average", left: 68, right: 48 },
{ label: "Transport & Logistics", left: 45, right: 30 },
{ label: "Pharma", left: 53, right: 37 }];


const SCENARIO_DISPLAY_TIME = 3000;
const COUNT_STEP_MS = 28;

// Typewriter hook
function useTypewriter(words: string[]) {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const stateRef = useRef({ wordIndex: 0, charIndex: 0, isDeleting: false });
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const tick = () => {
      const s = stateRef.current;
      const currentWord = words[s.wordIndex];

      if (!s.isDeleting) {
        // Typing
        if (s.charIndex < currentWord.length) {
          s.charIndex++;
          setDisplayText(currentWord.slice(0, s.charIndex));
          timeoutRef.current = window.setTimeout(tick, TYPE_DELAY);
        } else {
          // Fully typed — pause
          const pause = s.wordIndex === LAST_INDEX ? PAUSE_AFTER_LAST : PAUSE_AFTER_TYPE;
          s.isDeleting = true;
          timeoutRef.current = window.setTimeout(tick, pause);
        }
      } else {
        // Deleting
        if (s.charIndex > 0) {
          s.charIndex--;
          setDisplayText(currentWord.slice(0, s.charIndex));
          timeoutRef.current = window.setTimeout(tick, DELETE_DELAY);
        } else {
          // Fully deleted — move to next word
          s.isDeleting = false;
          s.wordIndex = (s.wordIndex + 1) % words.length;
          timeoutRef.current = window.setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    };

    timeoutRef.current = window.setTimeout(tick, PAUSE_AFTER_DELETE);
    return () => {if (timeoutRef.current) clearTimeout(timeoutRef.current);};
  }, [words]);

  return { displayText, cursorVisible };
}

// Cycling DSO hook
function useCyclingDSO() {
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(0);
  const [label, setLabel] = useState(DSO_SCENARIOS[0].label);
  const [labelOpacity, setLabelOpacity] = useState(1);
  const scenarioRef = useRef(0);
  const isFirstRef = useRef(true);
  const animatingRef = useRef(false);
  const rafRef = useRef<number>();
  const timeoutRef = useRef<number>();

  const animateToValues = useCallback((targetLeft: number, targetRight: number, duration: number, onDone: () => void) => {
    animatingRef.current = true;
    const startLeft = leftValue;
    const startRight = rightValue;
    const startTime = performance.now();

    // Use refs to get current values during animation
    let currentLeft = startLeft;
    let currentRight = startRight;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-in-out cubic
      const eased = progress < 0.5 ?
      4 * progress * progress * progress :
      1 - Math.pow(-2 * progress + 2, 3) / 2;

      currentLeft = Math.round(startLeft + (targetLeft - startLeft) * eased);
      currentRight = Math.round(startRight + (targetRight - startRight) * eased);
      setLeftValue(currentLeft);
      setRightValue(currentRight);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
        onDone();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Store current values in refs for the animate function
  const leftRef = useRef(0);
  const rightRef = useRef(0);
  useEffect(() => {leftRef.current = leftValue;}, [leftValue]);
  useEffect(() => {rightRef.current = rightValue;}, [rightValue]);

  const animateToValuesStable = useCallback((targetLeft: number, targetRight: number, duration: number, onDone: () => void) => {
    animatingRef.current = true;
    const startLeft = leftRef.current;
    const startRight = rightRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 ?
      4 * progress * progress * progress :
      1 - Math.pow(-2 * progress + 2, 3) / 2;

      setLeftValue(Math.round(startLeft + (targetLeft - startLeft) * eased));
      setRightValue(Math.round(startRight + (targetRight - startRight) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
        onDone();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const scheduleNext = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      scenarioRef.current = (scenarioRef.current + 1) % DSO_SCENARIOS.length;
      const next = DSO_SCENARIOS[scenarioRef.current];

      // Fade out label
      setLabelOpacity(0);
      setTimeout(() => {
        setLabel(next.label);
        setLabelOpacity(1);
      }, 300);

      const stepsLeft = Math.abs(next.left - leftRef.current);
      const stepsRight = Math.abs(next.right - rightRef.current);
      const maxSteps = Math.max(stepsLeft, stepsRight, 1);
      const duration = maxSteps * COUNT_STEP_MS;

      animateToValuesStable(next.left, next.right, Math.max(duration, 300), scheduleNext);
    }, SCENARIO_DISPLAY_TIME);
  }, [animateToValuesStable]);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      const first = DSO_SCENARIOS[0];
      setLabel(first.label);
      animateToValuesStable(first.left, first.right, 1200, scheduleNext);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [animateToValuesStable, scheduleNext]);

  return { leftValue, rightValue, label, labelOpacity };
}

// Stats counter hook (one-time, scroll triggered)
function useAnimatedCounter(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {if (rafRef.current) cancelAnimationFrame(rafRef.current);};
  }, [started, target, duration]);

  return value;
}

interface AnyIndustryCardProps {
  onRequestDemo: () => void;
}

const AnyIndustryCard = ({ onRequestDemo }: AnyIndustryCardProps) => {
  const { t } = useTranslation();
  const [triggered, setTriggered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { displayText, cursorVisible } = useTypewriter(INDUSTRIES);
  const { leftValue, rightValue, label, labelOpacity } = useCyclingDSO();

  // Intersection Observer for stats only
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  const stat1Value = useAnimatedCounter(500, 600, triggered);
  const stat2Value = useAnimatedCounter(5, 600, triggered);
  const stat3Value = useAnimatedCounter(30, 600, triggered);

  return (
    <div
      ref={cardRef}
      id="any-industry"
      className="scroll-mt-24">

      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          background: "linear-gradient(145deg, hsl(180 30% 98%), hsl(180 25% 96%))",
          border: "1.5px solid hsla(187, 72%, 32%, 0.4)"
        }}>

        <div className="p-6 sm:p-8">
          {/* Header with pulse dot */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex items-center justify-center w-8 h-8">
              <span
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: "hsl(187, 72%, 32%)" }} />
              <span
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: "hsl(187, 72%, 32%)", opacity: 0.6 }} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {t('industries.anyIndustry.title')}
            </h2>
          </div>

          {/* Element 1: Typewriter Industry Ticker */}
          <div className="mb-5">
            <div className="h-8 sm:h-10 flex items-center">
              <span
                className="text-xl sm:text-2xl font-medium"
                style={{ color: "hsl(187, 72%, 32%)" }}>
                {displayText}
                <span
                  className="ml-0.5 font-light"
                  style={{ opacity: cursorVisible ? 1 : 0 }}>
                  |
                </span>
              </span>
            </div>
          </div>

          {/* Element 2: DSO Counter — centered */}
          <div className="flex justify-center mb-6">
            <div
              className="rounded-xl px-10 sm:px-16 py-5 sm:py-6 flex flex-col justify-center w-full max-w-2xl"
              style={{ boxShadow: "0 4px 20px hsla(210, 25%, 15%, 0.08)" }}>

              <div className="flex items-center justify-center gap-4 sm:gap-6">
                {/* Industry DSO */}
                <div className="text-center">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-3xl sm:text-4xl font-bold tabular-nums"
                      style={{ color: "hsl(215, 45%, 20%)" }}>
                      {leftValue}
                    </span>
                    <span className="text-sm text-muted-foreground">{t('industries.anyIndustry.days')}</span>
                  </div>
                </div>

                {/* Arrow pointing right */}
                <ArrowRight
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: "hsl(187, 72%, 32%)" }}
                  strokeWidth={2.5} />

                {/* With ARMS */}
                <div className="text-center">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "hsl(187, 72%, 32%)" }}>
                    {t('industries.anyIndustry.withARMS')}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-3xl sm:text-4xl font-bold tabular-nums"
                      style={{ color: "hsl(187, 72%, 32%)" }}>
                      {rightValue}
                    </span>
                    <span className="text-sm text-muted-foreground">{t('industries.anyIndustry.days')}</span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="flex justify-center mt-3">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: "hsl(187, 72%, 32%)" }}>
                  {t('industries.anyIndustry.badge')}
                </span>
              </div>
            </div>
          </div>




          {/* Closing CTA */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground italic mb-4">
              {t('industries.anyIndustry.closingText')}
            </p>
            <Button
              variant="outline"
              className="group"
              style={{
                borderColor: "hsl(187, 72%, 32%)",
                color: "hsl(187, 72%, 32%)"
              }}
              onClick={onRequestDemo}>
              {t('industries.anyIndustry.cta')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default AnyIndustryCard;