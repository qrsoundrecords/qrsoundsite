import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg2">
      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <p className="stencil text-2xl">
              QR SOUND <span className=" outline-text">RECORDS</span>
            </p>
            <p className="mono mt-3 text-[10px] uppercase tracking-[0.22em] text-faint">
              {siteConfig.tagline} — {siteConfig.location}
            </p>
            <div className="mt-5 flex max-w-[240px] flex-wrap gap-x-2 gap-y-1">
              {siteConfig.genres.map((g) => (
                <span key={g} className="mono text-[9px] uppercase tracking-[0.16em] text-mute">
                  {g} /
                </span>
              ))}
            </div>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <p className="mono mb-4 text-[10px] uppercase tracking-[0.22em] text-faint">Index</p>
            <ul className="space-y-2.5">
              {[
                ["Releases", "/releases"],
                ["Artists", "/artists"],
                ["About", "/about"],
                ["Contact / Demo", "/contact"],
                ["Search", "/search"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-mute transition-colors hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* social */}
          <div>
            <p className="mono mb-4 text-[10px] uppercase tracking-[0.22em] text-faint">Elsewhere</p>
            <ul className="space-y-2.5">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-mute transition-colors hover:text-ink">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-6 md:flex-row">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-faint">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-faint">
            Scan the code — enter the frequency
          </p>
        </div>
      </div>
    </footer>
  );
}
