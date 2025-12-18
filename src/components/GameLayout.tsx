import { ReactNode } from "react";
import { Header } from "./Header";

interface GameLayoutProps {
  children: ReactNode;
  title: string;
  color?: "pink" | "cyan" | "green" | "purple";
}

const colorClasses = {
  pink: "text-neon-pink text-glow-pink",
  cyan: "text-neon-cyan text-glow-cyan",
  green: "text-neon-green text-glow-green",
  purple: "text-neon-purple",
};

export const GameLayout = ({ children, title, color = "pink" }: GameLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className={`font-arcade text-3xl md:text-4xl font-bold text-center mb-8 ${colorClasses[color]}`}>
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
};
