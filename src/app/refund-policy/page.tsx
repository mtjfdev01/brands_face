import type { Metadata } from "next";
import PolicyPageLayout from "@/components/legal/PolicyPageLayout";
import { LEGAL_DOCS_LAST_UPDATED } from "@/data/siteContact";

export const metadata: Metadata = {
  title: "Refund Policy | Brands Face",
  description: "Refunds, cancellations, and credits for Brands Face packaging orders.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPageLayout title="Refund Policy" kicker="Legal" lastUpdated={LEGAL_DOCS_LAST_UPDATED}>
      <p>
        Packaging is typically custom-made. Refunds and credits therefore depend on production stage, fault, and the
        terms in your order confirmation. The following is a general framework.
      </p>
      <h2>Before production</h2>
      <p>
        If you cancel before materials are committed or production has started, we may refund or credit deposits minus
        any design, sampling, or admin costs already incurred, as stated in your quote.
      </p>
      <h2>After production starts</h2>
      <p>
        Once production has begun, orders are generally non-refundable except where we fail to meet agreed written
        specifications and cannot remedy the issue within a reasonable time.
      </p>
      <h2>Defects and quality</h2>
      <p>
        Report visible defects within the period stated in your order (or within seven days of delivery if none is
        stated). We may replace, rework, or credit at our discretion in line with the contract and industry practice
        for custom goods.
      </p>
      <h2>How to request a review</h2>
      <p>Contact your project manager or use our Support page with your order reference, photos, and a short description of the issue.</p>
    </PolicyPageLayout>
  );
}
