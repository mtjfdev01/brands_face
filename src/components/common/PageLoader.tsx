import Loader from "./Loader";

type PageLoaderProps = {
  className?: string;
  label?: string;
  overlay?: boolean;
  compact?: boolean;
  size?: number;
  tone?: "onDark" | "onLight";
};

export default function PageLoader({
  className = "",
  label = "LOADING...",
  overlay = false,
  compact = false,
  size = 1,
  tone,
}: PageLoaderProps) {
  const resolvedTone = tone ?? "onDark";
  const onLight = resolvedTone === "onLight";
  const heightClass = overlay
    ? ""
    : compact
      ? "min-h-[240px]"
      : onLight
        ? "min-h-[40vh]"
        : "min-h-[50vh]";
  const wrap = overlay
    ? "fixed inset-0 z-[20000] flex items-center justify-center bg-[var(--dark-primary-green)]"
    : onLight
      ? `flex w-full items-center justify-center ${heightClass}`
      : `flex w-full items-center justify-center bg-[var(--dark-primary-green)] ${heightClass}`;

  return (
    <div className={`${wrap} ${className}`.trim()}>
      <Loader label={label} size={size} tone={resolvedTone} />
    </div>
  );
}
