"use client";

import { useCallback, useState } from "react";
import { SITE_BANK_DETAILS } from "@/data/siteContact";

const ROWS = [
  {
    label: "Account title",
    value: SITE_BANK_DETAILS.accountTitle,
    valueWrap: "break-words",
  },
  {
    label: "Account #",
    value: SITE_BANK_DETAILS.accountNumber,
    valueWrap: "whitespace-nowrap",
  },
  {
    label: "IBAN",
    value: SITE_BANK_DETAILS.iban,
    valueWrap: "break-all",
  },
  {
    label: "Bank",
    value: SITE_BANK_DETAILS.bankName,
    valueWrap: "whitespace-nowrap",
  },
] as const;

function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

type Props = {
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  layout?: "stack" | "grid";
  onDarkBackground?: boolean;
};

export default function BankDetails({
  className = "space-y-2 text-sm",
  labelClassName = "text-xs font-semibold uppercase tracking-wide opacity-70",
  valueClassName = "font-medium",
  layout = "stack",
  onDarkBackground = false,
}: Props) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const copyValue = useCallback(async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel((current) => (current === label ? null : current)), 2000);
    } catch {
      setCopiedLabel(null);
    }
  }, []);

  const gridClass =
    layout === "grid"
      ? "grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1.4fr)_minmax(0,2.15fr)_minmax(0,0.95fr)]"
      : className;

  const copyBtnClass = [
    "shrink-0 rounded p-1 text-inherit opacity-55 transition hover:opacity-100",
    "focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#103a2a]/40",
    onDarkBackground ? "hover:bg-white/10" : "hover:bg-[#103a2a]/10 hover:text-[#103a2a]",
  ].join(" ");

  return (
    <dl className={gridClass}>
      {ROWS.map(({ label, value, valueWrap }) => {
        const copied = copiedLabel === label;
        return (
          <div key={label} className="min-w-0">
            <dt className={labelClassName}>{label}</dt>
            <dd className={`${valueClassName} mt-1`}>
              <span className="inline-flex max-w-full items-center gap-1">
                <span className={valueWrap}>{value}</span>
                <button
                  type="button"
                  onClick={() => void copyValue(label, value)}
                  className={copyBtnClass}
                  aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
                  title={copied ? "Copied" : "Copy to clipboard"}
                >
                  {copied ? (
                    <svg
                      className="h-4 w-4 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <CopyIcon />
                  )}
                </button>
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
