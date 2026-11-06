import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost";

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = "ghost",
  className = "",
  ariaLabel,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `btn ${variant === "solid" ? "btn-solid" : "btn-ghost"} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function ArrowCTA({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-3">
      {label}
      <ArrowRight size={14} strokeWidth={1.5} />
    </span>
  );
}
