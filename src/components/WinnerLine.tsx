import { Line } from "@react-three/drei";

interface WinnerLineProps {
  start: [number, number, number];
  end: [number, number, number];
}

export const WinnerLine = ({ start, end }: WinnerLineProps) => {
  return (
    <Line
      points={[start, end]}
      color="#ffeb3b"
      lineWidth={6}
      opacity={1}
      transparent={false}
    />
  );
};
