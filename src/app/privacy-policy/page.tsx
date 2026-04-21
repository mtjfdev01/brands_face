import type { Metadata } from "next";
import PolicyPageLayout from "@/components/legal/PolicyPageLayout";
import { LEGAL_DOCS_LAST_UPDATED } from "@/data/siteContact";

export const metadata: Metadata = {
  title: "Privacy Policy | Brands Face",
  description: "How Brands Face collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout title="Privacy Policy" kicker="Legal" lastUpdated={LEGAL_DOCS_LAST_UPDATED}>
      <p>
        This policy describes how Brands Face (“we”, “us”) handles personal and business information when you use our
        website, request quotes, or work with us on packaging projects. It is a general summary; your agreement or
        statement of work may add further terms.
      </p>
      <h2>Information we may collect</h2>
      <p>
        We may collect contact details (name, company, email, phone), project requirements, files you upload, and
        technical data such as IP address and browser type to operate and secure our services.
      </p>
      <h2>How we use information</h2>
      <p>We use this information to respond to enquiries, prepare quotes, deliver services, improve our website, and comply with law.</p>
      <h2>Sharing</h2>
      <p>
        We do not sell your personal data. We may share information with service providers who assist our operations
        (for example hosting or analytics) under appropriate safeguards, or when required by law.
      </p>
      <h2>Retention & security</h2>
      <p>
        We retain information only as long as needed for the purposes above and apply reasonable technical and
        organisational measures to protect it.
      </p>
      <h2>Your choices</h2>
      <p>
        Where applicable, you may request access, correction, or deletion of your personal data, subject to legal
        exceptions. Contact us through the channels listed on our Support page.
      </p>
      <h2>Updates</h2>
      <p>We may update this page from time to time. Continued use of the site after changes constitutes acceptance of the revised policy.</p>
    </PolicyPageLayout>
  );
}
