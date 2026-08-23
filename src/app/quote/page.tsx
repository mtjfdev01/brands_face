import type { Metadata } from "next";
import GetQuotePage from "@/components/quote/GetQuotePage";

export const metadata: Metadata = {
  title: "Get a Custom Quote | Brands Face",
  description:
    "Request a custom packaging quote. Share your contact number and requirements — we'll get back to you soon.",
};

export default function QuotePage() {
  return <GetQuotePage />;
}
