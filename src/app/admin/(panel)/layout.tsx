import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1600px] flex-col md:min-h-screen md:flex-row">
        <AdminSidebar />
        <section className="flex-1 p-4 sm:p-6 md:p-8">{children}</section>
      </div>
    </main>
  );
}
