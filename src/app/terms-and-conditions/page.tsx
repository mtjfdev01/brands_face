import type { Metadata } from "next";
import PolicyPageLayout from "@/components/legal/PolicyPageLayout";
import { LEGAL_DOCS_LAST_UPDATED } from "@/data/siteContact";

export const metadata: Metadata = {
  title: "Terms & Conditions | Brands Face",
  description: "Terms governing use of the Brands Face website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyPageLayout title="Terms & Conditions" kicker="Legal" lastUpdated={LEGAL_DOCS_LAST_UPDATED}>
      <p>
        These terms apply to your use of the Brands Face website and to general engagements unless superseded by a
        signed contract or purchase order. Please read them carefully.
      </p>
      <h2>Use of the website</h2>
      <p>
        You agree to use the site lawfully and not to misuse it (including attempting unauthorised access, scraping
        beyond normal browsing, or distributing malware). Content on this site is provided for information and may
        change without notice.
      </p>
      <h2>Quotes and orders</h2>
      <p>
        Quotes are invitations to treat unless otherwise stated. Specifications, pricing, lead times, and
        deliverables are confirmed in written orders or contracts. Samples and production batches may vary within
        agreed tolerances for materials and print.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Unless agreed in writing, you retain rights to your trademarks and artwork you supply. We retain rights to our
        own methods, tools, and pre-existing materials. Project-specific deliverables are governed by your agreement
        with us.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of the
        site. Liability for direct loss is capped as set out in your contract, or otherwise at fees paid in the twelve
        months preceding the claim, where no contract exists.
      </p>
      <h2>Governing law</h2>
      <p>Disputes are subject to the laws and courts of the jurisdiction stated in your primary agreement with Brands Face, or as otherwise required by applicable law.</p>
    </PolicyPageLayout>
  );
}
