"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

/* ── Link columns data ── */
const FOOTER_LINKS = {
  products: {
    title: "Products",
    links: [
      { label: "Mailer Boxes", href: "#" },
      { label: "Shipping Boxes", href: "#" },
      { label: "Rigid Boxes", href: "#" },
      { label: "Folding Cartons", href: "#" },
      { label: "Display Boxes", href: "#" },
      { label: "Packaging Bags", href: "#" },
      { label: "Labels & Stickers", href: "#" },
    ],
  },
  industries: {
    title: "Industries",
    links: [
      { label: "E-Commerce", href: "#" },
      { label: "Food & Beverage", href: "#" },
      { label: "Health & Beauty", href: "#" },
      { label: "Apparel & Fashion", href: "#" },
      { label: "Electronics", href: "#" },
      { label: "Supplements & CBD", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Why Choose Us", href: "#" },
      { label: "Inspirations", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Order Tracking", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Returns & Refunds", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Get a Quote", href: "/quote" },
    ],
  },
};

/* ── Social icons ── */
function SocialIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-gray-400 transition-all hover:bg-[var(--color-brand-accent)] hover:text-white"
    >
      {children}
    </a>
  );
}

/* ── Main footer ── */
export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full">
      {/* ── CTA Banner ── */}
      <div className="bg-[var(--color-brand-accent)] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll animation="blur-in">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Ready to Elevate Your Brand?
          </h2>
          </AnimateOnScroll>
          <p className="mt-3 text-white/80 text-sm sm:text-base max-w-xl mx-auto">
            Get custom packaging that makes your product unforgettable.
            Free design support, fast shipping, low MOQs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-brand-accent)] font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/25 transition-colors border border-white/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Design in 3D Studio
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="bg-[#111111] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

            {/* ── Brand column ── */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block">
                <div className="relative w-[140px] h-[40px]">
                  <Image
                    src="/brandscafe/logo.svg"
                    alt="Brands Cafe"
                    fill
                    className="object-contain object-left brightness-0 invert"
                  />
                </div>
              </Link>

              <p className="mt-5 text-sm leading-relaxed text-gray-400 max-w-sm">
                Your trusted partner for custom packaging solutions. From design
                to delivery, we help brands stand out with premium quality
                packaging that tells your story.
              </p>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Subscribe to our newsletter
                </h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEmail("");
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 min-w-0 bg-white/8 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[var(--color-brand-accent)] focus:ring-1 focus:ring-[var(--color-brand-accent)]/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-[var(--color-brand-accent)] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-2 text-xs text-gray-500">
                  Get 15% off your first order when you sign up.
                </p>
              </div>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-2.5">
                <SocialIcon href="#" label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="YouTube">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="TikTok">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </SocialIcon>
              </div>
            </div>

            {/* ── Link columns ── */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {Object.values(FOOTER_LINKS).map((column) => (
                  <div key={column.title}>
                    <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                      {column.title}
                    </h4>
                    <ul className="space-y-2.5">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Badges / trust signals ── */}
          <div className="mt-14 pt-8 border-t border-white/8">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ships Nationwide USA</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Eco-Friendly Materials</span>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Brands Cafe. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Cookie Settings
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
