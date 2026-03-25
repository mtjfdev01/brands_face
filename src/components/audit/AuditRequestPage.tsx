"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AccordionSection from "@/components/quote/AccordionSection";
import OptionCard from "@/components/quote/OptionCard";

const PRODUCT_CATEGORIES = [
  "Rigid Boxes",
  "Corrugated Boxes",
  "Custom Pouches",
  "Gift Boxes",
  "Kraft Boxes",
  "Labels & Tags",
  "Art Card",
  "Other",
];

const BRAND_STAGES = ["Startup", "Growing Brand", "Established", "Enterprise"];
const TIMELINES = ["ASAP", "Within 2 weeks", "Within 1 month", "1-3 months", "Just exploring"];
const BUDGET_RANGES = ["Under $1k", "$1k - $5k", "$5k - $15k", "$15k+", "Not decided yet"];
const CHALLENGES = [
  "Low shelf impact",
  "Weak unboxing experience",
  "High packaging cost",
  "Shipping damage",
  "Inconsistent brand look",
  "Slow supplier turnaround",
];
const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "United Arab Emirates",
  "Saudi Arabia",
  "Germany",
  "France",
  "Other",
];

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 8;

export default function AuditRequestPage() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [country, setCountry] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brandStage, setBrandStage] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budgetRange, setBudgetRange] = useState<string | null>(null);
  const [monthlyOrderVolume, setMonthlyOrderVolume] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [currentPackagingType, setCurrentPackagingType] = useState("");
  const [notes, setNotes] = useState("");
  const [challenges, setChallenges] = useState<Set<string>>(new Set());
  const [attachments, setAttachments] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  /** 1 = Company only … 5 = all sections visible */
  const [unlockedStep, setUnlockedStep] = useState(1);

  const totalSizeMb = useMemo(
    () => (attachments.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(2),
    [attachments],
  );

  const toggleChallenge = (value: string) => {
    setChallenges((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setUploadError("");

    const next = [...attachments];
    for (const file of Array.from(files)) {
      if (next.length >= MAX_FILES) {
        setUploadError(`You can upload up to ${MAX_FILES} files.`);
        break;
      }
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setUploadError("Only JPG, JPEG, PNG, WEBP, and PDF files are allowed.");
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadError("Each file must be 8 MB or smaller.");
        continue;
      }
      next.push(file);
    }

    setAttachments(next);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (companyName.trim() && country && productCategory) {
      setUnlockedStep((s) => Math.max(s, 2));
    }
  }, [companyName, country, productCategory]);

  useEffect(() => {
    if (fullName.trim() && email.trim()) {
      setUnlockedStep((s) => Math.max(s, 3));
    }
  }, [fullName, email]);

  const businessContextFilled = Boolean(
    brandStage || monthlyOrderVolume.trim() || currentPackagingType.trim(),
  );

  useEffect(() => {
    if (unlockedStep < 3) return;
    if (businessContextFilled) {
      setUnlockedStep((s) => Math.max(s, 4));
    }
  }, [unlockedStep, businessContextFilled, brandStage, monthlyOrderVolume, currentPackagingType]);

  const goalsSectionFilled = Boolean(
    primaryGoal.trim() ||
      challenges.size > 0 ||
      timeline ||
      budgetRange ||
      notes.trim(),
  );

  useEffect(() => {
    if (unlockedStep < 4) return;
    if (goalsSectionFilled) {
      setUnlockedStep((s) => Math.max(s, 5));
    }
  }, [unlockedStep, goalsSectionFilled, primaryGoal, challenges, timeline, budgetRange, notes]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setUploadError("");

    if (!companyName.trim() || !country.trim() || !productCategory.trim()) {
      setSubmitError("Please fill required company and category details.");
      return;
    }
    if (!fullName.trim() || !email.trim()) {
      setSubmitError("Please provide your name and email.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("companyName", companyName.trim());
      formData.append("websiteUrl", websiteUrl.trim());
      formData.append("country", country.trim());
      formData.append("productCategory", productCategory.trim());
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("brandStage", brandStage ?? "");
      formData.append("timeline", timeline ?? "");
      formData.append("budgetRange", budgetRange ?? "");
      formData.append("monthlyOrderVolume", monthlyOrderVolume.trim());
      formData.append("primaryGoal", primaryGoal.trim());
      formData.append("currentPackagingType", currentPackagingType.trim());
      formData.append("notes", notes.trim());
      Array.from(challenges).forEach((item) => formData.append("challenges", item));
      attachments.forEach((file) => formData.append("attachments", file));

      const response = await fetch("/api/audits", { method: "POST", body: formData });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitError(data.message ?? "Unable to submit audit request.");
        return;
      }

      setSubmitSuccess(data.message ?? "Audit request submitted successfully.");
      setAttachments([]);
    } catch {
      setSubmitError("Unable to submit audit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea]">
      <header className="sticky top-0 z-40 border-b border-white/15 bg-[#103a2a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Brands Face
          </Link>
          <nav className="hidden items-center gap-6 text-base text-emerald-100/75 md:flex">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-emerald-100/35">/</span>
            <span className="font-medium text-white">Packaging Audit Request</span>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a3a2a] to-[#103a2a] py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[18%] top-0 h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-[12%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
            Free Packaging Audit
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Re-Engineer Your Packaging Performance
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-emerald-100/85">
            Share your current packaging details and we will send a structured audit with conversion,
            shelf-impact, and production optimization recommendations.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <div className="py-12 lg:py-16">
          <div className="mx-auto mb-10 w-full max-w-4xl">
            <div className="rounded-3xl border border-[#103a2a]/10 bg-white/85 p-6 text-center shadow-[0_16px_55px_rgba(16,58,42,0.10)] backdrop-blur-sm sm:p-8">
              <h3 className="text-xl font-black text-[#103a2a] sm:text-2xl">What you get in the audit</h3>
              <ul className="mx-auto mt-4 max-w-3xl space-y-3 text-sm text-[#103a2a]/80 sm:text-base">
                <li>- Packaging perception score and positioning feedback</li>
                <li>- Structure + material optimization recommendations</li>
                <li>- Cost-efficiency and scalability direction</li>
                <li>- Unboxing and retention-impact recommendations</li>
                <li>- Category-level benchmarks and quick-win roadmap</li>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <h2 className="mb-3 text-2xl font-bold text-[#103a2a] md:text-3xl">Audit Intake Form</h2>
            <p className="mb-8 text-sm text-[#103a2a]/70">
              Fill in as much as you can. Each section unlocks after you complete the previous one. More context means a sharper audit output.
            </p>

            <form onSubmit={handleSubmit}>
              {unlockedStep >= 1 ? (
              <AccordionSection title="Company details" required defaultOpen>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Company name"
                      required
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="Website URL (optional)"
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-4 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-4 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    >
                      <option value="">Select product category</option>
                      {PRODUCT_CATEGORIES.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </AccordionSection>
              ) : null}

              {unlockedStep >= 2 ? (
              <AccordionSection title="Contact details" required defaultOpen>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-6 py-4 text-lg text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                </div>
              </AccordionSection>
              ) : null}

              {unlockedStep >= 3 ? (
              <AccordionSection title="Business context" defaultOpen>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {BRAND_STAGES.map((item) => (
                      <OptionCard
                        key={item}
                        label={item}
                        selected={brandStage === item}
                        onClick={() => setBrandStage(item)}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={monthlyOrderVolume}
                      onChange={(e) => setMonthlyOrderVolume(e.target.value)}
                      placeholder="Monthly order volume (e.g. 5,000 units)"
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                    <input
                      type="text"
                      value={currentPackagingType}
                      onChange={(e) => setCurrentPackagingType(e.target.value)}
                      placeholder="Current packaging type/material"
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    />
                  </div>
                  {unlockedStep < 4 ? (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setUnlockedStep((s) => Math.max(s, 4))}
                        className="text-sm font-semibold text-[#103a2a] underline decoration-[#103a2a]/40 underline-offset-2 transition-colors hover:text-[#0d2a1f]"
                      >
                        Continue without business context
                      </button>
                    </div>
                  ) : null}
                </div>
              </AccordionSection>
              ) : null}

              {unlockedStep >= 4 ? (
              <AccordionSection title="Audit goals and challenges" defaultOpen>
                <div className="space-y-5">
                  <textarea
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    placeholder="What is your primary goal from this audit?"
                    rows={3}
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {CHALLENGES.map((item) => (
                      <OptionCard
                        key={item}
                        label={item}
                        selected={challenges.has(item)}
                        onClick={() => toggleChallenge(item)}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <select
                      value={timeline ?? ""}
                      onChange={(e) => setTimeline(e.target.value || null)}
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    >
                      <option value="">Select timeline</option>
                      {TIMELINES.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                    <select
                      value={budgetRange ?? ""}
                      onChange={(e) => setBudgetRange(e.target.value || null)}
                      className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                    >
                      <option value="">Select budget range</option>
                      {BUDGET_RANGES.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything else you want us to review?"
                    rows={4}
                    className="w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-3.5 text-base text-[#103a2a] outline-none transition-all focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25"
                  />
                  {unlockedStep < 5 ? (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setUnlockedStep((s) => Math.max(s, 5))}
                        className="text-sm font-semibold text-[#103a2a] underline decoration-[#103a2a]/40 underline-offset-2 transition-colors hover:text-[#0d2a1f]"
                      >
                        Continue to attachments
                      </button>
                    </div>
                  ) : null}
                </div>
              </AccordionSection>
              ) : null}

              {unlockedStep >= 5 ? (
              <AccordionSection title="Attachments (current packaging images/PDFs)" defaultOpen>
                <div className="space-y-4">
                  <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#103a2a]/25 bg-white px-5 py-8 text-center transition-colors hover:border-[#103a2a]/45">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <span className="text-sm font-medium text-[#103a2a]/80">
                      Click to upload files (JPG, JPEG, PNG, WEBP, PDF) - max 8MB each
                    </span>
                  </label>
                  {uploadError ? <p className="text-sm font-medium text-red-600">{uploadError}</p> : null}
                  {attachments.length > 0 ? (
                    <div className="space-y-2">
                      {attachments.map((file, idx) => (
                        <div
                          key={`${file.name}-${idx}`}
                          className="flex items-center justify-between rounded-lg border border-[#103a2a]/15 bg-white px-3 py-2 text-sm"
                        >
                          <span className="max-w-[75%] truncate text-[#103a2a]">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="text-xs font-semibold text-red-600 transition-colors hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <p className="text-xs text-[#103a2a]/60">
                        {attachments.length} file(s) attached - Total {totalSizeMb} MB
                      </p>
                    </div>
                  ) : null}
                </div>
              </AccordionSection>
              ) : null}

              <div className="py-8">
                {submitError ? <p className="mb-3 text-sm font-medium text-red-600">{submitError}</p> : null}
                {submitSuccess ? (
                  <p className="mb-3 text-sm font-medium text-emerald-700">{submitSuccess}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[var(--color-brand-primary)] py-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[var(--color-cta-hover)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting audit request..." : "Submit Audit Request"}
                </button>
                <p className="mt-3 text-center text-xs text-[#103a2a]/55">
                  Our team typically responds within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
