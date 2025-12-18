import { useState, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { RotateCcw, Star, Heart, Zap, Moon, Sun, Flame, Snowflake, Music } from "lucide-react";

const icons = [Star, Heart, Zap, Moon, Sun, Flame, Snowflake, Music];

interface Card {
  id: number;
  icon: typeof Star;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (): Card[] => {
  const cardPairs = icons.flatMap((icon, index) => [
    { id: index * 2, icon, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, icon, isFlipped: false, isMatched: false },
  ]);
  return shuffleArray(cardPairs);
};

const MemoryMatch = () => {
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("memory-best-score");
    return saved ? parseInt(saved, 10) : Infinity;
  });

  const isGameWon = matches === icons.length;

  useEffect(() => {
    if (isGameWon) {
      setShowConfetti(true);
      if (moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem("memory-best-score", moves.toString());
      }
    }
  }, [isGameWon, moves, bestScore]);

  const handleCardClick = (cardId: number) => {
    if (isLocked) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = newCards.find((c) => c.id === firstId)!;
      const secondCard = newCards.find((c) => c.id === secondId)!;

      if (firstCard.icon === secondCard.icon) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setShowConfetti(false);
  };

  const cardColors = [
    "border-neon-pink bg-neon-pink/20 text-neon-pink",
    "border-neon-cyan bg-neon-cyan/20 text-neon-cyan",
    "border-neon-green bg-neon-green/20 text-neon-green",
    "border-neon-yellow bg-neon-yellow/20 text-neon-yellow",
    "border-neon-purple bg-neon-purple/20 text-neon-purple",
    "border-neon-orange bg-neon-orange/20 text-neon-orange",
    "border-neon-pink bg-neon-pink/20 text-neon-pink",
    "border-neon-cyan bg-neon-cyan/20 text-neon-cyan",
  ];

  return (
    <GameLayout title="MEMORY MATCH" color="cyan">
      <Confetti isActive={showConfetti} />

      <div className="flex flex-col items-center gap-6">
        {/* Stats */}
        <div className="flex flex-wrap gap-4 justify-center">
          <ScoreBoard score={moves} label="Moves" />
          <ScoreBoard score={matches} label="Matches" />
          {bestScore !== Infinity && (
            <div className="bg-card border border-neon-purple/50 rounded-xl px-6 py-3 box-glow-purple">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">Best</p>
              <p className="text-2xl font-arcade font-bold text-neon-purple">{bestScore} moves</p>
            </div>
          )}
        </div>

        {/* Win Message */}
        {isGameWon && (
          <div className="text-center animate-scale-in">
            <p className="font-arcade text-3xl font-bold text-neon-green text-glow-green">
              YOU WIN!
            </p>
            <p className="text-muted-foreground mt-2">
              Completed in {moves} moves
            </p>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 p-4 bg-card rounded-2xl border-2 border-border">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const colorClass = cardColors[icons.indexOf(card.icon)];

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isLocked || card.isFlipped || card.isMatched}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2
                  transition-all duration-300 transform
                  ${card.isFlipped || card.isMatched
                    ? `${colorClass} ${card.isMatched ? "opacity-50 scale-95" : ""}`
                    : "border-border bg-muted/30 hover:bg-muted/50 hover:scale-105"
                  }
                  ${card.isFlipped && !card.isMatched ? "animate-scale-in" : ""}
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {(card.isFlipped || card.isMatched) ? (
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
                ) : (
                  <span className="text-2xl text-muted-foreground">?</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        <Button variant="arcade" size="lg" onClick={resetGame}>
          <RotateCcw className="w-5 h-5" />
          {isGameWon ? "PLAY AGAIN" : "RESTART"}
        </Button>
      </div>
    </GameLayout>
  );
};

export default MemoryMatch;
