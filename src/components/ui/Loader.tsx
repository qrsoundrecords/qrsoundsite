import { motion } from "framer-motion";

export default function Loader({ fullScreen = false, label = "LOADING FREQUENCY" }: { fullScreen?: boolean; label?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "min-h-[70vh]" : "py-24"}`}
      role="status"
      aria-live="polite"
    >
      <div className="mono flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-faint">
        <span className="qr-pulse relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full bg-pink opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-3 w-3 bg-pink" />
        </span>
        <motion.span
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
}
