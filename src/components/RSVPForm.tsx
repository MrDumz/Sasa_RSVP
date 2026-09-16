"use client";

import { AlertCircle, Check, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { eventDetails } from "@/lib/event-data";

type SubmissionState = "idle" | "sending" | "success";

type SubmissionResponse = {
  ok?: boolean;
  error?: string;
};

export function RSVPForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const submissionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT?.trim();
  const isSending = submissionState === "sending";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (!endpoint) {
      setErrorMessage("Online RSVP is not configured yet. Please contact an organizer below.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") || "").trim();
    const adults = Number(formData.get("adults"));
    const kids = Number(formData.get("kids"));
    const guests = adults + kids;

    if (!Number.isInteger(adults) || !Number.isInteger(kids) || adults < 0 || kids < 0 || guests < 1 || guests > 20) {
      setErrorMessage("Enter between 1 and 20 guests across the adult and kid counts.");
      return;
    }

    submissionIdRef.current ??= crypto.randomUUID();

    const payload = new URLSearchParams({
      submissionId: submissionIdRef.current,
      fullName,
      contact: String(formData.get("contact") || "").trim(),
      attending: String(formData.get("attending") || ""),
      guests: String(guests),
      adults: String(adults),
      kids: String(kids),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || ""),
      startedAt: String(startedAtRef.current ?? Date.now()),
    });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setErrorMessage("");
    setSubmissionState("sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        redirect: "follow",
        signal: controller.signal,
      });
      const result = await response.json() as SubmissionResponse;

      if (!response.ok || result.ok !== true) {
        throw new Error(result.error || "Your RSVP could not be saved. Please try again.");
      }

      setSubmittedName(fullName);
      setSubmissionState("success");
      submissionIdRef.current = null;
      form.reset();
    } catch (error) {
      setSubmissionState("idle");
      setErrorMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "The RSVP service took too long to respond. Please try again."
          : error instanceof Error
            ? error.message
            : "Your RSVP could not be confirmed. Please try again.",
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const resetForm = () => {
    setSubmissionState("idle");
    setErrorMessage("");
    setSubmittedName("");
    submissionIdRef.current = null;
    startedAtRef.current = null;
  };

  return (
    <div className="rsvp-layout">
      <form
        className="rsvp-form"
        onFocusCapture={() => { startedAtRef.current ??= Date.now(); }}
        onSubmit={handleSubmit}
      >
        {submissionState === "success" ? (
          <div className="success-message" role="status">
            <span><Check size={28} /></span>
            <h3>RSVP received!</h3>
            <p>Thank you, {submittedName}. Your response has been added to Samantha&apos;s guest list.</p>
            <button type="button" className="text-button" onClick={resetForm}>Send another response</button>
          </div>
        ) : (
          <>
            <label className="rsvp-honeypot" aria-hidden="true">
              Website<input name="website" autoComplete="off" tabIndex={-1} disabled={isSending} />
            </label>
            <div className="form-row">
              <label>Full Name<input name="fullName" autoComplete="name" required maxLength={80} disabled={isSending} placeholder="Your full name" /></label>
              <label>Contact Number<input name="contact" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} disabled={isSending} placeholder="09XX XXX XXXX" /></label>
            </div>
            <div className="form-row form-row--short">
              <fieldset className="guest-count">
                <legend>Number of Guests</legend>
                <div className="guest-count__fields">
                  <label>Adults<input name="adults" type="number" inputMode="numeric" min="0" max="20" defaultValue="1" required disabled={isSending} /></label>
                  <label>Kids<input name="kids" type="number" inputMode="numeric" min="0" max="20" defaultValue="0" required disabled={isSending} /></label>
                </div>
                <small>Include yourself. Maximum 20 guests total.</small>
              </fieldset>
              <fieldset>
                <legend>Will you attend?</legend>
                <label className="radio-pill"><input type="radio" name="attending" value="yes" required disabled={isSending} /> Yes, happily!</label>
                <label className="radio-pill"><input type="radio" name="attending" value="no" required disabled={isSending} /> Sorry, no</label>
              </fieldset>
            </div>
            <label>Message<textarea name="message" rows={4} maxLength={500} disabled={isSending} placeholder="Leave a birthday wish for Samantha" /></label>
            <button className="primary-button" type="submit" disabled={isSending} aria-busy={isSending}>
              {isSending ? <><LoaderCircle className="button-spinner" size={18} /> Sending...</> : <><Send size={18} /> Send response</>}
            </button>
            {errorMessage && <p className="form-error" role="alert"><AlertCircle size={16} /> {errorMessage}</p>}
            <p className="form-note">Privacy: RSVP details are used only to manage the guest list and are visible to the organizers.</p>
          </>
        )}
      </form>

      <aside className="rsvp-external">
        <span className="kicker">Need help?</span>
        <h3>Prefer to reply directly?</h3>
        <p>Contact an organizer and they will add your response privately.</p>
        <div className="contact-list">
          <small>RSVP contacts</small>
          {eventDetails.contacts.map((contact) => <strong key={contact}>{contact}</strong>)}
        </div>
      </aside>
    </div>
  );
}