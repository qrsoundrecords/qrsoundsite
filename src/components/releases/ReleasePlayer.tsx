import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import type { Release, ReleaseTrack } from "@/data/releases";

const fmt = (t: number) => {
  if (!isFinite(t)) return "--:--";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

/**
 * Tracklist player. Fully functional when a track provides `audioUrl`
 * (HTML Audio API). Before audio files are added the list renders a clean
 * placeholder row — the architecture is ready for audio.
 */
export default function ReleasePlayer({ release }: { release: Release }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const track: ReleaseTrack | null = current !== null ? release.tracks[current] ?? null : null;
  const playable = Boolean(track?.audioUrl);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!track?.audioUrl || current === null) return;
    const a = audioRef.current;
    if (!a) return;
    a.src = track.audioUrl;
    a.play().catch(() => setError(true));
  }, [current, track?.audioUrl]);

  const toggle = (i: number) => {
    if (current === i) {
      audioRef.current?.pause();
      setCurrent(null);
      setTime(0);
    } else {
      setCurrent(i);
      setTime(0);
      setError(false);
    }
  };

  const onTime = () => setTime(audioRef.current?.currentTime ?? 0);
  const onMeta = () => setDuration(audioRef.current?.duration ?? 0);

  return (
    <div>
      {/* hidden audio element attaches when a preview exists */}
      {playable && (
        <audio ref={audioRef} onTimeUpdate={onTime} onLoadedMetadata={onMeta} preload="none" />
      )}

      <ol className="divide-y divide-line border-y border-line">
        {release.tracks.map((t, i) => {
          const isCurrent = current === i;
          return (
            <li key={i} className={error && isCurrent ? "opacity-60" : "group"}>
              <button
                onClick={() => toggle(i)}
                disabled={!t.audioUrl}
                aria-label={t.audioUrl ? `Play track ${i + 1} ${t.title}` : `Track ${i + 1} ${t.title} — preview not available yet`}
                className={`flex w-full items-center gap-4 px-1 py-4 text-left transition-colors md:gap-6 ${
                  t.audioUrl ? "hover:bg-white/[0.03]" : "cursor-default"
                }`}
              >
                {/* index / play state */}
                <span className="mono flex h-8 w-8 shrink-0 items-center justify-center border border-line text-[11px] text-faint">
                  {t.audioUrl ? (
                    isCurrent ? <Pause size={12} /> : <Play size={12} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>

                {/* title */}
                <span className="min-w-0 flex-1">
                  <span className="display block truncate text-[15px] font-medium">
                    {t.title}
                    {t.note && <span className="text-mute"> ({t.note})</span>}
                  </span>
                  {t.audioUrl && isCurrent && (
                    <span className="mt-1.5 block h-px w-full max-w-[280px] bg-line">
                      <span
                        className="block h-px bg-pink"
                        style={{ width: `${duration ? (time / duration) * 100 : 0}%` }}
                      />
                    </span>
                  )}
                  {t.audioUrl && isCurrent && (
                    <span className="mono mt-1 block text-[10px] text-faint">
                      {fmt(time)} / {fmt(duration)}
                    </span>
                  )}
                  {error && isCurrent && (
                    <span className="mono mt-1 block text-[10px] text-red" role="alert">
                      close — audio preview could not be loaded
                    </span>
                  )}
                </span>

                {/* duration */}
                {t.duration && (
                  <span className="mono shrink-0 text-[11px] tracking-[0.14em] text-faint">{t.duration}</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {!release.tracks.some((t) => t.audioUrl) && (
        <p className="mono mt-4 text-[10px] uppercase tracking-[0.2em] text-faint">
          Audio previews coming soon — full streams available on the platforms below
        </p>
      )}
    </div>
  );
}
