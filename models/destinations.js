const DESTINATIONS = [
  {
    id: 1,
    name: "Sigiriya",
    subtitle: "Ancient Rock Fortress",
    region: "Cultural Triangle",
    badge: "UNESCO",
    image: "https://images.unsplash.com/photo-1566296314736-6eaea1755728?w=600&q=80",
    description: "A 5th-century rock fortress rising 200m above the jungle, adorned with ancient frescoes and surrounded by landscaped gardens. One of Sri Lanka's most iconic landmarks.",
    bestTime: "Jan – Apr",
    distance: "169 km from Colombo",
    type: "heritage",
    relatedTourIds: [1, 12]
  },
  {
    id: 2,
    name: "Kandy",
    subtitle: "City of the Sacred Tooth",
    region: "Hill Country",
    badge: "UNESCO",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80",
    description: "The last royal capital of Sri Lanka, home to the sacred Temple of the Tooth Relic. Surrounded by misty hills, botanical gardens, and vibrant cultural festivals.",
    bestTime: "Year-round",
    distance: "116 km from Colombo",
    type: "cultural",
    relatedTourIds: [5, 12]
  },
  {
    id: 3,
    name: "Ella",
    subtitle: "Misty Hills & Tea Trails",
    region: "Uva Province",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1586022045247-c94c5c937962?w=600&q=80",
    description: "A charming highland village offering breathtaking valley views, lush tea plantations, and the world-famous Nine Arches Bridge. A backpacker and adventurer's paradise.",
    bestTime: "Dec – Mar",
    distance: "197 km from Colombo",
    type: "adventure",
    relatedTourIds: [2, 12]
  },
  {
    id: 4,
    name: "Galle",
    subtitle: "Colonial Dutch Fort",
    region: "Southern Province",
    badge: "UNESCO",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
    description: "A perfectly preserved 17th-century Dutch colonial fort with cobblestone streets, boutique cafés, art galleries, and sweeping ocean views from ancient ramparts.",
    bestTime: "Nov – Apr",
    distance: "119 km from Colombo",
    type: "heritage",
    relatedTourIds: [4, 12]
  },
  {
    id: 5,
    name: "Yala National Park",
    subtitle: "Sri Lanka's Premier Safari",
    region: "Southern Province",
    badge: null,
    image: "https://images.unsplash.com/photo-1534476478164-b15a2fd8b035?w=600&q=80",
    description: "Home to the world's highest density of leopards, plus elephants, sloth bears, crocodiles, and over 200 bird species. A must for wildlife enthusiasts.",
    bestTime: "Feb – Jul",
    distance: "298 km from Colombo",
    type: "wildlife",
    relatedTourIds: [3, 12]
  },
  {
    id: 6,
    name: "Mirissa",
    subtitle: "Whale Watching & Beaches",
    region: "Southern Coast",
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    description: "A crescent-shaped beach paradise famous for blue whale and dolphin watching from November to April. Laid-back vibes, fresh seafood, and golden sunsets.",
    bestTime: "Nov – Apr",
    distance: "150 km from Colombo",
    type: "beach",
    relatedTourIds: [4, 12]
  },
  {
    id: 7,
    name: "Nuwara Eliya",
    subtitle: "Little England of Sri Lanka",
    region: "Central Province",
    badge: null,
    image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&q=80",
    description: "Perched at 1,868m, this former British hill station is surrounded by emerald tea estates, misty waterfalls, and Victorian architecture. Sri Lanka's coolest escape.",
    bestTime: "Dec – Mar",
    distance: "181 km from Colombo",
    type: "nature",
    relatedTourIds: [5, 12]
  },
  {
    id: 8,
    name: "Trincomalee",
    subtitle: "East Coast Diving Paradise",
    region: "Eastern Province",
    badge: "Hidden Gem",
    image: "https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=600&q=80",
    description: "Crystal-clear waters with pristine coral reefs, ancient Hindu temples, and the spectacular natural harbour. Home to Pigeon Island Marine Sanctuary.",
    bestTime: "Apr – Sep",
    distance: "257 km from Colombo",
    type: "beach",
    relatedTourIds: [6]
  },
  {
    id: 9,
    name: "Anuradhapura",
    subtitle: "Ancient Sacred Capital",
    region: "North Central Province",
    badge: "UNESCO",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80",
    description: "One of the ancient capitals of Sri Lanka, with colossal stupas, sacred Bo tree, and vast monastery ruins spreading across the ancient city.",
    bestTime: "Jan – Apr",
    distance: "206 km from Colombo",
    type: "heritage",
    relatedTourIds: [1, 12]
  },
  {
    id: 10,
    name: "Sinharaja Forest",
    subtitle: "Rainforest UNESCO Reserve",
    region: "Sabaragamuwa",
    badge: "UNESCO",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    description: "Sri Lanka's last viable area of primary tropical rainforest, home to 64% of endemic tree species and rare birds like the Sri Lanka Blue Magpie.",
    bestTime: "Aug – Sep",
    distance: "140 km from Colombo",
    type: "nature",
    relatedTourIds: [11]
  }
];

const DEST_TYPES = ["all", "heritage", "cultural", "adventure", "wildlife", "beach", "nature"];

function getDestinationsByType(type) {
  if (type === "all") return DESTINATIONS;
  return DESTINATIONS.filter(d => d.type === type);
}

function getDestinationById(id) {
  return DESTINATIONS.find(d => d.id === id);
}

function searchDestinations(query) {
  const q = query.toLowerCase();
  return DESTINATIONS.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.subtitle.toLowerCase().includes(q) ||
    d.region.toLowerCase().includes(q) ||
    d.type.toLowerCase().includes(q)
  );
}