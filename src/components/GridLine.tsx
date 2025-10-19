import { Line } from "@react-three/drei";

interface GridLineProps {
  start: [number, number, number];
  end: [number, number, number];
}

export const GridLine = ({ start, end }: GridLineProps) => {
  return (
    <Line
      points={[start, end]}
      color="#f0f0f0"
      lineWidth={2}
      opacity={0.8}
      transparent
    />
  );
};
