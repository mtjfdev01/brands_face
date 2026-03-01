import type { Metadata } from "next";
import GetQuotePage from "@/components/quote/GetQuotePage";

export const metadata: Metadata = {
  title: "Get a Custom Quote | Brands Face",
  description:
    "Request a custom packaging quote. Choose materials, finishes, dimensions, and quantities — we'll respond within 24 hours with a tailored quote.",
};

export default function QuotePage() {
  return <GetQuotePage />;
}
