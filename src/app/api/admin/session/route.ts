import { NextResponse } from "next/server";
import { getAdminSessionFromRequest, ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      admin: {
        id: session.id,
        email: session.email,
      },
    },
    { status: 200 },
  );
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out." }, { status: 200 });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
