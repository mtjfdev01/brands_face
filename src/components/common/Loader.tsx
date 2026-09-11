import styles from "./Loader.module.css";

type LoaderProps = {
  className?: string;
  /** Pixel unit for the CSS `--size` scale. Default `1` matches the original 48px type. */
  size?: number;
  label?: string;
  /** `onDark` = white type (default). `onLight` = brand green type. */
  tone?: "onDark" | "onLight";
};

export default function Loader({
  className = "",
  size = 1,
  label = "Loading",
  tone = "onDark",
}: LoaderProps) {
  return (
    <span
      className={`${styles.loader} ${className}`.trim()}
      style={{ ["--size" as string]: `${size}px` }}
      data-label={label}
      data-tone={tone}
      role="status"
      aria-live="polite"
      aria-label={label}
    />
  );
}
