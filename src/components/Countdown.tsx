"use client";

import { useEffect, useState } from "react";
import { eventDetails } from "@/lib/event-data";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

const emptyTime: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, new Date(eventDetails.countdownDate).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(emptyTime);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown-grid" aria-label={`Countdown to ${eventDetails.date} at ${eventDetails.time}`}>
      {Object.entries(timeLeft).map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}