const TOURS = [
  {
    id: 1,
    title: "Cultural Triangle Discovery",
    category: "cultural",
    duration: "5 Days",
    pax: "2–10",
    accommodation: "4-star hotel",
    price: 349,
    rating: 5.0,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1566296314736-6eaea1755728?w=600&q=80",
    tags: ["Cultural", "Guided"],
    description: "Visit Sigiriya, Dambulla Cave Temple, Polonnaruwa, and Anuradhapura with an expert historian guide.",
    highlights: ["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Polonnaruwa Ruins", "Anuradhapura Sacred City"],
    includes: ["AC transport", "English guide", "4-star hotels", "Breakfast & dinner", "Entry tickets"]
  },
  {
    id: 2,
    title: "Ella Mountain Adventure",
    category: "adventure",
    duration: "3 Days",
    pax: "2–8",
    accommodation: "Boutique stay",
    price: 219,
    rating: 5.0,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1586022045247-c94c5c937962?w=600&q=80",
    tags: ["Adventure", "Hiking"],
    description: "Hike Little Adam's Peak, ride the iconic Nine Arches Bridge train, and sip tea at a highland estate.",
    highlights: ["Little Adam's Peak hike", "Nine Arches Bridge", "Tea estate visit", "Ravana Falls"],
    includes: ["AC transport", "Guide", "Boutique hotel", "Breakfast", "Train tickets"]
  },
  {
    id: 3,
    title: "Yala & Udawalawe Safari",
    category: "wildlife",
    duration: "4 Days",
    pax: "2–6",
    accommodation: "Eco lodge",
    price: 289,
    rating: 5.0,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1534476478164-b15a2fd8b035?w=600&q=80",
    tags: ["Wildlife", "Safari"],
    description: "Spot leopards, elephants, and exotic birds on game drives through two premier national parks.",
    highlights: ["Leopard spotting", "Elephant herds", "Bird watching", "Eco lodge experience"],
    includes: ["AC transport", "Safari jeep", "Eco lodge", "All meals", "Park entry fees"]
  },
  {
    id: 4,
    title: "South Coast Beach Escape",
    category: "beach",
    duration: "5 Days",
    pax: "2–12",
    accommodation: "Beach resort",
    price: 379,
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    tags: ["Beach", "Relaxation"],
    description: "Whale watching in Mirissa, surfing at Weligama, and sunset strolls along the Galle Fort ramparts.",
    highlights: ["Whale watching", "Surfing lessons", "Galle Fort tour", "Turtle hatchery visit"],
    includes: ["AC transport", "Beach resort", "Breakfast", "Whale watching boat", "Surf instructor"]
  },
  {
    id: 5,
    title: "Kandy & Nuwara Eliya Highlights",
    category: "cultural",
    duration: "3 Days",
    pax: "2–10",
    accommodation: "Heritage hotel",
    price: 199,
    rating: 5.0,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80",
    tags: ["Cultural", "Festival"],
    description: "Temple of the Tooth Relic, Royal Botanical Gardens, a scenic train ride through tea country.",
    highlights: ["Temple of the Tooth", "Royal Botanical Gardens", "Scenic train ride", "Tea factory tour"],
    includes: ["AC transport", "Guide", "Heritage hotel", "Breakfast", "Train tickets"]
  },
  {
    id: 6,
    title: "Island Hopping & Diving",
    category: "adventure",
    duration: "6 Days",
    pax: "2–8",
    accommodation: "Dive resort",
    price: 459,
    rating: 5.0,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
    tags: ["Adventure", "Diving"],
    description: "Snorkel at Pigeon Island, dive the coral reefs of Trincomalee, and explore Pasikuda's turquoise lagoon.",
    highlights: ["Pigeon Island snorkeling", "Trincomalee diving", "Pasikuda lagoon", "Whale shark spotting"],
    includes: ["AC transport", "Dive resort", "Dive equipment", "All meals", "Boat trips"]
  },
  {
    id: 7,
    title: "Colombo City & Street Food Tour",
    category: "cultural",
    duration: "1 Day",
    pax: "2–12",
    accommodation: "N/A",
    price: 59,
    rating: 4.8,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    tags: ["Cultural", "Food"],
    description: "Explore Colombo's colonial architecture, bustling markets, and hidden street food gems by tuk-tuk.",
    highlights: ["Pettah Market", "Gangaramaya Temple", "Galle Face Green", "Street food crawl"],
    includes: ["Tuk-tuk transport", "English guide", "Street food tastings", "Entry fees"]
  },
  {
    id: 8,
    title: "Adam's Peak Sunrise Pilgrimage",
    category: "adventure",
    duration: "2 Days",
    pax: "2–10",
    accommodation: "Guesthouse",
    price: 129,
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    tags: ["Adventure", "Spiritual"],
    description: "Night hike to the sacred Sri Pada (Adam's Peak) to witness a breathtaking sunrise from the summit.",
    highlights: ["Midnight start hike", "Summit sunrise", "Shadow of the Peak", "Sacred footprint shrine"],
    includes: ["AC transport", "Guide", "Guesthouse", "Dinner & breakfast", "Torch & gear"]
  },
  {
    id: 9,
    title: "Ayurveda & Wellness Retreat",
    category: "wellness",
    duration: "7 Days",
    pax: "1–4",
    accommodation: "Ayurveda resort",
    price: 799,
    rating: 5.0,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    tags: ["Wellness", "Ayurveda"],
    description: "A transformative week of traditional Ayurvedic treatments, yoga, meditation, and organic cuisine.",
    highlights: ["Daily Ayurvedic treatments", "Yoga & meditation", "Herbal garden walk", "Organic farm meals"],
    includes: ["All treatments", "Yoga sessions", "Resort stay", "All meals", "Doctor consultation"]
  },
  {
    id: 10,
    title: "Jaffna & North Sri Lanka Discovery",
    category: "cultural",
    duration: "4 Days",
    pax: "2–8",
    accommodation: "Boutique hotel",
    price: 269,
    rating: 4.7,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80",
    tags: ["Cultural", "Off-beat"],
    description: "Discover the unique Tamil culture, ancient Nainativu island temple, and the stunning Casuarina Beach.",
    highlights: ["Jaffna Fort", "Nainativu Island temple", "Casuarina Beach", "Local Tamil cuisine"],
    includes: ["AC transport", "Guide", "Boutique hotel", "Breakfast", "Boat to Nainativu"]
  },
  {
    id: 11,
    title: "Rainforest & Waterfall Trail",
    category: "adventure",
    duration: "2 Days",
    pax: "2–8",
    accommodation: "Forest lodge",
    price: 149,
    rating: 4.9,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    tags: ["Adventure", "Nature"],
    description: "Trek through Sinharaja Rainforest, a UNESCO World Heritage site teeming with endemic wildlife.",
    highlights: ["Sinharaja Forest trek", "Endemic bird spotting", "Natural waterfalls", "Night forest sounds"],
    includes: ["AC transport", "Forest guide", "Lodge stay", "All meals", "Trekking gear"]
  },
  {
    id: 12,
    title: "Full Island 10-Day Grand Tour",
    category: "cultural",
    duration: "10 Days",
    pax: "2–10",
    accommodation: "Mixed 3–4 star",
    price: 899,
    rating: 5.0,
    reviews: 154,
    image: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&q=80",
    tags: ["Cultural", "Adventure", "Beach"],
    description: "The ultimate Sri Lanka experience — from the Cultural Triangle to the highlands, safari, and south coast beaches.",
    highlights: ["Sigiriya", "Kandy & Ella", "Yala Safari", "Galle & Mirissa beach"],
    includes: ["AC van", "Expert guide", "All hotels", "Most meals", "All entry tickets"]
  }
];

const TOUR_CATEGORIES = ["all", "cultural", "adventure", "wildlife", "beach", "wellness"];

function getToursByCategory(cat) {
  if (cat === "all") return TOURS;
  return TOURS.filter(t => t.category === cat);
}

function getTourById(id) {
  return TOURS.find(t => t.id === id);
}

function searchTours(query) {
  const q = query.toLowerCase();
  return TOURS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q)) ||
    t.category.toLowerCase().includes(q)
  );
}