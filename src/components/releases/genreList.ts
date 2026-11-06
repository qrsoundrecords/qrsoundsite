import { releases } from "@/data/releases";
import { primaryAccent } from "@/lib/catalog";
import type { Release } from "@/data/releases";

function primaryAccentOf(genre: string): string {
  const probe = { genres: [genre] } as Release;
  return primaryAccent(probe);
}

/** Genre list with real counts, only genres that have at least one release. */
export const genresWithReleases: { name: string; accent: string; count: number }[] = (() => {
  const map = new Map<string, { name: string; accent: string; count: number }>();
  for (const r of releases) {
    for (const g of r.genres) {
      const e = map.get(g) ?? { name: g, accent: primaryAccentOf(g), count: 0 };
      e.count += 1;
      map.set(g, e);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
})();
