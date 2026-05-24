"use client";

type Props = {
  title: string;
  count?: number;
  required?: boolean;
  onClick: () => void;
};

export default function AccordionPickerCard({ title, count, required, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full min-h-[108px] w-full flex-col justify-between rounded-2xl border border-[var(--dark-primary-green)]/10 bg-white p-4 text-left shadow-[0_6px_24px_rgba(16,58,42,0.05)] transition-[border-color,box-shadow,transform] hover:border-[var(--light-green)]/35 hover:shadow-[0_10px_32px_rgba(16,58,42,0.08)] active:scale-[0.99] sm:p-5"
    >
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
    </button>
  );
}
