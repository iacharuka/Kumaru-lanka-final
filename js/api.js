/* ============================================================
   js/api.js — Kumaru Lanka API connector
   Replace BASE_URL with your deployed API URL in production.
   ============================================================ */

const API_BASE_URLS = resolveApiBaseUrls();
let activeApiBaseUrl = API_BASE_URLS[0];

function resolveApiBaseUrls() {
  const configured = window.localStorage.getItem("ce_api_base_url");
  if (configured) return [configured];

  const hostname = window.location.hostname;
  const protocol = window.location.protocol === "https:" ? "https:" : "http:";

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return [
      `${protocol}//${hostname}:5001/api`,
      `${protocol}//${hostname}:5002/api`
    ];
  }

  return [`${window.location.origin}/api`];
}

// ── Auth token helpers ────────────────────────────────────
function getToken()        { return sessionStorage.getItem("ce_token"); }
function setToken(token)   { sessionStorage.setItem("ce_token", token); }
function clearToken()      { sessionStorage.removeItem("ce_token"); }
function isLoggedIn()      { return !!getToken(); }
function getAdminUser()    { return JSON.parse(sessionStorage.getItem("ce_admin_user") || "null"); }
function setAdminUser(user){ sessionStorage.setItem("ce_admin_user", JSON.stringify(user)); }
function clearAdminUser()  { sessionStorage.removeItem("ce_admin_user"); }

function authHeaders() {
  const t = getToken();
  return t
    ? { "Authorization": `Bearer ${t}` }
    : {};
}

// ── Generic fetch wrapper ─────────────────────────────────
async function apiFetch(path, options = {}) {
  let lastError = null;

  for (const baseUrl of API_BASE_URLS) {
    const headers = {
      ...authHeaders(),
      ...(options.headers || {})
    };

    const isFormData = options.body instanceof FormData;
    if (!isFormData && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const res = await fetch(`${baseUrl}${path}`, {
        headers,
        ...options
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || "API error");
      }

      activeApiBaseUrl = baseUrl;
      return res.status === 204 ? null : res.json();
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError instanceof TypeError) {
    throw new Error(
      `Cannot reach the API. Start the backend on ${API_BASE_URLS.join(" or ")}`
    );
  }

  throw lastError || new Error("API error");
}

// ── Tours ─────────────────────────────────────────────────
const ToursAPI = {
  getAll:  (category, search) => apiFetch(`/tours?category=${category||""}&search=${search||""}`),
  getById: (id)               => apiFetch(`/tours/${id}`),
  create: (formData)          => apiFetch("/tours", { method: "POST", body: formData }),
  update: (id, formData)      => apiFetch(`/tours/${id}`, { method: "PUT", body: formData }),
  remove: (id)                => apiFetch(`/tours/${id}`, { method: "DELETE" })
};

// ── Destinations ──────────────────────────────────────────
const DestinationsAPI = {
  getAll:  (type) => apiFetch(`/destinations?type=${type||""}`),
  getById: (id)   => apiFetch(`/destinations/${id}`),
  create: (data)  => apiFetch("/destinations", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/destinations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => apiFetch(`/destinations/${id}`, { method: "DELETE" })
};

// ── Vehicles ──────────────────────────────────────────────
const VehiclesAPI = {
  getAll: ()          => apiFetch("/vehicles"),
  calculatePrice: (vehicleSlug, days, selectedExtras) =>
    apiFetch("/vehicles/calculate-price", {
      method: "POST",
      body:   JSON.stringify({ vehicleSlug, days, selectedExtras })
    })
};

// ── Bookings ──────────────────────────────────────────────
const BookingsAPI = {
  create: (data) =>
    apiFetch("/bookings", {
      method: "POST",
      body:   JSON.stringify(data)
    }),
  getByRef: (ref) => apiFetch(`/bookings/${ref}`),
  getAll: (status) => apiFetch(`/bookings${status ? `?status=${encodeURIComponent(status)}` : ""}`),
  updateStatus: (id, status) =>
    apiFetch(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    })
};

// ── Reviews ───────────────────────────────────────────────
const ReviewsAPI = {
  getAll: () => apiFetch("/reviews")
};

// ── Auth ──────────────────────────────────────────────────
const AuthAPI = {
  login: async (email, password) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body:   JSON.stringify({ email, password })
    });
    setToken(data.token);
    setAdminUser({
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      expiry: data.expiry
    });
    return data;
  },
  logout: () => {
    clearToken();
    clearAdminUser();
  }
};

// ── Chat (AI assistant) ───────────────────────────────────
const ChatAPI = {
  send: (message, history = []) =>
    apiFetch("/chat", {
      method: "POST",
      body:   JSON.stringify({ message, history })
    })
};

/* ============================================================
   How to use in your HTML pages — replace the hardcoded JS
   data models with real API calls:

   // Load tours on page load
   document.addEventListener("DOMContentLoaded", async () => {
     try {
       const tours = await ToursAPI.getAll();
       renderTourGrid("tourGrid", tours);
     } catch (e) {
       console.error("Failed to load tours:", e.message);
     }
   });

   // Submit a booking
   async function submitBooking() {
     try {
       const result = await BookingsAPI.create({
         type:        "tour",
         fullName:    document.getElementById("mName").value,
         email:       document.getElementById("mEmail").value,
         travelDate:  document.getElementById("mDate").value,
         numberOfPax: parseInt(document.getElementById("mPax").value),
         tourId:      selectedTourId
       });
       showSuccess(result.bookingRef);
     } catch (e) {
       showError(e.message);
     }
   }

   // Calculate vehicle price
   async function updatePriceBreakdown() {
     const days   = parseInt(document.getElementById("calcDays").value);
     const result = await VehiclesAPI.calculatePrice(selectedVehicleId, days, selectedExtras);
     renderBreakdown(result);
   }

   // AI chat - replace fetch in chat.js with:
   const data = await ChatAPI.send(userMessage, chatHistory);
   addBotMessage(data.reply);
   ============================================================ */
