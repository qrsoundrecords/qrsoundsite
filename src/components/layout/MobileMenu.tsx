import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Releases", to: "/releases" },
  { label: "Artists", to: "/artists" },
  { label: "About", to: "/about" },
  { label: "Contact / Demo", to: "/contact" },
];

/**
 * Full-screen mobile navigation. Always available — the 3D cube is never
 * the only way to navigate (per accessibility & mobile requirements).
 */
export default function MobileMenu({
  registerClose,
}: {
  registerClose?: (close: () => void) => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerClose?.(() => {
      setOpen(false);
      buttonRef.current?.focus();
    });
  }, [registerClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center border border-line2 text-ink"
      >
        <Menu size={18} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-bg/97 backdrop-blur-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* header row */}
            <div className="flex h-16 items-center justify-between px-5">
              <Link to="/" onClick={() => setOpen(false)} className="mono text-sm uppercase tracking-[0.2em]">
                {siteConfig.shortName}
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-line2"
              >
                <CloseIcon />
              </button>
            </div>

            {/* links */}
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
              {LINKS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `display group flex items-baseline gap-4 border-b border-line py-4 text-[34px] font-bold uppercase ${
                        isActive ? "text-pink" : "text-ink"
                      }`
                    }
                  >
                    <span className="mono text-[10px] text-faint">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <p className="mono text-[10px] uppercase tracking-[0.2em] text-faint">
                {siteConfig.genres.join(" / ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M2 2l12 12M14 2L2 14" />
    </svg>
  );
}
