import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  getRelease,
  getNeighbours,
  getReleaseArtists,
  primaryAccent,
  formatDate,
} from "@/lib/catalog";
import { imageOrFallback } from "@/components/releases/imageOrFallback";
import ReleasePlayer from "@/components/releases/ReleasePlayer";
import GeneratedCover from "@/components/releases/GeneratedCover";
import { PLATFORM_LABELS } from "@/data/siteConfig";

export default function ReleaseDetails() {
  const { slug } = useParams();
  const release = slug ? getRelease(slug) : undefined;
  usePageMeta(release ? `${release.title} — ${release.artists.join(", ")}` : "release");

  if (!release) return <Navigate to="/releases" replace />;

  const accent = primaryAccent(release);
  const artistObjs = getReleaseArtists(release);
  const { prev, next } = getNeighbours(release);

  const links = Object.entries(release.links).filter(([, v]) => Boolean(v));

  return (
    <article className="mx-auto max-w-[1500px] px-5 pt-24 pb-28 md:px-10 md:pt-32">
      {/* breadcrumb / back */}
      <div className="mb-8 flex items-center justify-between">
        <Link to="/releases" className="mono group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink">
          <ArrowLeft size={13} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
          All releases
        </Link>
        <p className="mono text-[11px] uppercase tracking-[0.2em] text-faint">{release.catalogNumber}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(320px,1fr)_1.15fr] lg:gap-16">
        {/* ------------------------------------------------ cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="cover-frame aspect-square" style={{ boxShadow: `0 0 90px -20px ${accent}44` }}>
            <div className="h-full w-full">
              {imageOrFallback(release, accent) ?? (
                <GeneratedCover seed={release.id} title={release.title} accent={accent} />
              )}
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------ info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className={`chip ${release.status === "upcoming" ? "chip-up" : "chip-out"}`}>
                {release.status === "upcoming" ? "Upcoming" : "Out now"}
              </span>
              {release.genres.map((g) => (
                <span key={g} className="mono text-[10px] uppercase tracking-[0.18em] text-mute">
                  {g}
                </span>
              ))}
            </div>

            <h1 className="stencil mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02]">
              {release.title}
            </h1>
            {/* artists */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {artistObjs.length > 0 ? (
                artistObjs.map((a) => (
                  <Link
                    key={a.id}
                    to={`/artists/${a.slug}`}
                    className="display group flex items-baseline gap-1.5 text-lg font-medium text-mute transition-colors hover:text-ink"
                  >
                    {a.name}
                    <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))
              ) : (
                <p className="display text-lg font-medium text-mute">{release.artists.join(", ")}</p>
              )}
            </div>

            <dl className="mono mt-7 grid grid-cols-2 gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.16em] md:grid-cols-3">
              <div>
                <dt className="text-faint">Catalog</dt>
                <dd className="mt-1 text-ink">{release.catalogNumber}</dd>
              </div>
              <div>
                <dt className="text-faint">Release date</dt>
                <dd className="mt-1 text-ink">{formatDate(release.releaseDate)}</dd>
              </div>
              <div>
                <dt className="text-faint">Format</dt>
                <dd className="mt-1 text-ink">Digital</dd>
              </div>
            </dl>

            {release.description && (
              <p className="mt-8 max-w-[620px] text-[15px] leading-relaxed text-mute">
                {release.description}
              </p>
            )}
          </motion.div>

          {/* tracks */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12"
            aria-label="Tracklist"
          >
            <h2 className="mono mb-4 text-[10px] uppercase tracking-[0.28em] text-faint">Tracklist</h2>
            <ReleasePlayer release={release} />
          </motion.section>

          {/* platform links */}
          {links.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12"
              aria-label="Listen on platforms"
            >
              <h2 className="mono mb-4 text-[10px] uppercase tracking-[0.28em] text-faint">
                Listen on
              </h2>
              <ul className="flex flex-wrap gap-3">
                {links.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noreferrer"
                      className="mono group flex items-center gap-2 border border-line px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
                      style={{ ["--tw-ring-color" as string]: accent }}
                    >
                      {PLATFORM_LABELS[key] ?? key}
                      <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* prev / next */}
          <nav className="mt-16 grid grid-cols-1 items-center gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="More releases">
            {prev ? (
              <Link to={`/releases/${prev.slug}`} className="group flex items-center gap-4 text-left">
                <ArrowLeft size={16} className="shrink-0 text-faint transition-transform group-hover:-translate-x-1" />
                <span>
                  <span className="mono block text-[9px] uppercase tracking-[0.2em] text-faint">Next release</span>
                  <span className="display block text-[15px] font-medium">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/releases/${next.slug}`} className="group flex items-center justify-end gap-4 text-right">
                <span>
                  <span className="mono block text-[9px] uppercase tracking-[0.2em] text-faint">Previous release</span>
                  <span className="display block text-[15px] font-medium">{next.title}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-faint transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
