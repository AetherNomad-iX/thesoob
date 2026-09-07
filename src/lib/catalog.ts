import { SUPPORT_LISTING, TRUST_LISTING, WHATNOT_SHOP, WHATNOT_USER } from "./links";

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "trusts", label: "Trusts" },
  { id: "live", label: "Live" },
  { id: "sealed", label: "Sealed" },
  { id: "graded", label: "Graded" },
  { id: "japanese", label: "Japanese" },
  { id: "supplies", label: "Supplies" },
  { id: "mission", label: "Station" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Product = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  category: Exclude<CategoryId, "all">;
  image: string;
  blurb: string;
  details: string[];
  whatnotUrl: string;
  condition: string;
  language: string;
  availability: string;
  featured?: boolean;
  live?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "soober-trust",
    name: "A Soober Trust",
    price: "$250",
    priceNote: "Buy It Now · monthly",
    category: "trusts",
    image: "/images/trust.jpg",
    blurb:
      "A shipment of mystery worth what you put in — and then some. Tell Soob your top three Pokémon or you get random starters.",
    details: [
      "Singles, sealed, slab(s), Japanese exclusives, and sleeves.",
      "DM thesoob your top 3 Pokémon after purchase.",
      "Runs once a month; compounds if it sits.",
      "Near mint · any and all sets.",
    ],
    whatnotUrl: TRUST_LISTING,
    condition: "Near Mint",
    language: "EN / JP mix",
    availability: "Buy It Now",
    featured: true,
  },
  {
    id: "soob-single",
    name: "Soob's Single",
    price: "$2",
    priceNote: "Live start · high volume",
    category: "live",
    image: "/images/singles.jpg",
    blurb:
      "The floor of every show. Two-dollar starts, hundreds of lots, and a host who knows the binder.",
    details: [
      "Typical live quantity runs in the hundreds.",
      "Pre-bid from the Whatnot shop before the stream.",
      "Mix of modern hits, vintage holos, and bulk heaters.",
      "Won during the live — not a mystery box.",
    ],
    whatnotUrl: WHATNOT_USER,
    condition: "As shown on stream",
    language: "English",
    availability: "Live auction",
    featured: true,
    live: true,
  },
  {
    id: "graded-slab",
    name: "Graded slabs",
    price: "Live",
    priceNote: "PSA / CGC / TAG as shown",
    category: "graded",
    image: "/images/slab.jpg",
    blurb:
      "Encapsulated cardboard, camera-right, no surprises about the plastic. What you see is what ships.",
    details: [
      "Run during slab segments and as Buy It Now between shows.",
      "Grading company and grade called on stream.",
      "Ships in the slab you won — no crack-and-swap.",
    ],
    whatnotUrl: WHATNOT_SHOP,
    condition: "Graded",
    language: "As labeled",
    availability: "Live + BIN",
    featured: true,
  },
  {
    id: "sealed-wax",
    name: "Sealed product",
    price: "Live",
    priceNote: "ETBs, tins, booster boxes",
    category: "sealed",
    image: "/images/sealed.jpg",
    blurb:
      "Factory-sealed wax from current and recent sets — Destined Rivals, 151, and whatever is actually in the case that night.",
    details: [
      "Shown sealed on camera before it runs.",
      "English sealed plus the occasional Japanese tin.",
      "Keep sealed or rip live — say it in chat.",
    ],
    whatnotUrl: WHATNOT_USER,
    condition: "Factory sealed",
    language: "English",
    availability: "Live auction",
    featured: true,
    live: true,
  },
  {
    id: "destined-rivals-etb",
    name: "Destined Rivals ETB",
    price: "Live",
    priceNote: "Elite Trainer Box · current",
    category: "sealed",
    image: "/images/sealed.jpg",
    blurb:
      "Current-set Elite Trainer Boxes when they are in the case. Shown sealed, run live, no restock fiction.",
    details: [
      "Factory sealed unless the listing says otherwise.",
      "Count and print called before the hammer.",
      "Often paired with a rip-or-keep vote in chat.",
    ],
    whatnotUrl: WHATNOT_USER,
    condition: "Factory sealed",
    language: "English",
    availability: "When in case",
    live: true,
  },
  {
    id: "jp-exclusive",
    name: "Japanese exclusives",
    price: "Live + BIN",
    priceNote: "Import, often short-print",
    category: "japanese",
    image: "/images/japanese.jpg",
    blurb:
      "The quiet flex in a Trust and a regular lane on stream. Japanese print runs, tins, and cards you do not find at Target.",
    details: [
      "Called out as Japanese on the listing and on camera.",
      "Often lands inside a Soober Trust if you name the right three.",
      "Condition noted before the hammer.",
    ],
    whatnotUrl: WHATNOT_SHOP,
    condition: "Near Mint unless noted",
    language: "Japanese",
    availability: "Live + BIN",
  },
  {
    id: "jp-151-box",
    name: "Japanese 151 / SV boxes",
    price: "Live",
    priceNote: "Import sealed",
    category: "japanese",
    image: "/images/japanese.jpg",
    blurb:
      "Japanese sealed when the case has it — 151 energy, SV boxes, and tins that never hit a US big-box aisle.",
    details: [
      "Language and set named on camera.",
      "Sealed until you ask to rip.",
      "Short runs. If it is gone, it is gone.",
    ],
    whatnotUrl: WHATNOT_USER,
    condition: "Factory sealed",
    language: "Japanese",
    availability: "When in case",
    live: true,
  },
  {
    id: "vintage-holo",
    name: "Vintage holos",
    price: "$2+",
    priceNote: "WotC through EX · as shown",
    category: "live",
    image: "/images/singles.jpg",
    blurb:
      "Catch-up streams and Sunday boards pull vintage holos out of the binder. Condition is the whole sentence — it gets said out loud.",
    details: [
      "LP / MP / HP called before bidding.",
      "Not a mystery grade. The light is on the card.",
      "Pre-bid from the shop when the lot is up early.",
    ],
    whatnotUrl: WHATNOT_USER,
    condition: "As shown",
    language: "English",
    availability: "Live auction",
    live: true,
  },
  {
    id: "sleeves-supplies",
    name: "Sleeves and supplies",
    price: "Live",
    priceNote: "Thank-you extras too",
    category: "supplies",
    image: "/images/sleeves.jpg",
    blurb:
      "Sleeves, toploaders, and the extras Soob packs so the mailer is not just a top loader and a prayer.",
    details: [
      "Often bundled into Trusts at no extra ask.",
      "Run as cheap add-on lots at the end of a show.",
    ],
    whatnotUrl: WHATNOT_SHOP,
    condition: "New",
    language: "—",
    availability: "Live + extras",
  },
  {
    id: "station-support",
    name: "The Soob Station Support",
    price: "$50",
    priceNote: "Blessing · not a product",
    category: "mission",
    image: "/images/support.jpg",
    blurb:
      "If you are feeling gratuitous, bless the Station. It is a nonprofit sponsored by the shop, aimed at teens and young adults still stuck in street life.",
    details: [
      "All blessings received with gratitude.",
      "Funds the junction — capability and willingness to get out.",
      "Not a card lot. You are funding the mission.",
    ],
    whatnotUrl: SUPPORT_LISTING,
    condition: "Support",
    language: "—",
    availability: "Buy It Now",
    featured: true,
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function featuredProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function searchProducts(query: string, category: CategoryId = "all") {
  const q = query.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    const catOk = category === "all" || p.category === category;
    if (!catOk) return false;
    if (!q) return true;
    const hay = [p.name, p.blurb, p.priceNote, p.condition, p.language, p.category].join(
      " ",
    ).toLowerCase();
    return hay.includes(q);
  });
}

export const SHOWS = [
  {
    id: "tue",
    dow: 2,
    day: "Tue",
    time: "8:00 PM ET",
    title: "Singles & slabs",
    tags: ["$2 starts", "Graded", "Modern"],
  },
  {
    id: "thu",
    dow: 4,
    day: "Thu",
    time: "8:00 PM ET",
    title: "Sealed night",
    tags: ["151", "Destined Rivals", "Tins"],
  },
  {
    id: "sat",
    dow: 6,
    day: "Sat",
    time: "7:00 PM ET",
    title: "Trusts & Japanese",
    tags: ["Soober Trust", "Import", "Giveaways"],
  },
  {
    id: "sun",
    dow: 0,
    day: "Sun",
    time: "6:00 PM ET",
    title: "Catch-up stream",
    tags: ["Vintage holos", "Mail-day", "Chat"],
  },
] as const;

export function showForDate(date = new Date()) {
  const dow = date.getDay();
  return SHOWS.find((s) => s.dow === dow) ?? null;
}
