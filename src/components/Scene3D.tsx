import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  geometry: 'icosahedron' | 'torus' | 'octahedron';
}

function FloatingShape({ position, scale, color, speed, geometry }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[1, 0.35, 12, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.12}
          wireframe
          distort={0.25}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />

      <FloatingShape
        position={[-4, 1.5, -3]}
        scale={1.8}
        color="#38BDF8"
        speed={1.2}
        geometry="icosahedron"
      />
      <FloatingShape
        position={[3.5, -1.5, -4]}
        scale={2.2}
        color="#F5B84B"
        speed={0.8}
        geometry="torus"
      />
      <FloatingShape
        position={[0.5, 2.5, -5]}
        scale={1.3}
        color="#2DD37F"
        speed={1.4}
        geometry="octahedron"
      />
      <FloatingShape
        position={[-2, -2, -6]}
        scale={1.0}
        color="#F87171"
        speed={1.0}
        geometry="icosahedron"
      />

      <Stars
        radius={60}
        depth={50}
        count={600}
        factor={2}
        saturation={0}
        fade
        speed={0.4}
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
