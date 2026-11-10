/**
 * Prefix a public-dir asset path with the Vite base URL so images keep
 * working on sub-path deployments (GitHub Pages project site /qrsoundsite/).
 * External URLs, data: and blob: are passed through untouched.
 *
 *   asset("/images/releases/citadel.jpg")
 *   → "/images/releases/citadel.jpg"          (base "/")
 *   → "/qrsoundsite/images/..." (base "/qrsoundsite/")
 */
export function asset(path: string | undefined): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // "" or "/qrsoundsite"
  return base + (path.startsWith("/") ? path : "/" + path);
}
