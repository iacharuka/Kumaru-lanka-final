const ADMIN_OFFLINE_DESTINATIONS_KEY = "ce_admin_offline_destinations";
let publicDestinations = [];

function normalizeDestination(destination) {
  return {
    id: destination.id,
    name: destination.name || "",
    subtitle: destination.subtitle || "",
    region: destination.region || "",
    badge: destination.badge || null,
    image: destination.image || destination.imageUrl || "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&q=80",
    imageUrl: destination.imageUrl || destination.image || "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&q=80",
    description: destination.description || "",
    bestTime: destination.bestTime || "",
    distance: destination.distance || "",
    type: destination.type || "nature",
    relatedTourIds: Array.isArray(destination.relatedTourIds) ? destination.relatedTourIds : []
  };
}

function getOfflineAdminDestinations() {
  const saved = localStorage.getItem(ADMIN_OFFLINE_DESTINATIONS_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved).map(normalizeDestination);
  } catch {
    return [];
  }
}

async function getPublicDestinations() {
  const offlineDestinations = getOfflineAdminDestinations();
  if (offlineDestinations.length) {
    const offlineKeys = new Set(offlineDestinations.map((destination) => destinationKey(destination)));
    const staticDestinations = DESTINATIONS
      .map(normalizeDestination)
      .filter((destination) => !offlineKeys.has(destinationKey(destination)));

    publicDestinations = [...offlineDestinations, ...staticDestinations];
    return publicDestinations;
  }

  if (typeof DestinationsAPI !== "undefined") {
    try {
      const apiDestinations = await DestinationsAPI.getAll();
      if (apiDestinations.length) {
        publicDestinations = apiDestinations.map(normalizeDestination);
        return publicDestinations;
      }
    } catch {
      // Fall back to static destinations when the API is offline.
    }
  }

  publicDestinations = DESTINATIONS.map(normalizeDestination);
  return publicDestinations;
}

function filterPublicDestinations(destinations, type) {
  if (type === "all") return destinations;
  return destinations.filter((destination) => destination.type === type);
}

function getPublicDestinationById(id) {
  return publicDestinations.find((destination) => destination.id === id)
    || getOfflineAdminDestinations().find((destination) => destination.id === id)
    || DESTINATIONS.map(normalizeDestination).find((destination) => destination.id === id);
}

function destinationKey(destination) {
  return `${String(destination.name).trim().toLowerCase()}|${String(destination.region).trim().toLowerCase()}`;
}
