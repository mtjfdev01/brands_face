import type { Metadata } from "next";
import PolicyPageLayout from "@/components/legal/PolicyPageLayout";
import { LEGAL_DOCS_LAST_UPDATED } from "@/data/siteContact";

export const metadata: Metadata = {
  title: "Shipping Policy | Brands Face",
  description: "Delivery, freight, and risk for Brands Face packaging shipments.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPageLayout title="Shipping Policy" kicker="Legal" lastUpdated={LEGAL_DOCS_LAST_UPDATED}>
      <p>
        Shipping terms are confirmed per order (Incoterms, carrier, and timeline). This page summarises typical
        arrangements for custom packaging.
      </p>
      <h2>Lead times</h2>
      <p>
        Quoted lead times start after approved artwork, deposit (if any), and material availability. Delays caused by
        force majeure, customs, or carrier congestion may extend delivery without liability beyond what your contract
        allows.
      </p>
      <h2>Freight and insurance</h2>
      <p>
        Unless otherwise agreed, freight charges, duties, and insurance are as stated on your invoice. Risk in the
        goods passes according to the agreed Incoterm or, if none is stated, when handed to the first carrier.
      </p>
      <h2>Inspection</h2>
      <p>Inspect shipments on receipt where possible. Note any external damage on the delivery document and notify us promptly with photos.</p>
      <h2>Partial shipments</h2>
      <p>We may ship in instalments when agreed; charges may apply per shipment as set out in your order.</p>
    </PolicyPageLayout>
  );
}
