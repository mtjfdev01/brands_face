"use client";

/**
 * Floating phone + WhatsApp (bottom row, inset from bottom-right so they sit beside Tawk’s widget).
 *
 * Live chat: native Tawk.to launcher via `TawkToScript` in `layout.tsx`.
 * Env: NEXT_PUBLIC_WHATSAPP_PHONE, NEXT_PUBLIC_VOICE_PHONE, NEXT_PUBLIC_TAWK_* (embed only).
 */

const DEFAULT_WA_PHONE = "16038250565"; // +1 (603) 825-0565

function whatsappHref(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? DEFAULT_WA_PHONE;
  const digits = raw.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

function telHref(): string {
  const raw =
    process.env.NEXT_PUBLIC_VOICE_PHONE ??
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ??
    DEFAULT_WA_PHONE;
  const digits = raw.replace(/\D/g, "");
  return `tel:+${digits}`;
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const fab =
  "flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-14 sm:w-14";

export default function WhatsAppChatFab() {
  return (
    <div
      className="fixed bottom-5 left-1/2 z-[10050] flex -translate-x-1/2 flex-row items-center gap-2 print:hidden sm:bottom-6 sm:gap-2.5 md:bottom-7 min-[480px]:left-auto min-[480px]:right-[7.5rem] min-[480px]:translate-x-0 md:right-[8.5rem] lg:right-[9rem]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={telHref()}
        className={`${fab} bg-[#103a2a] text-white shadow-[0_8px_28px_rgba(16,58,42,0.35)] hover:shadow-[0_12px_36px_rgba(16,58,42,0.45)]`}
        aria-label="Call us"
        title="Call us"
      >
        <PhoneIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${fab} bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.55)]`}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
