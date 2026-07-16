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

// Icon shown as the photo fallback (and on pills) for each category.
export const CAT_ICON = {
  food: 'sparkle', culture: 'compass', nature: 'pin', stay: 'home', transport: 'car',
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
        { id: 's1', time: '09:30', name: 'Big Buddha Phuket', category: 'culture', image: IMG('1528181304800-259b08848526', 400), desc: '45-metre marble Buddha with island-wide views.', transitAfter: { mode: 'walk', mins: 13 } },
        { id: 's2', time: '13:00', name: 'Blue Elephant Restaurant', category: 'food', image: IMG('1559314809-0d155014e29e', 400), desc: 'Royal Thai cuisine in a restored colonial mansion.', transitAfter: { mode: 'car', mins: 18 } },
        { id: 's3', time: null, name: 'Kata Beach Resort & Spa', category: 'stay', image: IMG('1571003123894-1f0594d2b5d9', 400), desc: 'Beachfront resort with a spa, pool and sea views.' },
      ],
    },
    {
      label: 'Day 2 — Phuket',
      date: 'Tue 15 Dec',
      stops: [
        { id: 's4', time: '09:00', name: 'Phi Phi Islands Day Tour', category: 'nature', image: IMG('1537956965359-7573183d1f57', 400), desc: 'Speedboat island-hopping and snorkelling.', transitAfter: { mode: 'car', mins: 9 } },
        { id: 's5', time: '13:30', name: 'Wat Chalong', category: 'culture', image: IMG('1563492065599-3520f775eeed', 400), desc: "Phuket's grandest and most revered temple.", transitAfter: { mode: 'car', mins: 22 } },
        { id: 's6', time: '19:30', name: 'Bangla Road Night Market', category: 'food', image: IMG('1504674900247-0877df9cc836', 400), desc: 'Buzzing night market and street-food lanes.' },
      ],
    },
    {
      label: 'Day 3 — Krabi',
      date: 'Wed 16 Dec',
      stops: [
        { id: 's7', time: '10:00', name: 'Railay Beach Viewpoint', category: 'nature', image: IMG('1507525428034-b723cf961d3e', 400), desc: 'Limestone cliffs over turquoise water.', transitAfter: { mode: 'walk', mins: 6 } },
        { id: 's8', time: '15:00', name: 'Wat Tham Suea (Tiger Cave Temple)', category: 'culture', image: IMG('1552465011-b4e21bf6e79a', 400), desc: '1,237 steps to a cliff-top shrine and views.' },
      ],
    },
  ],
}

// Alternatives shown when a traveller edits a stop, grouped by the stop's
// category. `prefs` are the preferences these options are ranked against
// (surfaced in the editor). Each option has imagery, a short line always
// shown, a `long` description revealed behind the info icon, and `tags`
// explaining why it fits.
export const EDIT_OPTIONS = {
  culture: {
    prefs: ['Culture & temples', 'Fewer crowds'],
    options: [
      { id: 'cu-oldtown', name: 'Old Phuket Town', category: 'culture', meta: 'Heritage walk · 2 hrs', match: 94, image: IMG('1555921015-5532091f6026', 600),
        short: 'Sino-Portuguese streets, cafés and street art.',
        long: 'Pastel shophouses, indie cafés and quiet temple lanes make Old Town the most atmospheric culture stop in Phuket. Best explored slowly on foot, away from the tour-bus crowds — a strong fit for your taste for fewer crowds.',
        tags: ['Culture & temples', 'Fewer crowds'] },
      { id: 'cu-freedom', name: 'Freedom Beach', category: 'nature', meta: 'Hidden cove · 30 min', match: 90, image: IMG('1537956965359-7573183d1f57', 600),
        short: 'A quiet white-sand cove most tour groups skip.',
        long: 'Reached by a short longtail ride or a steep jungle path, Freedom Beach stays calm even in peak season — clear water, soft sand and no vendors. A change of pace from temples for a quieter afternoon.',
        tags: ['Fewer crowds', 'Nature'] },
      { id: 'cu-chalong', name: 'Wat Chalong', category: 'culture', meta: 'Temple · 45 min', match: 82, image: IMG('1563492065599-3520f775eeed', 600),
        short: "Phuket's grandest, most revered temple.",
        long: "The island's most important Buddhist temple, richly gilded and busy with worshippers. Impressive, but it draws large crowds around midday — worth an early visit if you keep it on the plan.",
        tags: ['Culture & temples'] },
    ],
  },
  food: {
    prefs: ['Local non-veg food', 'Fewer tourist traps'],
    options: [
      { id: 'fo-suay', name: 'Suay Restaurant', category: 'food', meta: 'Modern Thai · dinner', match: 96, image: IMG('1552566626-52f8b828add9', 600),
        short: 'Chef-led modern Thai loved by locals.',
        long: 'A local favourite away from the tourist strips, Suay does inventive southern-Thai plates and fresh seafood at fair prices. Exactly the kind of non-veg-forward, non-touristy spot your preferences lean toward.',
        tags: ['Local non-veg food', 'Fewer tourist traps'] },
      { id: 'fo-raya', name: 'Raya Restaurant', category: 'food', meta: 'Old-town Thai · lunch', match: 89, image: IMG('1414235077428-338989a2e8c0', 600),
        short: 'Heritage-house southern Thai classics.',
        long: 'Set in a century-old Sino-Portuguese mansion, Raya serves rich, old-school curries and crab dishes that regulars travel across the island for. Generous non-veg menu and bags of character.',
        tags: ['Local non-veg food', 'Culture'] },
      { id: 'fo-blue', name: 'Blue Elephant', category: 'food', meta: 'Fine dining · dinner', match: 80, image: IMG('1559314809-0d155014e29e', 600),
        short: 'Royal Thai cuisine in a colonial mansion.',
        long: 'A polished, higher-end take on royal Thai cooking in a grand restored mansion. Beautiful setting and refined plates, though pricier and more tourist-facing than the local spots.',
        tags: ['Fine dining'] },
    ],
  },
  nature: {
    prefs: ['Beaches & nature', 'Private transfers'],
    options: [
      { id: 'na-phiphi', name: 'Phi Phi Islands Day Tour', category: 'nature', meta: 'Speedboat · full day', match: 95, image: IMG('1537956965359-7573183d1f57', 600),
        short: 'Island-hopping, lagoons and snorkelling.',
        long: 'A full day by private speedboat through Maya Bay, Pileh Lagoon and the best snorkelling reefs. The private-boat option matches your transfer preference and keeps you ahead of the big group tours.',
        tags: ['Beaches & nature', 'Private transfers'] },
      { id: 'na-james', name: 'James Bond Island', category: 'nature', meta: 'Sea canoe · full day', match: 88, image: IMG('1528127269322-539801943592', 600),
        short: 'Sea-canoe among Phang Nga limestone karsts.',
        long: 'Glide by canoe through sea caves and hidden lagoons beneath the towering limestone stacks of Phang Nga Bay. Dramatic scenery; a longer transfer, but private transport makes it comfortable.',
        tags: ['Beaches & nature'] },
      { id: 'na-coral', name: 'Coral Island (Koh Hae)', category: 'nature', meta: 'Half day · nearby', match: 84, image: IMG('1507525428034-b723cf961d3e', 600),
        short: 'Close-by snorkelling and calm beaches.',
        long: 'Just 15 minutes offshore, Coral Island is the easy option — clear shallow water, gentle beaches and good snorkelling without a long day out. Great if you want a relaxed, shorter outing.',
        tags: ['Beaches & nature', 'Relaxed'] },
    ],
  },
  stay: {
    prefs: ['Beachfront', 'Comfortable'],
    options: [
      { id: 'st-kata', name: 'Kata Beach Resort & Spa', category: 'stay', meta: 'Beachfront · 4★', match: 93, image: IMG('1571003123894-1f0594d2b5d9', 600),
        short: 'Beachfront resort with spa and pool.',
        long: 'Right on Kata Beach with direct sand access, a large pool and a full spa. Comfortable, well-reviewed and central to the day plan — a reliable match for a beachfront, comfortable stay.',
        tags: ['Beachfront', 'Comfortable'] },
      { id: 'st-shore', name: 'The Shore at Katathani', category: 'stay', meta: 'Pool villas · 5★', match: 90, image: IMG('1582719478250-c89cae4dc85b', 600),
        short: 'Adults-only clifftop pool villas.',
        long: 'Private pool villas perched above Kata Noi with sweeping sea views and an adults-only, romance-first feel. A step up in comfort and privacy for a special-occasion night or two.',
        tags: ['Comfortable', 'Sea views'] },
      { id: 'st-panwa', name: 'Sri Panwa', category: 'stay', meta: 'Luxury villas · 5★', match: 85, image: IMG('1520250497591-112f2f40a3f4', 600),
        short: 'Clifftop luxury pool villas.',
        long: "One of Phuket's landmark luxury stays, with hillside pool villas and 270° ocean views from Cape Panwa. Stunning, but further from the day plan and at the top of the budget.",
        tags: ['Luxury', 'Sea views'] },
    ],
  },
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
  name: 'Scapia Local Expert AI',
  tagline: 'Your AI local-trip expert, on call 24×7',
  blurb: 'Trained on thousands of trips crafted by our local destination experts — so it plans like a local, instantly.',
  stats: [
    { value: '250+', label: 'local experts learned from' },
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
  const foodPerDay = 1800
  const groundTotal = (activitiesPerDay + transferPerDay + foodPerDay) * days

  const typeBump = tripType === 'Honeymoon' ? 1.25 : tripType === 'Bachelor' ? 1.15 : 1
  const base = (flights + stayTotal + groundTotal) * typeBump

  return {
    low: Math.round((base * 0.9) / 1000) * 1000,
    high: Math.round((base * 1.15) / 1000) * 1000,
    days,
    parts: [
      { label: 'Flights · return', amount: flights },
      { label: `Stays · ${Math.max(1, Math.round(days) - 1)} nights`, amount: stayTotal },
      { label: 'Food & dining', amount: Math.round(foodPerDay * days) },
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
