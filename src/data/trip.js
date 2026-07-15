// Dummy data for the prototype — Phuket & Krabi, Thailand, 5 days.
// Photos: Unsplash CDN (keyless, ?w=… sized). Swap for licensed assets before release.

const IMG = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const CATEGORIES = {
  food:      { label: 'Food',      color: 'var(--cat-food)' },
  culture:   { label: 'Culture',   color: 'var(--cat-culture)' },
  nature:    { label: 'Nature',    color: 'var(--cat-nature)' },
  stay:      { label: 'Stay',      color: 'var(--cat-stay)' },
  transport: { label: 'Transport', color: 'var(--cat-transport)' },
}

// The expert-built itinerary shown on the trip screen.
export const TRIP = {
  destination: 'Thailand',
  title: 'Your trip to Thailand',
  durationDays: 5,
  dateRange: 'Mon 14 – Fri 18 Dec',
  price: '₹50,000',
  origin: 'Bengaluru',
  days: [
    {
      label: 'Day 1 — Phuket',
      date: 'Mon 14 Dec',
      stops: [
        { id: 'fl1', flight: true, time: '06:15', name: 'Bengaluru → Phuket', sub: 'AirAsia · 1 stop · 7h 30m', option: '3 flight options', transitAfter: { mode: 'car', mins: 45 } },
        { id: 's1', time: '09:30', name: 'Big Buddha Phuket', category: 'culture', transitAfter: { mode: 'walk', mins: 13 } },
        { id: 's2', time: '13:00', name: 'Blue Elephant Restaurant', category: 'food', transitAfter: { mode: 'car', mins: 18 } },
        { id: 's3', time: null, name: 'Kata Beach Resort & Spa', category: 'stay' },
      ],
    },
    {
      label: 'Day 2 — Phuket',
      date: 'Tue 15 Dec',
      stops: [
        { id: 's4', time: '09:00', name: 'Phi Phi Islands Day Tour', category: 'nature', transitAfter: { mode: 'car', mins: 9 } },
        { id: 's5', time: '13:30', name: 'Wat Chalong', category: 'culture', transitAfter: { mode: 'car', mins: 22 } },
        { id: 's6', time: '19:30', name: 'Bangla Road Night Market', category: 'food' },
      ],
    },
    {
      label: 'Day 3 — Krabi',
      date: 'Wed 16 Dec',
      stops: [
        { id: 's7', time: '10:00', name: 'Railay Beach Viewpoint', category: 'nature', transitAfter: { mode: 'walk', mins: 6 } },
        { id: 's8', time: '15:00', name: 'Wat Tham Suea (Tiger Cave Temple)', category: 'culture' },
      ],
    },
  ],
}

// ── Checkout — per-person cost breakdown (items + taxes = ₹50,000) ──
export const CHECKOUT = {
  items: [
    { label: 'Flights · return', sub: 'Bengaluru ⇄ Phuket', amount: 22000 },
    { label: 'Stays · 4 nights', sub: 'Kata Beach Resort & Spa', amount: 13500 },
    { label: 'Activities & entries', sub: '6 experiences', amount: 6000 },
    { label: 'Local transfers', sub: 'Airport + intercity', amount: 3000 },
    { label: 'Expert planning fee', sub: 'Created by Linh', amount: 499 },
  ],
  taxes: 5001,
}
export const fmtINR = (n) => `₹${n.toLocaleString('en-IN')}`

// Three core value props shown at checkout.
export const CVPS = [
  { icon: 'shield', title: 'Price-match guarantee', desc: "Find this trip cheaper elsewhere and we'll match it." },
  { icon: 'sparkle', title: 'Scapia promise', desc: "If something goes wrong on your trip, we'll fix it." },
  { icon: 'phone', title: 'On-trip assistance', desc: '24×7 support from India for anything you need on the ground.' },
]

// Asset base — respects Vite's configured base so paths work on the
// GitHub Pages project subpath (…/itinerary-scorer-app/) and in local dev.
export const ASSET_BASE = import.meta.env.BASE_URL

// Local travel experts who vet and edit the itinerary.
// Linh's photo lives at public/linh.png; stock stand-in only if it goes missing.
export const EXPERT = {
  name: 'Linh Fa',
  title: 'Thai travel expert, living in Bangkok',
  flag: '🇹🇭',
  avatar: `${ASSET_BASE}linh.png`,
  // Accomplishments + social proof
  rating: 4.9,
  reviews: 380,
  itineraries: 1240,
  years: 5,
  langs: 'English · Thai · Mandarin',
  blurb: 'Born in Chiang Mai, based in Bangkok. I plan trips that skip the tourist traps and get you into the Thailand locals love.',
  stats: [
    { value: '4.9★', label: '380 reviews' },
    { value: '1,240+', label: 'itineraries created' },
    { value: '5 yrs', label: 'local expertise' },
  ],
}
// The AI trip expert reachable by call from the itinerary screen.
export const EXPERT_AI = {
  name: 'Scapia Expert AI',
  tagline: 'Your AI trip expert, on call 24×7',
  blurb: 'Trained on thousands of trips crafted by our local destination experts — so it plans like a local, instantly.',
  stats: [
    { value: '250+', label: 'destination experts learned from' },
    { value: '1.2L+', label: 'itineraries created' },
    { value: '4.9★', label: '18,000+ ratings' },
  ],
}

export const EXPERT_FALLBACK = IMG('1573496359142-b8d87734a5a2', 200) + '&crop=faces'
export const EXPERT_FALLBACK_LARGE = IMG('1573496359142-b8d87734a5a2', 600) + '&crop=faces'
export function onAvatarError(e) {
  const img = e.currentTarget
  if (img.src.endsWith('linh.png')) img.src = img.dataset.fallback || EXPERT_FALLBACK
}
export const EXPERTS = [
  EXPERT,
  {
    name: 'Rohit Menon',
    title: 'Bali & Vietnam expert',
    avatar: IMG('1507003211169-0a1dd7228f2d', 200) + '&crop=faces',
  },
]

// Faces cycled through on the "finding you a local expert" screen.
export const EXPERT_POOL = [
  IMG('1507003211169-0a1dd7228f2d', 200) + '&crop=faces',
  IMG('1438761681033-6461ffad8d80', 200) + '&crop=faces',
  IMG('1500648767791-00dcc994a43e', 200) + '&crop=faces',
  IMG('1544005313-94ddf0286df2', 200) + '&crop=faces',
]

// ── Ideas screen — ways to add what you've planned so far ───────
export const UPLOAD_TILES = [
  { key: 'documents', icon: 'doc', label: 'upload documents' },
  { key: 'images', icon: 'image', label: 'upload images' },
  { key: 'reels', icon: 'reel', label: 'instagram reels' },
  { key: 'screenshot', icon: 'screenshot', label: 'screenshot' },
  { key: 'blogs', icon: 'link', label: 'blog links' },
  { key: 'video', icon: 'play', label: 'yt video' },
]

// ── Questionnaire (3 screens: basics, preferences, food & notes) ─
export const QUESTIONS_TOTAL = 3

export const FOOD_PREFS = ['Vegetarian', 'Non-vegetarian', 'Vegan', 'Jain', 'No preference']

export const PARTY = ['Solo', 'Partner', 'Friends', 'Family (kids)', 'With my parents', 'Group (5+)']

export const DURATIONS = ['2–3 days', '4–6 days', '1–2 weeks', '2+ weeks']

export const MONTH_FLEXIBLE = "I'm flexible"
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
  MONTH_FLEXIBLE,
]

export const VIBES = [
  'Food & dining', 'Culture & history', 'Hidden gems', 'Nature & outdoors', 'Nightlife',
  'Shopping', 'Wellness', 'Adventure', 'Local life', 'Popular landmarks',
]
export const VIBES_MAX = 5

// What kind of stays the traveller prefers (multi-select).
export const STAY_TYPES = ['Hotels', 'Resorts', 'Homestays', 'Boutique stays', 'Hostels', 'Villas']

// Total for the whole trip, per person. `short` keeps the pills compact.
export const BUDGETS = [
  { key: 'Budget', label: 'Budget', range: 'under ₹30,000', short: 'under ₹30k' },
  { key: 'Mid-range', label: 'Mid-range', range: '₹30,000–60,000', short: '₹30k–60k' },
  { key: 'Comfortable', label: 'Comfortable', range: '₹60,000–1,00,000', short: '₹60k–1L' },
  { key: 'Luxury', label: 'Luxury', range: '₹1,00,000+', short: '₹1L+' },
]

// ════════════════════════════════════════════════════════════════
//  Guided planning flow (matches the flow diagram)
//  Home → destination → cities → activities → trip type → people →
//  days → stays → transport → food → budget + itinerary variants
// ════════════════════════════════════════════════════════════════

// Famous destinations shown upfront, each with its own city list. The city
// list is revealed only after a destination is chosen; activities after that.
export const DESTINATIONS = [
  { key: 'thailand',  label: 'Thailand',   flag: '🇹🇭', cities: ['Bangkok', 'Phuket', 'Krabi', 'Chiang Mai', 'Koh Samui', 'Pattaya'] },
  { key: 'vietnam',   label: 'Vietnam',    flag: '🇻🇳', cities: ['Hanoi', 'Da Nang', 'Ho Chi Minh', 'Hoi An', 'Ha Long Bay', 'Sapa'] },
  { key: 'bali',      label: 'Bali',       flag: '🇮🇩', cities: ['Ubud', 'Seminyak', 'Kuta', 'Canggu', 'Nusa Penida', 'Uluwatu'] },
  { key: 'japan',     label: 'Japan',      flag: '🇯🇵', cities: ['Tokyo', 'Kyoto', 'Osaka', 'Nara', 'Hakone', 'Hiroshima'] },
  { key: 'dubai',     label: 'Dubai',      flag: '🇦🇪', cities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
  { key: 'singapore', label: 'Singapore',  flag: '🇸🇬', cities: ['Singapore City', 'Sentosa', 'Jurong'] },
  { key: 'srilanka',  label: 'Sri Lanka',  flag: '🇱🇰', cities: ['Colombo', 'Kandy', 'Galle', 'Ella', 'Sigiriya'] },
  { key: 'maldives',  label: 'Maldives',   flag: '🇲🇻', cities: ['Malé', 'Maafushi', 'Hulhumalé'] },
]

// Types of things to do — revealed once at least one city is picked.
export const ACTIVITIES = [
  'Beaches', 'Temples & culture', 'Street food', 'Nightlife', 'Adventure sports',
  'Nature & hikes', 'Shopping', 'Wellness & spa', 'Hidden gems', 'Landmarks',
  'Water sports', 'Wildlife',
]

// Trip type — single select (icon + label option cards).
export const TRIP_TYPES = [
  { key: 'Honeymoon',   label: 'Honeymoon',    icon: 'heart' },
  { key: 'Vacation',    label: 'Vacation',     icon: 'sun' },
  { key: 'Family',      label: 'Family',       icon: 'users' },
  { key: 'Staycation',  label: 'Staycation',   icon: 'home' },
  { key: 'Bachelor',    label: 'Bachelor / ette', icon: 'sparkle' },
  { key: 'Solo',        label: 'Solo trip',    icon: 'user' },
]

// Range of days — single select.
export const DAY_RANGES = ['2–4 days', '5–6 days', '7–8 days']

// Preferred transport mode — single select (icon + label).
export const TRANSPORT_MODES = [
  { key: 'Public',  label: 'Public transport',  sub: 'Metro, buses, trains', icon: 'metro' },
  { key: 'Private',  label: 'Private transport', sub: 'Cabs & private cars',  icon: 'car' },
]

// Midpoint days used for budget maths.
const DAY_RANGE_MID = { '2–4 days': 3, '5–6 days': 5.5, '7–8 days': 7.5 }

// Rough return-flight cost per person by destination (₹), for the estimate.
const FLIGHT_COST = {
  thailand: 22000, vietnam: 24000, bali: 26000, japan: 46000,
  dubai: 20000, singapore: 28000, srilanka: 16000, maldives: 34000,
}

// A transparent, per-person budget estimate derived from the answers.
export function estimateBudget(answers) {
  const { location, dayRange, stays = [], transport, tripType } = answers
  const days = DAY_RANGE_MID[dayRange] || 5
  const flights = FLIGHT_COST[location] || 24000

  // Stay tier — pick the priciest chosen stay type.
  const stayTier = stays.some((s) => ['Resorts', 'Villas', 'Boutique stays'].includes(s)) ? 7000
    : stays.some((s) => ['Hostels', 'Homestays'].includes(s)) ? 2500
    : 4500 // Hotels / none
  const stayTotal = stayTier * Math.max(1, Math.round(days) - 1)

  const activitiesPerDay = 2500
  const transferPerDay = transport === 'Private' ? 2200 : 700
  const groundTotal = (activitiesPerDay + transferPerDay) * days

  const typeBump = tripType === 'Honeymoon' ? 1.25 : tripType === 'Bachelor' ? 1.15 : 1
  const base = (flights + stayTotal + groundTotal) * typeBump

  return {
    low: Math.round((base * 0.9) / 1000) * 1000,
    high: Math.round((base * 1.15) / 1000) * 1000,
    days,
    parts: [
      { label: 'Flights · return', amount: flights },
      { label: `Stays · ${Math.max(1, Math.round(days) - 1)} nights`, amount: stayTotal },
      { label: 'Activities & entries', amount: Math.round(activitiesPerDay * days) },
      { label: 'Local transfers', amount: Math.round(transferPerDay * days) },
    ],
  }
}

// Destination hero photos (Unsplash), used on the "popular" plan card.
const DEST_PHOTO = {
  thailand: '1528181304800-259b08848526',
  vietnam: '1557750255-c76072a7aad1',
  bali: '1537996194471-e657df975ab4',
  japan: '1493976040374-85c8e12f0c0e',
  dubai: '1512453979798-5ea266f8880c',
  singapore: '1525625293386-3f8f99389edd',
  srilanka: '1566296314736-6eaac1ca0cb9',
  maldives: '1514282401047-d79a71a590e8',
}
// Vibe photos for the offbeat / relaxed plans (destination-agnostic).
const VIBE_PHOTO = {
  offbeat: '1533105079780-92b9be482077', // street market lane
  relaxed: '1507525428034-b723cf961d3e', // quiet beach
}

// Three itinerary variants offered after the estimate — same trip, different
// vibe / pace / spot-mix. Highlights are built from the chosen cities.
export function buildItineraryVariants(answers) {
  const cities = answers.cities?.length ? answers.cities : ['your cities']
  const acts = answers.activities?.length ? answers.activities : ['Landmarks']
  const cityLine = cities.slice(0, 3).join(' · ')
  const hero = DEST_PHOTO[answers.location] || DEST_PHOTO.thailand

  return [
    {
      key: 'popular',
      title: 'The Classics',
      tag: 'Popular spots · balanced pace',
      pace: 'Balanced',
      spots: 'Popular',
      accent: 'var(--brand-primary)',
      image: IMG(hero, 700),
      highlights: [
        `${cities[0]}: the must-see landmarks`,
        `${acts[0]} the area is famous for`,
        cities[1] ? `A day trip to ${cities[1]}` : 'A curated local food crawl',
      ],
      cityLine,
    },
    {
      key: 'offbeat',
      title: 'Offbeat & Hidden',
      tag: 'Local gems · fewer crowds',
      pace: 'Balanced',
      spots: 'Offbeat',
      accent: 'var(--secondary-blue-500)',
      image: IMG(VIBE_PHOTO.offbeat, 700),
      highlights: [
        `Neighbourhoods in ${cities[0]} tourists miss`,
        acts.includes('Hidden gems') ? 'Hidden gems locals actually go to' : `Off-the-map ${acts[0].toLowerCase()}`,
        'Meals at family-run spots, not tourist strips',
      ],
      cityLine,
    },
    {
      key: 'relaxed',
      title: 'Slow & Relaxed',
      tag: 'More downtime · easy days',
      pace: 'Easy',
      spots: 'Mixed',
      accent: 'var(--success-green-500)',
      image: IMG(VIBE_PHOTO.relaxed, 700),
      highlights: [
        'Late starts and unhurried mornings',
        `Just 1–2 things a day in ${cities[0]}`,
        acts.includes('Wellness & spa') ? 'Spa and slow evenings built in' : 'Plenty of beach / cafe downtime',
      ],
      cityLine,
    },
  ]
}

// ── Planning screen — checklist derived from stated preferences ─
const VIBE_TASKS = {
  'Food & dining': 'Shortlisting places to eat worth planning a day around',
  'Culture & history': 'Weaving in the temples and old towns worth your time',
  'Hidden gems': 'Digging up hidden gems locals actually go to',
  'Nature & outdoors': 'Finding the beaches and trails that fit your route',
  'Nightlife': 'Scoping out the best evenings and night markets',
  'Shopping': 'Mapping the markets and shopping streets',
  'Wellness': 'Slotting in downtime, spas and slow mornings',
  'Adventure': 'Lining up the adventure activities worth booking ahead',
  'Local life': 'Picking corners where you can live like a local',
  'Popular landmarks': 'Timing the big landmarks to dodge the crowds',
}

export function buildPlanningTasks({ budget, pace, vibes, month, food }) {
  const tasks = []
  const b = BUDGETS.find((x) => x.key === budget) || BUDGETS[1]
  tasks.push(`Sorting through hotels for ${b.label.toLowerCase()} budget`)
  if (month === MONTH_FLEXIBLE) tasks.push('Finding the cheapest weeks to travel')
  else if (month) tasks.push(`Checking prices and weather for ${month}`)
  tasks.push(pace <= 50 ? 'Crafting a route which is not rushed' : 'Packing your days without wasting time in transit')
  if (food && food !== 'No preference') tasks.push(`Making sure every stop has solid ${food.toLowerCase()} options`)
  ;(vibes.length ? vibes : ['Popular landmarks']).slice(0, 1).forEach((v) => {
    if (VIBE_TASKS[v]) tasks.push(VIBE_TASKS[v])
  })
  return tasks
}
