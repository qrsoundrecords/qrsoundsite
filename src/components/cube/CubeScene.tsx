import { useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import QRCube, { SECTIONS } from "./QRCube";
import type { FaceKey } from "./CubeFace";
import type { Section } from "./CubeFace";

export { SECTIONS };
export type { Section, FaceKey };
import { seedRandom } from "@/lib/catalog";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/* ------------------------------------------------------------------ */
/* Ambient satellite blocks — orbiting QR debris                       */
/* ------------------------------------------------------------------ */

function Satellites({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();

  const blocks = useMemo(() => {
    const rnd = seedRandom("qr-satellites");
    return Array.from({ length: count }, (_, i) => {
      const radius = SIZE_SAT * (1.25 + rnd() * 0.85);
      const angle = rnd() * Math.PI * 2;
      const height = (rnd() - 0.5) * SIZE_SAT * 1.6;
      return {
        size: 0.06 + rnd() * 0.16,
        radius,
        angle,
        height,
        speed: (0.15 + rnd() * 0.3) * (rnd() > 0.5 ? 1 : -1),
        tilt: rnd() * Math.PI,
        idx: i,
      };
    });
  }, [count]);

  useFrame((state) => {
    const g = group.current;
    if (!g || reduced) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = t * 0.04;
    g.children.forEach((child, i) => {
      const b = blocks[i];
      const a = b.angle + t * b.speed * 0.3;
      child.position.set(
        Math.cos(a) * b.radius,
        b.height + Math.sin(t * 0.5 + b.tilt) * 0.12,
        Math.sin(a) * b.radius,
      );
      child.rotation.x = t * 0.2 + b.tilt;
      child.rotation.y = t * 0.26 + b.tilt;
    });
  });

  return (
    <group ref={group}>
      {blocks.map((b) => (
        <mesh key={b.idx}>
          <boxGeometry args={[b.size, b.size, b.size]} />
          <meshStandardMaterial
            color="#c9ccd2"
            emissive="#7d5cff"
            emissiveIntensity={0.12}
            metalness={0.4}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

const SIZE_SAT = 3.1;

/* ------------------------------------------------------------------ */
/* Pointer tracker (normalised, for parallax)                          */
/* ------------------------------------------------------------------ */

function PointerTracker({ pointer }: { pointer: MutableRefObject<{ x: number; y: number }> }) {
  const { gl } = useThree();
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
    };
    gl.domElement.addEventListener("pointermove", move);
    return () => gl.domElement.removeEventListener("pointermove", move);
  }, [gl, pointer]);
  return null;
}

/* Pause the render loop while the tab/document is hidden. */
function useDocumentVisibility() {
  const [visible, setVisible] = useState(() => document.visibilityState !== "hidden");
  useEffect(() => {
    const on = () => setVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible;
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export default function CubeScene({
  hovered,
  setHovered,
  dragging,
  pointer,
  onNavigate,
  focusFace,
  clearFocus,
  satelliteCount = 14,
  fallback,
}: {
  hovered: FaceKey | null;
  setHovered: (f: FaceKey | null) => void;
  dragging: MutableRefObject<boolean>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  onNavigate: (section: Section) => void;
  focusFace: FaceKey | null;
  clearFocus: () => void;
  satelliteCount?: number;
  /** Rendered when WebGL is unavailable. */
  fallback?: ReactNode;
}) {
  const visible = useDocumentVisibility();

  return (
    <Canvas
      className="!absolute inset-0"
      style={{ touchAction: "none" }}
      camera={{ fov: 32, position: [0, 0.4, SIZE_SAT * 2.45] }}
      dpr={[1, 1.8]}
      frameloop={visible ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      {fallback}
      <PointerTracker pointer={pointer} />
      <Lights />
      <QRCube
        hovered={hovered}
        setHovered={setHovered}
        dragging={dragging}
        pointer={pointer}
        onNavigate={onNavigate}
        focusFace={focusFace}
        clearFocus={clearFocus}
      />
      <Satellites count={satelliteCount} />
    </Canvas>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* key */}
      <directionalLight position={[4, 5, 5]} intensity={0.9} color="#ffffff" />
      {/* genre accents */}
      <pointLight position={[-4.5, 1.4, 2.5]} intensity={26} color="#7d5cff" distance={12} />
      <pointLight position={[4.5, -1.2, 2.2]} intensity={22} color="#ff2d8f" distance={12} />
      <pointLight position={[0, 4.4, -1]} intensity={14} color="#ff2b3a" distance={12} />
      {/* under-glow */}
      <pointLight position={[0, -4.2, 1.4]} intensity={10} color="#64e3ff" distance={10} />
    </>
  );
}
