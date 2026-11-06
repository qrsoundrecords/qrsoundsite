import { Navigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getArtist, getArtistReleases, genreAccent } from "@/lib/catalog";
import { imageOrFallbackArtist } from "@/components/artists/imageOrFallbackArtist";
import ReleaseCard from "@/components/releases/ReleaseCard";
import { PLATFORM_LABELS } from "@/data/siteConfig";

export default function ArtistDetails() {
  const { slug } = useParams();
  const artist = slug ? getArtist(slug) : undefined;
  usePageMeta(artist ? artist.name : "artist");

  if (!artist) return <Navigate to="/artists" replace />;

  const accent = genreAccent(artist.genres[0] ?? "Electronic");
  const rels = getArtistReleases(artist.name);
  const links = Object.entries(artist.links).filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <article className="mx-auto max-w-[1500px] px-5 pt-24 pb-28 md:px-10 md:pt-32">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/artists" className="mono group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink">
          <ArrowLeft size={13} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
          All artists
        </Link>
        <p className="mono text-[11px] uppercase tracking-[0.2em] text-faint">
          {rels.length.toString().padStart(2, "0")} releases
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(300px,0.9fr)_1.2fr] lg:gap-16">
        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="cover-frame relative aspect-[4/5]" style={{ boxShadow: `0 0 90px -20px ${accent}44` }}>
            <div className="h-full w-full">{imageOrFallbackArtist(artist, accent)}</div>
            <span className="mono absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.2em] text-ink/60">
              QR SOUND · VISUAL ID FILE
            </span>
          </div>
        </motion.div>

        {/* info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
              ● QR Sound Records artist
            </p>
            <h1 className="stencil mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-none">{artist.name}</h1>

            <div className="mono mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-mute">
              {artist.genres.map((g) => (
                <span key={g} className="border border-line px-2.5 py-1">
                  {g}
                </span>
              ))}
              {artist.location && <span className="text-faint">{artist.location}</span>}
            </div>

            <p className="mt-8 max-w-[640px] text-[15px] leading-relaxed text-mute">{artist.bio}</p>

            {links.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {links.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="mono group flex items-center gap-2 border border-line px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
                    >
                      {PLATFORM_LABELS[key] ?? key}
                      <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* releases */}
          <section className="mt-14" aria-label="Releases featuring this artist">
            <h2 className="mono mb-8 border-b border-line pb-4 text-[10px] uppercase tracking-[0.28em] text-faint">
              Releases on QR Sound Records
            </h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8">
              {rels.map((r, i) => (
                <ReleaseCard key={r.id} release={r} index={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
