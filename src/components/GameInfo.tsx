import { Button } from "./ui/button";

type Player = "sphere" | "cube" | null;

interface GameInfoProps {
  currentPlayer: Player;
  winner: Player;
  isTie: boolean;
  onRestart: () => void;
}

export const GameInfo = ({ currentPlayer, winner, isTie, onRestart }: GameInfoProps) => {
  const getStatusText = () => {
    if (winner) {
      return winner === "sphere" ? "🔵 Sphere Wins!" : "🟥 Cube Wins!";
    }
    if (isTie) {
      return "🤝 It's a Tie!";
    }
    return currentPlayer === "sphere" ? "🔵 Sphere's Turn" : "🟥 Cube's Turn";
  };

  const getStatusColor = () => {
    if (winner === "sphere") return "text-primary";
    if (winner === "cube") return "text-secondary";
    if (isTie) return "text-accent";
    return currentPlayer === "sphere" ? "text-primary" : "text-secondary";
  };

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-4">
      <div className="backdrop-blur-md bg-card/80 border border-border rounded-lg px-8 py-4 shadow-xl">
        <h1 className={`text-3xl font-bold ${getStatusColor()} transition-colors duration-300`}>
          {getStatusText()}
        </h1>
      </div>
      
      {(winner || isTie) && (
        <Button 
          onClick={onRestart}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Play Again
        </Button>
      )}
    </div>
  );
};
