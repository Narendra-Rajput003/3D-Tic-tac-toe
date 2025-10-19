import { useRef } from "react";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

interface CubeMeshProps {
  position: [number, number, number];
}

export const CubeMesh = ({ position }: CubeMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const springs = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.mesh 
      ref={meshRef} 
      position={position} 
      scale={springs.scale}
      rotation={[0.2, 0.2, 0]}
    >
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial 
        color="#ff006e" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#ff006e"
        emissiveIntensity={0.3}
      />
    </animated.mesh>
  );
};
