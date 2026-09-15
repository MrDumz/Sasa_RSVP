"use client";

import { useState, type ReactNode } from "react";

type FlipCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  message: string;
  icon: ReactNode;
  tone: "dance" | "gift" | "treat" | "wish" | "art";
};

export function FlipCard({ eyebrow, title, subtitle, message, icon, tone }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`flip-card flip-card--${tone} ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped((current) => !current)}
      aria-pressed={flipped}
      aria-label={`${eyebrow}: ${flipped ? "show name" : "show message"}`}
    >
      <span className="flip-card__inner">
        <span className="flip-card__face flip-card__front" aria-hidden={flipped}>
          <span className="flip-card__icon" aria-hidden="true">{icon}</span>
          <small>{eyebrow}</small>
          <strong>{title}</strong>
          {subtitle && <span>{subtitle}</span>}
          <em>Tap to reveal</em>
        </span>
        <span className="flip-card__face flip-card__back" aria-hidden={!flipped}>
          <span aria-hidden="true">✦</span>
          <strong>A little wish</strong>
          <p>{message}</p>
          <em>Tap to turn back</em>
        </span>
      </span>
    </button>
  );
}