"use client";

import AOS from "aos";
import confetti from "canvas-confetti";
import { gsap } from "gsap";
import {
  ArrowDown,
  CalendarDays,
  Clock3,
  ExternalLink,
  Flower2,
  Gift,
  Heart,
  MapPin,
  Music,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "aos/dist/aos.css";
import { CloudPup } from "./CloudPup";
import { Countdown } from "./Countdown";
import { FlipCard } from "./FlipCard";
import { Gallery } from "./Gallery";
import { LoadingScreen } from "./LoadingScreen";
import { MusicPlayer } from "./MusicPlayer";
import { RSVPForm } from "./RSVPForm";
import { useCelebrationAudio } from "@/hooks/useCelebrationAudio";
import { danceCards, eventDetails, giftCards, programItems, roseCards } from "@/lib/event-data";

const burstConfetti = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;
  const colors = ["#8dd8fb", "#f4a9ca", "#ffe992", "#ffffff", "#8fd7c1"];
  confetti({ particleCount: 80, spread: 75, startVelocity: 35, origin: { y: 0.62 }, colors });
  window.setTimeout(() => {
    confetti({ particleCount: 45, angle: 60, spread: 60, origin: { x: 0, y: 0.65 }, colors });
    confetti({ particleCount: 45, angle: 120, spread: 60, origin: { x: 1, y: 0.65 }, colors });
  }, 180);
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <header className="section-heading" data-aos="fade-up">
      <span className="kicker"><Sparkles size={14} /> {eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  );
}

export function InvitationExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const audio = useCelebrationAudio();

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1450);
    const finishTimer = window.setTimeout(() => {
      setLoading(false);
      burstConfetti();
    }, 2050);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    if (loading || !rootRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ duration: reducedMotion ? 0 : 700, once: true, offset: 70, easing: "ease-out-cubic" });

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from(".hero-copy > *", { y: 34, opacity: 0, duration: 0.8, stagger: 0.11, ease: "power3.out" });
        gsap.from(".portrait-stage", { scale: 0.82, opacity: 0, rotate: 3, duration: 1, ease: "back.out(1.4)", delay: 0.2 });
        gsap.to(".hero-spark", { y: -12, rotate: 12, duration: 2.2, repeat: -1, yoyo: true, stagger: 0.2, ease: "sine.inOut" });
      }
    }, rootRef);
    AOS.refresh();
    return () => context.revert();
  }, [loading]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursor || !finePointer || reducedMotion) return;
    const moveX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const celebrate = () => {
    burstConfetti();
    audio.playPartySound();
  };

  return (
    <>
      {loading && <LoadingScreen leaving={leaving} />}
      <a className="skip-link" href="#main-content">Skip to invitation</a>
      <div className="cursor-sparkle" ref={cursorRef} aria-hidden="true">✦</div>
      <div className="site-shell" ref={rootRef}>
        <header className="topbar">
          <a className="mini-brand" href="#top" aria-label="Samantha's birthday invitation home">
            <span>S</span><strong>Samantha&apos;s 7th</strong>
          </a>
          <nav aria-label="Invitation navigation">
            <a href="#details">Details</a>
            <a href="#program">Program</a>
            <a href="#gallery">Photos</a>
            <a className="nav-rsvp" href="#rsvp">RSVP</a>
          </nav>
        </header>

        <main id="main-content">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="sky-decor" aria-hidden="true">
              <i className="hero-cloud cloud-1" /><i className="hero-cloud cloud-2" /><i className="hero-cloud cloud-3" />
              <span className="hero-spark spark-1">✦</span><span className="hero-spark spark-2">✧</span><span className="hero-spark spark-3">✦</span>
              <span className="floating-balloon balloon-pink" /><span className="floating-balloon balloon-yellow" /><span className="floating-balloon balloon-blue" />
            </div>

            <div className="hero-inner">
              <div className="hero-copy">
                <span className="hero-eyebrow">Join us as we celebrate</span>
                <h1 id="hero-title"><span>Samantha Uelona</span> S. Dumlao</h1>
                <div className="turning-seven"><small>Turning</small><strong>7</strong><span>magical years</span></div>
                <p className="hero-intro">A dreamy afternoon of wishes, laughter, and a little bit of cloud-top magic.</p>
                <div className="hero-facts" aria-label="Event summary">
                  <span><CalendarDays size={18} /> December 5, 2026</span>
                  <span><Clock3 size={18} /> 3:00 PM</span>
                  <span><MapPin size={18} /> Dumlao&apos;s Residence</span>
                </div>
                <div className="hero-actions">
                  <a className="primary-button" href="#rsvp">Save my seat <ArrowDown size={18} /></a>
                  <button className="secondary-button" type="button" onClick={celebrate}><PartyPopper size={18} /> Celebrate</button>
                </div>
              </div>

              <div className="portrait-stage" aria-label="Samantha's portrait placeholder">
                <div className="portrait-rainbow" aria-hidden="true"><i /><i /><i /></div>
                <span className="portrait-star portrait-star--one" aria-hidden="true">✦</span>
                <span className="portrait-star portrait-star--two" aria-hidden="true">✧</span>
                <figure className="portrait-frame">
                  {/* Replace with Samantha's photo: update public/images/samantha-placeholder.svg or change this src. */}
                  <Image src={`${basePath}/images/samantha-placeholder.svg`} alt="Placeholder portrait for Samantha" fill priority sizes="(max-width: 768px) 76vw, 430px" />
                  <figcaption>Our birthday star</figcaption>
                </figure>
                <CloudPup compact className="portrait-pup" />
              </div>
            </div>
            <a className="scroll-cue" href="#countdown"><span>Scroll to dream</span><ArrowDown size={17} /></a>
          </section>

          <section className="countdown-section" id="countdown">
            <div className="section-inner" data-aos="fade-up">
              <span className="kicker"><Sparkles size={14} /> The magic begins in</span>
              <Countdown />
            </div>
          </section>

          <section className="details-section section-space" id="details">
            <div className="section-inner">
              <SectionHeading eyebrow="The celebration" title="A date made for magic" copy="Bring your brightest smile and join us for Samantha's sweetest chapter yet." />
              <div className="detail-band" data-aos="fade-up">
                <article><span><CalendarDays /></span><small>Date</small><h3>{eventDetails.date}</h3><p>Saturday afternoon</p></article>
                <article><span><Clock3 /></span><small>Time</small><h3>{eventDetails.time}</h3><p>Please arrive 15 minutes early</p></article>
                <article><span><MapPin /></span><small>Venue</small><h3>{eventDetails.venue}</h3><p>Location details from the hosts</p></article>
              </div>
              <div className="map-placeholder" data-aos="zoom-in">
                <div className="map-grid" aria-hidden="true"><i className="map-road road-one" /><i className="map-road road-two" /><span><MapPin fill="currentColor" /></span></div>
                <div className="map-copy">
                  <span className="kicker">Party destination</span>
                  <h3>{eventDetails.venue}</h3>
                  <p>The exact pin and driving instructions can be added here once confirmed.</p>
                  <a className="secondary-button" href="https://maps.google.com/?q=Dumlao%27s+Residence" target="_blank" rel="noreferrer">Open map placeholder <ExternalLink size={17} /></a>
                </div>
              </div>
            </div>
          </section>

          <section className="program-section section-space" id="program">
            <div className="section-inner program-layout">
              <div className="program-intro">
                <SectionHeading eyebrow="A day to remember" title="Program of wonders" copy="Every little moment has a place in Samantha's magical celebration." />
                <CloudPup className="program-pup" compact />
              </div>
              <ol className="timeline">
                {programItems.map(([time, item], index) => (
                  <li key={item} data-aos="fade-left" data-aos-delay={Math.min(index * 35, 280)}>
                    <time>{time}</time><span aria-hidden="true">{index + 1}</span><h3>{item}</h3>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="traditions-section section-space" id="seven-gifts">
            <div className="section-inner">
              <SectionHeading eyebrow="Seven thoughtful surprises" title="7 Gifts" copy="Tap each present to reveal the special wish tucked inside." />
              <div className="flip-grid" data-aos="fade-up">
                {giftCards.map((card) => <FlipCard key={card.number} eyebrow={`Gift #${card.number}`} title={card.name} message={card.message} icon={<Gift />} tone="gift" />)}
              </div>
            </div>
          </section>

          <section className="traditions-section roses-section section-space" id="seven-roses">
            <div className="section-inner">
              <SectionHeading eyebrow="Seven blooms of love" title="7 Roses" copy="Seven people, seven stories, and seven roses for our birthday girl." />
              <div className="flip-grid" data-aos="fade-up">
                {roseCards.map((card) => <FlipCard key={card.number} eyebrow={`Rose #${card.number}`} title={card.name} subtitle={card.relationship} message={card.message} icon={<Flower2 />} tone="rose" />)}
              </div>
            </div>
          </section>

          <section className="traditions-section dances-section section-space" id="seven-dances">
            <div className="spotlight" aria-hidden="true" />
            <div className="section-inner">
              <SectionHeading eyebrow="Seven twirls together" title="7 Dances" copy="A little music, a little sparkle, and memories that move with us." />
              <div className="flip-grid" data-aos="fade-up">
                {danceCards.map((card) => <FlipCard key={card.number} eyebrow={`Dance #${card.number}`} title={card.name} message={card.message} icon={<Music />} tone="dance" />)}
              </div>
            </div>
          </section>

          <section className="gallery-section section-space" id="gallery">
            <div className="section-inner">
              <SectionHeading eyebrow="Tiny moments, big memories" title="Samantha's gallery" copy="A place for seven favorite smiles. Tap a photo to open the full-screen viewer." />
              <Gallery />
            </div>
          </section>

          <section className="message-section section-space">
            <div className="section-inner message-wrap" data-aos="zoom-in">
              <span className="message-hearts" aria-hidden="true"><Heart fill="currentColor" /><Heart fill="currentColor" /></span>
              <span className="kicker">With all our love</span>
              <h2>A Message from Mommy and Daddy</h2>
              {/* Replace this placeholder with the parents' personal message. */}
              <blockquote>“Message coming soon.”</blockquote>
              <p>Mommy &amp; Daddy</p>
            </div>
          </section>

          <section className="rsvp-section section-space" id="rsvp">
            <div className="section-inner">
              <SectionHeading eyebrow="Will you join the magic?" title="Kindly RSVP" copy="Let us know who will be celebrating with Samantha." />
              <RSVPForm />
            </div>
          </section>

          <section className="celebrate-section">
            <div className="celebrate-rainbow" aria-hidden="true" />
            <div className="section-inner" data-aos="zoom-in">
              <Sparkles aria-hidden="true" />
              <h2>One wish deserves a little sparkle</h2>
              <button className="celebrate-button" type="button" onClick={celebrate}><PartyPopper /> Celebrate with Samantha</button>
              <p>Tap for confetti and a tiny party chime.</p>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-clouds" aria-hidden="true" />
          <CloudPup compact className="footer-pup" />
          <p>Thank you for celebrating with Samantha!</p>
          <span>Made with <Heart size={14} fill="currentColor" aria-label="love" /> for seven magical years</span>
        </footer>
      </div>

      <MusicPlayer
        isPlaying={audio.isPlaying}
        isMuted={audio.isMuted}
        volume={audio.volume}
        onPlay={audio.play}
        onPause={audio.pause}
        onMute={audio.toggleMute}
        onVolume={audio.setVolume}
      />
    </>
  );
}