"use client";

import { ArrowUpRight, Check, Send } from "lucide-react";
import { useState } from "react";
import { eventDetails } from "@/lib/event-data";

export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rsvp-layout">
      <form
        className="rsvp-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        {submitted ? (
          <div className="success-message" role="status">
            <span><Check size={28} /></span>
            <h3>Preview complete</h3>
            <p>Your details were validated, but this demo stores nothing yet. Connect the handler to your preferred form service before launch.</p>
            <button type="button" className="text-button" onClick={() => setSubmitted(false)}>Send another response</button>
          </div>
        ) : (
          <>
            <div className="form-row">
              <label>Full Name<input name="fullName" autoComplete="name" required placeholder="Your full name" /></label>
              <label>Contact Number<input name="contact" type="tel" inputMode="tel" autoComplete="tel" required placeholder="09XX XXX XXXX" /></label>
            </div>
            <div className="form-row form-row--short">
              <label>Number of Guests<input name="guests" type="number" min="1" max="20" defaultValue="1" required /></label>
              <fieldset>
                <legend>Will you attend?</legend>
                <label className="radio-pill"><input type="radio" name="attending" value="yes" required /> Yes, happily!</label>
                <label className="radio-pill"><input type="radio" name="attending" value="no" required /> Sorry, no</label>
              </fieldset>
            </div>
            <label>Message<textarea name="message" rows={4} placeholder="Leave a birthday wish for Samantha" /></label>
            <button className="primary-button" type="submit"><Send size={18} /> Send response</button>
            <p className="form-note">Demo form: connect this submit handler to Formspree, Google Apps Script, or your API.</p>
          </>
        )}
      </form>

      <aside className="rsvp-external">
        <span className="kicker">Option B</span>
        <h3>Prefer the guest list?</h3>
        <p>Open the shared RSVP spreadsheet in a new tab and add your party details there.</p>
        <a className="secondary-button" href={eventDetails.rsvpUrl} target="_blank" rel="noreferrer">RSVP Now <ArrowUpRight size={18} /></a>
        <div className="contact-list">
          <small>RSVP contacts</small>
          {eventDetails.contacts.map((contact) => <strong key={contact}>{contact}</strong>)}
        </div>
      </aside>
    </div>
  );
}