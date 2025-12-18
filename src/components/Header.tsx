import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Home } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Gamepad2
              className="w-8 h-8 text-neon-pink group-hover:text-neon-cyan transition-colors duration-300"
              strokeWidth={2.5}
            />
            <div className="absolute inset-0 bg-neon-pink/30 blur-lg group-hover:bg-neon-cyan/30 transition-colors duration-300" />
          </div>
          <span className="font-arcade text-xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
            GAME OF GAMES
          </span>
        </Link>

        {!isHome && (
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};
