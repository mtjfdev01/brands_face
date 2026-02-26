"use client";

type Props = {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
};

export default function OptionCard({
  label,
  description,
  selected,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border-2 p-4 transition-all duration-200 ${
        selected
          ? "border-[var(--color-brand-primary)] bg-gray-50 shadow-sm"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <p
        className={`text-base font-medium ${
          selected ? "text-gray-900" : "text-gray-700"
        }`}
      >
        {label}
      </p>
      {description && (
        <p className="mt-1 text-sm leading-snug text-gray-400">
          {description}
        </p>
      )}
    </button>
  );
}
