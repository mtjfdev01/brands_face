import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { searchCustomers } from "@/lib/customerSchema";

export const dynamic = "force-dynamic";

/** Admin: search existing customers by name, email, phone, or company. */
export async function GET(request: Request) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
    if (q.length < 2) {
      return NextResponse.json({ customers: [] }, { status: 200 });
    }

    const customers = await searchCustomers(q, 20);
    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    console.error("admin customers search:", error);
    return NextResponse.json({ message: "Unable to search customers." }, { status: 500 });
  }
}
