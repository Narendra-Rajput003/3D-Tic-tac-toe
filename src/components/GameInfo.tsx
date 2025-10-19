import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Player = "sphere" | "cube" | null;

interface GameInfoProps {
  currentPlayer: Player;
  winner: Player;
  isTie: boolean;
  onRestart: () => void;
  gameMode: "friend" | "computer";
  onChangeMode: () => void;
}

export const GameInfo = ({ currentPlayer, winner, isTie, onRestart, gameMode, onChangeMode }: GameInfoProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [currentPlayer, winner, isTie]);

    const getStatusText = () => {
    if (winner) {
      if (gameMode === "computer") {
        return winner === "sphere" ? "🎉 You Win!" : "🤖 Computer Wins!";
      }
      return winner === "sphere" ? "🔵 Sphere Wins!" : "🟥 Cube Wins!";
    }
    if (isTie) {
      return "🤝 It's a Tie!";
    }
    if (gameMode === "computer") {
      return currentPlayer === "sphere" ? "🔵 Your Turn" : "🤖 Computer Thinking...";
    }
    return currentPlayer === "sphere" ? "🔵 Sphere's Turn" : "🟥 Cube's Turn";
  };

  const getStatusColor = () => {
    if (winner === "sphere") return "text-primary";
    if (winner === "cube") return "text-secondary";
    if (isTie) return "text-accent";
    return currentPlayer === "sphere" ? "text-primary" : "text-secondary";
  };

    const getAnimation = () => {
    if (winner) return "animate-[bounce_0.5s_ease-in-out_3]";
    if (isTie) return "animate-[pulse_1s_ease-in-out_infinite]";
    if (gameMode === "computer" && currentPlayer === "cube") return "animate-pulse";
    return "";
  };

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-4">
      <div className={`backdrop-blur-md bg-card/80 border border-border rounded-lg px-8 py-4 shadow-xl transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h1 className={`text-3xl font-bold ${getStatusColor()} transition-colors duration-300 ${getAnimation()}`}>
          {getStatusText()}
        </h1>
      </div>
      
            {(winner || isTie) && (
        <div className="flex gap-3">
          <Button 
            onClick={onRestart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105"
          >
            Play Again
          </Button>
          <Button 
            onClick={onChangeMode}
            size="lg"
            variant="outline"
            className="font-semibold px-6 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105"
          >
            Change Mode
          </Button>
        </div>
      )}
      
      {!winner && !isTie && (
        <div className="backdrop-blur-md bg-card/60 border border-border rounded-lg px-4 py-2">
          <p className="text-xs text-muted-foreground">
            {gameMode === "computer" ? "🤖 Playing vs Computer" : "👥 Playing with Friend"}
          </p>
        </div>
      )}
    </div>
  );
};
