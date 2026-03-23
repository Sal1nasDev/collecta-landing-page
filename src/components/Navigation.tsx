import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import armsLogo from "@/assets/arms-logo-new.png";
import armsIconWhite from "@/assets/arms-icon-white.png";
import LanguageToggle from "./LanguageToggle";
import DemoFlow from "./demo/DemoFlow";

// Animation phases:
// "closed" → "morphing" (hamburger→isotype, 350ms) → "sliding" (panel + icon fly, 350ms) → "open" (items cascade)
// Reverse: "open" → "sliding-out" → "morphing-out" → "closed"
type MenuPhase = "closed" | "morphing" | "sliding" | "open" | "sliding-out" | "morphing-out";

const Navigation = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [showDemoFlow, setShowDemoFlow] = useState(false);
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { t } = useTranslation();

  const isOpen = phase !== "closed" && phase !== "morphing-out";
  const isAnyOpen = phase !== "closed";

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isAnyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isAnyOpen]);

  const handleOpen = useCallback(() => {
    // Phase 1: morph hamburger into isotype
    setPhase("morphing");
    setTimeout(() => {
      // Phase 2: slide panel in, fly isotype to header
      setPhase("sliding");
      setTimeout(() => {
        // Phase 3: fully open, cascade items
        setPhase("open");
      }, 350);
    }, 350);
  }, []);

  const handleClose = useCallback(() => {
    // Reverse: slide out panel
    setPhase("sliding-out");
    setTimeout(() => {
      // Morph isotype back to hamburger
      setPhase("morphing-out");
      setTimeout(() => {
        setPhase("closed");
        setMobileSolutionsOpen(false);
      }, 350);
    }, 350);
  }, []);

  const handleToggle = () => {
    if (phase === "closed") handleOpen();
    else if (phase === "open") handleClose();
    // Ignore clicks during transitions
  };

  // Derived states for each element
  const showIsotype = phase !== "closed"; // isotype visible after morph starts
  const hideLines = phase !== "closed" && phase !== "morphing-out";
  const linesVisible = phase === "closed" || phase === "morphing-out";
  const isotypeMorphed = phase !== "closed" && phase !== "morphing-out";
  const panelIn = phase === "sliding" || phase === "open";
  const panelVisible = phase === "sliding" || phase === "open" || phase === "sliding-out";
  const overlayVisible = panelVisible;
  const itemsIn = phase === "open";

  // Isotype position: starts at button center, flies to menu header
  // When "morphing": at button position (scale 1, no translate)
  // When "sliding"/"open": translated to menu header position
  const isotypeFlown = phase === "sliding" || phase === "open";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D9488]/95 backdrop-blur-md border-b border-[#0D9488]/30">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: hamburger / isotype morph button */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg z-[60]"
              onClick={handleToggle}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {/* Hamburger lines - converge to center, then spin and shrink */}
              <span
                className="absolute w-5 h-[2px] rounded-full bg-white motion-reduce:transition-none origin-center"
                style={{
                  transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  opacity: linesVisible ? 1 : 0,
                  transform: linesVisible
                    ? "translateY(-6px) rotate(0deg) scaleX(1)"
                    : "translateY(0px) rotate(135deg) scaleX(0)",
                }}
              />
              <span
                className="absolute w-5 h-[2px] rounded-full bg-white motion-reduce:transition-none origin-center"
                style={{
                  transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  opacity: linesVisible ? 1 : 0,
                  transform: linesVisible ? "scaleX(1)" : "scaleX(0)",
                }}
              />
              <span
                className="absolute w-5 h-[2px] rounded-full bg-white motion-reduce:transition-none origin-center"
                style={{
                  transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  opacity: linesVisible ? 1 : 0,
                  transform: linesVisible
                    ? "translateY(6px) rotate(0deg) scaleX(1)"
                    : "translateY(0px) rotate(-135deg) scaleX(0)",
                }}
              />
              {/* ARMS isotype - pops in with a playful spring, then flies to menu header */}
              <img
                src={armsIconWhite}
                alt=""
                aria-hidden="true"
                className="absolute motion-reduce:transition-none"
                style={{
                  height: "28px",
                  width: "auto",
                  transition: isotypeMorphed
                    ? "opacity 200ms ease-out, transform 400ms cubic-bezier(0.34, 1.4, 0.64, 1)"
                    : "opacity 200ms ease-in, transform 300ms ease-in",
                  transitionDelay: isotypeMorphed && !isotypeFlown ? "100ms" : "0ms",
                  opacity: isotypeMorphed ? 1 : 0,
                  transform: isotypeFlown
                    ? "translate(14px, 0px) scale(0.85)"
                    : isotypeMorphed
                      ? "translate(0px, 0px) scale(1)"
                      : "translate(0px, 0px) scale(0) rotate(180deg)",
                  pointerEvents: "none",
                }}
              />
            </button>

            <a href="/" className="flex items-center">
              <img src={armsLogo} alt="ARMS" className="h-8 w-auto" />
            </a>
            
            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium">
                  {t('nav.solutions')}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="bg-card border border-border rounded-xl shadow-xl p-2 min-w-[280px]">
                    <a 
                      href="/solutions/software" 
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {t('nav.softwareSolution')}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {t('nav.softwareSolutionDesc')}
                        </span>
                      </div>
                    </a>
                    
                    <a 
                      href="/solutions/managed-services" 
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 group-hover:bg-secondary/70 transition-colors">
                        <svg className="w-5 h-5 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {t('nav.managedServices')}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {t('nav.managedServicesDesc')}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              
              <a href="/industries" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                {t('nav.industries')}
              </a>
              <a href="/pricing" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                {t('nav.pricing')}
              </a>
              <a href="/partners" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                {t('nav.partners', 'Partners')}
              </a>
              <a href="/about" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                {t('nav.aboutUs')}
              </a>
              <a href="/careers" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                {t('nav.careers')}
              </a>
              <a href="/contact" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                {t('nav.contact')}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/80 hover:text-white hover:bg-white/10">
                {t('nav.signIn')}
              </Button>
              <Button variant="cta" size="sm" onClick={() => setShowDemoFlow(true)}>
                {t('nav.getDemo')}
              </Button>
              <div className="hidden lg:block">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden motion-reduce:transition-none ${
          overlayVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          transition: "opacity 300ms ease-in-out",
          opacity: overlayVisible ? 1 : 0,
        }}
        onClick={() => { if (phase === "open") handleClose(); }}
        aria-hidden="true"
      />
      
      {/* Mobile Menu - Panel */}
      <div
        className="fixed top-0 left-0 bottom-0 z-[56] w-[280px] lg:hidden motion-reduce:transition-none"
        style={{
          transition: "transform 350ms ease-in-out",
          transform: panelIn ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="absolute inset-0" style={{ background: "#0D9488" }} />
        {/* Close button */}
        <button
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={() => { if (phase === "open") handleClose(); }}
          aria-label="Close menu"
          style={{
            transition: "opacity 250ms ease-out",
            opacity: itemsIn ? 0.7 : 0,
            pointerEvents: itemsIn ? "auto" : "none",
          }}
        >
          <X className="h-5 w-5 text-white" />
        </button>
        <div className="relative z-10 h-full flex flex-col">
          {/* Header - isotype here is invisible; the button's isotype visually flies here */}
          <div className="p-6 pb-2">
            <a
              href="/"
              className="flex items-center gap-2"
              onClick={() => { if (phase === "open") handleClose(); }}
            >
              <img
                src={armsIconWhite}
                alt="ARMS"
                className="h-6 w-auto"
                style={{
                  transition: "opacity 200ms ease-in-out",
                  opacity: itemsIn ? 1 : 0,
                }}
              />
              <span
                className="text-lg font-semibold text-white"
                style={{
                  transition: "opacity 200ms ease-in-out",
                  transitionDelay: itemsIn ? "100ms" : "0ms",
                  opacity: itemsIn ? 1 : 0,
                }}
              >
                {t('nav.menu')}
              </span>
            </a>
          </div>

          <nav className="flex flex-col px-4 pb-6 overflow-y-auto">
            {/* Sign In */}
            <a
              href="#"
              className="py-3 px-2 text-sm font-semibold text-white tracking-wide hover:text-white border-b border-white/20 flex items-center gap-2"
              style={{
                transition: "opacity 250ms ease-out, transform 250ms ease-out",
                transitionDelay: itemsIn ? "50ms" : "0ms",
                opacity: itemsIn ? 1 : 0,
                transform: itemsIn ? "translateX(0)" : "translateX(-12px)",
              }}
              onClick={() => { if (phase === "open") handleClose(); }}
            >
              {t('nav.signIn')}
            </a>
            {/* Home */}
            <a
              href="/"
              className="py-3 px-2 text-sm font-medium text-white/90 hover:text-white border-b border-white/20"
              style={{
                transition: "opacity 250ms ease-out, transform 250ms ease-out",
                transitionDelay: itemsIn ? "100ms" : "0ms",
                opacity: itemsIn ? 1 : 0,
                transform: itemsIn ? "translateX(0)" : "translateX(-12px)",
              }}
              onClick={() => { if (phase === "open") handleClose(); }}
            >
              {t('nav.home', 'Home')}
            </a>

            {/* Solutions */}
            <button
              className="py-3 px-2 text-sm font-medium text-white/90 hover:text-white border-b border-white/20 flex items-center justify-between w-full text-left"
              style={{
                transition: "opacity 250ms ease-out, transform 250ms ease-out",
                transitionDelay: itemsIn ? "150ms" : "0ms",
                opacity: itemsIn ? 1 : 0,
                transform: itemsIn ? "translateX(0)" : "translateX(-12px)",
              }}
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
            >
              {t('nav.solutions')}
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSolutionsOpen && (
              <div className="pl-4 border-b border-white/20">
                <a href="/solutions/software" className="py-2.5 px-2 text-sm text-white/70 hover:text-white transition-colors block" onClick={() => { if (phase === "open") handleClose(); }}>
                  {t('nav.softwareSolution')}
                </a>
                <a href="/solutions/managed-services" className="py-2.5 px-2 text-sm text-white/70 hover:text-white transition-colors block" onClick={() => { if (phase === "open") handleClose(); }}>
                  {t('nav.managedServices')}
                </a>
              </div>
            )}

            {[
              { href: "/industries", label: t('nav.industries'), delay: 200 },
              { href: "/pricing", label: t('nav.pricing'), delay: 250 },
              { href: "/partners", label: t('nav.partners', 'Partners'), delay: 300 },
              { href: "/about", label: t('nav.aboutUs'), delay: 350 },
              { href: "/careers", label: t('nav.careers'), delay: 400 },
              { href: "/contact", label: t('nav.contact'), delay: 450 },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 px-2 text-sm font-medium text-white/90 hover:text-white border-b border-white/20"
                style={{
                  transition: "opacity 250ms ease-out, transform 250ms ease-out",
                  transitionDelay: itemsIn ? `${item.delay}ms` : "0ms",
                  opacity: itemsIn ? 1 : 0,
                  transform: itemsIn ? "translateX(0)" : "translateX(-12px)",
                }}
                onClick={() => { if (phase === "open") handleClose(); }}
              >
                {item.label}
              </a>
            ))}

            <div
              className="pt-4 px-2"
              style={{
                transition: "opacity 250ms ease-out, transform 250ms ease-out",
                transitionDelay: itemsIn ? "450ms" : "0ms",
                opacity: itemsIn ? 1 : 0,
                transform: itemsIn ? "translateX(0)" : "translateX(-12px)",
              }}
            >
              <LanguageToggle variant="dark" />
            </div>
          </nav>
        </div>
      </div>

      {showDemoFlow && <DemoFlow onClose={() => setShowDemoFlow(false)} />}
    </>
  );
};

export default Navigation;
