import { DISCORD, SELLER, SUPPORT_LISTING, WHATNOT_USER } from "./links";

export const REVIEWS = [
  {
    name: "Marcus",
    loc: "Whatnot",
    text: "Two-day ship, penny sleeve and a top loader, card as shown. This is the floor here, not the ceiling.",
  },
  {
    name: "Alina",
    loc: "Whatnot",
    text: "Won a $2 single, then a slab, then a tin. Chat was civil, hammer was fair, mail showed up.",
  },
  {
    name: "Devon",
    loc: "Whatnot",
    text: "The Trust was not random junk. Named my three, got love back plus extras. Will sit the next one.",
  },
  {
    name: "Priya",
    loc: "Whatnot",
    text: "First time in a Whatnot room. Soob called the condition before it ran. That is the whole game.",
  },
] as const;

export const FAQS = [
  {
    q: "Where do I actually buy?",
    a: "Checkout is on Whatnot. TheSoob.com is the catalog, show board, and Station. Live lots, Buy It Now, and Trusts close on @thesoob.",
  },
  {
    q: "How fast does it ship?",
    a: `${SELLER.name} averages a ${SELLER.ship} ship on Whatnot. Tracking lives in the Whatnot order, not in an email from this site.`,
  },
  {
    q: "Are the cards authentic?",
    a: "English and Japanese Pokémon TCG as shown on camera. Graded lots stay in the slab you win. Condition is called before the hammer. Whatnot Buyer Guarantee covers the order.",
  },
  {
    q: "What is a Soober Trust?",
    a: "A $250 monthly mystery shipment. Name your top three Pokémon in a DM after you buy — or you get random starters. Worth the nut, then some: singles, sealed, slab(s), Japanese exclusives, sleeves.",
  },
  {
    q: "What is The Soob Station?",
    a: "A nonprofit sponsored by The Soob Collectibles. Geared toward troubled teens and young adults becoming capable — and willing — to get themselves out of street life. The junction to a better life.",
  },
  {
    q: "How do I support the Station?",
    a: "Buy the $50 Bless the Station listing on Whatnot, shop the stream, or stay in the Discord. Volume on the cardboard is how the lights stay on.",
  },
  {
    q: "Do you take returns?",
    a: "Live auction wins follow Whatnot's Buyer Guarantee. If it is not as described, open it on the order. This site is not a second checkout and cannot refund a Whatnot payment.",
  },
  {
    q: "When are shows?",
    a: "Typical board is Tue / Thu / Sat / Sun Eastern. Whatnot is the source of truth — shows move. Pin a night on the Shows page on this device.",
  },
] as const;

export const POLICIES = [
  {
    id: "buying",
    t: "Buying",
    d: "TheSoob.com is the companion catalog for The Soob Collectibles. Payments, bidding, and order history live on Whatnot. A heart on this site is a watchlist, not a cart.",
  },
  {
    id: "authenticity",
    t: "Authenticity",
    d: "Lots are Pokémon TCG as shown. Factory-sealed stays factory-sealed until you say otherwise in chat. Graded cards ship in the slab on camera. Counterfeits are not in the case.",
  },
  {
    id: "shipping",
    t: "Shipping",
    d: `Average ship is ${SELLER.ship} from the Whatnot record. Mailers use sleeves, top loaders, and extras so the cardboard is not riding raw. Tracking is on the Whatnot order.`,
  },
  {
    id: "guarantee",
    t: "Buyer Guarantee",
    d: "Whatnot Buyer Guarantee applies to purchases made on the platform. If a lot is not as described, use Whatnot's order tools. Do not send payment off-platform.",
  },
  {
    id: "station",
    t: "The Soob Station",
    d: "The Station is a nonprofit sponsored by the shop. The $50 support listing is a blessing, not a product. It is not tax advice; ask your own preparer if you need a receipt treated a certain way.",
  },
  {
    id: "privacy",
    t: "Privacy",
    d: "Watchlist, show pins, Trust picks, and newsletter interest stay in this browser (localStorage). We do not run accounts on TheSoob.com. Whatnot and Discord have their own policies.",
  },
] as const;

export const STATION_TABS = [
  { id: "mission", label: "Mission" },
  { id: "help", label: "How we help" },
  { id: "community", label: "Community" },
  { id: "support", label: "Support" },
] as const;

export type StationTabId = (typeof STATION_TABS)[number]["id"];

export const STATION_HELP = [
  {
    n: "01",
    t: "Capability",
    d: "Skills that actually leave the block: showing up, keeping a room, holding a job, asking for help without folding. The Station is not a lecture. It is a place to practice.",
  },
  {
    n: "02",
    t: "Willingness",
    d: "Capability without want does not move. The work is a psychic change — the decision to change direction, made by the person still in it.",
  },
  {
    n: "03",
    t: "A junction",
    d: "Not a destination you get dropped at. A platform you step onto. The shop funds the lights. The room holds the people. You walk.",
  },
] as const;

export const STATION_SUPPORT = [
  {
    n: "01",
    t: "Bless the Station",
    d: "A $50 Soob Station Support listing on Whatnot. Not a card. A blessing, received with gratitude.",
    href: SUPPORT_LISTING,
    label: "Open the listing",
  },
  {
    n: "02",
    t: "Shop the stream",
    d: "Buy the cardboard. The shop sponsors the nonprofit. Volume on Whatnot is how the lights stay on.",
    href: "/shop",
    label: "See the shop",
    internal: true,
  },
  {
    n: "03",
    t: "Stay in the room",
    d: "Discord is where the community sits after the hammer. Show up if you have more than money.",
    href: DISCORD,
    label: "Join Discord",
  },
] as const;

export const CATEGORY_TILES = [
  {
    id: "trusts",
    label: "Trusts",
    blurb: "Monthly mystery. Name your three.",
    image: "/images/trust.jpg",
  },
  {
    id: "live",
    label: "Live singles",
    blurb: "$2 starts. Hundreds of lots.",
    image: "/images/singles.jpg",
  },
  {
    id: "sealed",
    label: "Sealed",
    blurb: "ETBs, tins, booster boxes.",
    image: "/images/sealed.jpg",
  },
  {
    id: "graded",
    label: "Graded",
    blurb: "PSA / CGC / TAG as shown.",
    image: "/images/slab.jpg",
  },
  {
    id: "japanese",
    label: "Japanese",
    blurb: "Import. Often short-print.",
    image: "/images/japanese.jpg",
  },
  {
    id: "mission",
    label: "Station",
    blurb: "Bless the junction.",
    image: "/images/support.jpg",
    to: "/station",
  },
] as const;

export const SHOW_HOW = [
  {
    title: "Join the stream",
    body: `Follow @${SELLER.handle} on Whatnot. $2 singles are the floor; sealed and slabs rotate in.`,
  },
  {
    title: "Bid in the room",
    body: "Auctions, Buy It Now, and the occasional giveaway. What you see is what ships.",
  },
  {
    title: "Covered by Whatnot",
    body: `Buyer Guarantee on the platform. Soob's own record: ${SELLER.rating} across ${SELLER.reviews} reviews.`,
  },
] as const;

export { DISCORD, WHATNOT_USER };
