"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ITEMS = [
  { label: "Dashboard", href: "/admin", disabled: true },
  { label: "Quotes", href: "/admin/quotes" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 md:w-64 md:border-b-0 md:border-r md:p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Brands Face</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">Admin Panel</h2>
      </div>

      <nav className="flex gap-2 md:flex-col">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          const classes = active
            ? "bg-[#103a2a] text-white"
            : "bg-slate-50 text-slate-700 hover:bg-slate-100";

          if (item.disabled) {
            return (
              <span
                key={item.label}
                className={`inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium opacity-60 ${classes}`}
              >
                {item.label}
              </span>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${classes}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => void logout()}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Logout
      </button>
    </aside>
  );
}
