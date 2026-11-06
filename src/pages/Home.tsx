import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Move3d } from "lucide-react";
import CubeNavigation from "@/components/cube/CubeNavigation";
import ReleaseCard from "@/components/releases/ReleaseCard";
import ArtistCard from "@/components/artists/ArtistCard";
import GeneratedCover from "@/components/releases/GeneratedCover";
import Button from "@/components/ui/Button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { siteConfig } from "@/data/siteConfig";
import { sortedReleases, primaryAccent, getArtistReleases } from "@/lib/catalog";
import { artists } from "@/data/artists";
import type { Release } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  usePageMeta("home");
  const reduced = useReducedMotion();

  const { latest, upcoming, newest } = useMemo(() => {
    const out = sortedReleases.filter((r) => r.status === "out-now");
    const next = sortedReleases.find((r) => r.status === "upcoming");
    return { latest: out[0], upcoming: next, newest: out.slice(0, 8) };
  }, []);

  const featuredArtists = useMemo(
    () =>
      artists
        .map((a) => ({ artist: a, rels: getArtistReleases(a.name).length }))
        .sort((x, y) => y.rels - x.rels)
        .slice(0, 4)
        .map((x) => x.artist),
    [],
  );

  return (
    <>
      {/* ============================================================ */}
      {/* HERO — the QR cube                                            */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden />
        {/* light blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-20%] left-[-10%] h-[50vh] w-[50vw] rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--accent-purple)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-15%] bottom-[-30%] h-[55vh] w-[55vw] rounded-full opacity-15 blur-[140px]"
          style={{ background: "var(--accent-pink)" }}
        />

        {/* cube layout: side text (xl) / stacked (mobile) */}
        <div className="mx-auto grid w-full max-w-[1600px] flex-1 items-center gap-8 px-5 pt-24 pb-10 md:px-10 xl:grid-cols-[1fr_minmax(480px,0.95fr)_1fr]">
          {/* left block */}
          <div className="relative z-10 order-2 text-left xl:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease }}
              className="mono text-[10px] uppercase tracking-[0.3em] text-pink"
            >
              ● Live transmission {siteConfig.location}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease }}
              className="stencil mt-5 text-[clamp(3rem,6.5vw,5.5rem)] leading-[0.92]"
            >
              QR Sound
              <br />
              <span className="outline-text">Records</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className="display mt-6 max-w-[360px] text-[15px] leading-relaxed text-mute"
            >
              {siteConfig.tagline}. The QR code is not a label — it is a portal
              into music. Rotate the structure, scan the frequency.
            </motion.p>

            {/* genres */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6, ease }}
              className="mono mt-7 flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-mute"
            >
              {siteConfig.genres.map((genre) => (
                <li key={genre} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/70" />
                  {genre}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease }}
              className="mt-9 flex flex-wrap gap-4"
            >
              {latest && <LatestButton release={latest} />}
              <Button to="/releases" variant="ghost">
                <span className="flex items-center gap-3">
                  Explore releases <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 1, ease }}
            className="relative order-1 h-[52svh] min-h-[340px] md:h-[62svh] xl:order-2 xl:h-[78svh]"
          >
            <CubeNavigation reducedMotion={Boolean(reduced)} satellites={20} />

            {/* rotation indicator */}
            <svg
              viewBox="0 0 44 44"
              className="pointer-events-none absolute bottom-3 left-1/2 h-10 w-10 -translate-x-1/2 text-faint motion-safe:animate-[spin_10s_linear_infinite]"
              aria-hidden
            >
              <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
            </svg>
          </motion.div>

          {/* right block */}
          <div className="relative z-10 order-3 flex flex-col items-start gap-10 xl:items-end xl:text-right">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mono hidden items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-faint xl:flex"
            >
              <Move3d size={13} strokeWidth={1.5} /> Rotate to explore
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              className="mono hidden text-[10px] uppercase tracking-[0.28em] text-faint xl:block"
            >
              Explore the frequency
            </motion.p>

            {upcoming && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease }}
              >
                <Link to={`/releases/${upcoming.slug}`} className="group block xl:text-right">
                  <p className="mono mb-2 text-[10px] uppercase tracking-[0.24em] text-pink">
                    ● Upcoming · {upcoming.catalogNumber}
                  </p>
                  <div className="flex items-center gap-4 xl:flex-row-reverse">
                    <span className="block h-14 w-14 shrink-0 overflow-hidden border border-line">
                      <GeneratedCover
                        seed={upcoming.id}
                        title={upcoming.title}
                        accent={primaryAccent(upcoming)}
                        icon={false}
                      />
                    </span>
                    <span>
                      <span className="display block text-lg font-semibold leading-tight group-hover:text-ink">
                        {upcoming.title}
                      </span>
                      <span className="mono block text-[10px] uppercase tracking-[0.18em] text-faint">
                        {upcoming.artists.join(", ")}
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* bottom marquee */}
        <Marquee />
      </section>

      {/* ============================================================ */}
      {/* LATEST TRANSMISSIONS                                          */}
      {/* ============================================================ */}
      <Section
        kicker="01 / Catalog"
        title="Latest transmissions"
        link={{ to: "/releases", label: "All releases" }}
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4 xl:gap-y-14">
          {newest.slice(0, 4).map((r, i) => (
            <ReleaseCard key={r.id} release={r} index={i} />
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* ARTISTS STRIP                                                 */}
      {/* ============================================================ */}
      <Section
        kicker="02 / Roster"
        title="Residents & guests"
        link={{ to: "/artists", label: "All artists" }}
        bg
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4">
          {featuredArtists.map((a, i) => (
            <ArtistCard key={a.id} artist={a} index={i} />
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* MANIFESTO CTA                                                 */}
      {/* ============================================================ */}
      <Section kicker="03 / About">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="stencil max-w-[820px] text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.1]"
            >
              Electronic music + geometry + digital culture. We support
              producers who share the vision of pure{" "}
              <span className="text-purple">melodic</span> sound — and translate{" "}
              it into a <span className="text-pink">three-dimensional</span>{" "}
              label identity.
            </motion.h2>
          </div>
          <div className="flex gap-4">
            <Button to="/about" variant="solid">
              <span className="flex items-center gap-3">
                About the label <ArrowRight size={14} strokeWidth={1.5} />
              </span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Section({
  kicker,
  title,
  link,
  bg = false,
  children,
}: {
  kicker: string;
  title?: string;
  link?: { to: string; label: string };
  bg?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`relative py-20 md:py-28 ${bg ? "bg-bg2" : ""}`}>
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6 md:mb-14">
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">{kicker}</p>
            {title && <h2 className="stencil mt-3 text-[clamp(1.5rem,3vw,2.2rem)]">{title}</h2>}
          </div>
          {link && (
            <Link
              to={link.to}
              className="mono group flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink"
            >
              {link.label}
              <ArrowRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function LatestButton({ release }: { release: Release }) {
  return (
    <Button to={`/releases/${release.slug}`} variant="solid">
      <span className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
        Latest: {release.title} <ArrowRight size={14} strokeWidth={1.5} />
      </span>
    </Button>
  );
}

function Marquee() {
  const items = sortedReleases.map((r) => `${r.catalogNumber} — ${r.title.toUpperCase()}`);
  const row = [...items, ...items];
  return (
    <div className="relative border-t border-line bg-bg2/60 py-4" aria-hidden>
      <div className="marquee-track" style={{ "--marquee-dur": "46s" } as React.CSSProperties}>
        {row.map((t, i) => (
          <span key={i} className="mono mx-6 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-faint">
            {t}
            <span className={`h-1 w-1 rounded-full ${i % 2 ? "bg-pink" : "bg-purple"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
