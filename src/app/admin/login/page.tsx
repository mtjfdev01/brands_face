 "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const data = (await response.json()) as { authenticated?: boolean };
        if (mounted && data.authenticated) {
          router.replace("/admin/quotes");
        }
      } catch {
        // ignore silently on login page
      }
    };
    void checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Login failed.");
        return;
      }

      setSuccess(data.message ?? "Login successful.");
      router.push("/admin/quotes");
    } catch {
      setError("Unable to reach server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef5f0] to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_24px_80px_rgba(16,58,42,0.12)] lg:grid-cols-2">
          <section className="hidden bg-[#103a2a] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Brands Face</p>
              <h1 className="mt-5 text-4xl font-black leading-tight">
                Admin
                <br />
                Control Panel
              </h1>
              <p className="mt-5 max-w-sm text-sm text-emerald-100/80">
                Secure access for internal team members to manage products, content, and operational
                requests.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold">Backend Connected</p>
              <p className="mt-1 text-xs text-emerald-100/80">
                Login endpoint is ready. Add your Railway DATABASE_URL and seed admin credentials.
              </p>
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <p className="text-xs uppercase tracking-[0.22em] text-[#103a2a]/70">Brands Face</p>
                <h1 className="mt-2 text-3xl font-black text-[#103a2a]">Admin Login</h1>
              </div>

              <div className="mb-8 hidden lg:block">
                <h2 className="text-3xl font-black text-[#103a2a]">Sign In</h2>
                <p className="mt-2 text-sm text-gray-600">Enter your admin credentials to continue.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#103a2a]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@brandscafe.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition-all focus:border-[#1a3a2a] focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-[#103a2a]">
                      Password
                    </label>
                    <button type="button" className="text-xs font-medium text-[#1a3a2a] hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition-all focus:border-[#1a3a2a] focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#103a2a] focus:ring-[#103a2a]"
                    />
                    Remember me
                  </label>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    API READY
                  </span>
                </div>

                {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                {success ? <p className="text-sm font-medium text-emerald-700">{success}</p> : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-[#103a2a] text-sm font-semibold text-white transition hover:bg-[#0d3224] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="mt-8 border-t border-gray-100 pt-5">
                <p className="text-xs text-gray-500">
                  Need to return to the website?{" "}
                  <Link href="/" className="font-semibold text-[#103a2a] hover:underline">
                    Go to Home
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
