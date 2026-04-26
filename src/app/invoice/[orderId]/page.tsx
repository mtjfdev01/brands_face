import { Suspense } from "react";
import type { Metadata } from "next";
import InvoiceView from "./InvoiceView";

export const metadata: Metadata = {
  title: "Invoice",
  robots: { index: false, follow: false },
};

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-600">
          <p>Loading…</p>
        </div>
      }
    >
      <InvoiceView />
    </Suspense>
  );
}
