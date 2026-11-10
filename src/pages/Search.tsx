import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, CornerDownLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSearch } from "@/hooks/useSearch";
import GeneratedCover from "@/components/releases/GeneratedCover";
import { asset } from "@/lib/asset";
import type { SearchHit } from "@/types";

const TYPE_LABEL = {
  release: "Releases",
  artist: "Artists",
  track: "Tracks",
} as const;

/** Standalone /search page (mobile-friendly; also reachable via ⌘K overlay). */
export default function Search() {
  usePageMeta("search", "Search the QR Sound Records catalogue — releases, artists, tracks and catalog numbers.");
  const [query, setQuery] = useState("");
  const { hits } = useSearch(query, 140);
  const navigate = useNavigate();

  const grouped: Record<SearchHit["type"], SearchHit[]> = { release: [], artist: [], track: [] };
  hits.forEach((h) => grouped[h.type].push(h));

  return (
    <div className="mx-auto min-h-[80vh] max-w-3xl px-5 pt-28 pb-24 md:pt-36">
      <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">Search the frequency</p>
      <div className="mt-6 flex items-center gap-4 border-b border-line2 pb-4">
        <SearchIcon size={20} strokeWidth={1.5} className="shrink-0 text-mute" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Release / artist / track / catalog №…"
          aria-label="Search query"
          className="display w-full bg-transparent text-xl font-medium placeholder:text-faint/70 focus-visible:outline-none md:text-2xl"
        />
      </div>

      <div className="mt-10 space-y-9">
        {!query.trim() && (
          <p className="mono text-[10px] uppercase tracking-[0.24em] leading-loose text-faint">
            Titles · artist names · tracks · genres · catalog numbers —{" "}
            <kbd className="border border-line px-1.5 py-0.5">/</kbd> opens the overlay anywhere
          </p>
        )}

        {query.trim() && hits.length === 0 && (
          <p className="display py-12 text-center text-lg text-mute" role="status">
            No results for “{query}”
          </p>
        )}

        {(["release", "artist", "track"] as const).map((t) =>
          grouped[t].length ? (
            <section key={t}>
              <p className="mono mb-3 text-[10px] uppercase tracking-[0.24em] text-faint">
                {TYPE_LABEL[t]} · {grouped[t].length}
              </p>
              <ul className="divide-y divide-line border-y border-line">
                {grouped[t].map((hit) => (
                  <motion.li key={hit.type + hit.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <button
                      onClick={() => navigate(hit.url)}
                      className="group flex w-full items-center gap-4 py-3 text-left"
                    >
                      {hit.image ? (
                        <img src={asset(hit.image)} alt="" loading="lazy" className="h-12 w-12 shrink-0 object-cover" />
                      ) : (
                        <span className="h-12 w-12 shrink-0">
                          <GeneratedCover seed={hit.id + hit.title} title={hit.title} accent={hit.accent} icon={false} />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="display block truncate text-[15px] font-medium">{hit.title}</span>
                        <span className="mono block truncate text-[10px] uppercase tracking-[0.14em] text-faint">
                          {hit.subtitle}
                        </span>
                      </span>
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: hit.accent, boxShadow: `0 0 8px ${hit.accent}` }}
                      />
                      <CornerDownLeft size={13} className="shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </section>
          ) : null,
        )}
      </div>
    </div>
  );
}
