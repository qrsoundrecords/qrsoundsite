import ReleaseCard from "./ReleaseCard";
import Loader from "@/components/ui/Loader";
import type { Release } from "@/data/releases";

export default function ReleaseGrid({ releases, loading }: { releases: Release[]; loading?: boolean }) {
  if (loading) return <Loader />;
  if (!releases.length) {
    return (
      <p className="mono py-20 text-center text-[11px] uppercase tracking-[0.25em] text-faint">
        No releases match this filter yet
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14 xl:grid-cols-4">
      {releases.map((r, i) => (
        <ReleaseCard key={r.id} release={r} index={i} />
      ))}
    </div>
  );
}
