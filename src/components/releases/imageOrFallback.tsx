import type { Release } from "@/data/releases";
import GeneratedCover from "./GeneratedCover";
import { asset } from "@/lib/asset";

/** Shows the artwork file if it exists on disk-checked data, else a generated placeholder. */
export function imageOrFallback(release: Release, accent: string) {
  if (release.cover) {
    return (
      <img
        src={asset(release.cover)}
        alt={`${release.title} artwork`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="h-full w-full">
      <GeneratedCover seed={release.id + release.slug} title={release.title} accent={accent} />
    </div>
  );
}
