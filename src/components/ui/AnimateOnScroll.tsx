"use client";

import { useRef, useEffect, type ReactNode } from "react";

type AnimationType =
  | "fade-up"
  | "fade-in"
  | "scale-in"
  | "slide-left"
  | "slide-right"
  | "blur-in";

type Props = {
  children: ReactNode;
  animation?: AnimationType;
  /** Stagger child animations (adds incremental delay to each child) */
  stagger?: boolean;
  /** Extra CSS classes */
  className?: string;
  /** Viewport threshold 0–1 (default 0.15) */
  threshold?: number;
  /** Delay before animation starts in ms */
  delay?: number;
  /** HTML tag to render (default "div") */
  as?: keyof JSX.IntrinsicElements;
};

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  stagger = false,
  className = "",
  threshold = 0.15,
  delay = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.classList.remove("anim-ready");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add("anim-visible"), delay);
          } else {
            el.classList.add("anim-visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  const animClass = `anim-${animation}`;
  const staggerClass = stagger ? "anim-stagger" : "";

  // We use a type assertion since we know Tag is a valid HTML element
  const Element = Tag as React.ElementType;

  return (
    <Element
      ref={ref}
      className={`anim-ready ${animClass} ${staggerClass} ${className}`}
    >
      {children}
    </Element>
  );
}
