import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { usePageMeta } from "@/hooks/usePageMeta";
import GeneratedCover from "@/components/releases/GeneratedCover";
import type { SearchHit } from "@/types";

const TYPE_LABEL = {
  release: "Releases",
  artist: "Artists",
  track: "Tracks",
} as const;

/**
 * Fullscreen command-palette search overlay.
 * Keyboard: ⌘K / "/" to open (handled in Header), Esc to close,
 * ↑ ↓ to move, Enter to open result.
 */
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const { hits } = useSearch(query);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  usePageMeta("search");

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => setActive(0), [query]);

  const go = (hit: SearchHit) => {
    onClose();
    navigate(hit.url);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      go(hits[active]);
    }
  };

  const grouped = useMemo(() => {
    const g: Record<SearchHit["type"], SearchHit[]> = { release: [], artist: [], track: [] };
    hits.forEach((h) => g[h.type].push(h));
    return g;
  }, [hits]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-bg/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onKeyDown={onKeyDown}
    >
      <div className="mx-auto max-w-3xl px-5 pt-[12vh] pb-20">
        {/* input */}
        <div className="flex items-center gap-4 border-b border-line2 pb-5">
          <Search size={22} strokeWidth={1.5} className="shrink-0 text-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search releases, artists, tracks, catalog numbers…"
            className="display w-full bg-transparent text-xl font-medium text-ink placeholder:text-faint/70 focus-visible:outline-none md:text-2xl"
            aria-label="Search query"
          />
          <button onClick={onClose} aria-label="Close search" className="flex h-9 w-9 shrink-0 items-center justify-center border border-line2 text-mute hover:text-ink">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* results */}
        <div className="mt-8 space-y-8">
          {!query.trim() && <EmptyState query="" />}

          {query.trim() && hits.length === 0 && <EmptyState query={query} />}

          {(["release", "artist", "track"] as const).map((t) =>
            grouped[t].length ? (
              <section key={t}>
                <p className="mono mb-3 text-[10px] uppercase tracking-[0.24em] text-faint">
                  {TYPE_LABEL[t]} <span className="text-faint/60">· {grouped[t].length}</span>
                </p>
                <ul>
                  {grouped[t].map((hit) => {
                    const idx = hits.indexOf(hit);
                    const isActive = idx === active;
                    return (
                      <li key={hit.type + hit.id}>
                        <button
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => go(hit)}
                          className={`group flex w-full items-center gap-4 border px-3 py-2.5 text-left transition-colors ${
                            isActive ? "border-line2 bg-white/[0.05]" : "border-transparent"
                          }`}
                        >
                          <Thumbnail hit={hit} />
                          <span className="min-w-0 flex-1">
                            <span className="display block truncate text-[15px] font-medium">
                              {hit.title}
                            </span>
                            <span className="mono block truncate text-[10px] uppercase tracking-[0.14em] text-faint">
                              {hit.subtitle}
                            </span>
                          </span>
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: hit.accent, boxShadow: `0 0 8px ${hit.accent}` }}
                          />
                          {isActive && <CornerDownLeft size={14} className="shrink-0 text-faint" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null,
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Thumbnail({ hit }: { hit: SearchHit }) {
  if (hit.image) {
    return <img src={hit.image} alt="" loading="lazy" className="h-11 w-11 shrink-0 object-cover" />;
  }
  return (
    <span className="h-11 w-11 shrink-0">
      <GeneratedCover seed={hit.id + hit.title} title={hit.title} accent={hit.accent} icon={false} />
    </span>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="py-16 text-center" role="status">
      {query ? (
        <>
          <p className="display text-lg text-mute">No results for “{query}”</p>
          <p className="mono mt-2 text-[10px] uppercase tracking-[0.22em] text-faint">
            Try a release title, artist name, track or catalog number
          </p>
        </>
      ) : (
        <>
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">Search the frequency</p>
          <p className="display mt-3 text-xl text-mute">Release / Artist / Track / Catalog №</p>
        </>
      )}
    </div>
  );
}
