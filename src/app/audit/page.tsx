import type { Metadata } from "next";
import AuditRequestPage from "@/components/audit/AuditRequestPage";

export const metadata: Metadata = {
  title: "Packaging Audit Request | Brands Face",
  description:
    "Request a packaging audit. Share your current packaging details, goals, and files to receive actionable recommendations.",
};

export default function AuditPage() {
  return <AuditRequestPage />;
}
