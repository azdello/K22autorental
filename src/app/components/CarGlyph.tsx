// Minimal side-profile car silhouette, drawn in a 24x14 coordinate box.
// Rendered as SVG shapes only (no wrapping <svg>), so it can be embedded
// either inside another <svg> (hero route) or wrapped in its own small
// <svg> (route timeline).
export default function CarGlyph({ className }: { className?: string }) {
  return (
    <g className={className}>
      <rect x="1.5" y="5" width="21" height="5" rx="2.2" fill="currentColor" />
      <rect x="6" y="1.3" width="10" height="4.2" rx="1.4" fill="currentColor" />
      <circle cx="7" cy="11.2" r="2" fill="currentColor" />
      <circle cx="17" cy="11.2" r="2" fill="currentColor" />
    </g>
  );
}
