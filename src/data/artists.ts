export interface ArtistLinks {
  instagram?: string;
  soundcloud?: string;
  spotify?: string;
  beatport?: string;
  bandcamp?: string;
  youtube?: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  /** Path to portrait. If missing, an abstract generated visual is rendered instead of a face. */
  image?: string;
  bio: string;
  genres: string[];
  links: ArtistLinks;
  /** Location / country, optional. */
  location?: string;
}

/**
 * QR SOUND RECORDS — artist roster.
 *
 * `releaseIds` are NOT stored here: an artist's releases are derived
 * automatically from `releases.ts` by matching the `artists` array.
 * Add a new artist = add one entry + (optional) portrait in
 * /public/images/artists/<slug>.jpg. See README.md → "Adding an artist".
 *
 * NOTE: bios are clearly marked placeholder copy — replace with real texts.
 * Portraits are absent on purpose: the UI shows abstract generated visuals
 * instead of inventing photos of real people.
 */
export const artists: Artist[] = [
  {
    id: "art-qbas",
    slug: "qbas",
    name: "QBAS",
    bio: "PLACEHOLDER BIO — QBAS is one of the core artists of QR Sound Records. His productions move between melodic techno, indie tech and raw club pressure — concrete textures, broken geometry and relentless low end. Co-author of many of the label's key collaborations as one half of the MOLEX. & QBAS duo. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Indie Tech", "Raw"],
    links: {},
    location: "PLACEHOLDER",
  },
  {
    id: "art-molex",
    slug: "molex",
    name: "MOLEX.",
    bio: "PLACEHOLDER BIO — MOLEX. is a resident producer of the label and a constant studio partner of QBAS. Precision-engineered melodic techno and house with wide, cinematic spaces and modular machine detail. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Melodic House"],
    links: {},
    location: "PLACEHOLDER",
  },
  {
    id: "art-alex-grafton",
    slug: "alex-grafton",
    name: "Alex Grafton",
    bio: "PLACEHOLDER BIO — Alex Grafton writes melodic house and progressive grooves with an ear for detail and airy vocal arrangements. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic House", "Progressive"],
    links: {},
  },
  {
    id: "art-pashura",
    slug: "pashura",
    name: "Pashura",
    bio: "PLACEHOLDER BIO — Pashura bridges indie dance and melodic techno: restless arpeggios, textured percussion and emotional drive. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Indie Dance"],
    links: {},
  },
  {
    id: "art-acidoma",
    slug: "acidoma",
    name: "ACIDOMA",
    bio: "PLACEHOLDER BIO — ACIDOMA builds slow-burning melodic techno with progressive depth and emotional tension. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Progressive"],
    links: {},
  },
  {
    id: "art-gutenn",
    slug: "gutenn",
    name: "Gutenn",
    bio: "PLACEHOLDER BIO — Gutenn translates human feeling into machine sound: melodic techno with indie-dance warmth and machine-soul detail. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Indie Dance"],
    links: {},
  },
  {
    id: "art-alex-kasman",
    slug: "alex-kasman",
    name: "Alex Kasman",
    bio: "PLACEHOLDER BIO — Alex Kasman constructs monumental melodic techno — fortified grooves, dark pads and precision percussion. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Electronic"],
    links: {},
  },
  {
    id: "art-rocco-lazzaro",
    slug: "rocco-lazzaro",
    name: "Rocco Lazzaro",
    bio: "PLACEHOLDER BIO — Rocco Lazzaro sets deep melodic currents in motion; his 'Flow' EP became one of the label's most remixed releases. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic House", "Indie Dance"],
    links: {},
  },
  {
    id: "art-the-khitrov",
    slug: "the-khitrov",
    name: "The Khitrov",
    bio: "PLACEHOLDER BIO — The Khitrov crafts late-night melodic journeys with cinematic tension and hypnotic low end. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Electronic"],
    links: {},
  },
  {
    id: "art-kholina",
    slug: "kholina",
    name: "Kholina",
    bio: "PLACEHOLDER BIO — Kholina joins The Khitrov for 'Love Is', adding vocal fragments and cinematic texture to the label's late-night palette. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno"],
    links: {},
  },
  {
    id: "art-kompaniets",
    slug: "kompaniets",
    name: "Kompaniets",
    bio: "PLACEHOLDER BIO — Kompaniets balances warmth and melancholy in wide-melodic house constructions. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic House"],
    links: {},
  },
  {
    id: "art-ailly-great",
    slug: "ailly-great",
    name: "Ailly Great",
    bio: "PLACEHOLDER BIO — Ailly Great — melodic house with human groove and wide reverb spaces. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic House"],
    links: {},
  },
  {
    id: "art-ninelya",
    slug: "ninelya",
    name: "Ninelya",
    bio: "PLACEHOLDER BIO — Ninelya is a vocalist and co-author of progressive daydreams with Alex Grafton. [Replace this text in src/data/artists.ts]",
    genres: ["Progressive"],
    links: {},
  },
  {
    id: "art-margaryan",
    slug: "margaryan",
    name: "Margaryan",
    bio: "PLACEHOLDER BIO — Margaryan appears across the label's compilations and collaborations with a raw, percussive club style. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Raw"],
    links: {},
  },
  {
    id: "art-titorenko",
    slug: "titorenko",
    name: "Titorenko",
    bio: "PLACEHOLDER BIO — Titorenko — after-hours atmospheres and machined detail across label collaborations. [Replace this text in src/data/artists.ts]",
    genres: ["Electronic"],
    links: {},
  },
  {
    id: "art-sham-jam",
    slug: "sham-jam",
    name: "Sham Jam",
    bio: "PLACEHOLDER BIO — Sham Jam contributes mirage-like house edits and percussion work to the MOLEX. & QBAS collaborations. [Replace this text in src/data/artists.ts]",
    genres: ["House"],
    links: {},
  },
  {
    id: "art-roma-busha",
    slug: "roma-busha",
    name: "Roma Busha",
    bio: "PLACEHOLDER BIO — Roma Busha brings bouncing hybrid rhythm into 'Tikita'. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic House", "Indie Dance"],
    links: {},
  },
  {
    id: "art-nenastoyashchaya",
    slug: "nenastoyashchaya",
    name: "Nenastoyashchaya",
    bio: "PLACEHOLDER BIO — Nenastoyashchaya is the voice of 'Stay Alive' — melancholic pop presence inside dark melodic techno. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno", "Vocal"],
    links: {},
  },
  {
    id: "art-vagabandos",
    slug: "vagabandos",
    name: "Vagabandos",
    bio: "PLACEHOLDER BIO — Vagabandos featured on Compilation Vol.1 with the tribal-house mover 'Capoeira'. [Replace this text in src/data/artists.ts]",
    genres: ["House"],
    links: {},
  },
  {
    id: "art-gar1sson",
    slug: "gar1sson",
    name: "Gar1sson",
    bio: "PLACEHOLDER BIO — Gar1sson co-produced 'HOT' with Margaryan on Compilation Vol.1. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno"],
    links: {},
  },
  {
    id: "art-jebby-jay",
    slug: "jebby-jay",
    name: "Jebby Jay",
    bio: "PLACEHOLDER BIO — Jebby Jay remixed Gutenn's 'Electric Soul' for the label. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno"],
    links: {},
  },
  {
    id: "art-kovax",
    slug: "kovax",
    name: "Kovax",
    bio: "PLACEHOLDER BIO — Kovax reshaped Rocco Lazzaro's 'Flow' for darker rooms. [Replace this text in src/data/artists.ts]",
    genres: ["Melodic Techno"],
    links: {},
  },
];
