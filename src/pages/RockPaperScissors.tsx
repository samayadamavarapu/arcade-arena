import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { RotateCcw, Hand, FileText, Scissors } from "lucide-react";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw" | null;

const choices: { value: Choice; icon: typeof Hand; label: string }[] = [
  { value: "rock", icon: Hand, label: "Rock" },
  { value: "paper", icon: FileText, label: "Paper" },
  { value: "scissors", icon: Scissors, label: "Scissors" },
];

const getResult = (player: Choice, computer: Choice): Result => {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
};

const getComputerChoice = (): Choice => {
  const options: Choice[] = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
};

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChoice = (choice: Choice) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    // Animate computer choice
    setTimeout(() => {
      const computer = getComputerChoice();
      setComputerChoice(computer);

      const gameResult = getResult(choice, computer);
      setResult(gameResult);

      if (gameResult === "win") {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else if (gameResult === "lose") {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      }

      setIsAnimating(false);
    }, 800);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
    setShowConfetti(false);
  };

  const getResultMessage = () => {
    switch (result) {
      case "win": return "YOU WIN!";
      case "lose": return "YOU LOSE!";
      case "draw": return "IT'S A DRAW!";
      default: return "CHOOSE YOUR WEAPON";
    }
  };

  const getResultColor = () => {
    switch (result) {
      case "win": return "text-neon-green text-glow-green";
      case "lose": return "text-neon-pink text-glow-pink";
      case "draw": return "text-neon-yellow";
      default: return "text-foreground";
    }
  };

  const ChoiceDisplay = ({ choice, label, isPlayer }: { choice: Choice | null; label: string; isPlayer?: boolean }) => {
    const choiceData = choices.find((c) => c.value === choice);
    const Icon = choiceData?.icon;

    return (
      <div className="flex flex-col items-center gap-3">
        <p className="font-arcade text-sm text-muted-foreground">{label}</p>
        <div
          className={`
            w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-2 flex items-center justify-center
            transition-all duration-300
            ${choice ? (isPlayer ? "border-neon-cyan bg-neon-cyan/10 box-glow-cyan" : "border-neon-pink bg-neon-pink/10 box-glow-pink") : "border-border bg-muted/30"}
            ${!choice && isAnimating ? "animate-pulse-glow" : ""}
          `}
        >
          {Icon ? (
            <Icon className={`w-12 h-12 sm:w-16 sm:h-16 ${isPlayer ? "text-neon-cyan" : "text-neon-pink"}`} />
          ) : (
            <span className="text-3xl text-muted-foreground">?</span>
          )}
        </div>
        {choice && (
          <p className={`font-arcade text-sm ${isPlayer ? "text-neon-cyan" : "text-neon-pink"}`}>
            {choiceData?.label}
          </p>
        )}
      </div>
    );
  };

  return (
    <GameLayout title="ROCK PAPER SCISSORS" color="purple">
      <Confetti isActive={showConfetti} />

      <div className="flex flex-col items-center gap-8">
        {/* Score */}
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">You</p>
            <p className="text-3xl font-arcade font-bold text-neon-cyan">{score.player}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">CPU</p>
            <p className="text-3xl font-arcade font-bold text-neon-pink">{score.computer}</p>
          </div>
        </div>

        {/* Result Message */}
        <p className={`font-arcade text-2xl sm:text-3xl font-bold ${getResultColor()} ${result ? "animate-scale-in" : ""}`}>
          {getResultMessage()}
        </p>

        {/* Battle Arena */}
        <div className="flex items-center gap-6 sm:gap-12">
          <ChoiceDisplay choice={playerChoice} label="YOU" isPlayer />
          <span className="font-arcade text-2xl text-muted-foreground">VS</span>
          <ChoiceDisplay choice={computerChoice} label="CPU" />
        </div>

        {/* Choice Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {choices.map(({ value, icon: Icon, label }) => (
            <Button
              key={value}
              variant={playerChoice === value ? "neonCyan" : "outline"}
              size="lg"
              onClick={() => handleChoice(value)}
              disabled={isAnimating}
              className="flex-col h-auto py-4 px-6"
            >
              <Icon className="w-8 h-8 mb-2" />
              <span>{label}</span>
            </Button>
          ))}
        </div>

        {/* Reset Button */}
        <Button variant="arcade" size="lg" onClick={resetGame}>
          <RotateCcw className="w-5 h-5" />
          RESET SCORE
        </Button>
      </div>
    </GameLayout>
  );
};

export default RockPaperScissors;
