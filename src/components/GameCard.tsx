import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: "pink" | "cyan" | "green" | "purple" | "yellow" | "orange";
  delay?: number;
}

const colorClasses = {
  pink: {
    border: "border-neon-pink",
    glow: "box-glow-pink",
    text: "text-neon-pink",
    bg: "bg-neon-pink/10",
    hover: "hover:border-neon-pink/80 hover:bg-neon-pink/20",
  },
  cyan: {
    border: "border-neon-cyan",
    glow: "box-glow-cyan",
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    hover: "hover:border-neon-cyan/80 hover:bg-neon-cyan/20",
  },
  green: {
    border: "border-neon-green",
    glow: "box-glow-green",
    text: "text-neon-green",
    bg: "bg-neon-green/10",
    hover: "hover:border-neon-green/80 hover:bg-neon-green/20",
  },
  purple: {
    border: "border-neon-purple",
    glow: "box-glow-purple",
    text: "text-neon-purple",
    bg: "bg-neon-purple/10",
    hover: "hover:border-neon-purple/80 hover:bg-neon-purple/20",
  },
  yellow: {
    border: "border-neon-yellow",
    glow: "shadow-[0_0_20px_hsl(50_100%_55%/0.5)]",
    text: "text-neon-yellow",
    bg: "bg-neon-yellow/10",
    hover: "hover:border-neon-yellow/80 hover:bg-neon-yellow/20",
  },
  orange: {
    border: "border-neon-orange",
    glow: "shadow-[0_0_20px_hsl(25_100%_55%/0.5)]",
    text: "text-neon-orange",
    bg: "bg-neon-orange/10",
    hover: "hover:border-neon-orange/80 hover:bg-neon-orange/20",
  },
};

export const GameCard = ({
  title,
  description,
  icon: Icon,
  to,
  color,
  delay = 0,
}: GameCardProps) => {
  const colors = colorClasses[color];

  return (
    <Link
      to={to}
      className={`
        group relative overflow-hidden rounded-2xl border-2 ${colors.border} ${colors.bg}
        gradient-card p-6 transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2 ${colors.hover}
        animate-slide-up
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${colors.glow} blur-xl
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`
            w-16 h-16 rounded-xl ${colors.bg} ${colors.border} border
            flex items-center justify-center mb-4
            group-hover:animate-bounce-subtle transition-all duration-300
          `}
        >
          <Icon className={`w-8 h-8 ${colors.text}`} strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h3
          className={`
            font-arcade text-xl font-bold ${colors.text} mb-2
            group-hover:text-glow-${color === "pink" ? "pink" : color === "cyan" ? "cyan" : "green"}
          `}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {/* Play indicator */}
        <div
          className={`
            mt-4 flex items-center gap-2 text-sm font-arcade ${colors.text}
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
          `}
        >
          <span>PLAY NOW</span>
          <span className="animate-bounce-subtle">→</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        className={`
          absolute top-0 right-0 w-20 h-20 ${colors.bg}
          transform rotate-45 translate-x-10 -translate-y-10
          opacity-50 group-hover:opacity-100 transition-opacity duration-300
        `}
      />
    </Link>
  );
};
