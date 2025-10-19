import { useRef } from "react";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

interface SphereMeshProps {
  position: [number, number, number];
  isWinner?: boolean;
  isTie?: boolean;
}

export const SphereMesh = ({ position, isWinner = false, isTie = false }: SphereMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const springs = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 200, friction: 20 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      if (isWinner) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
        meshRef.current.scale.setScalar(pulse);
      } else if (isTie) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
        meshRef.current.scale.setScalar(pulse);
      }
    }
  });

  const emissiveIntensity = isWinner ? 0.8 : isTie ? 0.5 : 0.3;

  return (
    <animated.mesh ref={meshRef} position={position} scale={springs.scale}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial 
        color="#00d9ff" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#00d9ff"
        emissiveIntensity={emissiveIntensity}
      />
    </animated.mesh>
  );
};
