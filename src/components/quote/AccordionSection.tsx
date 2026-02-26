"use client";

import { useState } from "react";

type Props = {
  title: string;
  count?: number;
  required?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function AccordionSection({
  title,
  count,
  required = false,
  defaultOpen = true,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
          {count !== undefined && (
            <span className="ml-2 text-gray-400 font-normal text-base">{count}</span>
          )}
          {required && <span className="ml-1 text-red-500">*</span>}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
