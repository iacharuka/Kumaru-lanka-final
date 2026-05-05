const ADMIN_OFFLINE_TOURS_KEY = "ce_admin_offline_tours";

function normalizeTour(tour) {
  return {
    id: tour.id,
    title: tour.title || "",
    category: tour.category || "cultural",
    duration: tour.duration || "",
    pax: tour.pax || tour.paxRange || "",
    paxRange: tour.paxRange || tour.pax || "",
    accommodation: tour.accommodation || "",
    price: Number(tour.price || 0),
    rating: Number(tour.rating || 5),
    reviews: Number(tour.reviews || tour.reviewCount || 0),
    reviewCount: Number(tour.reviewCount || tour.reviews || 0),
    image: tour.image || tour.imageUrl || "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&q=80",
    imageUrl: tour.imageUrl || tour.image || "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&q=80",
    tags: Array.isArray(tour.tags) ? tour.tags : [],
    description: tour.description || "",
    highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
    includes: Array.isArray(tour.includes) ? tour.includes : []
  };
}

function getOfflineAdminTours() {
  const saved = localStorage.getItem(ADMIN_OFFLINE_TOURS_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved).map(normalizeTour);
  } catch {
    return [];
  }
}

async function getPublicTours() {
  const offlineTours = getOfflineAdminTours();
  if (offlineTours.length) return offlineTours;

  if (typeof ToursAPI !== "undefined") {
    try {
      const apiTours = await ToursAPI.getAll();
      if (apiTours.length) return apiTours.map(normalizeTour);
    } catch {
      // Fall back to the static model when the API is offline.
    }
  }

  return TOURS.map(normalizeTour);
}

function filterPublicTours(tours, category, query, sort) {
  const q = (query || "").trim().toLowerCase();
  let results = category === "all"
    ? [...tours]
    : tours.filter((tour) => tour.category === category);

  if (q) {
    results = results.filter((tour) =>
      tour.title.toLowerCase().includes(q) ||
      tour.description.toLowerCase().includes(q) ||
      tour.category.toLowerCase().includes(q) ||
      tour.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
  if (sort === "rating") results.sort((a, b) => b.rating - a.rating);

  return results;
}
