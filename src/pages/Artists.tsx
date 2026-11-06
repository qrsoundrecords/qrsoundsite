import { usePageMeta } from "@/hooks/usePageMeta";
import { artists } from "@/data/artists";
import ArtistGrid from "@/components/artists/ArtistGrid";

export default function Artists() {
  usePageMeta("artists", "The QR Sound Records roster — producers of melodic techno, melodic house, indie dance and house.");
  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-28 pb-24 md:px-10 md:pt-36">
      <header className="mb-10 md:mb-14">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">Label family</p>
        <h1 className="stencil mt-3 text-[clamp(2.4rem,6vw,4.5rem)] leading-none">
          Artists <span className="outline-text">{artists.length}</span>
        </h1>
        <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-mute">
          Residents, guests and collaborators who transmit through the label.
          Portraits are generated visuals — the identity here is sound first.
        </p>
      </header>
      <ArtistGrid artists={artists} />
    </div>
  );
}
