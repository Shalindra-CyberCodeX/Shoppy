export type Location =
  | "All Locations"
  | "One Galle Face"
  | "Colombo City Center"
  | "Marino Mall"
  | "Havelock City"
  | "Pettah Market"

export const LOCATIONS: Location[] = [
  "All Locations",
  "One Galle Face",
  "Colombo City Center",
  "Marino Mall",
  "Havelock City",
  "Pettah Market",
]

export type ProductStatus = "in-stock" | "out-of-stock"

export interface Product {
  id: string
  shopId: string
  name: string
  price: number
  description: string
  status: ProductStatus
  image: string
}

export interface Shop {
  id: string
  name: string
  category: string
  description: string
  location: Location
  floorOrStreet: string
  contact: string
  points: number
  heroTone: "amber" | "navy" | "sage"
  healthScore: number
}

export interface SeasonalEntry {
  id: string
  emoji: string
  title: string
  subtitle: string
  seen: boolean
}

export interface SuggestedPrompt {
  id: string
  label: string
}

export interface ChatHistoryEntry {
  id: string
  title: string
  group: "Today" | "Yesterday" | "This Week"
}

export interface VendorApplication {
  id: string
  shopName: string
  ownerName: string
  category: string
  location: Location
  email: string
  phone?: string
  brNumber: string
  description: string
  photoUrl: string
  submittedAt: string
  status: "Pending" | "Approved" | "Rejected"
}

export interface UserRecord {
  id: string
  name: string
  email: string
  role: "Shopper" | "Vendor" | "Admin"
  points: number
  joined: string
}

export interface FeedbackEntry {
  id: string
  shopperName: string
  rating: number
  comment: string
  date: string
}

export const PRODUCT_IMAGES = ["/images/product-a.png", "/images/product-b.png"]

export const SHOPS: Shop[] = [
  {
    id: "shop-lovi",
    name: "Lovi Boutique",
    category: "Women's Fashion",
    description:
      "Contemporary Sri Lankan tailoring with hand-embroidered silks and everyday linen wear.",
    location: "Colombo City Center",
    floorOrStreet: "Level 2, Unit 24",
    contact: "+94 11 234 5678",
    points: 120,
    heroTone: "amber",
    healthScore: 92,
  },
  {
    id: "shop-voltex",
    name: "Voltex Home Electronics",
    category: "Electronics",
    description:
      "Power banks, extension cords, and smart-home essentials with a 1-year local warranty.",
    location: "Pettah Market",
    floorOrStreet: "Main Street, Shop 14",
    contact: "+94 11 987 6543",
    points: 88,
    heroTone: "navy",
    healthScore: 76,
    
  },
  {
    id: "shop-wellwithin",
    name: "Well Within Nutrition",
    category: "Health & Wellness",
    description:
      "Ayurvedic-inspired supplements and daily wellness kits, formulated and bottled locally.",
    location: "One Galle Face",
    floorOrStreet: "Ground Floor, Kiosk 3",
    contact: "+94 76 555 2211",
    points: 64,
    heroTone: "sage",
    healthScore: 98,
  },
  {
    id: "shop-heritage",
    name: "Heritage Craft Market",
    category: "Gifts & Souvenirs",
    description:
      "Handmade jewelry, batik textiles, and locally carved keepsakes for every occasion.",
    location: "Pettah Market",
    floorOrStreet: "Second Cross Street",
    contact: "+94 11 456 7890",
    points: 45,
    heroTone: "amber",
    healthScore: 81,
  },
  {
    id: "shop-northface",
    name: "Trailhead Outfitters",
    category: "Travel & Outdoor",
    description: "Durable travel bags, packing cubes, and tourist essentials for every budget.",
    location: "Marino Mall",
    floorOrStreet: "Level 1, Unit 8",
    contact: "+94 77 222 3344",
    points: 70,
    heroTone: "navy",
    healthScore: 64,
  },
  {
    id: "shop-formalwear",
    name: "Attire & Co.",
    category: "Formal Wear",
    description: "Tailored blazers, wedding suits, and formal wear rentals for grand occasions.",
    location: "Havelock City",
    floorOrStreet: "Level 3, Unit 12",
    contact: "+94 11 333 8899",
    points: 110,
    heroTone: "sage",
    healthScore: 88,
  },
]

export const PRODUCTS: Product[] = SHOPS.flatMap((shop, shopIndex) =>
  Array.from({ length: 4 }, (_, i) => {
    const index = shopIndex * 4 + i
    return {
      id: `${shop.id}-product-${i + 1}`,
      shopId: shop.id,
      name: productName(shop.category, i),
      price: 1500 + ((index * 437) % 8500),
      description: productDescription(shop.category, i),
      status: index % 5 === 0 ? "out-of-stock" : "in-stock",
      image: PRODUCT_IMAGES[index % 2],
    } satisfies Product
  }),
)

function productName(category: string, i: number) {
  const names: Record<string, string[]> = {
    "Women's Fashion": ["Silk Wrap Blouse", "Embroidered Saree", "Linen Day Dress", "Batik Scarf"],
    Electronics: ["6-Way Power Strip", "20000mAh Power Bank", "Surge Protector", "Smart Plug Duo"],
    "Health & Wellness": ["Daily Multivitamin", "Herbal Immunity Blend", "Omega-3 Capsules", "Collagen Boost"],
    "Gifts & Souvenirs": ["Handwoven Basket", "Batik Wall Art", "Beaded Necklace", "Carved Elephant"],
    "Travel & Outdoor": ["Weekender Duffel", "Packing Cube Set", "Anti-Theft Backpack", "Travel Pillow"],
    "Formal Wear": ["Crimson Double-Breasted Blazer", "Classic Wedding Suit", "Tailored Trousers", "Silk Pocket Square"],
  }
  return names[category]?.[i] ?? "Signature Item"
}

function productDescription(category: string, i: number) {
  const descriptions: Record<string, string[]> = {
    "Women's Fashion": [
      "Hand-finished silk with a relaxed wrap silhouette, perfect for evening events.",
      "Traditional weave with modern draping, made to order.",
      "Breathable linen cut for Colombo's humidity.",
      "Hand-dyed batik pattern, one of a kind.",
    ],
    Electronics: [
      "6 universal sockets with surge protection and a 1.5m cord.",
      "Fast-charging power bank with dual USB-C output.",
      "Protects your electronics from voltage spikes.",
      "Wi-Fi enabled smart plugs, app controlled.",
    ],
    "Health & Wellness": [
      "Locally formulated multivitamin with 12 essential nutrients.",
      "Herbal blend of ginger, turmeric, and moringa.",
      "Sustainably sourced omega-3 in easy-swallow capsules.",
      "Marine collagen peptides for skin and joint health.",
    ],
    "Gifts & Souvenirs": [
      "Handwoven from natural reeds by local artisans.",
      "Original batik art piece, framed and ready to hang.",
      "Freshwater pearls with silver-plated clasp.",
      "Hand-carved ebony wood, a Sri Lankan classic.",
    ],
    "Travel & Outdoor": [
      "Water-resistant 45L duffel with reinforced straps.",
      "Set of 4 compression cubes to organize any suitcase.",
      "Slash-resistant fabric with hidden zip pockets.",
      "Memory foam travel pillow with washable cover.",
    ],
    "Formal Wear": [
      "Tailored fit in premium wool blend, ready in 3 days.",
      "Full three-piece suit with complimentary alterations.",
      "Slim-fit trousers finished with a satin stripe.",
      "Pure silk, hand-rolled edges.",
    ],
  }
  return descriptions[category]?.[i] ?? "A carefully sourced product from a trusted local shop."
}

export const SEASONAL_ENTRIES: SeasonalEntry[] = [
  {
    id: "season-christmas",
    emoji: "🎄",
    title: "Plan your Christmas shopping",
    subtitle: "Gifts, décor, and festive fits before the rush",
    seen: true,
  },
  {
    id: "season-new-year",
    emoji: "🎊",
    title: "Sinhala & Tamil New Year",
    subtitle: "Traditional wear and sweetmeats near you",
    seen: false,
  },
  {
    id: "season-vesak",
    emoji: "🏮",
    title: "Vesak season deals",
    subtitle: "Lanterns, décor, and family outfits",
    seen: false,
  },
]

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: "p1", label: "Gifts under Rs. 5K" },
  { id: "p2", label: "Electronics in Pettah" },
  { id: "p3", label: "Wedding shopping" },
  { id: "p4", label: "Tourist essentials" },
  { id: "p5", label: "Best food court near Havelock City" },
]

export const CHAT_HISTORY: ChatHistoryEntry[] = [
  { id: "chat-1", title: "Best travel bags under Rs. 5,000", group: "Today" },
  { id: "chat-2", title: "Power banks in Pettah", group: "Today" },
  { id: "chat-3", title: "Gift ideas for girlfriend", group: "Yesterday" },
  { id: "chat-4", title: "Running shoes under Rs. 8,000", group: "Yesterday" },
  { id: "chat-5", title: "Wedding decorations in Pettah", group: "This Week" },
  { id: "chat-6", title: "Tourist essentials near Fort", group: "This Week" },
]

export const VENDOR_APPLICATIONS: VendorApplication[] = [
  {
    id: "app-1",
    shopName: "Cinnamon Trail Spices",
    ownerName: "Dilani Perera",
    category: "Food & Grocery",
    location: "Pettah Market",
    email: "dilani@cinnamontrail.lk",
    phone: "+94 77 111 2233",
    brNumber: "PV 00234567",
    description: "Whole and ground Ceylon spices, teas, and local dry goods sourced directly from growers.",
    photoUrl: "/images/shop-market.png",
    submittedAt: "2026-08-10",
    status: "Pending",
  },
  {
    id: "app-2",
    shopName: "UrbanSole Footwear",
    ownerName: "Kasun Fernando",
    category: "Footwear",
    location: "Colombo City Center",
    email: "kasun@urbansole.lk",
    phone: "+94 77 445 6677",
    brNumber: "PV 00198822",
    description: "Sneakers, formal shoes, and sandals for men and women at accessible price points.",
    photoUrl: "/images/shop-mall.png",
    submittedAt: "2026-08-08",
    status: "Pending",
  },
  {
    id: "app-3",
    shopName: "Bloom & Petal",
    ownerName: "Amaya Silva",
    category: "Florist",
    location: "Marino Mall",
    email: "amaya@bloompetal.lk",
    phone: "+94 71 998 3344",
    brNumber: "PV 00187341",
    description: "Fresh bouquets, event florals, and gift hampers made to order.",
    photoUrl: "/images/shop-mall.png",
    submittedAt: "2026-08-02",
    status: "Approved",
  },
  {
    id: "app-4",
    shopName: "Quickfix Mobile Repairs",
    ownerName: "Nuwan Jayasuriya",
    category: "Electronics Repair",
    location: "Havelock City",
    email: "nuwan@quickfix.lk",
    phone: "+94 76 220 9911",
    brNumber: "PV 00212098",
    description: "Same-day phone and laptop screen, battery, and charging port repairs.",
    photoUrl: "/images/shop-mall.png",
    submittedAt: "2026-07-28",
    status: "Rejected",
  },
]

export const USERS: UserRecord[] = [
  { id: "u1", name: "Amara Wickramasinghe", email: "amara.w@mail.com", role: "Shopper", points: 340, joined: "2026-02-14" },
  { id: "u2", name: "Ruwan Gunasekara", email: "ruwan.g@mail.com", role: "Shopper", points: 120, joined: "2026-03-22" },
  { id: "u3", name: "Lovi Boutique", email: "hello@loviboutique.lk", role: "Vendor", points: 0, joined: "2025-11-01" },
  { id: "u4", name: "Well Within Nutrition", email: "care@wellwithin.lk", role: "Vendor", points: 0, joined: "2025-12-05" },
  { id: "u5", name: "Ishara De Zoysa", email: "ishara.dz@mail.com", role: "Shopper", points: 50, joined: "2026-06-30" },
  { id: "u6", name: "Admin User", email: "admin@shoppy.lk", role: "Admin", points: 0, joined: "2025-01-01" },
]

export const FEEDBACK: FeedbackEntry[] = [
  { id: "f1", shopperName: "Amara W.", rating: 5, comment: "Loved the supplement quality, fast pickup too!", date: "2026-08-11" },
  { id: "f2", shopperName: "Ruwan G.", rating: 4, comment: "Good range but a bit pricey for the multivitamin.", date: "2026-08-09" },
  { id: "f3", shopperName: "Ishara D.", rating: 5, comment: "Staff were super helpful finding the right blend for me.", date: "2026-08-05" },
  { id: "f4", shopperName: "Kasun F.", rating: 3, comment: "Wish there were more flavor options for the immunity blend.", date: "2026-07-30" },
]

export function getShopById(id: string) {
  return SHOPS.find((shop) => shop.id === id)
}

/**
 * Deterministic canned "AI" feedback summarizer — simulates an LLM-generated
 * summary from a list of feedback entries without calling a real model.
 */
export function generateFeedbackSummary(feedback: FeedbackEntry[], shopName: string): string {
  if (feedback.length === 0) {
    return `No feedback has been submitted for ${shopName} yet. Encourage recent shoppers to leave a review.`
  }

  const avgRating = feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
  const positive = feedback.filter((f) => f.rating >= 4).length
  const critical = feedback.filter((f) => f.rating <= 3)

  const sentimentLine =
    avgRating >= 4.5
      ? `Shoppers consistently love ${shopName}, praising the overall experience.`
      : avgRating >= 3.5
        ? `Shoppers generally have a positive experience at ${shopName}.`
        : `Feedback for ${shopName} is mixed, with room to improve.`

  const volumeLine = `Based on ${feedback.length} review${feedback.length > 1 ? "s" : ""} (${positive} rated 4★ or higher).`

  const improvementLine =
    critical.length > 0
      ? `A few shoppers mentioned ${critical[0].comment.toLowerCase().replace(/\.$/, "")} as an area to watch.`
      : `No major concerns have been raised recently.`

  return `${sentimentLine} ${volumeLine} ${improvementLine}`
}

export function getProductsByShop(shopId: string) {
  return PRODUCTS.filter((product) => product.shopId === shopId)
}

/**
 * Deterministic canned "AI" shop matcher — simulates semantic search without a real model.
 * Picks shops based on simple keyword + location matching, falling back to a stable subset.
 */
export function matchShopsForPrompt(prompt: string, location: Location): Shop[] {
  const query = prompt.toLowerCase()

  const keywordMap: { keywords: string[]; shopIds: string[] }[] = [
    { keywords: ["gift", "souvenir", "present"], shopIds: ["shop-heritage", "shop-wellwithin", "shop-formalwear"] },
    { keywords: ["electronic", "power", "charger", "gadget"], shopIds: ["shop-voltex", "shop-northface"] },
    { keywords: ["wedding", "formal", "suit", "blazer"], shopIds: ["shop-formalwear", "shop-lovi"] },
    { keywords: ["travel", "tourist", "bag", "luggage"], shopIds: ["shop-northface", "shop-heritage"] },
    { keywords: ["health", "supplement", "wellness", "vitamin"], shopIds: ["shop-wellwithin", "shop-lovi"] },
    { keywords: ["fashion", "dress", "clothes", "clothing"], shopIds: ["shop-lovi", "shop-formalwear"] },
    { keywords: ["food", "court", "restaurant", "eat"], shopIds: ["shop-heritage", "shop-wellwithin"] },
  ]

  let matchedIds: string[] = []
  for (const entry of keywordMap) {
    if (entry.keywords.some((kw) => query.includes(kw))) {
      matchedIds.push(...entry.shopIds)
    }
  }

  let candidates = matchedIds.length > 0 ? SHOPS.filter((s) => matchedIds.includes(s.id)) : SHOPS

  if (location !== "All Locations") {
    const locationFiltered = candidates.filter((s) => s.location === location)
    if (locationFiltered.length > 0) candidates = locationFiltered
  }

  const remaining = SHOPS.filter((s) => !candidates.includes(s))
  const result = [...candidates, ...remaining].slice(0, 5)
  return result
}
