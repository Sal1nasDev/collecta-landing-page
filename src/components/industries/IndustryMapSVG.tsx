import { useState, useEffect, useRef } from "react";

/* ── Regions as larger, cleaner shapes ── */
const regions: { id: string; d: string; group: "mx" | "sp"; wave: number }[] = [
  { id: "mexico", d: "M108,195 L130,188 L152,186 L168,190 L180,198 L186,210 L182,224 L172,234 L160,242 L150,246 L140,240 L128,228 L118,215 L110,205 Z", group: "mx", wave: 0 },
  { id: "central-america", d: "M150,246 L165,243 L175,248 L185,255 L192,265 L198,278 L202,290 L198,298 L190,296 L180,288 L170,278 L160,268 L152,258 Z", group: "mx", wave: 1 },
  { id: "usa", d: "M52,108 L75,96 L110,88 L155,84 L205,80 L250,82 L290,90 L308,106 L298,128 L275,142 L252,152 L232,160 L212,168 L192,176 L175,182 L155,183 L135,175 L115,158 L98,138 L82,120 L65,112 Z", group: "mx", wave: 2 },
  { id: "canada", d: "M60,44 L110,36 L170,32 L230,34 L280,40 L315,54 L324,76 L314,92 L292,98 L258,90 L220,84 L175,82 L130,86 L92,94 L74,84 L62,66 Z", group: "mx", wave: 2 },
  { id: "caribbean", d: "M190,210 L215,206 L240,210 L258,218 L255,230 L240,234 L220,230 L200,226 L188,220 Z", group: "mx", wave: 3 },
  { id: "colombia-venezuela", d: "M198,298 L218,290 L240,286 L262,294 L268,312 L258,328 L240,336 L222,340 L208,334 L198,320 L194,308 Z", group: "mx", wave: 3 },
  { id: "andean", d: "M188,320 L200,316 L210,334 L222,342 L220,368 L212,380 L200,376 L192,360 L186,342 Z", group: "mx", wave: 4 },
  { id: "brazil", d: "M242,318 L278,310 L302,326 L308,362 L294,394 L268,412 L246,406 L230,386 L224,360 L232,340 Z", group: "mx", wave: 5 },
  { id: "southern-sa", d: "M212,380 L230,386 L246,406 L250,432 L240,454 L224,460 L210,450 L202,430 L198,408 L204,392 Z", group: "mx", wave: 5 },
  { id: "greenland", d: "M306,18 L336,14 L362,20 L376,36 L370,52 L354,60 L334,56 L314,48 L306,34 Z", group: "mx", wave: 6 },
  { id: "spain-portugal", d: "M412,142 L432,136 L450,134 L466,140 L470,156 L464,170 L450,176 L434,178 L418,174 L410,162 L408,152 Z", group: "sp", wave: 0 },
  { id: "france", d: "M434,110 L460,104 L482,112 L486,132 L478,144 L462,142 L448,138 L434,128 Z", group: "sp", wave: 1 },
  { id: "nw-africa", d: "M412,180 L445,174 L472,180 L492,192 L496,212 L484,228 L462,234 L438,228 L418,216 L410,198 Z", group: "sp", wave: 1 },
  { id: "central-europe", d: "M462,86 L495,82 L520,90 L528,110 L522,126 L506,132 L488,128 L472,120 L462,106 Z", group: "sp", wave: 2 },
  { id: "mediterranean", d: "M470,132 L488,128 L500,136 L504,155 L498,170 L484,176 L470,172 L464,158 L464,144 Z", group: "sp", wave: 2 },
  { id: "north-africa", d: "M470,180 L510,174 L540,184 L548,206 L540,226 L518,236 L494,234 L476,222 L468,202 Z", group: "sp", wave: 3 },
  { id: "british-isles", d: "M408,74 L420,70 L436,72 L444,82 L442,98 L436,106 L424,104 L414,96 L408,86 Z", group: "sp", wave: 3 },
  { id: "scandinavia", d: "M458,26 L478,22 L498,26 L510,36 L516,56 L510,72 L498,80 L484,82 L470,76 L462,60 L456,42 Z", group: "sp", wave: 4 },
  { id: "eastern-europe", d: "M520,86 L545,82 L562,92 L566,112 L558,128 L542,136 L526,132 L518,118 L516,102 Z", group: "sp", wave: 4 },
  { id: "russia", d: "M520,36 L575,30 L640,26 L700,32 L750,44 L782,62 L796,84 L786,106 L760,118 L730,124 L695,128 L658,124 L624,118 L590,110 L560,102 L538,92 L522,74 L518,54 Z", group: "sp", wave: 5 },
  { id: "west-central-africa", d: "M420,236 L460,230 L494,240 L510,260 L518,290 L510,320 L494,336 L470,340 L448,330 L430,310 L418,280 L414,256 Z", group: "sp", wave: 5 },
  { id: "turkey-mideast", d: "M540,128 L572,122 L600,132 L618,148 L622,172 L612,194 L592,204 L568,200 L548,188 L536,168 L534,148 Z", group: "sp", wave: 6 },
  { id: "east-africa", d: "M530,270 L556,264 L574,278 L578,304 L570,326 L552,340 L534,336 L522,318 L518,296 Z", group: "sp", wave: 6 },
  { id: "southern-africa", d: "M470,340 L504,334 L530,348 L538,374 L528,396 L506,404 L482,398 L466,378 L462,358 Z", group: "sp", wave: 6 },
  { id: "south-asia", d: "M618,130 L656,122 L688,134 L698,162 L690,190 L670,210 L644,220 L620,214 L606,196 L604,168 L608,148 Z", group: "sp", wave: 6 },
  { id: "east-asia", d: "M690,76 L730,70 L766,80 L790,98 L798,124 L788,150 L766,164 L738,170 L714,166 L694,154 L680,138 L674,116 L678,96 Z", group: "sp", wave: 6 },
  { id: "se-asia", d: "M700,180 L734,172 L760,186 L768,210 L758,230 L736,240 L714,234 L700,216 L694,198 Z", group: "sp", wave: 6 },
  { id: "japan-korea", d: "M786,96 L800,90 L814,98 L818,116 L810,130 L798,134 L786,128 L780,114 Z", group: "sp", wave: 6 },
  { id: "australia", d: "M720,330 L762,320 L798,332 L812,358 L802,384 L776,392 L748,386 L728,368 L722,350 Z", group: "sp", wave: 6 },
  { id: "indonesia", d: "M710,248 L742,242 L770,252 L778,272 L768,288 L742,294 L718,286 L708,268 Z", group: "sp", wave: 6 },
  { id: "new-zealand", d: "M828,384 L838,378 L845,386 L842,400 L834,406 L826,398 Z", group: "sp", wave: 6 },
];

const WAVE_COLORS = ["#1a8a9a", "#2d9baa", "#3eaabb", "#6dc0cc", "#8ed0d8", "#afdfe4", "#d0eef1"];
const BASE_COLOR = "#e8edf2";
const FILL_DELAY_PER_WAVE = 500;
const SPAIN_OFFSET = 750;
const FILL_TRANSITION = 800;
const HOLD_DURATION = 1500;
const FADE_BACK = 2000;

function lerpColor(from: string, to: string, t: number): string {
  const f = hexToRgb(from), e = hexToRgb(to);
  return `rgb(${Math.round(f.r + (e.r - f.r) * t)},${Math.round(f.g + (e.g - f.g) * t)},${Math.round(f.b + (e.b - f.b) * t)})`;
}
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

interface IndustryMapSVGProps {
  className?: string;
}

const IndustryMapSVG = ({ className = "" }: IndustryMapSVGProps) => {
  const [phase, setPhase] = useState<"idle" | "spreading" | "holding" | "fading">("idle");
  const [elapsed, setElapsed] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const isVisible = useRef(false);
  const startRef = useRef(0);

  const spreadEnd = SPAIN_OFFSET + 6 * FILL_DELAY_PER_WAVE + FILL_TRANSITION;
  const holdEnd = spreadEnd + HOLD_DURATION;
  const fadeEnd = holdEnd + FADE_BACK;
  const totalLoop = fadeEnd + 500;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true;
          startRef.current = performance.now();
          setPhase("spreading");
          const tick = (now: number) => {
            const loopT = (now - startRef.current) % totalLoop;
            setElapsed(loopT);
            if (loopT < spreadEnd) setPhase("spreading");
            else if (loopT < holdEnd) setPhase("holding");
            else if (loopT < fadeEnd) setPhase("fading");
            else setPhase("idle");
            animRef.current = requestAnimationFrame(tick);
          };
          animRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    if (mapRef.current) observer.observe(mapRef.current);
    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [spreadEnd, holdEnd, fadeEnd, totalLoop]);

  const getFill = (r: typeof regions[0]) => {
    const offset = r.group === "sp" ? SPAIN_OFFSET : 0;
    const waveStart = offset + r.wave * FILL_DELAY_PER_WAVE;
    if (phase === "idle") return BASE_COLOR;
    if (phase === "fading") return lerpColor(WAVE_COLORS[r.wave], BASE_COLOR, Math.min(1, (elapsed - holdEnd) / FADE_BACK));
    if (phase === "holding") return WAVE_COLORS[r.wave];
    const p = Math.min(1, Math.max(0, (elapsed - waveStart) / FILL_TRANSITION));
    return p <= 0 ? BASE_COLOR : lerpColor(BASE_COLOR, WAVE_COLORS[r.wave], p);
  };

  const getAtlanticOpacity = () => {
    const cs = Math.max(4 * FILL_DELAY_PER_WAVE, SPAIN_OFFSET + 4 * FILL_DELAY_PER_WAVE);
    if (phase === "idle") return 0;
    if (phase === "fading") return 0.35 * (1 - Math.min(1, (elapsed - holdEnd) / FADE_BACK));
    if (phase === "holding") return 0.35;
    return Math.min(1, Math.max(0, (elapsed - cs) / 1500)) * 0.35;
  };

  return (
    <div ref={mapRef} className={className}>
      <svg viewBox="0 0 900 470" className="w-full h-auto" style={{ pointerEvents: "none" }}>
        <defs>
          <radialGradient id="industry-atlantic-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d0eef1" stopOpacity="1" />
            <stop offset="100%" stopColor="#d0eef1" stopOpacity="0" />
          </radialGradient>
          <filter id="industry-dot-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {regions.map((r) => <path key={r.id} d={r.d} fill={getFill(r)} />)}
        <ellipse cx="340" cy="220" rx="120" ry="100" fill="url(#industry-atlantic-glow)" opacity={getAtlanticOpacity()} />
        {[{ cx: 155, cy: 215, delay: "0s" }, { cx: 440, cy: 158, delay: "0.75s" }].map((dot, i) => (
          <g key={i}>
            <circle cx={dot.cx} cy={dot.cy} r="12" fill="#1a8a9a" opacity="0.15" filter="url(#industry-dot-glow)">
              <animate attributeName="r" values="8;14;8" dur="2s" begin={dot.delay} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0.08;0.25" dur="2s" begin={dot.delay} repeatCount="indefinite" />
            </circle>
            <circle cx={dot.cx} cy={dot.cy} r="4" fill="#1a8a9a" />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default IndustryMapSVG;
