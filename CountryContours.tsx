import React from "react";
import italySvg from "@/assets/countries/italy.svg";

interface CountryContourProps {
  country: string;
  className?: string;
}

// Countries that use SVG file imports
const countrySvgFiles: Record<string, string> = {
  Italy: italySvg,
};

// Fallback SVG paths for countries without dedicated files
const countryPaths: Record<string, { paths: string[]; viewBox: string }> = {
  Spain: {
    viewBox: "0 0 100 100",
    paths: ["M10,35 L20,25 L40,20 L60,18 L80,22 L90,30 L92,45 L88,60 L75,72 L55,78 L35,76 L18,68 L8,55 L6,42 L10,35 M85,25 L95,22 L98,30 L95,38 L88,35 L85,25"]
  },
  Romania: {
    viewBox: "0 0 100 100",
    paths: ["M15,30 L30,22 L50,18 L70,22 L85,32 L90,48 L85,62 L72,72 L52,78 L32,75 L18,65 L10,50 L12,38 L15,30"]
  },
  Cyprus: {
    viewBox: "0 0 100 100",
    paths: ["M12,48 L25,35 L45,28 L68,30 L85,40 L92,52 L88,65 L72,75 L48,78 L25,72 L12,60 L8,52 L12,48"]
  },
  Croatia: {
    viewBox: "0 0 100 100",
    paths: ["M25,12 L40,8 L52,15 L58,28 L52,42 L45,58 L38,72 L32,85 L25,82 L28,68 L35,52 L40,35 L38,22 L30,15 L25,12 M55,55 L72,48 L88,52 L95,62 L90,75 L75,80 L58,75 L55,62 L55,55"]
  },
  Ethiopia: {
    viewBox: "0 0 100 100", 
    paths: ["M20,22 L42,15 L65,18 L82,28 L88,45 L82,62 L68,72 L50,78 L32,75 L18,62 L10,48 L15,32 L20,22"]
  },
  Togo: {
    viewBox: "0 0 100 100",
    paths: ["M38,8 L52,5 L62,12 L65,28 L60,50 L55,72 L50,88 L45,95 L38,90 L35,72 L32,50 L35,30 L38,15 L38,8"]
  },
  Haiti: {
    viewBox: "0 0 100 100",
    paths: ["M12,42 L32,32 L55,28 L78,35 L88,48 L85,62 L72,72 L50,78 L28,72 L12,58 L8,48 L12,42"]
  },
  Greece: {
    viewBox: "0 0 100 100",
    paths: ["M32,22 L52,15 L70,25 L80,40 L75,58 L62,70 L42,75 L25,65 L15,50 L20,35 L32,22 M78,72 L88,68 L95,78 L90,88 L78,85 L78,72 M52,78 L65,75 L72,82 L68,92 L55,92 L50,85 L52,78"]
  },
  default: {
    viewBox: "0 0 100 100",
    paths: ["M25,25 L50,15 L75,25 L85,50 L75,75 L50,85 L25,75 L15,50 L25,25"]
  }
};

// Country-specific colors
const countryColors: Record<string, { bg: string; stroke: string; fill: string }> = {
  Italy: { bg: "from-forest to-teal", stroke: "stroke-white/70", fill: "fill-white/20" },
  Spain: { bg: "from-sunset to-coral", stroke: "stroke-white/70", fill: "fill-white/20" },
  Romania: { bg: "from-ocean to-primary", stroke: "stroke-white/70", fill: "fill-white/20" },
  Cyprus: { bg: "from-teal to-ocean", stroke: "stroke-white/70", fill: "fill-white/20" },
  Croatia: { bg: "from-primary to-forest", stroke: "stroke-white/70", fill: "fill-white/20" },
  Ethiopia: { bg: "from-forest to-emerald", stroke: "stroke-white/70", fill: "fill-white/20" },
  Togo: { bg: "from-forest to-primary", stroke: "stroke-white/70", fill: "fill-white/20" },
  Haiti: { bg: "from-ocean to-teal", stroke: "stroke-white/70", fill: "fill-white/20" },
  Greece: { bg: "from-ocean to-primary", stroke: "stroke-white/70", fill: "fill-white/20" },
  default: { bg: "from-primary to-ocean", stroke: "stroke-white/70", fill: "fill-white/20" }
};

export function CountryContour({ country, className = "" }: CountryContourProps) {
  const colors = countryColors[country] || countryColors.default;
  const svgFile = countrySvgFiles[country];

  // Use SVG file if available
  if (svgFile) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br ${colors.bg} overflow-hidden ${className}`}>
        <img 
          src={svgFile} 
          alt={`${country} map`}
          className="absolute inset-0 w-full h-full object-contain p-3 opacity-40"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  }

  // Fallback to inline SVG paths
  const countryData = countryPaths[country] || countryPaths.default;

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${colors.bg} overflow-hidden ${className}`}>
      <svg
        viewBox={countryData.viewBox}
        className="absolute inset-0 w-full h-full p-3"
        preserveAspectRatio="xMidYMid meet"
      >
        {countryData.paths.map((path, index) => (
          <path
            key={index}
            d={path}
            className={`${colors.fill} ${colors.stroke}`}
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function getCountryGradient(country: string): string {
  const colors = countryColors[country] || countryColors.default;
  return colors.bg;
}
