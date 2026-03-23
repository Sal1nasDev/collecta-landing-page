import { useTranslation } from "react-i18next";
import dhlLogo from "@/assets/logos/dhl.png";
import grupoEiLogo from "@/assets/logos/grupo-ei.png";
import bauschLombLogo from "@/assets/logos/bausch-lomb.png";
import ironMountainLogo from "@/assets/logos/iron-mountain.avif";
import mitsubishiLogo from "@/assets/logos/mitsubishi.png";
import sidelLogo from "@/assets/logos/sidel.png";
import cocaColaLogo from "@/assets/logos/coca-cola.png";
import revlonLogo from "@/assets/logos/revlon.png";
import vantiveLogo from "@/assets/logos/vantive.png";
import baxterLogo from "@/assets/logos/baxter.png";
import guerbetLogo from "@/assets/logos/guerbet.png";
import philipsLogo from "@/assets/logos/philips.png";
import opellaLogo from "@/assets/logos/opella.png";
import bostonScientificLogo from "@/assets/logos/boston-scientific.png";
import freseniusKabiLogo from "@/assets/logos/fresenius-kabi.png";
import santaClaraLogo from "@/assets/logos/santa-clara.png";

const row1 = [
  { name: "Coca-Cola", src: cocaColaLogo, size: "" },
  { name: "Revlon", src: revlonLogo, size: "h-16 sm:h-24" },
  { name: "Mitsubishi", src: mitsubishiLogo, size: "h-16 sm:h-24" },
  { name: "DHL", src: dhlLogo, size: "h-16 sm:h-24" },
  { name: "Philips", src: philipsLogo, size: "" },
  { name: "Iron Mountain", src: ironMountainLogo, size: "" },
  { name: "Boston Scientific", src: bostonScientificLogo, size: "" },
  { name: "Santa Clara", src: santaClaraLogo, size: "h-20 sm:h-32" },
];

const row2 = [
  { name: "Vantive", src: vantiveLogo, size: "" },
  { name: "Baxter", src: baxterLogo, size: "" },
  { name: "Grupo EI", src: grupoEiLogo, size: "" },
  { name: "Bausch & Lomb", src: bauschLombLogo, size: "h-5 sm:h-8" },
  { name: "Sidel", src: sidelLogo, size: "h-16 sm:h-24" },
  { name: "Guerbet", src: guerbetLogo, size: "" },
  { name: "Opella", src: opellaLogo, size: "" },
  { name: "Fresenius Kabi", src: freseniusKabiLogo, size: "" },
];

const LogoRow = ({ logos, direction }: { logos: typeof row1; direction: "left" | "right" }) => (
  <div className="relative w-full overflow-hidden group">
    <div
      className={`flex ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"} group-hover:[animation-play-state:paused]`}
      style={{ width: "max-content" }}
    >
      {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
        <div
          key={`${logo.name}-${index}`}
          className="flex-shrink-0 mx-4 sm:mx-12 flex items-center justify-center"
        >
          <img
            src={logo.src}
            alt={logo.name}
            className={`${logo.size || "h-8 sm:h-12"} w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  </div>
);

const CustomerLogos = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-semibold text-center text-foreground">
          {t('customers.title')}
        </h2>
      </div>

      <div className="space-y-8">
        <LogoRow logos={row1} direction="left" />
        <LogoRow logos={row2} direction="right" />
      </div>
    </section>
  );
};

export default CustomerLogos;
