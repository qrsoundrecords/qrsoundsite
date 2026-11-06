import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type MutableRefObject,
} from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { SECTIONS, type Section } from "./QRCube";
import type { FaceKey } from "./CubeFace";

export type { Section };
import FallbackCube from "./FallbackCube";

const CubeScene = lazy(() => import("./CubeScene"));

type SceneProps = {
  hovered: FaceKey | null;
  setHovered: (f: FaceKey | null) => void;
  dragging: MutableRefObject<boolean>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  onNavigate: (section: Section) => void;
  focusFace: FaceKey | null;
  clearFocus: () => void;
  satelliteCount: number;
};

const LazyCubeScene = CubeScene as unknown as ComponentType<SceneProps>;

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const ROUTES: Record<Section["name"], string> = {
  Home: "/",
  Releases: "/releases",
  Artists: "/artists",
  About: "/about",
  Contact: "/contact",
  Search: "/search",
};

/**
 * Hero cube integration layer: WebGL detection, drag/hover state, cursor
 * label and routing on face select. The header menu always remains a
 * parallel, fully accessible navigation path.
 */
export default function CubeNavigation({
  reducedMotion = false,
  satellites = 14,
}: {
  reducedMotion?: boolean;
  satellites?: number;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<FaceKey | null>(null);
  const [focusedFace, setFocusedFace] = useState<FaceKey | null>(null);
  const [hasWebGL] = useState(webglAvailable);
  const dragging = useRef(false);
  const pointer = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState<{ x: number; y: number; section: Section } | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const setHover = useCallback((face: FaceKey | null) => setHovered(face), []);

  /* DOM label follows cursor while a face is hovered (desktop only) */
  useEffect(() => {
    if (!hovered) {
      setLabel(null);
      return;
    }
    const section = SECTIONS.find((s) => s.face === hovered);
    if (!section) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setLabel({ x: e.clientX, y: e.clientY, section });
    };
    const el = wrapper.current;
    el?.addEventListener("pointermove", move);
    return () => el?.removeEventListener("pointermove", move);
  }, [hovered]);

  const go = useCallback(
    (section: { name: Section["name"] }) => navigate(ROUTES[section.name] ?? "/"),
    [navigate],
  );

  return (
    <div
      ref={wrapper}
      className="relative h-full w-full select-none"
      aria-label="Interactive QR cube navigation"
    >
      {hasWebGL ? (
        <Suspense
          fallback={
            <div className="absolute inset-0 grid place-items-center text-faint" aria-hidden>
              <Loader2 className="motion-safe:animate-spin" size={20} strokeWidth={1.5} />
            </div>
          }
        >
          <LazyCubeScene
            hovered={hovered}
            setHovered={setHover}
            dragging={dragging}
            pointer={pointer}
            onNavigate={go}
            focusFace={focusedFace}
            clearFocus={() => setFocusedFace(null)}
            satelliteCount={reducedMotion ? 6 : satellites}
          />
        </Suspense>
      ) : (
        <FallbackCube onNavigate={go} />
      )}

      {/* cursor label */}
      {label && (
        <div
          className="pointer-events-none fixed z-40 hidden md:block"
          style={{ left: label.x + 18, top: label.y + 18 }}
          aria-hidden
        >
          <div
            className="border bg-bg/90 px-3 py-2 backdrop-blur-sm"
            style={{ borderColor: label.section.color }}
          >
            <p
              className="display text-sm font-semibold uppercase tracking-wide"
              style={{ color: label.section.color }}
            >
              {label.section.name}
            </p>
            <p className="mono text-[9px] uppercase tracking-[0.22em] text-faint">{label.section.hint}</p>
          </div>
        </div>
      )}
    </div>
  );
}
