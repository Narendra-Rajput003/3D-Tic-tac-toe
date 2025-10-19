import { useEffect, useState } from "react";

interface ConfettiProps {
  winner: "sphere" | "cube" | null;
}

export const Confetti = ({ winner }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (winner) {
      const colors = winner === "sphere" 
        ? ["#00d9ff", "#0099ff", "#66e0ff", "#00ffff"]
        : ["#ff006e", "#ff3399", "#ff66aa", "#ff0055"];
      
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  if (!winner || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-[fall_3s_ease-in_forwards]"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
