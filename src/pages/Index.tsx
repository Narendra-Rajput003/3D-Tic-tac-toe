import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GameBoard } from "@/components/GameBoard";
import { GameInfo } from "@/components/GameInfo";

type Player = "sphere" | "cube" | null;

const Index = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("sphere");
  const [winner, setWinner] = useState<Player>(null);
  const [isTie, setIsTie] = useState(false);

  const handleGameStateChange = (gameWinner: Player, tie: boolean, player: Player) => {
    setWinner(gameWinner);
    setIsTie(tie);
    setCurrentPlayer(player);
  };

  const handleRestart = () => {
    if ((window as any).resetTicTacToe) {
      (window as any).resetTicTacToe();
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <GameInfo 
        currentPlayer={currentPlayer}
        winner={winner}
        isTie={isTie}
        onRestart={handleRestart}
      />
      
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00d9ff" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#ff006e" />
        
        <GameBoard onGameStateChange={handleGameStateChange} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        
        <Environment preset="night" />
      </Canvas>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="backdrop-blur-md bg-card/60 border border-border rounded-lg px-6 py-3">
          <p className="text-sm text-muted-foreground">
            🖱️ Click to play • Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
