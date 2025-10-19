import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

interface WinnerLineProps {
  start: [number, number, number];
  end: [number, number, number];
}

export const WinnerLine = ({ start, end }: WinnerLineProps) => {
  const [scale, setScale] = useState(1);
  const [lineWidth, setLineWidth] = useState(0);

  useFrame((state) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    setScale(pulse);
    
    // Animate line width in
    if (lineWidth < 8) {
      setLineWidth(Math.min(8, lineWidth + 0.5));
    }
  });

  return (
    <group scale={scale}>
      <Line
        points={[start, end]}
        color="#ffeb3b"
        lineWidth={lineWidth}
        opacity={lineWidth / 8}
        transparent
      />
      <Line
        points={[start, end]}
        color="#ffeb3b"
        lineWidth={12}
        opacity={0.3}
        transparent
      />
    </group>
  );
};
