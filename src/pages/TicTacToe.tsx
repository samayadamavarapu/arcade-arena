import { useState, useCallback } from "react";
import { GameLayout } from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { RotateCcw, Users, Bot } from "lucide-react";

type Player = "X" | "O" | null;
type Board = Player[];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const getAIMove = (board: Board): number => {
  // Simple AI: try to win, block, or pick random
  const emptySquares = board.map((val, idx) => val === null ? idx : -1).filter(idx => idx !== -1);
  
  // Try to win
  for (const idx of emptySquares) {
    const testBoard = [...board];
    testBoard[idx] = "O";
    if (checkWinner(testBoard) === "O") return idx;
  }
  
  // Block player
  for (const idx of emptySquares) {
    const testBoard = [...board];
    testBoard[idx] = "X";
    if (checkWinner(testBoard) === "X") return idx;
  }
  
  // Take center if available
  if (board[4] === null) return 4;
  
  // Random move
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isAIMode, setIsAIMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = useCallback((index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      return;
    }

    if (isAIMode && isXNext) {
      // AI's turn
      setTimeout(() => {
        const aiMove = getAIMove(newBoard);
        if (aiMove !== undefined) {
          const aiBoard = [...newBoard];
          aiBoard[aiMove] = "O";
          setBoard(aiBoard);
          
          const aiWinner = checkWinner(aiBoard);
          if (aiWinner) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
        }
      }, 500);
    } else {
      setIsXNext(!isXNext);
    }
  }, [board, isXNext, winner, isAIMode]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowConfetti(false);
  };

  const toggleMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
  };

  const getStatusMessage = () => {
    if (winner) return `${winner} WINS!`;
    if (isDraw) return "IT'S A DRAW!";
    return `${isXNext ? "X" : "O"}'S TURN`;
  };

  return (
    <GameLayout title="TIC TAC TOE" color="pink">
      <Confetti isActive={showConfetti} />
      
      <div className="flex flex-col items-center gap-6">
        {/* Mode Toggle */}
        <div className="flex gap-3">
          <Button
            variant={!isAIMode ? "neonPink" : "outline"}
            onClick={() => { setIsAIMode(false); resetGame(); }}
          >
            <Users className="w-4 h-4" />
            2 Players
          </Button>
          <Button
            variant={isAIMode ? "neonCyan" : "outline"}
            onClick={() => { setIsAIMode(true); resetGame(); }}
          >
            <Bot className="w-4 h-4" />
            VS AI
          </Button>
        </div>

        {/* Status */}
        <div className={`
          font-arcade text-2xl font-bold
          ${winner === "X" ? "text-neon-pink text-glow-pink" : 
            winner === "O" ? "text-neon-cyan text-glow-cyan" : 
            "text-foreground"}
          ${winner || isDraw ? "animate-pulse-glow" : ""}
        `}>
          {getStatusMessage()}
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-card rounded-2xl border-2 border-border">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!square || !!winner}
              className={`
                w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-4xl sm:text-5xl font-arcade font-bold
                transition-all duration-200 ease-out
                ${square === "X" ? "text-neon-pink box-glow-pink bg-neon-pink/10" : 
                  square === "O" ? "text-neon-cyan box-glow-cyan bg-neon-cyan/10" : 
                  "text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:scale-105"}
                ${!square && !winner ? "cursor-pointer" : "cursor-default"}
                border-2 border-border
              `}
            >
              {square}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <Button variant="arcade" size="lg" onClick={resetGame}>
          <RotateCcw className="w-5 h-5" />
          RESTART
        </Button>
      </div>
    </GameLayout>
  );
};

export default TicTacToe;
