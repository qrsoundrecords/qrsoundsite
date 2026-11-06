import { useEffect } from "react";

/** Sets document title, description and OG tags per page (SEO). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const full = title === "home" ? "QR Sound Records — Independent Electronic Music Label" : `${title} — QR Sound Records`;
    document.title = full;
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", full);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", description);
    }
  }, [title, description]);
}
