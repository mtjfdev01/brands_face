"use client";

import { useState } from "react";
import type { CategoryFaqItem } from "@/data/categoryPages";
import "./FAQs.css";

type Props = {
  title?: string;
  subtitle?: string;
  faqs?: CategoryFaqItem[];
};

export default function FAQs({ title, subtitle, faqs = [] }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs.length) {
    return null;
  }

  return (
    <section className="faqs-section mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      {(title || subtitle) && (
        <div className="faqs-header text-center">
          {title && <h2 className="faqs-heading">{title}</h2>}
          {subtitle && <p className="faqs-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="faqs-container">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const question = faq.question;
          const answer = faq.answer;

          return (
            <div key={index} className="faqs-item">
              <button
                className={`faqs-question ${isOpen ? "open" : ""}`}
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                type="button"
              >
                <span className="faqs-chevron">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="faqs-question-text">{question}</span>
              </button>

              <div className={`faqs-answer-outer${isOpen ? " faqs-answer-outer--open" : ""}`} aria-hidden={!isOpen}>
                <div className="faqs-answer-inner">
                  <div className="faqs-answer-content">
                    <p>{answer}</p>
                  </div>
                </div>
              </div>

              {index < faqs.length - 1 && <div className="faqs-divider" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
