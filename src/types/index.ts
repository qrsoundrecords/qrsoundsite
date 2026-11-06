import type { Release } from "@/data/releases";
import type { Artist } from "@/data/artists";

export type { ReleaseTrack, ReleaseLinks, ReleaseStatus } from "@/data/releases";
export type { ArtistLinks } from "@/data/artists";
export type { SiteConfig } from "@/data/siteConfig";
export type { Release, Artist };

/** A single search result row. */
export type SearchHit =
  | { type: "release"; id: string; title: string; subtitle: string; image: string; url: string; accent: string }
  | { type: "artist"; id: string; title: string; subtitle: string; image: string; url: string; accent: string }
  | { type: "track"; id: string; title: string; subtitle: string; image: string; url: string; accent: string };
