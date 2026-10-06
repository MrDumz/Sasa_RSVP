export const eventDetails = {
  celebrant: "Samantha Uelona Dumlao",
  title: "Samantha's Magical 7th Birthday",
  date: "December 5, 2026",
  time: "3:00 PM",
  venue: "Dumlao's Residence",
  address: "B2L33 Southgrove Pointe, Brgy. San Francisco, Sto. Tomas City",
  mapUrl: "https://maps.app.goo.gl/eWUiXap2XDHz9jV38",
  dressCode: "Any pastel color except blue",
  countdownDate: "2026-12-05T15:00:00+08:00",
  contacts: ["Sam Dumlao", "Apple San Felipe"],
} as const;

export const programItems = [
  ["03:00 PM", "Guests Arrive"],
  ["03:10 PM", "Prayer & Opening"],
  ["03:25 PM", "Early Dinner"],
  ["03:50 PM", "Games and Magic Show"],
  ["04:30 PM", "Birthday Ceremony"],
  ["04:35 PM", "7 Traditional Birthday Segments"],
  ["05:25 PM", "Photos"],
  ["05:30 PM", "Closing"],
] as const;

function createTraditionCards(names: readonly string[], subtitle: string, message: string) {
  return names.map((name, index) => ({
    number: index + 1,
    name,
    subtitle,
    message,
  }));
}

export const traditionGroups = [
  {
    id: "seven-dances-roses",
    tone: "dance",
    eyebrow: "Seven graceful celebrations",
    title: "7 Dances and Roses",
    copy: "Seven special partners, seven lovely roses, and memories that move with us.",
    itemLabel: "Dance & Rose",
    cards: createTraditionCards(
      ["Shmuel Uest Dumlao", "Zac Jayden Dela Cruz", "Ethan Niel Chromwell Garcia", "Gilbert San Felipe", "Santos San Felipe", "Samuel Dumlao", "Samuel Dumlao Jr."],
      "Dance partner & rose presenter",
      "A loving dance and rose dedication for Samantha.",
    ),
  },
  {
    id: "seven-gifts",
    tone: "gift",
    eyebrow: "Seven thoughtful surprises",
    title: "7 Gifts and Balloons",
    copy: "Seven presents and seven bright balloons to make Samantha's day soar.",
    itemLabel: "Gift & Balloon",
    cards: createTraditionCards(
      ["Ma'am Beth Bonita", "Paul Jeric Tatlonghari", "Prince Rashd Fernando", "LJ Facturan", "Randy Miranda", "Zhushen Edward Dela Cruz", "Ronald Castillo"],
      "Gift giver & balloon bearer",
      "A thoughtful gift and cheerful balloon for Samantha.",
    ),
  },
  {
    id: "seven-bills-chocolates",
    tone: "treat",
    eyebrow: "Seven sweet blessings",
    title: "7 Bills and Chocolates",
    copy: "A little blessing for the future, paired with something sweet for today.",
    itemLabel: "Bill & Chocolate",
    cards: createTraditionCards(
      ["Vic Miranda", "Jayson Hilario", "Joker Gonzales", "Shan San Felipe", "Jude Dumlao", "Santos San Felipe", "Samuel Dumlao"],
      "Blessing giver",
      "A sweet blessing and chocolate treat for Samantha.",
    ),
  },
  {
    id: "seven-candles-wishes",
    tone: "wish",
    eyebrow: "Seven lights of love",
    title: "7 Candles and Wishes",
    copy: "Seven candles glow while seven heartfelt wishes light Samantha's way.",
    itemLabel: "Candle & Wish",
    cards: createTraditionCards(
      ["Apple San Felipe", "Lani Facturan", "Alita Fernando", "Jhie Tatlonghari", "Leny San Felipe", "Kaycee Tatlonghari", "Aurora Dumlao"],
      "Candle lighter & wish giver",
      "A bright candle and heartfelt wish for Samantha.",
    ),
  },
  {
    id: "seven-coloring-book",
    tone: "art",
    eyebrow: "Seven stories to color",
    title: "7 Coloring Book",
    copy: "Seven coloring books filled with new worlds for Samantha to bring to life.",
    itemLabel: "Coloring Book",
    cards: createTraditionCards(
      ["Royce Ashton Chico", "Sean Kendrick Tagle", "Gab Nathaniel Ybañez", "Gelo Paglinawan", "Ethan Jamir Teodoro", "Marizon Kinsley Cao", "Pius Wyne Gamo"],
      "Coloring book giver",
      "A wonderful coloring book for Samantha's creative adventures.",
    ),
  },
  {
    id: "seven-sketchbook",
    tone: "art",
    eyebrow: "Seven pages of imagination",
    title: "7 Sketchbook",
    copy: "Seven sketchbooks ready for Samantha's ideas, doodles, and future masterpieces.",
    itemLabel: "Sketchbook",
    cards: createTraditionCards(
      ["Tim Mantaring", "Mark Jade Zulueta", "Gleen Zulueta", "Ivy Claire Cabilogan", "Kaycee Tatlonghari", "Jamie Joy Garcia", "Ryan Dale Egaña"],
      "Sketchbook giver",
      "A special sketchbook for Samantha's brightest ideas.",
    ),
  },
  {
    id: "seven-coloring-materials",
    tone: "art",
    eyebrow: "Seven colorful possibilities",
    title: "7 Coloring Materials",
    copy: "Seven sets of coloring materials to fill Samantha's creative days with every shade of joy.",
    itemLabel: "Coloring Materials",
    cards: createTraditionCards(
      ["Ysabella Nicole Carmen Garcia", "Hailey Maevis Pascua", "Juris Hennesy Hilario", "Kindra Soberano", "Princess De Guzman", "Jorgina Macaldo", "Athena Riley Miraflor"],
      "Coloring materials giver",
      "Colorful materials for Samantha's next creative masterpiece.",
    ),
  },
] as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const galleryImages = Array.from({ length: 6 }, (_, index) => ({
  src: `${basePath}/images/gallery-${index + 1}.webp`,
  alt: `Samantha's seventh birthday photoshoot, photo ${index + 1}`,
}));