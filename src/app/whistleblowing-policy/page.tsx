import type { Metadata } from "next";
import PolicyPageLayout from "@/components/legal/PolicyPageLayout";
import { LEGAL_DOCS_LAST_UPDATED } from "@/data/siteContact";

export const metadata: Metadata = {
  title: "Whistleblowing Policy | Brands Face",
  description: "How to report concerns safely and confidentially at Brands Face.",
};

export default function WhistleblowingPolicyPage() {
  return (
    <PolicyPageLayout
      title="Whistleblowing Policy"
      kicker="Governance"
      lastUpdated={LEGAL_DOCS_LAST_UPDATED}
    >
      <p>
        Brands Face is committed to lawful and ethical conduct. If you become aware of serious wrongdoing related to
        our business, this policy explains how you can raise it.
      </p>
      <h2>What to report</h2>
      <p>Examples include fraud, bribery, major safety violations, harassment, or breaches of law that affect our operations or stakeholders.</p>
      <h2>How to report</h2>
      <p>
        Reports may be sent in writing to the official company contact or designated compliance inbox provided to staff
        and partners. Where local law requires a channel to a regulator, you may use that route as well.
      </p>
      <h2>Confidentiality and non-retaliation</h2>
      <p>
        We treat reports seriously and aim to protect confidentiality where consistent with investigation needs and
        law. Retaliation against anyone raising a genuine concern in good faith is not tolerated.
      </p>
      <h2>Good faith</h2>
      <p>Knowingly false reports may be treated as misconduct. This policy does not replace employment contracts or statutory rights.</p>
    </PolicyPageLayout>
  );
}
