import type { CategoryLayoutIcon } from "./categoriesLayoutData";

const ICON_CLASS = "h-4 w-4";

export function CategoryIcon({ type }: { type: CategoryLayoutIcon }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c5a059]/45 text-[#c5a059]"
      aria-hidden
    >
      {type === "rigid" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M12 2l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 7v10l9 5 9-5V7" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : type === "corrugated" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M4 8h16v12H4V8Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : type === "pouch" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M8 4h8l2 16H6l2-16Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ) : type === "bag" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M8 8V6a4 4 0 118 0v2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 8h14l-1 14H6L5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ) : type === "kraft" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M12 3c3 4 7 6 7 10a7 7 0 11-14 0c0-4 4-6 7-10Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : type === "label" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M4 6h12l4 4v8H4V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
        </svg>
      ) : type === "christmas" ? (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
          <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 8h8M8 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
