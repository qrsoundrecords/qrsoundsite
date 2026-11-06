import { useEffect, useMemo, useState } from "react";
import { searchCatalog } from "@/lib/catalog";
import type { SearchHit } from "@/types";

/** Debounced instant search over the label catalogue. */
export function useSearch(query: string, delay = 120): {
  hits: SearchHit[];
  loading: boolean;
} {
  const [loading, setLoading] = useState(false);
  const hits = useMemo(() => searchCatalog(query), [query]);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [query, delay]);

  return { hits, loading };
}
