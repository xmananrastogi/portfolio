import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshWobbleMaterial, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Highly optimized GLSL Synapse Shader
const SynapseShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#00FF94'),
    uColor2: new THREE.Color('#00B8FF'),
    uResolution: new THREE.Vector2(),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex 2D noise for organic flow
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 0.2;
      
      // Create branching "synapse" effect using noise octaves
      float noise = snoise(uv * 3.0 + time);
      noise += 0.5 * snoise(uv * 6.0 - time);
      noise += 0.25 * snoise(uv * 12.0 + time * 0.5);
      
      // Threshold for sharper "lines"
      float line = smoothstep(0.4, 0.5, noise) * smoothstep(0.6, 0.5, noise);
      
      // Pulse intensity
      float pulse = sin(uTime * 2.0 - length(uv - 0.5) * 10.0) * 0.5 + 0.5;
      
      vec3 color = mix(uColor1, uColor2, uv.x);
      vec3 finalColor = color * line * (1.0 + pulse * 2.0);
      
      gl_FragColor = vec4(finalColor, line * 0.3);
    }
  `
);

extend({ SynapseShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      synapseShaderMaterial: any;
    }
  }
}

const SiliconChip = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const scroll = (window as any).lenis?.scroll || 0;
    const scrollFactor = scroll / 2000; // Normalize scroll

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2 + scrollFactor * 2;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + scrollFactor;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2 - scrollFactor * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[2.2, 0.12, 2.2]} />
          <meshPhongMaterial color="#080808" shininess={150} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.25, 0.15, 2.25]} />
          <meshStandardMaterial color="#00FF94" emissive="#00FF94" emissiveIntensity={4} wireframe wireframeLinewidth={2} />
        </mesh>
        <Sphere args={[0.45, 64, 64]} position={[0, 0.35, 0]}>
          <MeshWobbleMaterial color="#00B8FF" speed={3} factor={0.6} emissive="#00B8FF" emissiveIntensity={0.8} transparent opacity={0.9} />
        </Sphere>
      </group>
    </Float>
  );
};

const BackgroundShader = () => {
  const shaderRef = useRef<any>(null);
  const { viewport } = useThree();
  useFrame((state) => {
    if (shaderRef.current) shaderRef.current.uTime = state.clock.getElapsedTime();
  });

  return (
    <mesh scale={[viewport.width * 1.5, viewport.height * 1.5, 1]} position={[0, 0, -3]}>
      <planeGeometry />
      <synapseShaderMaterial ref={shaderRef} transparent uResolution={[viewport.width, viewport.height]} />
    </mesh>
  );
};

const MotifScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={['#050505', 8, 25]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#00FF94" />
        <pointLight position={[-10, -10, -10]} intensity={2.5} color="#00B8FF" />
        <SiliconChip />
        <BackgroundShader />
      </Canvas>
    </div>
  );
};

export default MotifScene;
