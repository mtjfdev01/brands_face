// components/promo/PromoCard.tsx
import Image from "next/image";
import Link from "next/link";

export type PromoSlide = {
  id: string;
  tag: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  bgClass: string; // e.g. "bg-sky-100"
  textClass?: string; // e.g. "text-white"
  imageSrc: string; // e.g. "/promo/promo1.png"
  imageAlt: string;
};

export default function PromoCard({ slide }: { slide: PromoSlide }) {
  const isDark = slide.textClass?.includes("text-white");

  return (
    <div
      className={[
        "relative h-[520px] w-full overflow-hidden rounded-3xl",
        slide.bgClass,
        slide.textClass ?? "text-slate-900",
      ].join(" ")}
    >
      {/* Content */}
      <div className="flex h-full flex-col p-8 md:p-10">
        {/* Top text */}
        <div className="max-w-[30rem]">
          <div
            className={[
              "text-xs font-semibold tracking-[0.18em]",
              isDark ? "text-white/70" : "text-slate-600",
            ].join(" ")}
          >
            {slide.tag}
          </div>

          <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            {slide.title}
          </h3>

          <p
            className={[
              "mt-5 text-base leading-relaxed md:text-lg",
              isDark ? "text-white/75" : "text-slate-600",
            ].join(" ")}
          >
            {slide.description}
          </p>

          <div className="mt-6">
            <Link
              href={slide.href}
              className={[
                "inline-block text-base underline underline-offset-4",
                isDark ? "text-white/80 hover:text-white" : "text-slate-700 hover:text-slate-900",
              ].join(" ")}
            >
              {slide.linkText}
            </Link>
          </div>
        </div>

        {/* Bottom image area */}
        <div className="relative mt-6 flex flex-1 items-end justify-center">
          {/* group => hover zoom only image */}
          <div className="group relative h-[240px] w-full max-w-[360px]">
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              sizes="(max-width: 768px) 70vw, 360px"
              className="origin-bottom object-contain transition-transform duration-500 ease-out will-change-transform group-hover:scale-125"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
