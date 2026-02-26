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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Collect all form data - integrate with API later
    const formData = {
      fullName,
      email,
      phone,
      company,
      dimensions: { width, height, depth },
      material,
      thickness,
      addons: Array.from(addons),
      finish,
      extraFinishes: Array.from(extraFinishes),
      unboxing,
      quantity: quantity ?? Number(customQty),
    };
    console.log("Quote request:", formData);
    alert("Thank you! Your quote request has been submitted. We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top navbar ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-gray-900 tracking-tight"
          >
            Brands Cafe
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Get a Quote</span>
          </nav>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Need help?
          </Link>
        </div>
      </header>

      {/* ── Banner ── */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl tracking-tight">
            Get a Custom Quote
          </h1>
          <p className="mt-4 text-base text-gray-600 leading-relaxed md:text-lg">
            As we are Brands Cafe, we are available 24/7 to assist and guide
            you. Just inform us about the packaging and we will create an instant
            quote. Answer a few questions related to size, material, features and
            numbers. Quotes for printed roll stock or custom-sized bags can be
            requested and will be made within 2–3 business days.
          </p>
        </div>
      </section>

      {/* ── Main: left form + right sticky image ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8 lg:py-12">
          {/* Left: Scrollable form */}
          <div className="w-full lg:w-1/2 xl:w-[55%]">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Product Details
            </h2>

            <form onSubmit={handleSubmit}>
              {/* 1. Contact details */}
              <AccordionSection title="Enter your details">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="(555) 555-0000 (your area)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                  />
                </div>
              </AccordionSection>

              {/* 2. Dimensions */}
              <AccordionSection title="Dimension" required>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Width
                    </label>
                    <input
                      type="number"
                      placeholder="Width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      min={0}
                      step={0.1}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                    />
                  </div>
                  <span className="text-gray-300 mt-5">×</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Height
                    </label>
                    <input
                      type="number"
                      placeholder="Height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      min={0}
                      step={0.1}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                    />
                  </div>
                  <span className="text-gray-300 mt-5">×</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Depth
                    </label>
                    <input
                      type="number"
                      placeholder="Depth"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      min={0}
                      step={0.1}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                    />
                  </div>
                  <span className="text-xs text-gray-400 mt-5">in</span>
                </div>
              </AccordionSection>

              {/* 3. Material */}
              <AccordionSection title="Material" count={MATERIALS.length}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                <div className="grid grid-cols-2 gap-2.5">
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
                            ? "border-[var(--color-brand-primary)] bg-gray-50 text-gray-900"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {qty.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Or enter custom:</span>
                    <input
                      type="number"
                      placeholder="Custom qty"
                      value={customQty}
                      onChange={(e) => {
                        setCustomQty(e.target.value);
                        setQuantity(null);
                      }}
                      min={1}
                      className="w-32 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                    />
                  </div>
                </div>
              </AccordionSection>

              {/* Submit */}
              <div className="py-8">
                <button
                  type="submit"
                  className="w-full bg-[var(--color-brand-primary)] text-white text-sm font-semibold py-4 rounded-xl hover:bg-[var(--color-cta-hover)] transition-colors shadow-lg hover:shadow-xl active:scale-[0.99]"
                >
                  Submit Quote Request
                </button>
                <p className="mt-3 text-xs text-gray-400 text-center">
                  We&apos;ll respond within 24 hours with a detailed quote
                  tailored to your requirements.
                </p>
              </div>
            </form>
          </div>

          {/* Right: Sticky product image */}
          <div className="hidden lg:block w-full lg:w-1/2 xl:w-[45%]">
            <div className="sticky top-20">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/products/quote-showcase.jpg"
                  alt="Custom packaging products showcase"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />

                {/* Fallback when image missing */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <svg
                    className="w-16 h-16 text-gray-300"
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
                  <p className="mt-4 text-sm font-medium text-gray-400">
                    Your custom packaging preview
                  </p>
                  <p className="mt-1 text-xs text-gray-300">
                    Configure options on the left
                  </p>
                </div>
              </div>

              {/* Summary card */}
              <div className="mt-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Your Selection
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Material</span>
                    <span className="font-medium text-gray-900">
                      {material
                        ? MATERIALS.find((m) => m.id === material)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Thickness</span>
                    <span className="font-medium text-gray-900">
                      {thickness
                        ? THICKNESSES.find((t) => t.id === thickness)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Finish</span>
                    <span className="font-medium text-gray-900">
                      {finish
                        ? FINISHES.find((f) => f.id === finish)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dimensions</span>
                    <span className="font-medium text-gray-900">
                      {width && height && depth
                        ? `${width} × ${height} × ${depth} in`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-medium text-gray-900">
                      {quantity
                        ? quantity.toLocaleString()
                        : customQty
                          ? Number(customQty).toLocaleString()
                          : "—"}
                    </span>
                  </div>
                  {addons.size > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Add-ons</span>
                      <span className="font-medium text-gray-900 text-right max-w-[180px]">
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
