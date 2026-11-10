import { seedRandom } from "@/lib/catalog";
import { asset } from "@/lib/asset";

/** Artist visual: real portrait when present, else an abstract QR-tower visual. */
export function imageOrFallbackArtist(artist: { id: string; slug: string; name: string; image?: string }, accent: string) {
  if (artist.image) {
    return <img src={asset(artist.image)} alt={`${artist.name} portrait`} loading="lazy" className="h-full w-full object-cover" />;
  }
  return (
    <div className="flex h-full w-full items-end justify-center overflow-hidden bg-[#0e0e12]">
      <GeneratedVisual slug={artist.slug} name={artist.name} accent={accent} />
    </div>
  );
}

function GeneratedVisual({ slug, name, accent }: { slug: string; name: string; accent: string }) {
  const rnd = seedRandom("artist-" + slug + name);
  const dot = 50 + (rnd() - 0.5) * 30;
  const dotY = 40 + (rnd() - 0.5) * 20;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" className="h-full w-full" aria-hidden>
      <circle cx={dot} cy={dotY} r={22} fill={accent} opacity={0.85} />
      <g fill="#1a1a1e">
        {/* tower silhouette */}
        <rect x="42" y="55" width="16" height="60" />
        <rect x="38" y="82" width="24" height="30" opacity="0.8" />
        <rect x="47" y="30" width="6" height="28" opacity="0.9" />
        {/* qr cells */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={20 + rnd() * 60}
            y={20 + rnd() * 70}
            width={3 + rnd() * 7}
            height={3 + rnd() * 7}
            opacity={0.55 + rnd() * 0.4}
          />
        ))}
      </g>
      <g stroke={accent} strokeWidth="0.5" opacity="0.6">
        <line x1="0" y1="88" x2="100" y2="88" />
        <line x1="12" y1="0" x2="12" y2="100" />
      </g>
    </svg>
  );
}
