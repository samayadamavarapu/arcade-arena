import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TicTacToe from "./pages/TicTacToe";
import SnakeGame from "./pages/SnakeGame";
import RockPaperScissors from "./pages/RockPaperScissors";
import MemoryMatch from "./pages/MemoryMatch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/memory-match" element={<MemoryMatch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
