export const eventDetails = {
  celebrant: "Samantha Uelona Dumlao",
  title: "Samantha's Magical 7th Birthday",
  date: "December 5, 2026",
  time: "3:00 PM",
  venue: "Dumlao's Residence",
  mapUrl: "https://maps.app.goo.gl/eWUiXap2XDHz9jV38",
  dressCode: "Any pastel color except blue",
  countdownDate: "2026-12-05T15:00:00+08:00",
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
  ["05:30 PM", "7 Candles & Wishes"],
  ["05:45 PM", "7 Dances & Roses"],
  ["06:00 PM", "7 Gifts & Balloons"],
  ["06:15 PM", "7 Bills & Chocolates"],
  ["06:30 PM", "7 Art Tools"],
  ["06:45 PM", "Photo Session"],
  ["07:00 PM", "Closing Remarks"],
] as const;

function createTraditionCards(subtitle: string, message: string) {
  return Array.from({ length: 7 }, (_, index) => ({
    number: index + 1,
    name: "Guest name",
    subtitle,
    message,
  }));
}

export const traditionGroups = [
  {
    id: "seven-dances-roses",
    tone: "dance",
    eyebrow: "Seven graceful celebrations",
    title: "7 Dances & Roses",
    copy: "Seven special partners, seven lovely roses, and memories that move with us.",
    itemLabel: "Dance & Rose",
    cards: createTraditionCards("Dance partner & rose presenter", "A loving dance and rose dedication for Samantha."),
  },
  {
    id: "seven-gifts",
    tone: "gift",
    eyebrow: "Seven thoughtful surprises",
    title: "7 Gifts & Balloons",
    copy: "Seven presents and seven bright balloons to make Samantha's day soar.",
    itemLabel: "Gift & Balloon",
    cards: createTraditionCards("Gift giver & balloon bearer", "A thoughtful gift and cheerful balloon for Samantha."),
  },
  {
    id: "seven-bills-chocolates",
    tone: "treat",
    eyebrow: "Seven sweet blessings",
    title: "7 Bills & Chocolates",
    copy: "A little blessing for the future, paired with something sweet for today.",
    itemLabel: "Bill & Chocolate",
    cards: createTraditionCards("Blessing giver", "A sweet blessing and chocolate treat for Samantha."),
  },
  {
    id: "seven-candles-wishes",
    tone: "wish",
    eyebrow: "Seven lights of love",
    title: "7 Candles & Wishes",
    copy: "Seven candles glow while seven heartfelt wishes light Samantha's way.",
    itemLabel: "Candle & Wish",
    cards: createTraditionCards("Candle lighter & wish giver", "A bright candle and heartfelt wish for Samantha."),
  },
  {
    id: "seven-art-tools",
    tone: "art",
    eyebrow: "Seven sparks of creativity",
    title: "7 Art Tools",
    copy: "Seven colorful tools to inspire Samantha's imagination and next masterpiece.",
    itemLabel: "Art Tool",
    cards: createTraditionCards("Creative gift giver", "A colorful art tool for Samantha's creative adventures."),
  },
] as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const galleryImages = Array.from({ length: 6 }, (_, index) => ({
  src: `${basePath}/images/gallery-${index + 1}.svg`,
  alt: `Samantha photo placeholder ${index + 1}`,
}));