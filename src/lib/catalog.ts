import { artists, type Artist } from "@/data/artists";
import { releases, genreAccent, type Release } from "@/data/releases";
import type { SearchHit } from "@/types";

export { genreAccent };

/* ------------------------------------------------------------------ */
/* Release helpers                                                     */
/* ------------------------------------------------------------------ */

export const sortedReleases = [...releases].sort((a, b) =>
  b.releaseDate.localeCompare(a.releaseDate),
);

export function getRelease(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}

export function getLatestRelease(): Release {
  const [latest] = sortedReleases.filter((r) => r.status === "out-now");
  return latest ?? sortedReleases[0];
}

export function getNeighbours(release: Release): { prev?: Release; next?: Release } {
  const i = sortedReleases.findIndex((r) => r.id === release.id);
  return { prev: sortedReleases[i - 1], next: sortedReleases[i + 1] };
}

/** Releases filtered + sorted for the catalogue page. */
export function filterReleases(opts: {
  genre?: string;
  status?: "all" | "out-now" | "upcoming";
  sort: "newest" | "oldest";
}): Release[] {
  let list = [...releases];
  if (opts.genre && opts.genre !== "all") {
    list = list.filter((r) => r.genres.some((g) => g === opts.genre));
  }
  if (opts.status && opts.status !== "all") {
    list = list.filter((r) => r.status === opts.status);
  }
  list.sort((a, b) =>
    opts.sort === "newest" ? b.releaseDate.localeCompare(a.releaseDate) : a.releaseDate.localeCompare(b.releaseDate),
  );
  return list;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function primaryAccent(release: Release): string {
  return genreAccent(release.genres[0] ?? "Electronic");
}

/* ------------------------------------------------------------------ */
/* Artist helpers                                                      */
/* ------------------------------------------------------------------ */

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

/** All releases where the artist is credited. */
export function getArtistReleases(artistName: string): Release[] {
  return sortedReleases.filter((r) =>
    r.artists.some((n) => n.toLowerCase() === artistName.toLowerCase()),
  );
}

export function getReleaseArtists(release: Release): Artist[] {
  return release.artists
    .map((name) => artists.find((a) => a.name.toLowerCase() === name.toLowerCase()))
    .filter((a): a is Artist => Boolean(a));
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

export function searchCatalog(query: string, limit = 24): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const norm = (s: string) => s.toLowerCase();
  const hits: SearchHit[] = [];
  const seen = new Set<string>();

  const push = (hit: SearchHit) => {
    if (!seen.has(hit.type + hit.id) && hits.length < limit) {
      seen.add(hit.type + hit.id);
      hits.push(hit);
    }
  };

  for (const r of sortedReleases) {
    const fields = [r.title, ...r.artists, r.catalogNumber, ...r.genres, r.description ?? ""];
    if (!fields.some((f) => norm(f).includes(q))) continue;
    push({
      type: "release",
      id: r.id,
      title: r.title,
      subtitle: `${r.artists.join(", ")} · ${r.catalogNumber}`,
      image: r.cover ?? "",
      url: `/releases/${r.slug}`,
      accent: primaryAccent(r),
    });
  }

  for (const a of artists) {
    if (![a.name, ...a.genres].some((f) => norm(f).includes(q))) continue;
    push({
      type: "artist",
      id: a.id,
      title: a.name,
      subtitle: `${getArtistReleases(a.name).length} releases on QR Sound`,
      image: a.image ?? "",
      url: `/artists/${a.slug}`,
      accent: genreAccent(a.genres[0] ?? "Electronic"),
    });
  }

  for (const r of sortedReleases) {
    for (const t of r.tracks) {
      if (norm(t.title).includes(q)) {
        push({
          type: "track",
          id: `${r.id}-t-${t.title}`,
          title: t.title,
          subtitle: `${t.note ? t.note + " · " : ""}${r.title} · ${r.artists.join(", ")}`,
          image: r.cover ?? "",
          url: `/releases/${r.slug}`,
          accent: primaryAccent(r),
        });
      }
    }
  }

  return hits;
}

/* ------------------------------------------------------------------ */
/* Generated QR-style placeholder art (covers without files, artists)   */
/* ------------------------------------------------------------------ */

/** Deterministic PRNG so the same entity always renders the same artwork. */
export function seedRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
