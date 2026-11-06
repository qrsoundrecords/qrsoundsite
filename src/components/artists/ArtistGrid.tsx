import ArtistCard from "./ArtistCard";
import type { Artist } from "@/data/artists";

export default function ArtistGrid({ artists }: { artists: Artist[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-13 xl:grid-cols-4">
      {artists.map((a, i) => (
        <ArtistCard key={a.id} artist={a} index={i} />
      ))}
    </div>
  );
}
