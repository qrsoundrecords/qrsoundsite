import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import Button from "@/components/ui/Button";

/* Placeholder editorial copy — replace freely in this file. */

export default function About() {
  usePageMeta("about", "About QR Sound Records — an independent electronic music label built on geometry, digital art and pure melodic sound.");
  const reduced = useReducedMotion();

  const blocks = [
    {
      id: "label",
      kicker: "About the label",
      title: "Independent electronic music label",
      body: "QR Sound Records is an independent electronic music label. Our goal is to support talented producers who share the vision of true electronic music sound. We keep the structure small, the standards high and the frequency clean. [Replace this placeholder text].",
    },
    {
      id: "direction",
      kicker: "Musical direction",
      title: "Melodic Techno / Melodic House / Indie Dance / House",
      body: "The main musical directions of the label are Melodic Techno, Melodic House, Indie Dance and House — wide, emotional, club-rooted electronic music with a strong melodic core. [Replace this placeholder text].",
    },
    {
      id: "vision",
      kicker: "Our vision",
      title: "One frequency, many rooms",
      body: "We believe electronic music is architecture you can hear: tension, space, geometry and release. The label curates rather than floods — every release is chosen to fit the same frequency range. [Replace this placeholder text].",
    },
    {
      id: "sound",
      kicker: "Sound identity",
      title: "Deep, wide, precise",
      body: "The QR Sound aesthetic: rolling low end, cinematic pads, engineered percussion and emotions that stay on the right side of the underground. [Replace this placeholder text].",
    },
    {
      id: "visual",
      kicker: "Visual identity",
      title: "The code is the portal",
      body: "The name gives the graphics: the QR code — a machine-readable pattern that opens a link — becomes the symbol and navigation of the label itself. Off-white paper, black ink, one saturated disc per genre, torn concrete geometry. And in the middle of the screen: a three-dimensional cube built from the same patterns. Scan it and you are inside the music. [Replace this placeholder text].",
    },
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-28 md:px-10 md:pt-36">
      {/* hero statement */}
      <header className="mb-20 border-b border-line pb-16 md:mb-28">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-faint">Manifesto</p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="stencil mt-5 max-w-[900px] text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.02]"
        >
          Scan the code.
          <br />
          <span className="text-purple">Enter the frequency.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mono mt-8 grid max-w-[560px] grid-cols-2 gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-mute sm:grid-cols-3"
        >
          <span>ELECTRONIC MUSIC +</span>
          <span>GEOMETRY +</span>
          <span>DIGITAL ART +</span>
          <span>3D INTERACTION +</span>
          <span>UNDERGROUND CULTURE</span>
          <span className="text-pink">● QRS EST. ISTANBUL</span>
        </motion.div>
      </header>

      {/* editorial blocks */}
      <div className="space-y-20 md:space-y-28">
        {blocks.map((b, i) => (
          <motion.section
            key={b.id}
            id={b.id}
            initial={{ opacity: 0, y: reduced ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: (i % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12"
          >
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.26em] text-faint">
                {String(i + 1).padStart(2, "0")} / {b.kicker}
              </p>
            </div>
            <div>
              <h2 className="display max-w-[640px] text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight">
                {b.title}
              </h2>
              <p className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-mute">{b.body}</p>
            </div>
          </motion.section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-wrap items-center gap-4 border-t border-line pt-12">
        <Button to="/releases" variant="solid">
          <span className="flex items-center gap-3">Browse releases</span>
        </Button>
        <Button to="/contact" variant="ghost">
          <span className="flex items-center gap-3">Submit your demo</span>
        </Button>
        <Link to="/" className="mono ml-auto text-[11px] uppercase tracking-[0.2em] text-faint hover:text-ink">
          Back to the cube ↑
        </Link>
      </div>
    </div>
  );
}
