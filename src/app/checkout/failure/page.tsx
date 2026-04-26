export default function CheckoutFailurePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Payment not completed</h1>
      <p className="mt-3 text-sm text-slate-600">
        The transaction was cancelled or declined. You can return to your order email link or contact us to try again.
      </p>
      <a href="/" className="mt-8 inline-block text-sm font-semibold text-[#1dd1a1] underline">
        Back to home
      </a>
    </div>
  );
}
