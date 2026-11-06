import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("404 — signal lost");
  return (
    <div className="mx-auto grid min-h-[75vh] max-w-[1200px] place-items-center px-5 text-center md:px-10">
      <div>
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-pink">Error 404</p>
        <h1 className="stencil mt-5 text-[clamp(3rem,9vw,6.5rem)] leading-none">
          Signal lost
        </h1>
        <p className="mono mx-auto mt-6 max-w-[380px] text-[11px] uppercase leading-[2] tracking-[0.2em] text-faint">
          This frequency does not exist. Return to the main structure and scan again.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/" className="btn btn-solid">
            <span className="flex items-center gap-3">Back to the cube</span>
          </Link>
          <Link to="/releases" className="btn btn-ghost">
            <span className="flex items-center gap-3">Browse releases</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
