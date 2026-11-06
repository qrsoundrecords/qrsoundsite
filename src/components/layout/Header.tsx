import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "@/components/search/SearchOverlay";

const NAV = [
  { label: "Releases", to: "/releases" },
  { label: "Artists", to: "/artists" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";
  const darkHeader = scrolled || !onHome;
  const closeRef = useRef<() => void>(() => {});

  /* keyboard: "/" or Cmd/Ctrl+K opens search, Escape closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        closeRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          darkHeader
            ? "border-b border-line bg-bg/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
          {/* logo */}
          <Link to="/" aria-label="QR Sound Records — home" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center border border-line2 bg-bg2">
              <img src={siteConfig.logo} alt="" className="h-7 w-7 object-contain" />
              <span className="absolute -inset-px border border-transparent transition-colors group-hover:border-pink" />
            </span>
            <span className="display text-[15px] font-bold uppercase tracking-[0.08em]">
              QR Sound <span className="text-mute">Records</span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `mono text-[11px] uppercase link-underline ${isActive ? "is-active text-ink" : "text-mute hover:text-ink"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              className="mono flex items-center gap-2 text-[11px] uppercase text-mute transition-colors hover:text-ink"
              aria-label="Open search"
            >
              <Search size={14} strokeWidth={1.5} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden rounded-sm border border-line px-1.5 text-[10px] text-faint lg:inline">⌘K</kbd>
            </button>
          </nav>

          {/* mobile menu */}
          <div className="md:hidden">
            <MobileMenu registerClose={(fn) => (closeRef.current = fn)} />
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

