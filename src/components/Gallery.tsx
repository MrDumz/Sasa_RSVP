"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { galleryImages } from "@/lib/event-data";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const touchStart = useRef(0);
  const activePointer = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setActiveIndex(null);
    setZoomed(false);
  };

  const move = (direction: number) => {
    setActiveIndex((current) => current === null ? null : (current + direction + galleryImages.length) % galleryImages.length);
    setZoomed(false);
  };

  const closeFromEffect = useEffectEvent(close);
  const moveFromEffect = useEffectEvent(move);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") closeFromEffect();
      if (event.key === "ArrowLeft") moveFromEffect(-1);
      if (event.key === "ArrowRight") moveFromEffect(1);
      if (event.key === "Tab" && dialogRef.current) {
        const buttons = [...dialogRef.current.querySelectorAll<HTMLButtonElement>("button")];
        const first = buttons[0];
        const last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (isOpen) openerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <div className="gallery-grid">
        {/* Replace these placeholder files in public/images with Samantha's photos. */}
        {galleryImages.map((image, index) => (
          <button key={image.src} className={`gallery-item gallery-item--${index + 1}`} onClick={(event) => { openerRef.current = event.currentTarget; setActiveIndex(index); }} aria-label={`Open ${image.alt}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 50vw, 33vw" loading="lazy" />
            <span><Maximize2 size={17} /> View</span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          ref={dialogRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onPointerDown={(event) => {
            if (zoomed || (event.target as Element).closest("button")) return;
            activePointer.current = event.pointerId;
            touchStart.current = event.clientX;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => {
            if (activePointer.current !== event.pointerId) return;
            const distance = event.clientX - touchStart.current;
            activePointer.current = null;
            if (Math.abs(distance) > 55) move(distance > 0 ? -1 : 1);
          }}
          onPointerCancel={() => { activePointer.current = null; }}
        >
          <button ref={closeButtonRef} className="lightbox-close" onClick={close} aria-label="Close photo viewer"><X /></button>
          <button className="lightbox-nav lightbox-prev" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft /></button>
          <div className={`lightbox-image ${zoomed ? "is-zoomed" : ""}`}>
            <Image src={galleryImages[activeIndex].src} alt={galleryImages[activeIndex].alt} fill sizes="90vw" priority />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={() => move(1)} aria-label="Next photo"><ChevronRight /></button>
          <button className="lightbox-zoom" onClick={() => setZoomed((current) => !current)} aria-label={zoomed ? "Zoom out" : "Zoom in"}>
            {zoomed ? <ZoomOut /> : <ZoomIn />}
          </button>
        </div>
      )}
    </>
  );
}