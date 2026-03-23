import { useTranslation } from "react-i18next";
import { Rocket, Building2, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    key: "onboarding",
    icon: Rocket,
    badgeBg: "#F59E0B",
    hoverTint: "rgba(245,158,11,0.04)",
  },
  {
    key: "fullOutsourcing",
    icon: Building2,
    badgeBg: "#F97316",
    hoverTint: "rgba(249,115,22,0.04)",
  },
  {
    key: "coSourcing",
    icon: Users,
    badgeBg: "#1a8a9a",
    hoverTint: "rgba(26,138,154,0.04)",
  },
  {
    key: "recovery",
    icon: Zap,
    badgeBg: "#EF4444",
    hoverTint: "rgba(239,68,68,0.04)",
  },
];

const HowWeWork = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check if already visible on load
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    if (isVisible) {
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 bg-muted/30 ${triggered ? "hww-triggered" : ""}`}>
      <style>{`
        /* Title underline removed */

        /* Card entrance */
        .hww-card {
          opacity: 0;
          transform: translateY(24px);
          will-change: transform, opacity;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out, background-color 0.25s ease-out;
        }
        @media (max-width: 767px) {
          .hww-card {
            transform: translateY(12px);
          }
        }
        .hww-triggered .hww-card {
          animation: hww-card-enter 0.5s ease-out forwards;
        }
        .hww-triggered .hww-card:nth-child(1) { animation-delay: 0s; }
        .hww-triggered .hww-card:nth-child(2) { animation-delay: 0.15s; }
        .hww-triggered .hww-card:nth-child(3) { animation-delay: 0.30s; }
        .hww-triggered .hww-card:nth-child(4) { animation-delay: 0.45s; }

        @keyframes hww-card-enter {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          @keyframes hww-card-enter {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }

        /* Card hover */
        .hww-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.13);
        }
        /* Ensure hover works after entrance animation completes */
        .hww-triggered .hww-card {
          opacity: 1;
          transform: translateY(0);
        }
        /* Need fill-mode forwards but also allow hover, so we use animation-fill-mode */

        /* Icon box hover */
        .hww-icon-box {
          transition: transform 0.25s ease-out, filter 0.25s ease-out;
          will-change: transform;
        }
        .hww-card:hover .hww-icon-box {
          transform: scale(1.08);
          filter: drop-shadow(0 0 6px rgba(26,138,154,0.35));
        }
        /* Icon rotation */
        .hww-icon-svg {
          transition: transform 0.35s ease-out;
        }
        .hww-card:hover .hww-icon-svg {
          transform: rotate(12deg);
        }

        /* Badge pulse */
        .hww-badge {
          will-change: transform;
        }
        .hww-triggered .hww-card:nth-child(1) .hww-badge {
          animation: hww-badge-pulse 0.4s ease-in-out 0.5s 1;
        }
        .hww-triggered .hww-card:nth-child(2) .hww-badge {
          animation: hww-badge-pulse 0.4s ease-in-out 0.65s 1;
        }
        .hww-triggered .hww-card:nth-child(3) .hww-badge {
          animation: hww-badge-pulse 0.4s ease-in-out 0.80s 1;
        }
        .hww-triggered .hww-card:nth-child(4) .hww-badge {
          animation: hww-badge-pulse 0.4s ease-in-out 0.95s 1;
        }

        @keyframes hww-badge-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        /* Bullet stagger */
        .hww-bullet {
          opacity: 0;
          transform: translateY(10px);
          will-change: transform, opacity;
        }
        @media (max-width: 767px) {
          .hww-bullet {
            transform: translateY(5px);
          }
        }
        .hww-triggered .hww-bullet {
          animation: hww-bullet-enter 0.35s ease-out forwards;
        }
        @keyframes hww-bullet-enter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          @keyframes hww-bullet-enter {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }

        /* Ideal-for highlight */
        .hww-ideal-label {
          color: #2d3748;
        }
        .hww-triggered .hww-ideal-label {
          animation: hww-ideal-highlight 1.2s ease-out forwards;
        }
        @keyframes hww-ideal-highlight {
          0% { color: #2d3748; }
          25% { color: #1a8a9a; }
          66% { color: #1a8a9a; }
          100% { color: #2d3748; }
        }

        /* Ideal-for row entrance */
        .hww-ideal-row {
          opacity: 0;
          transform: translateY(10px);
          will-change: transform, opacity;
        }
        .hww-triggered .hww-ideal-row {
          animation: hww-bullet-enter 0.35s ease-out forwards;
        }

        /* Background tint on hover - handled inline via CSS custom properties */
        @media (max-width: 767px) {
          .hww-card:hover {
            background-color: #ffffff !important;
          }
        }
      `}</style>

      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">
            {t("managed.howWeWork.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("managed.howWeWork.subtitle")}
          </p>
        </div>

        <div
          className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          style={{ alignItems: "stretch" }}
        >
          {cards.map((card, cardIndex) => {
            const bullets = t(`managed.howWeWork.${card.key}.bullets`, {
              returnObjects: true,
            }) as string[];

            // Calculate bullet animation delays
            // Card entrance ends at: cardIndex * 0.15 + 0.5
            const cardEntranceEnd = cardIndex * 0.15 + 0.5;

            return (
              <div
                key={card.key}
                className="hww-card p-8 flex flex-col justify-between"
                style={
                  {
                    "--hover-tint": card.hoverTint,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 768) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = card.hoverTint;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff";
                }}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className="hww-icon-box rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                    style={{ width: 48, height: 48 }}
                  >
                    <card.icon className="hww-icon-svg w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t(`managed.howWeWork.${card.key}.title`)}
                  </h3>
                </div>

                {/* Subtitle - teal, non-italic */}
                <p
                  className="mb-5 ml-16 font-normal"
                  style={{ fontSize: "0.95rem", color: "#1a8a9a" }}
                >
                  {t(`managed.howWeWork.${card.key}.subtitle`)}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bullet}
                      className="hww-bullet flex items-start gap-3"
                      style={{
                        paddingLeft: 0,
                        lineHeight: 1.6,
                        animationDelay: `${cardEntranceEnd + bulletIndex * 0.12}s`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "#1a8a9a" }}
                      />
                      <span className="text-sm" style={{ color: "#2d3748" }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Ideal for */}
                <div
                  className="hww-ideal-row pt-5 border-t border-border/50 mt-auto"
                  style={{
                    animationDelay: `${cardEntranceEnd + bullets.length * 0.12}s`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm flex-1 min-w-0" style={{ color: "#2d3748" }}>
                      <span
                        className="hww-ideal-label font-medium"
                        style={{
                          animationDelay: `${cardEntranceEnd + bullets.length * 0.12}s`,
                        }}
                      >
                        {t("managed.howWeWork.idealForLabel")}{" "}
                      </span>
                      {t(`managed.howWeWork.${card.key}.idealFor`)}
                    </p>
                    <span
                      className="hww-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide flex-shrink-0"
                      style={{
                        backgroundColor: card.badgeBg,
                        color: "#ffffff",
                      }}
                    >
                      {t(`managed.howWeWork.${card.key}.badge`)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
