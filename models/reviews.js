const REVIEWS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    country: "United Kingdom",
    flag: "🇬🇧",
    avatar: "SM",
    avatarColor: "#e07b39",
    rating: 5,
    text: "Absolutely incredible experience! Our driver Pradeep was knowledgeable, friendly, and showed us hidden gems we'd never have found on our own. Kumaru Lanka made this trip unforgettable.",
    tourTitle: "Cultural Triangle Discovery",
    date: "March 2025"
  },
  {
    id: 2,
    name: "Marcus Keller",
    country: "Germany",
    flag: "🇩🇪",
    avatar: "MK",
    avatarColor: "#2e7d32",
    rating: 5,
    text: "The Yala safari was breathtaking — we spotted 3 leopards in one morning! The eco lodge was cosy and the guides were passionate about conservation. Highly recommend!",
    tourTitle: "Yala & Udawalawe Safari",
    date: "February 2025"
  },
  {
    id: 3,
    name: "Amélie Laurent",
    country: "France",
    flag: "🇫🇷",
    avatar: "AL",
    avatarColor: "#1565c0",
    rating: 5,
    text: "We hired an AC van for 10 days and it was the best decision. Our driver spoke perfect French and English. Flexible itinerary, always on time. Sri Lanka stole our hearts!",
    tourTitle: "AC Van – 10 Day Island Tour",
    date: "January 2025"
  },
  {
    id: 4,
    name: "Tanaka Nori",
    country: "Japan",
    flag: "🇯🇵",
    avatar: "TN",
    avatarColor: "#6a1b9a",
    rating: 5,
    text: "The Ella adventure package was perfect for us. The Nine Arches Bridge train ride was magical. Booking was so easy, and the team responded within minutes. Will definitely come back!",
    tourTitle: "Ella Mountain Adventure",
    date: "December 2024"
  },
  {
    id: 5,
    name: "Riya Chakraborty",
    country: "India",
    flag: "🇮🇳",
    avatar: "RC",
    avatarColor: "#00796b",
    rating: 5,
    text: "A seamless trip from start to finish. Hotel pickups were punctual, guides were expert storytellers. The South Coast beach tour was the perfect honeymoon getaway!",
    tourTitle: "South Coast Beach Escape",
    date: "November 2024"
  },
  {
    id: 6,
    name: "James Williams",
    country: "Australia",
    flag: "🇦🇺",
    avatar: "JW",
    avatarColor: "#c62828",
    rating: 5,
    text: "Booked a tuk-tuk tour around Colombo and it was hilarious and amazing. Driver took us to local eateries we'd never find in guidebooks. Such authentic food! 10/10.",
    tourTitle: "Colombo City & Street Food Tour",
    date: "October 2024"
  },
  {
    id: 7,
    name: "Emma Johansson",
    country: "Sweden",
    flag: "🇸🇪",
    avatar: "EJ",
    avatarColor: "#0277bd",
    rating: 5,
    text: "The Ayurveda retreat was life-changing. Seven days of complete wellness — treatments, yoga, organic food. I left feeling like a new person. Worth every penny.",
    tourTitle: "Ayurveda & Wellness Retreat",
    date: "September 2024"
  },
  {
    id: 8,
    name: "Carlos Mendez",
    country: "Spain",
    flag: "🇪🇸",
    avatar: "CM",
    avatarColor: "#bf360c",
    rating: 5,
    text: "Jaffna is incredibly underrated — the Tamil culture, the temples, the food! Our guide was exceptionally knowledgeable. Kumaru Lanka gave us an experience unlike any other.",
    tourTitle: "Jaffna & North Sri Lanka Discovery",
    date: "August 2024"
  }
];

function getAllReviews() {
  return REVIEWS;
}

function getReviewsByTour(tourTitle) {
  return REVIEWS.filter(r => r.tourTitle === tourTitle);
}

function getAverageRating() {
  const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
  return (total / REVIEWS.length).toFixed(1);
}