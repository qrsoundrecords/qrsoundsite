import { Link } from "react-router-dom";
import { SECTIONS } from "./QRCube";

const ROUTES: Record<string, string> = {
  Home: "/",
  Releases: "/releases",
  Artists: "/artists",
  About: "/about",
  Contact: "/contact",
  Search: "/search",
};

/**
 * Pure-CSS flat "unfolded cube" — used when WebGL is unavailable or on
 * very low-power devices. Fully keyboard accessible.
 */
export default function FallbackCube({
  onNavigate,
}: {
  onNavigate?: (s: { name: string }) => void;
}) {
  return (
    <div className="grid h-full w-full place-items-center px-6">
      <div className="grid w-full max-w-[380px] grid-cols-3 grid-rows-3">
        {SECTIONS.map((s) => (
          <Link
              key={s.face}
              to={ROUTES[s.name] ?? "/"}
              onClick={() => onNavigate?.(s)}
              className="group relative m-[3px] flex aspect-square flex-col items-center justify-center border border-line bg-bg2 text-center"
              style={{ borderColor: `${s.color}55` }}
            >
              {/* QR motif dots */}
              <span className="absolute top-2 left-2 h-1.5 w-1.5" style={{ background: s.color }} />
              <span className="absolute right-2 bottom-2 h-2 w-2 border" style={{ borderColor: s.color }} />
              <span
                className="display text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
                style={{ color: s.color }}
              >
                {s.name.toUpperCase()}
              </span>
              <span className="mono mt-1 text-[8px] uppercase tracking-[0.24em] text-faint">{s.hint}</span>
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(70% 70% at 50% 50%, ${s.color}18, transparent)` }}
              />
          </Link>
        ))}
      </div>
    </div>
  );
}
