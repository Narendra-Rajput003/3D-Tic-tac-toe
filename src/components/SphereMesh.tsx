import { useRef } from "react";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

interface SphereMeshProps {
  position: [number, number, number];
}

export const SphereMesh = ({ position }: SphereMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const springs = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={springs.scale}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial 
        color="#00d9ff" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#00d9ff"
        emissiveIntensity={0.3}
      />
    </animated.mesh>
  );
};
