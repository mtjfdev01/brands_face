import { SITE_BANK_DETAILS } from "@/data/siteContact";

const ROWS = [
  { label: "Account title", value: SITE_BANK_DETAILS.accountTitle },
  { label: "Account #", value: SITE_BANK_DETAILS.accountNumber },
  { label: "IBAN", value: SITE_BANK_DETAILS.iban },
  { label: "Bank", value: SITE_BANK_DETAILS.bankName },
] as const;

type Props = {
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export default function BankDetails({
  className = "space-y-2 text-sm",
  labelClassName = "text-xs font-semibold uppercase tracking-wide opacity-70",
  valueClassName = "font-medium break-all",
}: Props) {
  return (
    <dl className={className}>
      {ROWS.map(({ label, value }) => (
        <div key={label}>
          <dt className={labelClassName}>{label}</dt>
          <dd className={valueClassName}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
