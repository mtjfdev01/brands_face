/** True when `dueDate` (YYYY-MM-DD) is before today (invoice link no longer valid). */
export function isInvoiceDueDateExpired(dueDate: string | null | undefined): boolean {
  const raw = dueDate?.trim().slice(0, 10) ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;

  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  return today > raw;
}
