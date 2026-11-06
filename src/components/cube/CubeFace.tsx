import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { facePattern, cellPosition } from "./pattern";

export type FaceKey = "front" | "right" | "back" | "left" | "top" | "bottom";

export interface Section {
  face: FaceKey;
  name: string;
  color: string;
  hint: string;
}

export const SECTIONS: Section[] = [
  { face: "front", name: "Home", color: "#b9bcc4", hint: "Enter" },
  { face: "right", name: "Releases", color: "#7d5cff", hint: "Catalogue" },
  { face: "back", name: "About", color: "#ff2b3a", hint: "Vision" },
  { face: "left", name: "Artists", color: "#ff2d8f", hint: "Roster" },
  { face: "top", name: "Contact", color: "#f2f0ec", hint: "Demo" },
  { face: "bottom", name: "Search", color: "#64e3ff", hint: "⌘K" },
];

export const SIZE = 3.1;
const N = 13;

const FACE_DEFS: Record<FaceKey, { rotation: [number, number, number] }> = {
  front: { rotation: [0, 0, 0] },
  right: { rotation: [0, Math.PI / 2, 0] },
  back: { rotation: [0, Math.PI, 0] },
  left: { rotation: [0, -Math.PI / 2, 0] },
  top: { rotation: [-Math.PI / 2, 0, 0] },
  bottom: { rotation: [Math.PI / 2, 0, 0] },
};

const HOVER_WHITE = new THREE.Color("#ffffff");

/* ------------------------------------------------------------------ */
/* One face: dark glass plane + instanced raised QR blocks             */
/* ------------------------------------------------------------------ */

function CubeFace({
  section,
  faceIndex,
  hovered,
  onHover,
  onSelect,
}: {
  section: Section;
  faceIndex: number;
  hovered: boolean;
  onHover: (face: FaceKey | null) => void;
  onSelect: (section: Section) => void;
}) {
  const def = FACE_DEFS[section.face];
  const pattern = useMemo(() => facePattern(faceIndex, N), [faceIndex]);
  const instanced = useRef<THREE.InstancedMesh | null>(null);

  const blockColor = useMemo(() => new THREE.Color(section.color), [section.color]);

  const setup = (mesh: THREE.InstancedMesh | null) => {
    instanced.current = mesh;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    pattern.cells.forEach((cell, i) => {
      const [x, y] = cellPosition(cell, N, SIZE * 0.94);
      const depth = ((cell.col * 7 + cell.row * 13 + faceIndex * 29) % 3) * 0.035 + 0.045;
      m.makeTranslation(x, y, depth);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  useFrame(() => {
    const mesh = instanced.current;
    if (!mesh) return;
    const material = mesh.material as THREE.MeshStandardMaterial;
    // luminous breath on hover
    const target = hovered ? 0.9 : 0.22;
    material.emissiveIntensity += (target - material.emissiveIntensity) * 0.12;
  });

  return (
    <group rotation={def.rotation}>
      <group position={[0, 0, SIZE / 2]}>
        {/* face base — dark glass */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(section.face);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onHover(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(section);
          }}
        >
          <planeGeometry args={[SIZE * 0.94, SIZE * 0.94]} />
          <meshStandardMaterial color="#0d0d11" metalness={0.6} roughness={0.28} />
        </mesh>

        {/* raised QR blocks */}
        <instancedMesh
          ref={setup}
          args={[undefined, undefined, Math.max(pattern.cells.length, 1)]}
        >
          <boxGeometry args={[(SIZE / N) * 0.82, (SIZE / N) * 0.82, 1]} />
          <meshStandardMaterial
            color={blockColor}
            emissive={hovered ? HOVER_WHITE : blockColor}
            emissiveIntensity={0.22}
            metalness={0.35}
            roughness={0.35}
          />
        </instancedMesh>

        {/* QR finder patterns in three corners */}
        {pattern.finders.map((f, fi) => {
          const [x, y] = cellPosition(f, N, SIZE * 0.94);
          const s = (SIZE * 0.94) / N;
          const base = hovered ? "#ffffff" : section.color;
          return (
            <group key={fi} position={[x, y, 0.012]}>
              <mesh position={[0, 0, 0.002]}>
                <planeGeometry args={[s * 6, s * 6]} />
                <meshBasicMaterial color={base} transparent opacity={hovered ? 0.95 : 0.7} />
              </mesh>
              <mesh position={[0, 0, 0.004]}>
                <planeGeometry args={[s * 4, s * 4]} />
                <meshBasicMaterial color="#0d0d11" />
              </mesh>
              <mesh position={[0, 0, 0.006]}>
                <planeGeometry args={[s * 2, s * 2]} />
                <meshBasicMaterial color={base} />
              </mesh>
            </group>
          );
        })}

        {/* glowing diamond contour */}
        <mesh position={[0, 0, 0.008]} rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[SIZE * 0.46, SIZE * 0.466, 4, 1]} />
          <meshBasicMaterial color={section.color} transparent opacity={hovered ? 1 : 0.25} />
        </mesh>
      </group>
    </group>
  );
}

export default CubeFace;
