import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { ensureAdminSchema } from "@/lib/adminSchema";

type AdminRow = {
  id: number;
  email: string;
  name: string | null;
  password_hash: string;
  is_active: boolean;
};

type LoginBody = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    await ensureAdminSchema();
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!EMAIL_REGEX.test(email) || password.length < 6) {
      return NextResponse.json(
        { message: "Please provide a valid email and password." },
        { status: 400 },
      );
    }

    const result = await dbQuery<AdminRow>(
      `SELECT id, email, name, password_hash, is_active
       FROM admins
       WHERE email = $1
       LIMIT 1`,
      [email],
    );

    const admin = result.rows[0];
    if (!admin || !admin.is_active) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const token = createAdminSessionToken(admin.id, admin.email, Boolean(body.rememberMe));
    const response = NextResponse.json(
      {
        message: "Login successful.",
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      },
      { status: 200 },
    );
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ message: "Unable to login right now." }, { status: 500 });
  }
}
