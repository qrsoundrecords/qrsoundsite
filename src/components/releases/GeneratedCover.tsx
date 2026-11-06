import { seedRandom } from "@/lib/catalog";

/**
 * QR-style generated cover, used when a release has no artwork file yet.
 * Matches the label identity: distressed paper, one saturated disc, torn
 * black geometry, mono catalog label. Deterministic per slug.
 */
export default function GeneratedCover({
  seed,
  title,
  accent,
  className = "",
  icon = true,
}: {
  seed: string;
  title: string;
  accent: string;
  className?: string;
  icon?: boolean;
}) {
  const rnd = seedRandom(seed);
  const dot = 22 + rnd() * 60; // disc position
  const dotY = 18 + rnd() * 46;
  const dotR = 26 + rnd() * 10;

  // QR-ish block pattern describing "broken geometry"
  const cells: { x: number; y: number; w: number; h: number }[] = [];
  const cx = 30 + rnd() * 30;
  for (let i = 0; i < 16; i++) {
    const w = 6 + rnd() * 16;
    const h = 6 + rnd() * 16;
    cells.push({ x: cx - w / 2 + (rnd() - 0.5) * 22, y: 34 + i * 3.4 + (rnd() - 0.5) * 6, w, h });
  }

  return (
    <div className={`relative isolate h-full w-full bg-[#e9e6e0] ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {/* disc */}
        <circle cx={dot} cy={dotY} r={dotR} fill={accent} />
        {/* broken geometry */}
        <g fill="#141412">
          {cells.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              transform={`rotate(${(rnd() - 0.5) * 8} ${c.x} ${c.y})`}
              opacity={0.9}
            />
          ))}
          {/* core tower */}
          <polygon points={`${cx - 7},88 ${cx - 3},30 ${cx + 4},32 ${cx + 8},88`} fill="#141412" />
          <polygon points={`${cx - 9},30 ${cx},${26 + rnd() * 6} ${cx + 9},31 ${cx + 7},36 ${cx - 6},37`} />
        </g>
        {/* mono frame marks */}
        <rect x="4" y="4" width="6" height="6" fill={accent} />
        <rect x="90" y="4" width="4" height="4" fill="#141412" />
        {/* grid of faint finder squares (QR hint) */}
        <g fill="#141412" opacity="0.85">
          <rect x="6" y="88" width="5" height="5" />
          <rect x="86" y="86" width="8" height="8" fill="none" stroke="#141412" strokeWidth="1" />
        </g>
      </svg>
      {icon && (
        <span
          className="mono absolute right-2 bottom-2 text-[8px] uppercase tracking-[0.2em] text-[#141412]"
        >
          {title.slice(0, 18)}
        </span>
      )}
    </div>
  );
}
