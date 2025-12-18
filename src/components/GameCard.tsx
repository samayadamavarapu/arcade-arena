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
    border: "border-neon-pink/50",
    glow: "box-glow-pink",
    text: "text-neon-pink",
    bg: "bg-neon-pink/10",
    hover: "hover:border-neon-pink hover:bg-neon-pink/15",
    iconBg: "bg-neon-pink/20",
  },
  cyan: {
    border: "border-neon-cyan/50",
    glow: "box-glow-cyan",
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    hover: "hover:border-neon-cyan hover:bg-neon-cyan/15",
    iconBg: "bg-neon-cyan/20",
  },
  green: {
    border: "border-neon-green/50",
    glow: "box-glow-green",
    text: "text-neon-green",
    bg: "bg-neon-green/10",
    hover: "hover:border-neon-green hover:bg-neon-green/15",
    iconBg: "bg-neon-green/20",
  },
  purple: {
    border: "border-neon-purple/50",
    glow: "box-glow-purple",
    text: "text-neon-purple",
    bg: "bg-neon-purple/10",
    hover: "hover:border-neon-purple hover:bg-neon-purple/15",
    iconBg: "bg-neon-purple/20",
  },
  yellow: {
    border: "border-neon-yellow/50",
    glow: "shadow-[0_4px_20px_hsl(45_95%_50%/0.35)]",
    text: "text-neon-yellow",
    bg: "bg-neon-yellow/10",
    hover: "hover:border-neon-yellow hover:bg-neon-yellow/15",
    iconBg: "bg-neon-yellow/20",
  },
  orange: {
    border: "border-neon-orange/50",
    glow: "shadow-[0_4px_20px_hsl(25_95%_55%/0.35)]",
    text: "text-neon-orange",
    bg: "bg-neon-orange/10",
    hover: "hover:border-neon-orange hover:bg-neon-orange/15",
    iconBg: "bg-neon-orange/20",
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
        group relative overflow-hidden rounded-2xl border-2 ${colors.border}
        bg-card p-6 transition-all duration-300 ease-out shadow-lg
        hover:scale-105 hover:-translate-y-2 ${colors.hover}
        hover:shadow-xl animate-slide-up
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`
            w-16 h-16 rounded-xl ${colors.iconBg} ${colors.border} border-2
            flex items-center justify-center mb-4
            group-hover:scale-110 transition-all duration-300
          `}
        >
          <Icon className={`w-8 h-8 ${colors.text}`} strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h3 className={`font-arcade text-xl font-bold ${colors.text} mb-2`}>
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

      {/* Corner decoration */}
      <div
        className={`
          absolute top-0 right-0 w-24 h-24 ${colors.bg}
          transform rotate-45 translate-x-12 -translate-y-12
          opacity-50 group-hover:opacity-100 transition-opacity duration-300
        `}
      />
    </Link>
  );
};
