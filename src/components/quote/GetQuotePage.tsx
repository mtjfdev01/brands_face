"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-[#103a2a]/15 bg-white px-5 py-4 text-base text-[#103a2a] placeholder:text-[#103a2a]/40 outline-none transition focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25";

export default function GetQuotePage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const next = e.target.files?.[0] ?? null;
    if (!next) {
      setFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(next.type)) {
      setFileError("Please upload a JPG, PNG, or WEBP image.");
      setFile(null);
      e.target.value = "";
      return;
    }
    if (next.size > MAX_FILE_BYTES) {
      setFileError("Image must be 8 MB or smaller.");
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(next);
  };

  const clearFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setFileError("");

    const phoneValue = phone.trim();
    const emailValue = email.trim();
    const requirementValue = requirement.trim();
    const phoneDigits = phoneValue.replace(/\D/g, "");
    const hasPhone = phoneDigits.length >= 7;
    const hasEmail = EMAIL_RE.test(emailValue);

    if (!phoneValue && !emailValue) {
      setSubmitError("Please enter an email or a contact number.");
      return;
    }
    if (phoneValue && !hasPhone) {
      setSubmitError("Please enter a valid contact number.");
      return;
    }
    if (emailValue && !hasEmail) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!hasPhone && !hasEmail) {
      setSubmitError("Please enter an email or a contact number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("phone", phoneValue);
      formData.append("email", emailValue);
      formData.append("requirement", requirementValue);
      if (file) formData.append("attachment", file);

      const response = await fetch("/api/quotes", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitError(data.message ?? "Unable to submit quote right now.");
        return;
      }

      setSubmitted(true);
      setPhone("");
      setEmail("");
      setRequirement("");
      clearFile();
    } catch {
      setSubmitError("Unable to submit quote right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea]">
      <main id="quote-form" className="w-full scroll-mt-24">
        <div className="mx-auto w-full max-w-2xl px-6 py-4 sm:px-10 sm:py-5">
          {/* <h1 className="text-2xl font-bold text-[#103a2a] md:text-3xl">Get a Quote</h1> */}

          {submitted ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-5 text-xl font-bold text-[#103a2a]">Thank you!</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/80 sm:text-base">
                Your quote request has been received. We will contact you soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-xl border border-[#103a2a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#103a2a] transition hover:bg-[#103a2a]/5"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => void handleSubmit(e)} className="mt-5 space-y-5" noValidate>
              <div>
                <label htmlFor="quote-email" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                  Email
                </label>
                <input
                  id="quote-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                  Contact number
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your contact number"
                  autoComplete="tel"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="quote-requirement" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                  Requirement <span className="font-normal text-[#103a2a]/55">(optional)</span>
                </label>
                <textarea
                  id="quote-requirement"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="Type Your requirement"
                  rows={3}
                  className={`${fieldClass} min-h-[5.5rem] resize-y py-3`}
                />
              </div>

              <div>
                <label htmlFor="quote-file" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                  Related image <span className="font-normal text-[#103a2a]/55">(optional)</span>
                </label>
                <div className="rounded-xl border border-dashed border-[#103a2a]/25 bg-white px-3 py-2.5">
                  <input
                    ref={fileInputRef}
                    id="quote-file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={onFileChange}
                    className="block w-full text-sm text-[#103a2a]/80 file:mr-3 file:rounded-lg file:border-0 file:bg-[#103a2a] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#0c2e22]"
                  />
                  <p className="mt-1 text-xs text-[#103a2a]/55">JPG, PNG, or WEBP — max 8 MB</p>
                  {file ? (
                    <div className="mt-1.5 flex items-center justify-between gap-3 rounded-lg bg-[#103a2a]/5 px-2.5 py-1.5 text-sm text-[#103a2a]">
                      <span className="min-w-0 truncate font-medium">{file.name}</span>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="shrink-0 text-xs font-semibold text-rose-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : null}
                  {fileError ? <p className="mt-1 text-sm font-medium text-rose-600">{fileError}</p> : null}
                </div>
              </div>

              {submitError ? (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[var(--color-brand-primary,#103a2a)] py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--color-cta-hover,#0c2e22)] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting…" : "Submit Quote Request"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
