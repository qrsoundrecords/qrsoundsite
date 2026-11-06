import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import CubeFace, { SECTIONS, SIZE, type Section } from "./CubeFace";
import type { FaceKey } from "./CubeFace";

export { SECTIONS };
export type { Section } from "./CubeFace";
import { siteConfig } from "@/data/siteConfig";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/** Euler targets that bring each face toward the camera (accumulated, X-first). */
const FACE_TARGET: Record<FaceKey, [number, number]> = {
  front: [0, 0],
  right: [0, -Math.PI / 2],
  back: [0, Math.PI],
  left: [0, Math.PI / 2],
  top: [Math.PI / 2, 0],
  bottom: [-Math.PI / 2, 0],
};

interface Props {
  hovered: FaceKey | null;
  setHovered: (f: FaceKey | null) => void;
  onNavigate: (section: Section) => void;
  /** Set while the user is dragging on the wrapper element. */
  dragging: MutableRefObject<boolean>;
  /** Normalised pointer offset (-1..1) for parallax. */
  pointer: MutableRefObject<{ x: number; y: number }>;
  focusFace: FaceKey | null;
  clearFocus: () => void;
}

export default function QRCube({
  hovered,
  setHovered,
  onNavigate,
  dragging,
  pointer,
  focusFace,
  clearFocus,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const reduced = usePrefersReducedMotion();

  /* accumulated rotation state */
  const rot = useRef({ x: 0.52, y: -0.65 });
  const velocity = useRef({ x: 0, y: 0.0 });
  const focus = useRef<FaceKey | null>(null);
  const settledTimer = useRef(0);
  const [flash, setFlash] = useState<Section | null>(null);

  const baseSpeed = useMemo(() => siteConfig.cube.rotationSpeed, []);
  const cubeBoxGeometry = useMemo(
    () => new THREE.BoxGeometry(SIZE * 1.001, SIZE * 1.001, SIZE * 1.001),
    [],
  );
  const { gl } = useThree();

  /* user-driven inertia from wrapper drag events */
  useEffect(() => {
    const el = gl.domElement;
    let last: { x: number; y: number } | null = null;

    const down = (e: PointerEvent) => {
      dragging.current = true;
      last = { x: e.clientX, y: e.clientY };
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current || !last) return;
      const dx = (e.clientX - last.x) / el.clientWidth;
      const dy = (e.clientY - last.y) / el.clientHeight;
      velocity.current.y = dx * 2.6;
      velocity.current.x = dy * 1.8;
      rot.current.y += dx * 2.6;
      rot.current.x += dy * 1.8;
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      dragging.current = false;
      last = null;
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl, dragging]);

  /* external focus request (keyboard/cube nav buttons) */
  useEffect(() => {
    if (!focusFace) return;
    focus.current = focusFace;
    settledTimer.current = 0;
  }, [focusFace]);

  useFrame((state, dtRaw) => {
    const group0 = group.current;
    if (!group0) return;
    const dt = Math.min(dtRaw, 0.05);

    /* --- focus transitions --- */
    if (focus.current) {
      const [tx, tyRaw] = FACE_TARGET[focus.current];
      // choose the representation of ty closest to current rotation
      const TWO = Math.PI * 2;
      const norm = (target: number, from: number) => {
        let t = from + ((target - from) % TWO);
        if (t > Math.PI + from) t -= TWO;
        if (t < -Math.PI + from) t += TWO;
        return t;
      };
      const ty = norm(tyRaw, rot.current.y);

      rot.current.x += (tx - rot.current.x) * Math.min(1, dt * 4.5);
      rot.current.y += (ty - rot.current.y) * Math.min(1, dt * 4.5);

      settledTimer.current += dt;
      const near = Math.abs(rot.current.x - tx) < 0.02 && Math.abs(rot.current.y - ty) < 0.02;
      if (near || settledTimer.current > 1.6) {
        const section = SECTIONS.find((s) => s.face === focus.current);
        if (section) {
          setFlash(section);
          onNavigate(section);
        }
        focus.current = null;
        settledTimer.current = 0;
        clearFocus();
      }
      group0.rotation.x = rot.current.x;
      group0.rotation.y = rot.current.y;
      applyFloat(group0, state, 1);
      return;
    }

    /* --- auto rotate + inertia + cursor reaction --- */
    if (!reduced) {
      if (!hovered && !dragging.current) {
        velocity.current.y += (baseSpeed * dt - velocity.current.y) * 0.06;
        velocity.current.x += -velocity.current.x * 0.06;
      } else {
        velocity.current.x *= 0.92;
        velocity.current.y *= 0.92;
      }
      rot.current.y += velocity.current.y;
      rot.current.x += velocity.current.x;
      rot.current.x = THREE.MathUtils.clamp(rot.current.x, -Math.PI * 0.75, Math.PI * 0.75);
    }

    /* cursor parallax tilt */
    const px = pointer.current.x;
    const py = pointer.current.y;
    group0.rotation.x = rot.current.x * (hovered ? 0.995 : 1) + py * 0.06 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    group0.rotation.y = rot.current.y + px * 0.1 + Math.sin(state.clock.elapsedTime * 0.27) * 0.03;
    applyFloat(group0, state, hovered ? 0.3 : 1);
    void halo.current;
  });

  const applyFloat = (g: THREE.Group, state: { clock: THREE.Clock }, amp: number) => {
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.09 * amp;
  };

  return (
    <group ref={group}>
      {/* inner core glow */}
      <mesh>
        <sphereGeometry args={[SIZE * 0.18, 16, 16]} />
        <meshBasicMaterial color={flash?.color ?? "#7d5cff"} transparent opacity={flash ? 0.75 : 0.4} />
      </mesh>

      {/* skeleton edges */}
      <lineSegments>
        <edgesGeometry args={[cubeBoxGeometry]} />
        <lineBasicMaterial
          color={hovered ? "#ffffff" : "#3a3a44"}
          transparent
          opacity={hovered ? 0.85 : 0.5}
        />
      </lineSegments>

      {/* the six interactive faces */}
      {SECTIONS.map((section, i) => (
        <CubeFace
          key={section.face}
          section={section}
          faceIndex={i}
          hovered={hovered === section.face || flash?.face === section.face}
          onHover={setHovered}
          onSelect={(s) => {
            focus.current = s.face;
            settledTimer.current = 0;
          }}
        />
      ))}

      {/* cursor halo ring */}
      <mesh ref={halo} rotation={[0.45, 0.72, 0]}>
        <torusGeometry args={[SIZE * 0.92, 0.0045, 8, 120]} />
        <meshBasicMaterial
          color={hovered ? hoveredColorOf(hovered) : "#8a8a95"}
          transparent
          opacity={hovered ? 0.85 : 0.3}
        />
      </mesh>
    </group>
  );
}

function hoveredColorOf(face: FaceKey | null): string {
  return SECTIONS.find((s) => s.face === face)?.color ?? "#b9bcc4";
}
