"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccordionSection from "./AccordionSection";
import OptionCard from "./OptionCard";

/* ── Option data ── */

const MATERIALS = [
  { id: "plain-white", label: "Plain White", desc: "Economical single-side coated cardstock" },
  { id: "metalized", label: "Metalized", desc: "Premium metallic foil effect surface" },
  { id: "clear", label: "Clear / Large", desc: "Transparent, excellent for window boxes" },
  { id: "eco-style", label: "Eco-Style+One", desc: "100% recyclable, premium kraft texture" },
  { id: "foil", label: "Foil", desc: "Excellent metallic, premium and lustrous" },
  { id: "kraft", label: "Kraft", desc: "Natural kraft, earthy premium feel" },
];

const THICKNESSES = [
  { id: "60", label: "60 microns", desc: "Ultra-light" },
  { id: "80", label: "80 microns", desc: "Lightweight" },
  { id: "100", label: "100 microns", desc: "Standard" },
  { id: "110", label: "110 microns", desc: "Medium" },
  { id: "130", label: "130 microns", desc: "Sturdy" },
  { id: "150", label: "150 microns", desc: "Heavy-duty" },
  { id: "140", label: "140 microns", desc: "Premium" },
  { id: "180", label: "180 microns", desc: "Extra rigid" },
];

const ADDONS = [
  { id: "tear-notch", label: "Tear Notch", desc: "Easy-open for consumer convenience" },
  { id: "hang-hole", label: "Hang Hole", desc: "Die-cut hole for retail hanging" },
  { id: "child-resistant", label: "Child Resistant", desc: "Secure child-proof mechanism" },
  { id: "zipper", label: "Press to Close Zipper", desc: "Resealable closure for freshness" },
];

const FINISHES = [
  { id: "gloss-lam", label: "Gloss Laminated", desc: "Thin flexible shiny protective film" },
  { id: "foil-drip", label: "Foil Drip UV", desc: "UV coated gloss for a rich, vibrant look" },
  { id: "soft-touch", label: "Soft-touch Lamination", desc: "Velvety smooth soft-touch feel" },
  { id: "matte-lam", label: "Matte Lamination", desc: "Elegant smooth matte finish" },
  { id: "spot-gloss", label: "Spot Gloss", desc: "Selective gloss coating for contrast" },
];

const EXTRA_FINISHES = [
  { id: "embossing", label: "Embossing", desc: "Raised text or pattern for tactile appeal" },
  { id: "deep-emboss", label: "Deep Embossing", desc: "Extra-deep relief for bold texture" },
  { id: "3d-uv", label: "3D Raised UV", desc: "Rich raised UV coating with a glossy feel" },
  { id: "window", label: "Window", desc: "Die-cut window for product visibility" },
  { id: "holo-foil", label: "Holographic Foiling", desc: "Iridescent foil for premium appeal" },
  { id: "hot-stamp", label: "Hot Stamp Foil", desc: "Metallic stamped foil for luxury detail" },
];

const UNBOXING_OPTIONS = [
  { id: "fit-inside", label: "Fit Inside", desc: "Inner tray fits snugly inside the box" },
  { id: "fit-outside", label: "Fit Outside", desc: "Outer sleeve wraps around the tray" },
];

const QUANTITY_PRESETS = [100, 500, 1000, 2000, 5000];

/* ── Main component ── */
export default function GetQuotePage() {
  /* Form state */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");

  const [material, setMaterial] = useState<string | null>(null);
  const [thickness, setThickness] = useState<string | null>(null);
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [finish, setFinish] = useState<string | null>(null);
  const [extraFinishes, setExtraFinishes] = useState<Set<string>>(new Set());
  const [unboxing, setUnboxing] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [customQty, setCustomQty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [previewImageError, setPreviewImageError] = useState(false);

  const toggleAddon = (id: string) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExtraFinish = (id: string) => {
    setExtraFinishes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const parsedWidth = Number(width);
    const parsedHeight = Number(height);
    const parsedDepth = Number(depth);
    const parsedQuantity = quantity ?? Number(customQty);

    if (![parsedWidth, parsedHeight, parsedDepth].every((value) => Number.isFinite(value) && value > 0)) {
      setSubmitError("Please enter valid dimensions (width, height, depth).");
      return;
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      setSubmitError("Please select or enter a valid quantity.");
      return;
    }

    const formData = {
      fullName,
      email,
      phone,
      company,
      dimensions: { width: parsedWidth, height: parsedHeight, depth: parsedDepth },
      material,
      thickness,
      addons: Array.from(addons),
      finish,
      extraFinishes: Array.from(extraFinishes),
      unboxing,
      quantity: parsedQuantity,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitError(data.message ?? "Unable to submit quote right now.");
        return;
      }

      setSubmitSuccess(data.message ?? "Quote request submitted successfully.");
    } catch {
      setSubmitError("Unable to submit quote right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea]">
      {/* ── Top navbar ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#103a2a]/90 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-white tracking-tight"
          >
            Brands Face
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-base text-emerald-100/75">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-emerald-100/35">/</span>
            <span className="text-white font-medium">Get a Quote</span>
          </nav>
          <Link
            href="#"
            className="text-base font-medium text-emerald-100/80 hover:text-white transition-colors"
          >
            Need help?
          </Link>
        </div>
      </header>

      {/* ── Banner ── */}
      <section className="bg-gradient-to-b from-[#1a3a2a] to-[#103a2a] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight">
            Get a Custom Quote
          </h1>
          <p className="mt-4 text-base text-emerald-100/85 leading-relaxed md:text-lg">
            As we are Brands Face, we are available 24/7 to assist and guide
            you. Just inform us about the packaging and we will create an instant
            quote. Answer a few questions related to size, material, features and
            numbers. Quotes for printed roll stock or custom-sized bags can be
            requested and will be made within 2–3 business days.
          </p>
        </div>
      </section>

      {/* ── Main: left form + right sticky image ── */}
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-12 lg:py-16">
          {/* Left: Scrollable form */}
          <div className="w-full lg:w-[58%] xl:w-[60%]">
            <h2 className="mb-4 text-2xl font-bold text-[#103a2a] md:text-3xl">
              Product Details
            </h2>

            <form onSubmit={handleSubmit}>
              {/* 1. Contact details */}
              <AccordionSection title="Enter your details">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] placeholder:text-[#103a2a]/35 outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] placeholder:text-[#103a2a]/35 outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                  <input
                    type="tel"
                    placeholder="(555) 555-0000 (your area)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] placeholder:text-[#103a2a]/35 outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] placeholder:text-[#103a2a]/35 outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                </div>
              </AccordionSection>

              {/* 2. Dimensions */}
              <AccordionSection title="Dimension" required>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="mb-1.5 block text-base text-[#103a2a]/70">
                      Width
                    </label>
                    <input
                      type="number"
                      placeholder="Width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      min={0}
                      step={0.1}
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                  <span className="mt-7 text-xl text-[#103a2a]/25">×</span>
                  <div className="flex-1">
                    <label className="mb-1.5 block text-base text-[#103a2a]/70">
                      Height
                    </label>
                    <input
                      type="number"
                      placeholder="Height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      min={0}
                      step={0.1}
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                  <span className="mt-7 text-xl text-[#103a2a]/25">×</span>
                  <div className="flex-1">
                    <label className="mb-1.5 block text-base text-[#103a2a]/70">
                      Depth
                    </label>
                    <input
                      type="number"
                      placeholder="Depth"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      min={0}
                      step={0.1}
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                  <span className="mt-7 text-base text-[#103a2a]/45">in</span>
                </div>
              </AccordionSection>

              {/* 3. Material */}
              <AccordionSection title="Material" count={MATERIALS.length}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MATERIALS.map((m) => (
                    <OptionCard
                      key={m.id}
                      label={m.label}
                      description={m.desc}
                      selected={material === m.id}
                      onClick={() => setMaterial(m.id)}
                    />
                  ))}
                </div>
              </AccordionSection>

              {/* 4. Thickness */}
              <AccordionSection title="Thickness" count={THICKNESSES.length}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {THICKNESSES.map((t) => (
                    <OptionCard
                      key={t.id}
                      label={t.label}
                      description={t.desc}
                      selected={thickness === t.id}
                      onClick={() => setThickness(t.id)}
                    />
                  ))}
                </div>
              </AccordionSection>

              {/* 5. Add ons */}
              <AccordionSection title="Add ons" count={ADDONS.length}>
                <div className="grid grid-cols-2 gap-3">
                  {ADDONS.map((a) => (
                    <OptionCard
                      key={a.id}
                      label={a.label}
                      description={a.desc}
                      selected={addons.has(a.id)}
                      onClick={() => toggleAddon(a.id)}
                    />
                  ))}
                </div>
              </AccordionSection>

              {/* 6. Finishes */}
              <AccordionSection title="Finishes" count={FINISHES.length}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FINISHES.map((f) => (
                    <OptionCard
                      key={f.id}
                      label={f.label}
                      description={f.desc}
                      selected={finish === f.id}
                      onClick={() => setFinish(f.id)}
                    />
                  ))}
                </div>
              </AccordionSection>

              {/* 7. Extra Finishes */}
              <AccordionSection
                title="Extra Finishes"
                count={EXTRA_FINISHES.length}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {EXTRA_FINISHES.map((ef) => (
                    <OptionCard
                      key={ef.id}
                      label={ef.label}
                      description={ef.desc}
                      selected={extraFinishes.has(ef.id)}
                      onClick={() => toggleExtraFinish(ef.id)}
                    />
                  ))}
                </div>
              </AccordionSection>

              {/* 8. Unboxing */}
              <AccordionSection title="Unboxing">
                <div className="grid grid-cols-2 gap-2.5">
                  {UNBOXING_OPTIONS.map((u) => (
                    <OptionCard
                      key={u.id}
                      label={u.label}
                      description={u.desc}
                      selected={unboxing === u.id}
                      onClick={() => setUnboxing(u.id)}
                    />
                  ))}
                </div>
              </AccordionSection>

              {/* 9. Quantity */}
              <AccordionSection title="Quantity" required>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {QUANTITY_PRESETS.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => {
                          setQuantity(qty);
                          setCustomQty("");
                        }}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                          quantity === qty
                            ? "border-[#103a2a] bg-emerald-50 text-[#103a2a]"
                            : "border-[#103a2a]/15 text-[#103a2a]/70 hover:border-[#103a2a]/35"
                        }`}
                      >
                        {qty.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-[#103a2a]/65">Or enter custom:</span>
                    <input
                      type="number"
                      placeholder="Custom qty"
                      value={customQty}
                      onChange={(e) => {
                        setCustomQty(e.target.value);
                        setQuantity(null);
                      }}
                      min={1}
                      className="w-32 rounded-xl border border-[#103a2a]/15 bg-white px-3 py-2 text-sm text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                </div>
              </AccordionSection>

              {/* Submit */}
              <div className="py-8">
                {submitError ? (
                  <p className="mb-3 text-sm font-medium text-red-600">{submitError}</p>
                ) : null}
                {submitSuccess ? (
                  <p className="mb-3 text-sm font-medium text-emerald-700">{submitSuccess}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-brand-primary)] text-white text-sm font-semibold py-4 rounded-xl hover:bg-[var(--color-cta-hover)] transition-colors shadow-lg hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </button>
                <p className="mt-3 text-center text-xs text-[#103a2a]/55">
                  We&apos;ll respond within 24 hours with a detailed quote
                  tailored to your requirements.
                </p>
                <p className="mt-1 text-center text-[11px] text-[#103a2a]/45">
                  Attachment upload is intentionally skipped for now and will be added after storage integration.
                </p>
              </div>
            </form>
          </div>

          {/* Right: Sticky product image */}
          <div className="hidden lg:block w-full lg:w-1/2 xl:w-[45%]">
            <div className="sticky top-20">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#103a2a]/20">
                <Image
                  src="/products/quote-showcase.jpg"
                  alt="Custom packaging products showcase"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                  onError={() => setPreviewImageError(true)}
                />

                {/* Fallback when image missing */}
                {previewImageError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#103a2a]/95 to-[#1a3a2a]/95">
                    <svg
                      className="h-16 w-16 text-emerald-200/45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <p className="mt-4 text-sm font-medium text-emerald-100/85">
                      Your custom packaging preview
                    </p>
                    <p className="mt-1 text-xs text-emerald-100/65">
                      Configure options on the left
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Summary card */}
              <div className="mt-4 rounded-2xl border border-[#103a2a]/10 bg-white/90 p-5 backdrop-blur-sm">
                <h4 className="mb-3 text-sm font-semibold text-[#103a2a]">
                  Your Selection
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#103a2a]/60">Material</span>
                    <span className="font-medium text-[#103a2a]">
                      {material
                        ? MATERIALS.find((m) => m.id === material)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#103a2a]/60">Thickness</span>
                    <span className="font-medium text-[#103a2a]">
                      {thickness
                        ? THICKNESSES.find((t) => t.id === thickness)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#103a2a]/60">Finish</span>
                    <span className="font-medium text-[#103a2a]">
                      {finish
                        ? FINISHES.find((f) => f.id === finish)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#103a2a]/60">Dimensions</span>
                    <span className="font-medium text-[#103a2a]">
                      {width && height && depth
                        ? `${width} × ${height} × ${depth} in`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#103a2a]/60">Quantity</span>
                    <span className="font-medium text-[#103a2a]">
                      {quantity
                        ? quantity.toLocaleString()
                        : customQty
                          ? Number(customQty).toLocaleString()
                          : "—"}
                    </span>
                  </div>
                  {addons.size > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#103a2a]/60">Add-ons</span>
                      <span className="max-w-[180px] text-right font-medium text-[#103a2a]">
                        {Array.from(addons)
                          .map(
                            (id) =>
                              ADDONS.find((a) => a.id === id)?.label
                          )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
