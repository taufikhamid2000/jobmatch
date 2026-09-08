// JobMatch mark: two interlocking diamond tiles, offset and overlapping —
// a simple, geometric read on "match" (two sides meeting). Indigo on
// purpose (see globals.css --primary). Inline SVG, no icon-library
// dependency, per DESIGN.md's auth-branding-panel convention.
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" fill="#4338ca" />
      <rect x="7" y="7" width="14" height="14" rx="3" transform="rotate(45 14 14)" fill="#e0e7ff" fillOpacity="0.55" />
      <rect x="11" y="11" width="14" height="14" rx="3" transform="rotate(45 18 18)" fill="#e0e7ff" />
    </svg>
  );
}
