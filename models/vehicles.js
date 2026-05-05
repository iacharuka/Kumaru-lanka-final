const VEHICLES = [
  {
    id: "tuk",
    name: "Tuk-Tuk",
    icon: "🛺",
    tagline: "Authentic Sri Lankan experience",
    description: "Perfect for city tours and short trips. Feel the breeze and experience Sri Lanka the local way.",
    pricePerDay: 25,
    passengers: "1–3",
    luggage: "Small bags only",
    ac: false,
    features: ["City tours", "Short trips", "Local experience", "Easy parking"],
    extras: {
      airportPickup: 10,
      nightSurcharge: 5
    }
  },
  {
    id: "car",
    name: "Private Car",
    icon: "🚗",
    tagline: "Comfortable inter-city travel",
    description: "Air-conditioned sedan ideal for couples and small families travelling between cities.",
    pricePerDay: 55,
    passengers: "1–4",
    luggage: "2 large bags",
    ac: true,
    features: ["Full AC", "Inter-city travel", "Comfortable seats", "Phone charger"],
    extras: {
      airportPickup: 15,
      nightSurcharge: 10,
      childSeat: 8
    }
  },
  {
    id: "van",
    name: "AC Van",
    icon: "🚐",
    tagline: "Spacious family & group travel",
    description: "Roomy air-conditioned van with ample luggage space — perfect for families and small groups.",
    pricePerDay: 75,
    passengers: "5–8",
    luggage: "4–6 large bags",
    ac: true,
    features: ["Full AC", "Large luggage space", "Reclining seats", "USB charging", "Wi-Fi optional"],
    extras: {
      airportPickup: 20,
      nightSurcharge: 15,
      childSeat: 8,
      wifi: 5
    }
  },
  {
    id: "bus",
    name: "Mini Bus",
    icon: "🚌",
    tagline: "Large groups & corporate tours",
    description: "Ideal for larger groups, school tours, and corporate travel with comfortable seating throughout.",
    pricePerDay: 110,
    passengers: "9–20",
    luggage: "Large group luggage",
    ac: true,
    features: ["Full AC", "PA system", "Reclining seats", "Large storage", "USB ports"],
    extras: {
      airportPickup: 30,
      nightSurcharge: 20,
      wifi: 5,
      guide: 40
    }
  }
];

const EXTRAS_LABELS = {
  airportPickup: "Airport pickup/drop",
  nightSurcharge: "Night travel surcharge",
  childSeat: "Child seat",
  wifi: "Wi-Fi (per day)",
  guide: "English-speaking guide (per day)"
};

function getVehicleById(id) {
  return VEHICLES.find(v => v.id === id);
}

/**
 * Calculate total hire cost
 * @param {string} vehicleId
 * @param {number} days
 * @param {string[]} selectedExtras - array of extra keys
 * @returns {object} breakdown and total
 */
function calculatePrice(vehicleId, days, selectedExtras = []) {
  const vehicle = getVehicleById(vehicleId);
  if (!vehicle) return null;

  const baseTotal = vehicle.pricePerDay * days;
  const extrasBreakdown = {};
  let extrasTotal = 0;

  selectedExtras.forEach(key => {
    if (vehicle.extras[key] !== undefined) {
      const isDaily = ["wifi", "guide"].includes(key);
      const amount = isDaily ? vehicle.extras[key] * days : vehicle.extras[key];
      extrasBreakdown[key] = { amount, label: EXTRAS_LABELS[key] };
      extrasTotal += amount;
    }
  });

  const subtotal = baseTotal + extrasTotal;
  const tax = Math.round(subtotal * 0.10);
  const total = subtotal + tax;

  return {
    vehicle: vehicle.name,
    pricePerDay: vehicle.pricePerDay,
    days,
    baseTotal,
    extrasBreakdown,
    extrasTotal,
    subtotal,
    tax,
    total
  };
}