import { useState } from "react";
import { useTranslation } from "react-i18next";
import DemoFlow from "./demo/DemoFlow";
import armsLogo from "@/assets/arms-logo-new.png";

const logoNames = [
"DHL", "Novartis", "Philips", "Mitsubishi Electric", "Iron Mountain",
"Guerbet", "Bausch & Lomb", "Fresenius", "Opella Sanofi", "Konica"];


const Hero = () => {
  const { t } = useTranslation();
  const [showDemoFlow, setShowDemoFlow] = useState(false);

  return (
    <>
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "calc(100vh - 72px)", background: "#0a1628" }}>
        {/* Side shadows */}
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "45%", background: "radial-gradient(ellipse at 0% 0%, rgba(13,148,136,0.35) 0%, rgba(13,100,115,0.7) 20%, rgba(10,75,90,0.4) 45%, transparent 70%)", zIndex: 0, opacity: 0.8, animation: "shadowPulse 8s ease-in-out infinite", willChange: "opacity" }} />
        <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "45%", background: "radial-gradient(ellipse at 100% 0%, rgba(13,148,136,0.35) 0%, rgba(10,90,108,0.7) 20%, rgba(8,65,80,0.4) 45%, transparent 70%)", zIndex: 0, opacity: 0.8, animation: "shadowPulse 8s ease-in-out infinite", willChange: "opacity" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, height: "100%", width: "45%", background: "radial-gradient(ellipse at 0% 100%, rgba(13,148,136,0.35) 0%, rgba(13,100,115,0.7) 20%, rgba(10,75,90,0.4) 45%, transparent 70%)", zIndex: 0, opacity: 0.8, animation: "shadowPulse 8s ease-in-out infinite", willChange: "opacity" }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, height: "100%", width: "45%", background: "radial-gradient(ellipse at 100% 100%, rgba(10,148,136,0.35) 0%, rgba(10,90,108,0.7) 20%, rgba(8,65,80,0.4) 45%, transparent 70%)", zIndex: 0, opacity: 0.8, animation: "shadowPulse 8s ease-in-out infinite", willChange: "opacity" }} />

        <style>{`
          @keyframes shadowPulse {
            0%   { opacity: 0.75; }
            50%  { opacity: 0.9; }
            100% { opacity: 0.75; }
          }

          /* Entrance animations */
          .hero-line1 {
            opacity: 0;
            transform: translateY(20px);
            animation: hero-fade-up 0.7s ease-out 0.1s both;
          }
          .hero-line2 {
            opacity: 0;
            transform: translateY(20px);
            animation: hero-fade-up 0.7s ease-out 0.3s both;
          }
          .hero-line3 {
            opacity: 0;
            transform: translateX(-120%);
            will-change: transform, opacity;
            color: #2ec4d6;
            animation: bulldoze 0.57s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards,
                       impactFlash 0.23s linear 1.05s forwards,
                       bulldozeLock 0.01s linear 1.28s forwards;
          }
          .hero-sub {
            opacity: 0;
            transform: translateY(16px);
            animation: hero-fade-up 0.6s ease-out 1.2s both;
          }
          .hero-ctas {
            opacity: 0;
            transform: translateY(12px);
            animation: hero-fade-up 0.5s ease-out 1.4s both;
          }
          .hero-social {
            opacity: 0;
            animation: hero-fade-only 0.6s ease-out 1.6s both;
          }

          /* Shimmer on line 3 — applied via separate wrapper approach */
          .hero-shimmer-wrap {
            display: block;
            background-size: 200% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-image: linear-gradient(90deg, #2ec4d6 0%, #2ec4d6 40%, #6ee4f2 50%, #2ec4d6 60%, #2ec4d6 100%);
            animation: shimmerSweep 0.8s ease-in-out 1.3s 1 both;
          }
          @keyframes hero-fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes hero-fade-only {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes bulldoze {
            0%   { transform: translateX(-120%); opacity: 0; }
            5%   { opacity: 1; }
            70%  { transform: translateX(0); }
            82%  { transform: translateX(8px); }
            91%  { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          }
          @keyframes impactFlash {
            0%   { color: #2ec4d6; }
            20%  { color: #8aedf8; }
            100% { color: #2ec4d6; }
          }
          @keyframes shimmerSweep {
            0%   { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes bulldozeLock {
            to { transform: translateX(0); opacity: 1; color: #2ec4d6; }
          }

          /* CTA buttons */
          .hero-btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #22a8bc;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 14px 28px;
            font-weight: 600;
            font-size: 1rem;
            font-family: Inter, sans-serif;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
          }
          .hero-btn-primary:hover {
            background: #1a8a9a;
            transform: translateY(-2px);
          }
          .hero-btn-ghost {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            padding: 14px 28px;
            font-weight: 600;
            font-size: 1rem;
            font-family: Inter, sans-serif;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, transform 0.2s;
          }
          .hero-btn-ghost:hover {
            background: #0D9488;
            color: #ffffff;
            transform: translateY(-2px);
          }

          /* Stars */
          .hero-stars {
            color: #F59E0B;
            font-size: 14px;
            letter-spacing: 2px;
          }
        `}</style>

        <div className="relative z-10 w-full px-6 md:px-8" style={{ maxWidth: 780, margin: "0 auto", paddingTop: 48, paddingBottom: 48 }}>
          {/* Headline */}
          <div className="text-center" style={{ marginBottom: 24 }}>
            <h1 style={{ margin: 0, padding: 0 }}>
              <span
                className="hero-line1"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 5vw, 3.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#ffffff"
                }}>
                
                {t('hero.headline1')}
              </span>
              <span
                className="hero-line2"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 5vw, 3.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  marginTop: 8
                }}>
                {t('hero.headline2')}

              </span>
              <span
                className="hero-line3"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(3rem, 6.5vw, 4.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginTop: 8
                }}>
                
                <span className="hero-shimmer-wrap">{t('hero.headline3')}</span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className="hero-sub text-center"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.7
            }}>
            
            {t('hero.subheadline')}
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 16, marginTop: 36 }}>
            
            <button className="hero-btn-primary w-full sm:w-auto" onClick={() => setShowDemoFlow(true)}>
              {t('hero.cta')}
            </button>
            <a
              href="/solutions/software"
              className="hero-btn-ghost w-full sm:w-auto">
              {t('hero.ctaSecondary')}
            </a>
          </div>


          {/* Social proof */}
          <div className="hero-social" style={{ marginTop: 40 }}>
            <div className="flex items-center justify-center" style={{ gap: 8, marginBottom: 16 }}>
              <span className="hero-stars">★★★★★</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
                {t('hero.socialProof')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {showDemoFlow && <DemoFlow onClose={() => setShowDemoFlow(false)} />}
    </>);

};

export default Hero;