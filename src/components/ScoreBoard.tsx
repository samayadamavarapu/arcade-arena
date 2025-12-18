interface ScoreBoardProps {
  score: number;
  highScore?: number;
  label?: string;
}

export const ScoreBoard = ({ score, highScore, label = "Score" }: ScoreBoardProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
      <div className="bg-card border border-neon-cyan/50 rounded-xl px-6 py-3 box-glow-cyan">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">{label}</p>
        <p className="text-2xl font-arcade font-bold text-neon-cyan">{score}</p>
      </div>
      
      {highScore !== undefined && (
        <div className="bg-card border border-neon-yellow/50 rounded-xl px-6 py-3 shadow-[0_0_20px_hsl(50_100%_55%/0.3)]">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-arcade">High Score</p>
          <p className="text-2xl font-arcade font-bold text-neon-yellow">{highScore}</p>
        </div>
      )}
    </div>
  );
};
