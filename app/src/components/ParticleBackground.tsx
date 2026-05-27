import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = typeof window !== 'undefined' && 'ontouchstart' in window ? 500 : 1500;
const SPHERE_RADIUS = 80;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * SPHERE_RADIUS;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i] = 0.02 + Math.random() * 0.03;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.userData = { velocities: vel };
    return geo;
  }, []);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = meshRef.current.geometry.userData.velocities as Float32Array;
    const isTouchDevice = 'ontouchstart' in window;

    // Camera parallax
    if (!isTouchDevice) {
      camera.position.x += (mouseRef.current.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      // Upward drift
      posArray[idx + 1] += velocities[i];

      // Wrap around
      if (posArray[idx + 1] > 40) {
        posArray[idx + 1] = -40;
      }

      // Mouse repulsion
      if (!isTouchDevice) {
        const mouseX = mouseRef.current.x * 40;
        const mouseY = mouseRef.current.y * 40;
        const dx = posArray[idx] - mouseX;
        const dy = posArray[idx + 1] - mouseY;
        const dz = posArray[idx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 30 && dist > 0.1) {
          const force = (1 - dist / 30) * 0.5;
          posArray[idx] += (dx / dist) * force;
          posArray[idx + 1] += (dy / dist) * force;
        }
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        color="#22D3EE"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ opacity: 0 }}
      id="particle-canvas"
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
