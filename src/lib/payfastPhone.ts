export function isCheckoutPhoneOk(phone: string | null | undefined): boolean {
  if (!phone) return false;
  const t = phone.trim();
  return t.length >= 8 && /\d/.test(t);
}
