import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { imageOrFallback } from "./imageOrFallback";
import type { Release } from "@/data/releases";
import { primaryAccent, formatDate } from "@/lib/catalog";

export default function ReleaseCard({ release, index = 0 }: { release: Release; index?: number }) {
  const accent = primaryAccent(release);
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/releases/${release.slug}`}
        className="group block focus-visible:outline-offset-4"
        aria-label={`${release.title} by ${release.artists.join(", ")} — open release`}
      >
        <div className="cover-frame relative aspect-square">
          {/* artwork */}
          <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            {imageOrFallback(release, accent)}
          </div>
          {/* scanline accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(60% 60% at 50% 40%, ${accent}22 0%, transparent 100%), inset 0 0 0 1px ${accent}55`,
            }}
          />
          {/* status chip */}
          <span className={`chip absolute top-3 left-3 ${release.status === "upcoming" ? "chip-up" : "chip-out"}`}>
            {release.status === "upcoming" ? "UPCOMING" : "OUT NOW"}
          </span>
          {/* catalog number */}
          <span className="mono absolute top-3 right-3 text-[10px] tracking-[0.18em] text-ink/80">
            {release.catalogNumber}
          </span>
        </div>

        {/* meta */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="display text-[17px] font-semibold leading-tight transition-colors group-hover:text-ink">
              {release.title}
            </h3>
            <span
              className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
              style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
          </div>
          <p className="text-[13px] text-mute">{release.artists.join(", ")}</p>
          <p className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {release.genres[0]} · {formatDate(release.releaseDate)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
