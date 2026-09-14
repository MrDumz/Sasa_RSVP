export const eventDetails = {
  celebrant: "Samantha Uelona S. Dumlao",
  title: "Samantha's Magical 7th Birthday",
  date: "December 5, 2026",
  time: "3:00 PM",
  venue: "Dumlao's Residence",
  countdownDate: "2026-12-05T15:00:00+08:00",
  rsvpUrl:
    "https://docs.google.com/spreadsheets/d/1t0JVsrHtHA-SLVMUDiTfk0fEcb4UJLpbFaSumHNXWEM/edit?usp=drive_link",
  contacts: ["Sam Dumlao", "Apple San Felipe"],
} as const;

export const programItems = [
  ["03:00 PM", "Welcome Guests"],
  ["03:15 PM", "Opening Prayer"],
  ["03:20 PM", "Opening Remarks"],
  ["03:30 PM", "Lunch / Snacks"],
  ["04:00 PM", "Games"],
  ["04:30 PM", "Magic Show"],
  ["05:15 PM", "Cake Blowing"],
  ["05:30 PM", "7 Candles"],
  ["05:45 PM", "7 Roses"],
  ["06:00 PM", "7 Gifts"],
  ["06:15 PM", "7 Dances"],
  ["06:45 PM", "Photo Session"],
  ["07:00 PM", "Closing Remarks"],
] as const;

export const giftCards = Array.from({ length: 7 }, (_, index) => ({
  number: index + 1,
  name: "Guest name",
  message: "A special wish for Samantha will go here.",
}));

export const roseCards = Array.from({ length: 7 }, (_, index) => ({
  number: index + 1,
  name: "Rose presenter",
  relationship: "Relationship",
  message: "A loving message for Samantha.",
}));

export const danceCards = Array.from({ length: 7 }, (_, index) => ({
  number: index + 1,
  name: "Dance partner",
  message: "A sweet note for the birthday girl.",
}));

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const galleryImages = Array.from({ length: 6 }, (_, index) => ({
  src: `${basePath}/images/gallery-${index + 1}.svg`,
  alt: `Samantha photo placeholder ${index + 1}`,
}));