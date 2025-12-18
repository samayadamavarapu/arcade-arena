interface ScoreBoardProps {
  score: number;
  highScore?: number;
  label?: string;
}

export const ScoreBoard = ({ score, highScore, label = "Score" }: ScoreBoardProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
      <div className="bg-card border-2 border-neon-cyan rounded-xl px-6 py-3 box-glow-cyan shadow-lg">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">{label}</p>
        <p className="text-2xl font-arcade font-bold text-neon-cyan">{score}</p>
      </div>
      
      {highScore !== undefined && (
        <div className="bg-card border-2 border-neon-yellow rounded-xl px-6 py-3 shadow-[0_4px_20px_hsl(45_95%_50%/0.35)] shadow-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">High Score</p>
          <p className="text-2xl font-arcade font-bold text-neon-yellow">{highScore}</p>
        </div>
      )}
    </div>
  );
};
