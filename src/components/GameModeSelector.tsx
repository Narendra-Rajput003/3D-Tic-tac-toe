import { Button } from "./ui/button";
import { Users, Cpu } from "lucide-react";

interface GameModeSelectorProps {
  onSelectMode: (mode: "friend" | "computer") => void;
}

export const GameModeSelector = ({ onSelectMode }: GameModeSelectorProps) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="backdrop-blur-md bg-card/90 border-2 border-border rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          3D Tic-Tac-Toe
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Choose your game mode
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={() => onSelectMode("friend")}
            size="lg"
            className="w-full h-20 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <Users className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            Play with Friend
          </Button>
          
          <Button
            onClick={() => onSelectMode("computer")}
            size="lg"
            className="w-full h-20 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <Cpu className="mr-3 h-6 w-6 group-hover:animate-pulse" />
            Play with Computer
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <span className="text-blue-500 font-semibold">🔵 Sphere</span> vs <span className="text-pink-500 font-semibold">🟥 Cube</span>
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Click to play • Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
    </div>
  );
};
