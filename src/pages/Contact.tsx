import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import DemoSubmissionForm from "@/components/forms/DemoSubmissionForm";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Contact() {
  usePageMeta(
    "contact / demo submission",
    "Contact QR Sound Records or submit your demo. Send a link — SoundCloud, Dropbox, Google Drive or WeTransfer.",
  );

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-28 md:px-10 md:pt-36">
      <header className="mb-14 md:mb-20">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">Signal path</p>
        <h1 className="stencil mt-3 text-[clamp(2.4rem,6vw,4.5rem)] leading-none">
          Contact / <span className="outline-text">Demo</span>
        </h1>
      </header>

      <div className="grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        {/* ------------------------------------------------ left: contacts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mono mb-6 text-[10px] uppercase tracking-[0.28em] text-faint">
            General contact
          </h2>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex items-center gap-4 border border-line bg-bg2 p-5 transition-colors hover:border-line2"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-pink">
              <Mail size={17} strokeWidth={1.5} />
            </span>
            <span>
              <span className="mono block text-[9px] uppercase tracking-[0.22em] text-faint">Email</span>
              <span className="display block text-[15px] font-medium">{siteConfig.email}</span>
            </span>
            <ArrowUpRight size={15} className="ml-auto shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {/* socials */}
          <ul className="mt-4 divide-y divide-line border border-line bg-bg2">
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="display text-[15px] font-medium">{s.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mono mt-8 space-y-2 text-[10px] uppercase leading-[1.9] tracking-[0.2em] text-faint">
            <p>{siteConfig.tagline}</p>
            <p>Melodic Techno / Melodic House / Indie Dance / House</p>
            <p>
              ● {siteConfig.location} — <span className="text-pink">transmitting</span>
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------ right: form */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Demo submission"
        >
          <h2 className="mono mb-6 text-[10px] uppercase tracking-[0.28em] text-faint">
            Submit your demo
          </h2>
          <DemoSubmissionForm />
        </motion.section>
      </div>
    </div>
  );
}
