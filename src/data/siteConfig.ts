/**
 * Site-wide configuration. Edit this file to update contacts, genres and
 * homepage settings without touching component code.
 */
export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  email: string;
  demoEmail: string;
  logo: string;
  favicon: string;
  social: {
    label: string;
    url: string;
  }[];
  genres: string[];
  /** Accent color per genre — driven by the label artwork palette. */
  genreAccents: Record<string, string>;
  cube: {
    rotationSpeed: number;
    hint: string;
  };
  latestReleaseSlug: string;
}

export const siteConfig: SiteConfig = {
  name: "QR Sound Records",
  shortName: "QR SOUND",
  tagline: "Independent Electronic Music Label",
  location: "İstanbul",
  email: "qrsoundrecords@gmail.com",
  demoEmail: "qrsoundrecords@gmail.com",
  logo: "/images/logo/logo.png",
  favicon: "/images/logo/logo.png",
  social: [
    { label: "Bandcamp", url: "https://qrsoundrecords.bandcamp.com" },
    { label: "SoundCloud", url: "https://soundcloud.com/user-765734988" }, // TODO: replace with the real label profile URL
    { label: "Instagram", url: "https://instagram.com/qrsoundrecords" }, // TODO: replace with the real profile URL
    { label: "YouTube", url: "https://www.youtube.com/results?search_query=qrsoundrecords" }, // TODO: replace with the real channel URL
  ],
  genres: ["Melodic Techno", "Melodic House", "Indie Dance", "House", "Electronic"],
  genreAccents: {
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
  },
  cube: {
    rotationSpeed: 0.14,
    hint: "ROTATE TO EXPLORE",
  },
  latestReleaseSlug: "love-is",
};

/** Platform link display/label order used on release & artist pages. */
export const PLATFORM_LABELS: Record<string, string> = {
  bandcamp: "Bandcamp",
  spotify: "Spotify",
  appleMusic: "Apple Music",
  beatport: "Beatport",
  soundcloud: "SoundCloud",
  youtube: "YouTube",
  deezer: "Deezer",
  traxsource: "Traxsource",
};
