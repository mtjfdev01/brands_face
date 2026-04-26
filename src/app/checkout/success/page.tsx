export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-[#103a2a]">Payment received</h1>
      <p className="mt-3 text-sm text-slate-600">
        Thank you. If you closed the window before confirmation, we will still update your order from the gateway
        notification.
      </p>
      <a href="/" className="mt-8 inline-block text-sm font-semibold text-[#1dd1a1] underline">
        Back to home
      </a>
    </div>
  );
}
