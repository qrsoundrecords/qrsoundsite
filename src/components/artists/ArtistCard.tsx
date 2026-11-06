import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { imageOrFallbackArtist } from "./imageOrFallbackArtist";
import { getArtistReleases, genreAccent } from "@/lib/catalog";
import type { Artist } from "@/data/artists";

/** Abstract generated portrait — used deliberately instead of stock faces. */
export default function ArtistCard({ artist, index = 0 }: { artist: Artist; index?: number }) {
  const count = getArtistReleases(artist.name).length;
  const accent = genreAccent(artist.genres[0] ?? "Electronic");
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/artists/${artist.slug}`} className="group block" aria-label={`Artist ${artist.name}`}>
        <div className="cover-frame relative aspect-[4/5]">
          <div className="h-full w-full saturate-[0.85] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:saturate-100">
            {imageOrFallbackArtist(artist, accent)}
          </div>
          <span className="mono absolute right-3 bottom-3 text-[10px] tracking-[0.2em] text-ink/70">
            {count.toString().padStart(2, "0")} REL
          </span>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 0 1px ${accent}66, inset 0 -40px 80px -30px ${accent}33` }}
          />
        </div>
        <div className="mt-3.5 flex items-baseline justify-between gap-2">
          <h3 className="display text-[16px] font-semibold">{artist.name}</h3>
          <span className="mono truncate text-[9px] uppercase tracking-[0.18em] text-faint">
            {artist.genres[0]}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
