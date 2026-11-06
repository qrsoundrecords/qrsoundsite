export type ReleaseStatus = "out-now" | "upcoming";

export interface ReleaseTrack {
  title: string;
  /** Duration as "MM:SS", if known. */
  duration?: string;
  /** Optional URL/asset path to a preview audio file. Player is enabled automatically when present. */
  audioUrl?: string;
  /** Optional remix / featuring credit shown next to the title. */
  note?: string;
}

export interface ReleaseLinks {
  spotify?: string;
  appleMusic?: string;
  beatport?: string;
  soundcloud?: string;
  bandcamp?: string;
  youtube?: string;
  deezer?: string;
  traxsource?: string;
}

export interface Release {
  id: string;
  slug: string;
  catalogNumber: string;
  title: string;
  /** Artist display names, in release credit order. */
  artists: string[];
  /** ISO date (YYYY-MM-DD). */
  releaseDate: string;
  genres: string[];
  status: ReleaseStatus;
  /** Path to the cover image. If the file is missing, a generated QR-style placeholder is rendered. */
  cover?: string;
  description?: string;
  tracks: ReleaseTrack[];
  links: ReleaseLinks;
}

export const GENRE_ACCENTS: Record<string, string> = {
  "Melodic Techno": "var(--accent-purple)",
  "Melodic House": "var(--accent-purple)",
  "Melodic House & Techno": "var(--accent-purple)",
  "Indie Dance": "var(--accent-red)",
  "Indie Tech": "var(--accent-pink)",
  House: "var(--accent-pink)",
  "Deep House": "var(--accent-pink)",
  Progressive: "var(--accent-steel)",
  Raw: "var(--accent-steel)",
  Electronic: "var(--accent-steel)",
};

export function genreAccent(genre: string): string {
  return GENRE_ACCENTS[genre] ?? "var(--accent-steel)";
}

/**
 * QR SOUND RECORDS — release catalogue.
 * Source of truth: https://qrsoundrecords.bandcamp.com (fetched Nov 2025).
 *
 * Adding a new release = add one entry here + drop a square cover image in
 * /public/images/releases/<slug>.jpg. See README.md → "Adding a release".
 *
 * NOTE: catalog numbers marked with `demo` are placeholders — the real QRS
 * numbers for older releases should be confirmed with the label. Dates shown
 * as month-only on Bandcamp were normalised to the first of the month.
 */
export const releases: Release[] = [
  {
    id: "rel-026",
    slug: "stop-ignore-it",
    catalogNumber: "QRS 026",
    title: "Stop Ignore It",
    artists: ["QBAS"],
    releaseDate: "2026-03-13",
    genres: ["Indie Dance", "Indie Tech", "Raw"],
    status: "upcoming",
    // cover: "/images/releases/stop-ignore-it.jpg", // uncomment when the artwork file is added
    description:
      "The next transmission from QBAS. High tension, broken concrete textures and relentless club pressure in the label's signature covers style. Expected on QR Sound Records.",
    tracks: [{ title: "Stop Ignore It" }, { title: "Stop Ignore It (Raw)" }],
    links: {},
  },
  {
    id: "rel-025",
    slug: "love-is",
    catalogNumber: "QRS 025",
    title: "Love Is",
    artists: ["The Khitrov", "Kholina"],
    releaseDate: "2024-06-14",
    genres: ["Melodic Techno", "Electronic"],
    status: "out-now",
    cover: "/images/releases/love-is.jpg",
    description:
      "'Love Is' pairs The Khitrov and Kholina for a late-night melodic journey — deep rolling low ends, hypnotic vocal fragments and cinematic build-ups.",
    tracks: [{ title: "Love Is" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/love-is" },
  },
  {
    id: "rel-024",
    slug: "circle",
    catalogNumber: "QRS 024",
    title: "Circle",
    artists: ["MOLEX.", "QBAS", "Alex Grafton"],
    releaseDate: "2024-06-14",
    genres: ["Melodic Techno", "Melodic House & Techno"],
    status: "out-now",
    cover: "/images/releases/circle.jpg",
    description:
      "A three-way connection between MOLEX., QBAS and Alex Grafton. 'Circle' is a driving melodic terrain with a euphoric breaking point, built for peak-time floors.",
    tracks: [{ title: "Circle" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/circle" },
  },
  {
    id: "rel-023",
    slug: "any-me",
    catalogNumber: "QRS 023",
    title: "Any me",
    artists: ["ACIDOMA"],
    releaseDate: "2024-03-15",
    genres: ["Melodic Techno", "Progressive"],
    status: "out-now",
    cover: "/images/releases/any-me.jpg",
    description:
      "ACIDOMA delivers an emotionally charged melodic weapon — a steady pulse, airy layering and slow-burning tension that never fully resolves.",
    tracks: [{ title: "Any me" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/any-me" },
  },
  {
    id: "rel-022",
    slug: "look-at-us",
    catalogNumber: "QRS 022",
    title: "Look at us",
    artists: ["Kompaniets", "Ailly Great"],
    releaseDate: "2024-03-15",
    genres: ["Melodic House", "Melodic Techno"],
    status: "out-now",
    cover: "/images/releases/look-at-us.jpg",
    description:
      "Kompaniets and Ailly Great meet for 'Look at us' — a groovy melodic house cut balancing warmth and melancholy with wide reverb spaces.",
    tracks: [{ title: "Look at us" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/look-at-us" },
  },
  {
    id: "rel-021",
    slug: "to-be-out",
    catalogNumber: "QRS 021",
    title: "To be out",
    artists: ["Pashura"],
    releaseDate: "2024-02-16",
    genres: ["Melodic Techno", "Indie Dance"],
    status: "out-now",
    cover: "/images/releases/to-be-out.jpg",
    description:
      "Pashura steps up with 'To be out' — an indie-dance-tinged melodic track with a persistent kick, textured percussion and restless arpeggios.",
    tracks: [{ title: "To be out" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/to-be-out" },
  },
  {
    id: "rel-020",
    slug: "electric-soul",
    catalogNumber: "QRS 020",
    title: "Electric Soul",
    artists: ["Gutenn"],
    releaseDate: "2024-02-02",
    genres: ["Melodic Techno", "Indie Dance"],
    status: "out-now",
    cover: "/images/releases/electric-soul.jpg",
    description:
      "Gutenn's 'Electric Soul' EP: human feeling translated into machine sound. Includes an extended interpretation from Jebby Jay.",
    tracks: [
      { title: "Electric Soul", duration: "05:45" },
      { title: "Electric Soul (Jebby Jay Remix)", duration: "06:14" },
    ],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/album/electric-soul" },
  },
  {
    id: "rel-019",
    slug: "compilation-vol-1",
    catalogNumber: "QRS 019",
    title: "Compilation Vol.1",
    artists: ["Various Artists"],
    releaseDate: "2023-12-29",
    genres: ["Melodic Techno", "House", "Electronic"],
    status: "out-now",
    cover: "/images/releases/compilation-vol-1.jpg",
    description:
      "The first label compilation: five tracks collecting the QR Sound family — MOLEX., QBAS, Pashura, Margaryan, Gar1sson, Vagabandos and ACIDOMA in one continuous frequency range.",
    tracks: [
      { title: "VAGABOND", duration: "06:30", note: "MOLEX., QBAS" },
      { title: "Crush", duration: "06:45", note: "Pashura" },
      { title: "HOT", duration: "07:36", note: "Margaryan, Gar1sson" },
      { title: "Capoeira", duration: "08:27", note: "Vagabandos" },
      { title: "Don't Sell Your Soul", duration: "06:07", note: "ACIDOMA" },
    ],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/album/compilation-vol-1" },
  },
  {
    id: "rel-018",
    slug: "stay-alive",
    catalogNumber: "QRS 018",
    title: "Stay Alive",
    artists: ["MOLEX.", "QBAS", "Nenastoyashchaya"],
    releaseDate: "2023-12-01",
    genres: ["Melodic Techno", "Progressive"],
    status: "out-now",
    cover: "/images/releases/stay-alive.jpg",
    description:
      "MOLEX. and QBAS join forces with vocalist Nenastoyashchaya. 'Stay Alive' mutates a melancholic pop core into dark melodic techno drive.",
    tracks: [{ title: "Stay Alive", note: "ft. Nenastoyashchaya" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/stay-alive-ft-nenastoyashchaya" },
  },
  {
    id: "rel-017",
    slug: "fata-margano",
    catalogNumber: "QRS 017",
    title: "Fata Margano",
    artists: ["MOLEX.", "QBAS", "Sham Jam"],
    releaseDate: "2023-11-17",
    genres: ["Melodic Techno", "House"],
    status: "out-now",
    cover: "/images/releases/fata-margano.jpg",
    description:
      "A mirage in sound. MOLEX., QBAS and Sham Jam craft a mirage-like cut — high-riding percussion, wide pads and a hypnotic central motif.",
    tracks: [{ title: "Fata Margano" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/fata-margano" },
  },
  {
    id: "rel-016",
    slug: "not-sleep",
    catalogNumber: "QRS 016",
    title: "Not Sleep",
    artists: ["MOLEX.", "QBAS", "Margaryan", "Titorenko"],
    releaseDate: "2023-10-13",
    genres: ["Melodic Techno", "Electronic"],
    status: "out-now",
    cover: "/images/releases/not-sleep.jpg",
    description:
      "Four producers, one endless night. 'Not Sleep' is a trip through long tension curves and machined, after-hours atmospheres.",
    tracks: [{ title: "Not Sleep" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/not-sleep" },
  },
  {
    id: "rel-015",
    slug: "tikita",
    catalogNumber: "QRS 015",
    title: "Tikita",
    artists: ["MOLEX.", "QBAS", "Roma Busha"],
    releaseDate: "2023-09-29",
    genres: ["Melodic House", "Indie Dance"],
    status: "out-now",
    cover: "/images/releases/tikita.jpg",
    description:
      "'Tikita' — a bouncing hybrid of house groove and tribal rhythm from MOLEX., QBAS and Roma Busha. Sunshine with a shadow.",
    tracks: [{ title: "Tikita" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/tikita" },
  },
  {
    id: "rel-014",
    slug: "day-by-day",
    catalogNumber: "QRS 014",
    title: "Day By Day",
    artists: ["Alex Grafton", "Ninelya"],
    releaseDate: "2023-08-04",
    genres: ["Melodic House", "Progressive"],
    status: "out-now",
    cover: "/images/releases/day-by-day.jpg",
    description:
      "Alex Grafton and Ninelya deliver a progressive daydream — soft vocal lines floating above a carefully engineered melodic groove.",
    tracks: [{ title: "Day By Day", note: "Original Mix" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/day-by-day-original-mix" },
  },
  {
    id: "rel-013",
    slug: "style",
    catalogNumber: "QRS 013",
    title: "Style",
    artists: ["MOLEX.", "QBAS"],
    releaseDate: "2023-07-28",
    genres: ["Melodic Techno", "Melodic House & Techno"],
    status: "out-now",
    cover: "/images/releases/style.jpg",
    description:
      "The resident duo in its purest form. 'Style' is no-frills melodic power: tight drums, a chant-like hook and surgical arrangement.",
    tracks: [{ title: "Style" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/style" },
  },
  {
    id: "rel-012",
    slug: "flow",
    catalogNumber: "QRS 012",
    title: "Flow",
    artists: ["Rocco Lazzaro"],
    releaseDate: "2023-07-21",
    genres: ["Melodic House", "Indie Dance", "Melodic Techno"],
    status: "out-now",
    cover: "/images/releases/flow.jpg",
    description:
      "Rocco Lazzaro's EP sets the water in motion — the original glides through deep melodic house territory, MOLEX. & QBAS and Kovax reshape its current for darker rooms.",
    tracks: [
      { title: "Flow", duration: "06:53", note: "Original Mix" },
      { title: "Flow", duration: "06:25", note: "MOLEX., QBAS Remix" },
      { title: "Flow", duration: "05:04", note: "Kovax Remix" },
    ],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/album/flow" },
  },
  {
    id: "rel-011",
    slug: "paranoia",
    catalogNumber: "QRS 011",
    title: "Paranoia",
    artists: ["QBAS"],
    releaseDate: "2023-04-07",
    genres: ["Melodic Techno", "Electronic"],
    status: "out-now",
    cover: "/images/releases/paranoia.jpg",
    description:
      "QBAS's solo statement for the label: creeping pads, restless metallic details and a drop designed for large dark rooms.",
    tracks: [{ title: "Paranoia" }],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/track/paranoia" },
  },
  {
    id: "rel-010",
    slug: "citadel",
    catalogNumber: "QRS 010",
    title: "Citadel",
    artists: ["Alex Kasman"],
    releaseDate: "2023-03-24",
    genres: ["Melodic Techno", "Electronic"],
    status: "out-now",
    cover: "/images/releases/citadel.jpg",
    description:
      "Alex Kasman builds a fortress of sound on 'Citadel' — monumental melodic techno across three tracks: Citadel, Black Rose and Code 27.",
    tracks: [
      { title: "Citadel", duration: "05:15" },
      { title: "Black Rose", duration: "06:30" },
      { title: "Code 27", duration: "05:17" },
    ],
    links: { bandcamp: "https://qrsoundrecords.bandcamp.com/album/citadel" },
  },
];
