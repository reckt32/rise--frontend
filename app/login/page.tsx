"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Firebase error messages cleanup
        const msg = err.message
          .replace("Firebase: ", "")
          .replace(/\(auth\/.*\)/, "")
          .trim();
        setError(msg || "Sign in failed. Please check your credentials.");
      } else {
        setError("Sign in failed. Please check your credentials.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0818]">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0818] px-4">
      {/* Ambient glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo & Tagline */}
        <div className="text-center mb-10">
          {/* Arch logo SVG */}
          <div className="flex justify-center mb-6">
            <svg
              viewBox="0 0 80 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-24"
            >
              <path
                d="M6 46 C6 18, 74 18, 74 46"
                stroke="url(#loginArch1)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M16 46 C16 26, 64 26, 64 46"
                stroke="url(#loginArch2)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
              <circle cx="40" cy="14" r="4.5" fill="url(#loginCircle)" />
              <defs>
                <linearGradient id="loginArch1" x1="6" y1="30" x2="74" y2="30">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="loginArch2" x1="16" y1="34" x2="64" y2="34">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#FB923C" />
                </linearGradient>
                <radialGradient id="loginCircle">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FB923C" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <h1 className="text-4xl tracking-wide text-[#FAF7FF] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic" }}>
            RISE
          </h1>
          <p className="text-sm text-[#E9D5FF]/50 tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
            Above the Noise
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1E1438]/60 backdrop-blur-sm border border-[#7C3AED]/20 rounded-2xl p-8 shadow-xl shadow-[#7C3AED]/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs text-[#E9D5FF]/50 mb-1.5 font-[family-name:var(--font-body)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D0818] border border-[#7C3AED]/20 rounded-lg px-4 py-2.5 text-sm text-[#FAF7FF] placeholder-[#6B7280] font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs text-[#E9D5FF]/50 mb-1.5 font-[family-name:var(--font-body)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D0818] border border-[#7C3AED]/20 rounded-lg px-4 py-2.5 text-sm text-[#FAF7FF] placeholder-[#6B7280] font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg px-4 py-2.5">
                <p className="text-sm text-[#EF4444] font-[family-name:var(--font-body)]">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-[#7C3AED] text-[#FAF7FF] font-medium text-sm hover:bg-[#A855F7] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-[family-name:var(--font-body)] shadow-lg shadow-[#7C3AED]/25"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#E9D5FF]/20 mt-8 font-[family-name:var(--font-body)]">
          ASFS Wealth Management
        </p>
      </div>
    </div>
  );
}
