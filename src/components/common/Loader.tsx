import styles from "./Loader.module.css";

type LoaderProps = {
  className?: string;
  /** Pixel unit for the CSS `--size` scale. Default `1` is the overlay mark. */
  size?: number;
  label?: string;
  /** `onDark` = cream type (default). `onLight` = brand green type. */
  tone?: "onDark" | "onLight";
};

const LIGHT_SRC = "/assets/images/ui/loader-light.png";

export default function Loader({
  className = "",
  size = 1,
  label = "LOADING...",
  tone = "onDark",
}: LoaderProps) {
  return (
    <span
      className={`${styles.loader} ${className}`.trim()}
      style={{ ["--size" as string]: `${size}px` }}
      data-tone={tone}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={styles.jewel} aria-hidden>
        <span className={styles.glow} />
        <span className={styles.ring} />
        <span className={styles.ringInner} />
        <img src={LIGHT_SRC} alt="" className={styles.light} />
      </span>
      <span className={styles.label}>{label}</span>
    </span>
  );
}
