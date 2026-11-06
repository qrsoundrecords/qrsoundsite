/** Email & URL validation for the demo submission form. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export const DEMO_GENRES = [
  "Melodic Techno",
  "Melodic House & Techno",
  "Indie Dance",
  "House",
  "Progressive",
  "Other (describe in message)",
] as const;
