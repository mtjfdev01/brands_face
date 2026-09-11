import { Suspense } from "react";
import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import PageLoader from "@/components/common/PageLoader";
import InvoiceView from "./InvoiceView";

export const metadata: Metadata = {
  title: "Invoice",
  robots: { index: false, follow: false },
};

export default function InvoicePage() {
  return (
    <Suspense
      fallback={<PageLoader overlay />}
    >
      <InvoiceView />
      <Footer />
    </Suspense>
  );
}
