"use client";

import { useState, type ReactNode } from "react";

type FlipCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  presenters: readonly string[];
  icon: ReactNode;
  tone: "dance" | "gift" | "treat" | "wish" | "art";
};

export function FlipCard({ eyebrow, title, subtitle, presenters, icon, tone }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`flip-card flip-card--${tone} ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped((current) => !current)}
      aria-pressed={flipped}
      aria-label={`${title}: ${flipped ? "show tradition" : "show givers and presenters"}`}
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
          <small>{title}</small>
          <strong>Givers &amp; presenters</strong>
          <ol className="flip-card__presenters">
            {presenters.map((presenter, index) => (
              <li key={`${presenter}-${index}`}>{presenter}</li>
            ))}
          </ol>
          <em>Tap to turn back</em>
        </span>
      </span>
    </button>
  );
}