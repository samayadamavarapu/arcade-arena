import { Header } from "@/components/Header";
import { GameCard } from "@/components/GameCard";
import { Grid3X3, Apple, Hand, Brain } from "lucide-react";

const games = [
  {
    title: "Tic Tac Toe",
    description: "Classic X vs O battle! Play against a friend or challenge the AI.",
    icon: Grid3X3,
    to: "/tic-tac-toe",
    color: "pink" as const,
  },
  {
    title: "Snake",
    description: "Guide the snake, eat the food, grow longer. How high can you score?",
    icon: Apple,
    to: "/snake",
    color: "green" as const,
  },
  {
    title: "Rock Paper Scissors",
    description: "Test your luck against the computer in this classic showdown!",
    icon: Hand,
    to: "/rock-paper-scissors",
    color: "purple" as const,
  },
  {
    title: "Memory Match",
    description: "Flip cards and find matching pairs. Train your brain!",
    icon: Brain,
    to: "/memory-match",
    color: "cyan" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Colorful Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-yellow/15 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-arcade text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                GAME OF GAMES
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welcome to the ultimate arcade experience! Choose your game and let the fun begin.
            </p>

            {/* Animated decorative elements */}
            <div className="flex justify-center gap-4 mb-12">
              {["🎮", "🕹️", "🎯", "🏆"].map((emoji, index) => (
                <span
                  key={index}
                  className="text-3xl sm:text-4xl animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container pb-16">
        <h2 className="font-arcade text-2xl font-bold text-center mb-8 text-neon-cyan text-glow-cyan">
          SELECT YOUR GAME
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <GameCard
              key={game.to}
              {...game}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            Built with <span className="text-neon-pink">♥</span> for gamers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
