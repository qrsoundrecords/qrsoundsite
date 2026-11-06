import { useMemo, useState } from "react";
import ReleaseFilters, { type SortOrder, type StatusFilter } from "@/components/releases/ReleaseFilters";
import ReleaseGrid from "@/components/releases/ReleaseGrid";
import { usePageMeta } from "@/hooks/usePageMeta";
import { filterReleases } from "@/lib/catalog";

const GENRES = ["all", "Melodic Techno", "Melodic House", "Indie Dance", "Indie Tech", "House", "Electronic"] as const;
const first = GENRES[0];

export default function Releases() {
  usePageMeta("releases", "Catalog of QR Sound Records — melodic techno, melodic house, indie dance and house releases on vinyl-grade digital.");
  const [genre, setGenre] = useState<string>(String(first));
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const list = useMemo(() => filterReleases({ genre, status, sort }), [genre, status, sort]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-28 pb-24 md:px-10 md:pt-36">
      <header className="mb-10 md:mb-14">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">Label catalogue</p>
        <h1 className="stencil mt-3 text-[clamp(2.4rem,6vw,4.5rem)] leading-none">
          Releases <span className="outline-text">{list.length}</span>
        </h1>
      </header>

      <ReleaseFilters
        genre={genre}
        status={status}
        sort={sort}
        onGenre={setGenre}
        onStatus={setStatus}
        onSort={setSort}
      />

      <div className="mt-10">
        <ReleaseGrid releases={list} />
      </div>
    </div>
  );
}
