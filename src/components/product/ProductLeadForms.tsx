"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { ProductSize, QuantityOption } from "./ProductInfo";

export type ProductLeadFormsHandle = {
  /** Scrolls the order block into view and opens the standard “place order” form. */
  openPlaceOrder: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const border = "border-[#103a2a]/15";
const text = "text-[#103a2a]";
const textMuted = "text-[#103a2a]/70";
const textSoft = "text-[#103a2a]/55";
const surface = "bg-[#f8fbf9]";
const inputClass = `w-full rounded-xl border ${border} bg-white px-3 py-2.5 text-sm ${text} placeholder:text-[#103a2a]/40 focus:border-[#103a2a]/35 focus:outline-none focus:ring-2 focus:ring-[#1dd1a1]/50`;

/** Smooth height + opacity collapse (grid 0fr → 1fr) */
function Collapsible({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`transition-opacity duration-300 ease-out ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type Props = {
  showActions: boolean;
  productSlug: string;
  productTitle: string;
  selectedQuantity: QuantityOption;
  selectedSize: ProductSize;
};

const ProductLeadForms = forwardRef<ProductLeadFormsHandle, Props>(function ProductLeadForms(
  { showActions, productSlug, productTitle, selectedQuantity, selectedSize },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [orderPanelOpen, setOrderPanelOpen] = useState(false);

  const [orderQty, setOrderQty] = useState(String(selectedQuantity.qty));

  const [stdFullName, setStdFullName] = useState("");
  const [stdEmail, setStdEmail] = useState("");
  const [stdPhone, setStdPhone] = useState("");
  const [stdCompany, setStdCompany] = useState("");
  const [stdNotes, setStdNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    setOrderQty(String(selectedQuantity.qty));
  }, [selectedQuantity.qty]);

  useImperativeHandle(
    ref,
    () => ({
      openPlaceOrder: () => {
        if (!showActions) return;
        setOrderPanelOpen(true);
        requestAnimationFrame(() => {
          rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      },
    }),
    [showActions],
  );

  const toggleOrderPanel = () => {
    setOrderPanelOpen((prev) => !prev);
  };

  const postOrder = async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/product-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { message?: string };
    if (!res.ok) {
      throw new Error(data.message ?? "Request failed");
    }
    return data.message ?? "Submitted.";
  };

  const parsedQty = parseInt(orderQty, 10);
  const qtyValid = Number.isInteger(parsedQty) && parsedQty > 0;
  const lineTotalComputed = qtyValid ? parsedQty * selectedQuantity.pricePerPiece : null;

  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!qtyValid) {
      setMessage({ type: "err", text: "Enter a valid quantity (whole number, at least 1)." });
      return;
    }
    if (!stdFullName.trim() || !EMAIL_REGEX.test(stdEmail.trim())) {
      setMessage({ type: "err", text: "Name and a valid email are required." });
      return;
    }
    if (lineTotalComputed === null) {
      setMessage({ type: "err", text: "Could not calculate order total. Check quantity." });
      return;
    }
    try {
      setSubmitting(true);
      await postOrder({
        requestType: "standard_order",
        ctaSource: "place_order",
        productSlug,
        productTitle,
        quantity: parsedQty,
        sizeLabel: selectedSize.label,
        sizeDimensions: selectedSize.dimensions,
        pricePerPiece: selectedQuantity.pricePerPiece,
        lineTotal: lineTotalComputed,
        fullName: stdFullName.trim(),
        email: stdEmail.trim(),
        phone: stdPhone.trim() || null,
        company: stdCompany.trim() || null,
        customerNotes: stdNotes.trim() || null,
      });
      setMessage({
        type: "ok",
        text: "Order request received — our team will contact you to confirm and finalize.",
      });
      setStdFullName("");
      setStdEmail("");
      setStdPhone("");
      setStdCompany("");
      setStdNotes("");
      setOrderQty(String(selectedQuantity.qty));
      setOrderPanelOpen(false);
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={rootRef} id="pdp-order-section" className="space-y-3 scroll-mt-28">
      <Collapsible open={!showActions}>
        <p className={`pb-1 text-xs leading-relaxed ${textSoft}`}>
          Order actions will appear here when this section is available.
        </p>
      </Collapsible>

      <Collapsible open={showActions}>
        <div className="space-y-3 pt-1">
          {message && (
            <div
              role="status"
              className={`rounded-xl border px-4 py-3 text-sm transition-all duration-300 ${
                message.type === "ok"
                  ? "border-[#1dd1a1]/40 bg-[#ecfdf5] text-[#0f2f22]"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <Collapsible open={orderPanelOpen}>
            <form
              onSubmit={submitOrder}
              className={`mt-1 rounded-2xl border ${border} ${surface} p-4 sm:p-5`}
            >
              <p className={`text-xs ${textMuted}`}>
                <span className={`font-semibold ${text}`}>Summary · </span>
                {productTitle} · {selectedSize.label} ({selectedSize.dimensions})
                {lineTotalComputed !== null && (
                  <>
                    {" "}
                    · Est. ${lineTotalComputed.toFixed(2)} (${selectedQuantity.pricePerPiece.toFixed(2)}/piece)
                  </>
                )}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="std-qty" className={`mb-1 block text-xs font-medium ${textSoft}`}>
                    Quantity *
                  </label>
                  <input
                    id="std-qty"
                    type="number"
                    min={1}
                    step={1}
                    value={orderQty}
                    onChange={(e) => setOrderQty(e.target.value)}
                    className={inputClass}
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label htmlFor="std-name" className={`mb-1 block text-xs font-medium ${textSoft}`}>
                    Full name *
                  </label>
                  <input
                    id="std-name"
                    value={stdFullName}
                    onChange={(e) => setStdFullName(e.target.value)}
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="std-email" className={`mb-1 block text-xs font-medium ${textSoft}`}>
                    Email *
                  </label>
                  <input
                    id="std-email"
                    type="email"
                    value={stdEmail}
                    onChange={(e) => setStdEmail(e.target.value)}
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="std-phone" className={`mb-1 block text-xs font-medium ${textSoft}`}>
                    Phone
                  </label>
                  <input
                    id="std-phone"
                    type="tel"
                    value={stdPhone}
                    onChange={(e) => setStdPhone(e.target.value)}
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="std-company" className={`mb-1 block text-xs font-medium ${textSoft}`}>
                    Company
                  </label>
                  <input
                    id="std-company"
                    value={stdCompany}
                    onChange={(e) => setStdCompany(e.target.value)}
                    className={inputClass}
                    autoComplete="organization"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="std-notes" className={`mb-1 block text-xs font-medium ${textSoft}`}>
                  Notes (optional)
                </label>
                <textarea
                  id="std-notes"
                  rows={2}
                  value={stdNotes}
                  onChange={(e) => setStdNotes(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-[#1dd1a1] py-3 text-sm font-bold text-[#0f2f22] shadow-[0_6px_20px_rgba(29,209,161,0.3)] transition hover:bg-[#37dfb2] disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:px-8"
                >
                  {submitting ? "Sending…" : "Submit order request"}
                </button>
              </div>
            </form>
          </Collapsible>
        </div>
      </Collapsible>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={toggleOrderPanel}
              className={`rounded-full px-5 py-3 text-sm font-bold shadow-[0_6px_20px_rgba(29,209,161,0.28)] transition-all duration-200 ${
                orderPanelOpen
                  ? "bg-[#0f2f22] text-[#1dd1a1] ring-2 ring-[#1dd1a1]/50"
                  : "bg-[#1dd1a1] text-[#0f2f22] hover:bg-[#37dfb2]"
              }`}
            >
              Place order request
              <span className="ml-1 text-[11px] font-semibold opacity-80">{orderPanelOpen ? " ▲" : " ▼"}</span>
            </button>
          </div>
    </div>
  );
});

export default ProductLeadForms;
