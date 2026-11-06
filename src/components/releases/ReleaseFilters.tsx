import { genresWithReleases } from "./genreList";

export type SortOrder = "newest" | "oldest";
export type StatusFilter = "all" | "out-now" | "upcoming";

const STATUS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All status" },
  { key: "out-now", label: "Out now" },
  { key: "upcoming", label: "Upcoming" },
];

export default function ReleaseFilters({
  genre,
  status,
  sort,
  onGenre,
  onStatus,
  onSort,
}: {
  genre: string;
  status: StatusFilter;
  sort: SortOrder;
  onGenre: (g: string) => void;
  onStatus: (s: StatusFilter) => void;
  onSort: (s: SortOrder) => void;
}) {
  return (
    <div className="flex flex-col gap-6 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
      {/* genres */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5" role="group" aria-label="Genre filter">
        <button
          onClick={() => onGenre("all")}
          className={`mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
            genre === "all" ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"
          }`}
        >
          All releases
        </button>
        {genresWithReleases.map((g) => (
          <button
            key={g.name}
            onClick={() => onGenre(g.name)}
            className={`mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
              genre === g.name ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"
            }`}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: g.accent }} />
            {g.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
        {/* status */}
        <div className="flex items-center gap-4" role="group" aria-label="Status filter">
          {STATUS.map((s) => (
            <button
              key={s.key}
              onClick={() => onStatus(s.key)}
              className={`mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                status === s.key ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* sort */}
        <label className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-faint">
          <span className="sr-only">Sort releases</span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortOrder)}
            className="border border-line bg-bg2 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-ink focus-visible:outline"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
    </div>
  );
}
