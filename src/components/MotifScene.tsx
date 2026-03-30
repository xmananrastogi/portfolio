import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const OrganicPulse = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00FF94"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive="#00FF94"
          emissiveIntensity={0.5}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const NeuralCircuit = () => {
  const lines = useMemo(() => {
    const tempLines = [];
    for (let i = 0; i < 40; i++) {
      const points = [];
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      points.push(start);
      points.push(
        new THREE.Vector3(
          start.x + (Math.random() - 0.5) * 2,
          start.y + (Math.random() - 0.5) * 2,
          start.z + (Math.random() - 0.5) * 2
        )
      );
      tempLines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return tempLines;
  }, []);

  return (
    <group>
      {lines.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#00B8FF", opacity: 0.2, transparent: true }))} />
      ))}
    </group>
  );
};

const MotifScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FF94" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00B8FF" />
        <OrganicPulse />
        <NeuralCircuit />
      </Canvas>
    </div>
  );
};

export default MotifScene;
