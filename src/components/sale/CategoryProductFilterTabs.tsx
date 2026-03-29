"use client";

import type { CategoryTab } from "@/data/categoryPages";

type Props = {
  tabs: CategoryTab[];
  activeId: string;
  onChange: (tabId: string) => void;
};

/**
 * Pill tab bar (reference: category page filters). Forest theme to match site.
 */
export default function CategoryProductFilterTabs({ tabs, activeId, onChange }: Props) {
  if (tabs.length === 0) return null;

  return (
    <div
      className="mb-8 flex justify-center px-4"
      role="tablist"
      aria-label="Filter products by type"
    >
      <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-[#103a2a]/15 bg-white p-1.5 shadow-sm sm:gap-1.5">
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`category-tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ease-out motion-reduce:transition-none sm:px-5 sm:text-sm ${
                selected
                  ? "bg-[#103a2a] text-white shadow-sm"
                  : "text-[#103a2a] hover:bg-[#103a2a]/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
