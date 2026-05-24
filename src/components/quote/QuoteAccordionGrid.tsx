"use client";

import { useCallback, useState, type ReactNode } from "react";
import AccordionSection from "@/components/quote/AccordionSection";

export type QuoteAccordionSection = {
  id: string;
  title: string;
  count?: number;
  required?: boolean;
  content: ReactNode;
};

type Props = {
  sections: QuoteAccordionSection[];
};

export default function QuoteAccordionGrid({ sections }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const isOpen = useCallback((id: string) => openIds.has(id), [openIds]);

  const setOpen = useCallback((id: string, open: boolean) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {sections.map((section) => {
        const open = isOpen(section.id);
        return (
          <div
            key={section.id}
            className={[
              "transition-[grid-column] duration-300 ease-out",
              open ? "col-span-1 sm:col-span-2 xl:col-span-3" : "",
            ].join(" ")}
          >
            <AccordionSection
              title={section.title}
              count={section.count}
              required={section.required}
              open={open}
              onOpenChange={(next) => setOpen(section.id, next)}
              compactWhenClosed
            >
              {section.content}
            </AccordionSection>
          </div>
        );
      })}
    </div>
  );
}
