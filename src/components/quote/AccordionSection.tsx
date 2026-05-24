"use client";

import { useState } from "react";

type Props = {
  title: string;
  count?: number;
  required?: boolean;
  defaultOpen?: boolean;
  /** Controlled open state (used by quote grid layout). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @deprecated Use onOpenChange(false) instead */
  onClose?: () => void;
  /** Collapsed state matches quote grid picker cards. */
  compactWhenClosed?: boolean;
  children: React.ReactNode;
};

export default function AccordionSection({
  title,
  count,
  required = false,
  defaultOpen = true,
  open: openControlled,
  onOpenChange,
  onClose,
  compactWhenClosed = false,
  children,
}: Props) {
  const [openInternal, setOpenInternal] = useState(defaultOpen);
  const isControlled = openControlled !== undefined;
  const open = isControlled ? openControlled : openInternal;

  const setOpen = (next: boolean) => {
    if (isControlled) {
      onOpenChange?.(next);
      if (!next) onClose?.();
    } else {
      setOpenInternal(next);
    }
  };

  const toggle = () => setOpen(!open);

  const compact = compactWhenClosed && !open;

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border bg-white",
        "transition-[box-shadow,border-color,min-height] duration-300 ease-out",
        open
          ? "border-[var(--light-green)]/35 shadow-[0_12px_40px_rgba(16,58,42,0.08)] ring-1 ring-[var(--light-green)]/20"
          : "min-h-[108px] border-[var(--dark-primary-green)]/10 shadow-[0_6px_24px_rgba(16,58,42,0.05)] hover:border-[var(--dark-primary-green)]/18 hover:shadow-[0_10px_32px_rgba(16,58,42,0.07)]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={[
          "group w-full text-left transition-colors",
          compact
            ? "flex h-full min-h-[108px] flex-col justify-between p-4 sm:p-5"
            : "flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5",
        ].join(" ")}
      >
        {compact ? (
          <>
            <span className="flex items-start justify-between gap-2">
              <span className="text-sm font-bold leading-snug text-[var(--dark-primary-green)] sm:text-base">
                {title}
                {required ? <span className="ml-0.5 text-red-500">*</span> : null}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--dark-primary-green)]/10 bg-[var(--primary-cream)] text-[var(--dark-primary-green)]/60 transition-colors group-hover:border-[var(--light-green)]/30 group-hover:text-[var(--dark-primary-green)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </span>
            <span className="mt-3 flex flex-wrap items-center gap-2">
              {count !== undefined ? (
                <span className="rounded-full bg-[var(--dark-primary-green)]/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--dark-primary-green)]/60 sm:text-xs">
                  {count} options
                </span>
              ) : null}
              <span className="text-[10px] font-medium text-[var(--dark-primary-green)]/45 sm:text-xs">Tap to open</span>
            </span>
          </>
        ) : (
          <>
            <span
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-[transform,colors] duration-300",
                open
                  ? "border-[var(--light-green)]/30 bg-[var(--light-green)]/10 text-[var(--dark-primary-green)]"
                  : "border-[var(--dark-primary-green)]/10 bg-[var(--primary-cream)] text-[var(--dark-primary-green)]/70 group-hover:border-[var(--dark-primary-green)]/15",
              ].join(" ")}
            >
              <svg
                className={`h-5 w-5 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-base font-bold text-[var(--dark-primary-green)] sm:text-lg">{title}</span>
                {required ? <span className="text-sm font-bold text-red-500">*</span> : null}
                {count !== undefined ? (
                  <span className="rounded-full bg-[var(--dark-primary-green)]/8 px-2.5 py-0.5 text-xs font-semibold text-[var(--dark-primary-green)]/65">
                    {count} options
                  </span>
                ) : null}
              </span>
              <span className="mt-1 block text-xs text-[var(--dark-primary-green)]/50 transition-opacity duration-300 sm:text-sm">
                {open ? "Expanded — fill in below" : "Click to expand"}
              </span>
            </span>
          </>
        )}
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div
            className={[
              "border-t border-[var(--dark-primary-green)]/8 px-5 pb-5 pt-4 sm:px-6 sm:pb-6",
              "transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
              open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
            ].join(" ")}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
