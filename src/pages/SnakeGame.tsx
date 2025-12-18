import { useState, useEffect, useCallback, useRef } from "react";
import { GameLayout } from "@/components/GameLayout";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { Play, Pause, RotateCcw } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>(getRandomPosition);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snake-high-score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [showConfetti, setShowConfetti] = useState(false);

  const directionRef = useRef(direction);
  const gameLoopRef = useRef<number>();

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case "UP": newHead.y -= 1; break;
        case "DOWN": newHead.y += 1; break;
        case "LEFT": newHead.x -= 1; break;
        case "RIGHT": newHead.x += 1; break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setIsGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("snake-high-score", newScore.toString());
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        setFood(getRandomPosition());
        setSpeed((prev) => Math.max(prev - SPEED_INCREMENT, 50));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, score, highScore]);

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, speed, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (directionRef.current !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (directionRef.current !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (directionRef.current !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (directionRef.current !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(getRandomPosition());
    setDirection("RIGHT");
    setIsPlaying(false);
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setShowConfetti(false);
  };

  const togglePlay = () => {
    if (isGameOver) {
      resetGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <GameLayout title="SNAKE" color="green">
      <Confetti isActive={showConfetti} />
      
      <div className="flex flex-col items-center gap-6">
        <ScoreBoard score={score} highScore={highScore} />

        {/* Game Board */}
        <div
          className="relative bg-card rounded-2xl border-2 border-neon-green box-glow-green overflow-hidden shadow-lg"
          style={{
            width: GRID_SIZE * CELL_SIZE + 4,
            height: GRID_SIZE * CELL_SIZE + 4,
          }}
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--neon-green)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-green)) 1px, transparent 1px)",
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
            }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-sm transition-all duration-75 ${
                index === 0 ? "bg-neon-green box-glow-green" : "bg-neon-green/70"
              }`}
              style={{
                left: segment.x * CELL_SIZE + 2,
                top: segment.y * CELL_SIZE + 2,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-neon-pink rounded-full animate-pulse-glow box-glow-pink"
            style={{
              left: food.x * CELL_SIZE + 2,
              top: food.y * CELL_SIZE + 2,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />

          {/* Game Over Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <p className="font-arcade text-3xl font-bold text-neon-pink text-glow-pink mb-2">
                  GAME OVER
                </p>
                <p className="font-arcade text-neon-cyan">Score: {score}</p>
              </div>
            </div>
          )}

          {/* Start Overlay */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
              <p className="font-arcade text-xl text-neon-green text-glow-green animate-pulse-glow">
                PRESS PLAY
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button variant="neonGreen" size="lg" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? "PAUSE" : isGameOver ? "TRY AGAIN" : "PLAY"}
          </Button>
          <Button variant="outline" size="lg" onClick={resetGame}>
            <RotateCcw className="w-5 h-5" />
            RESET
          </Button>
        </div>

        {/* Instructions */}
        <p className="text-muted-foreground text-sm text-center">
          Use <span className="font-arcade text-neon-green">WASD</span> or <span className="font-arcade text-neon-green">Arrow Keys</span> to move
        </p>

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 sm:hidden mt-4">
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => direction !== "DOWN" && setDirection("UP")}
            disabled={!isPlaying}
          >
            ↑
          </Button>
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => direction !== "RIGHT" && setDirection("LEFT")}
            disabled={!isPlaying}
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => direction !== "UP" && setDirection("DOWN")}
            disabled={!isPlaying}
          >
            ↓
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => direction !== "LEFT" && setDirection("RIGHT")}
            disabled={!isPlaying}
          >
            →
          </Button>
        </div>
      </div>
    </GameLayout>
  );
};

export default SnakeGame;
