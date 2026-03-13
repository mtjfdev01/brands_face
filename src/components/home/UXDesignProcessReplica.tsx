"use client";

type ProcessStep = {
  title: string;
  subtitle: string;
  x: string;
  y: string;
  iconColor: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discover",
    subtitle: "Learn about user",
    x: "11.5%",
    y: "59.5%",
    iconColor: "#d2d4dc",
  },
  {
    title: "Define",
    subtitle: "Determine features",
    x: "28.5%",
    y: "78.5%",
    iconColor: "#8fd9e4",
  },
  {
    title: "Ideate",
    subtitle: "Brainstorm solutions",
    x: "49.5%",
    y: "83.5%",
    iconColor: "#d4d7df",
  },
  {
    title: "Prototype",
    subtitle: "Simulate user experience",
    x: "66.5%",
    y: "77.5%",
    iconColor: "#ffb07d",
  },
  {
    title: "Test",
    subtitle: "Validate with user",
    x: "87.5%",
    y: "58.5%",
    iconColor: "#f6c4cc",
  },
];

function Plane({
  className,
  colorFrom,
  colorTo,
}: {
  className: string;
  colorFrom: string;
  colorTo: string;
}) {
  return (
    <div
      className={`absolute h-10 w-14 drop-shadow-[0_8px_12px_rgba(0,0,0,0.1)] md:h-16 md:w-24 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
        clipPath: "polygon(0 58%, 100% 0, 62% 100%, 43% 63%)",
      }}
      aria-hidden
    />
  );
}

function StepIcon({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-4 w-4 rounded-full"
      style={{
        background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${color} 75%)`,
        boxShadow: "0 0 0 1px rgba(16, 58, 42, 0.08)",
      }}
      aria-hidden
    />
  );
}

export default function UXDesignProcessReplica() {
  return (
    <section className="w-full bg-[#f6f7f9] px-4 py-10 sm:px-6 md:py-12 lg:px-10">
      <div className="mx-auto max-w-[1240px] px-2 sm:px-4">
        <div className="mb-3 hidden items-start justify-start md:flex">
          <div className="text-left leading-none">
            <p className="text-[32px] font-black tracking-tight text-[#18253d]">CODIANT</p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-[#6d7585]">A YASH TECHNOLOGIES COMPANY</p>
          </div>
        </div>

        <h2 className="text-center text-4xl font-extrabold tracking-tight text-[#0d1f4e] sm:text-5xl md:text-[66px] md:leading-[0.96]">
          <span className="mr-2 text-[#ff4c65]">UX</span>
          <span>Design</span>
          <br />
          <span>Process</span>
        </h2>

        <div className="relative mt-2 hidden h-[310px] md:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 360"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M95 222 C 248 185, 390 238, 535 204 C 662 174, 774 212, 900 164 C 978 136, 1046 135, 1116 146"
              stroke="#d8dce6"
              strokeWidth="2.2"
              strokeDasharray="2.2 8"
              strokeLinecap="round"
            />
            <path
              d="M902 162 C 978 136, 1043 135, 1113 145"
              stroke="#eceef4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M1108 141 L1122 146 L1111 157"
              stroke="#eceef4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Plane className="left-[11%] top-[31%] rotate-[-12deg]" colorFrom="#061a63" colorTo="#082778" />
          <Plane className="left-[29.5%] top-[51%] rotate-[8deg]" colorFrom="#43d4e1" colorTo="#5dc4d1" />
          <Plane className="left-[49%] top-[58%] rotate-[9deg] opacity-65" colorFrom="#cadce2" colorTo="#aac3cb" />
          <Plane className="left-[67.2%] top-[49.5%] rotate-[3deg]" colorFrom="#ff8e42" colorTo="#ff6e2d" />
          <Plane className="left-[85%] top-[31%] rotate-[11deg]" colorFrom="#ff4f70" colorTo="#ea2f4f" />

          {PROCESS_STEPS.map((step) => (
            <article
              key={step.title}
              className="absolute -translate-x-1/2 text-left"
              style={{ left: step.x, top: step.y }}
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-1">
                  <StepIcon color={step.iconColor} />
                </span>
                <div>
                  <h3 className="text-[20px] leading-none font-black tracking-tight text-[#0c1b4e] lg:text-[24px]">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-[180px] text-[14px] leading-[1.22] text-[#7f8798] lg:text-[15px]">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:hidden">
          {PROCESS_STEPS.map((step, idx) => (
            <article
              key={step.title}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_30px_rgba(5,20,40,0.07)]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1">
                  <StepIcon color={step.iconColor} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-[#0c1b4e]">
                    {idx + 1}. {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#7f8798]">{step.subtitle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
