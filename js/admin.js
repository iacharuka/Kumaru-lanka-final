let adminTours = [];
let adminDestinations = [];
let adminBookings = [];
let currentBookingFilter = "";
let editingTourId = null;
let editingDestinationId = null;
let destinationUploadedImage = "";
const OFFLINE_ADMIN_KEY = "ce_admin_offline";
const OFFLINE_TOURS_KEY = "ce_admin_offline_tours";
const OFFLINE_DESTINATIONS_KEY = "ce_admin_offline_destinations";

document.addEventListener("DOMContentLoaded", () => {
  bindAdminEvents();
  refreshAdminAuthUI();

  if (isLoggedIn()) {
    loadAdminData();
  }
});

function bindAdminEvents() {
  document.getElementById("adminLoginForm")?.addEventListener("submit", handleAdminLogin);
  document.getElementById("tourEditorForm")?.addEventListener("submit", handleTourSubmit);
  document.getElementById("destinationEditorForm")?.addEventListener("submit", handleDestinationSubmit);
  document.getElementById("destinationImageFile")?.addEventListener("change", handleDestinationImageUpload);
  document.getElementById("destinationImageUrl")?.addEventListener("input", () => {
    destinationUploadedImage = "";
    updateDestinationImagePreview(document.getElementById("destinationImageUrl").value.trim());
  });
  document.getElementById("bookingStatusFilter")?.addEventListener("change", (event) => {
    currentBookingFilter = event.target.value;
    loadBookings();
  });
}

function refreshAdminAuthUI() {
  const loggedIn = isLoggedIn();
  const user = getAdminUser();

  document.getElementById("adminLoginCard").style.display = loggedIn ? "none" : "block";
  document.getElementById("adminWorkspace").style.display = loggedIn ? "block" : "none";

  const userName = document.getElementById("adminUserName");
  if (userName) {
    userName.textContent = user?.fullName || "Admin";
  }
}

async function handleAdminLogin(event) {
  event.preventDefault();
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;
  const feedback = document.getElementById("adminLoginFeedback");

  feedback.textContent = "Signing in...";
  feedback.className = "admin-feedback";

  try {
    await AuthAPI.login(email, password);
    refreshAdminAuthUI();
    feedback.textContent = "";
    event.target.reset();
    await loadAdminData();
  } catch (error) {
    if (canUseOfflineAdmin(email, password, error)) {
      enableOfflineAdmin();
      refreshAdminAuthUI();
      feedback.textContent = "";
      event.target.reset();
      await loadAdminData();
      showAdminMessage("API is offline, so the admin panel is running in local demo mode.", "info");
      return;
    }

    feedback.textContent = error.message;
    feedback.className = "admin-feedback error";
  }
}

function logoutAdmin() {
  AuthAPI.logout();
  sessionStorage.removeItem(OFFLINE_ADMIN_KEY);
  adminTours = [];
  adminDestinations = [];
  adminBookings = [];
  editingTourId = null;
  editingDestinationId = null;
  destinationUploadedImage = "";
  refreshAdminAuthUI();
  renderToursTable();
  renderBookingsTable();
  updateDashboardStats();
  showAdminMessage("Signed out.", "success");
}

function switchAdminTab(tab, button) {
  document.querySelectorAll(".admin-tab").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".admin-tab-content").forEach((item) => item.classList.remove("active"));

  button?.classList.add("active");
  document.getElementById(`adminTab${capitalize(tab)}`)?.classList.add("active");
}

async function loadAdminData() {
  if (isOfflineAdmin()) {
    loadOfflineData();
    return;
  }

  showAdminMessage("Loading dashboard...", "info");

  try {
    await Promise.all([loadTours(), loadDestinations(), loadBookings()]);
    showAdminMessage("Dashboard updated.", "success");
  } catch (error) {
    if (/401|403|unauthor/i.test(error.message)) {
      AuthAPI.logout();
      refreshAdminAuthUI();
    }
    showAdminMessage(error.message, "error");
  }
}

async function loadTours() {
  if (isOfflineAdmin()) {
    adminTours = getOfflineTours();
    renderToursTable();
    updateDashboardStats();
    return;
  }

  adminTours = await ToursAPI.getAll();
  renderToursTable();
  updateDashboardStats();
}

async function loadBookings() {
  if (isOfflineAdmin()) {
    adminBookings = [];
    renderBookingsTable();
    updateDashboardStats();
    return;
  }

  adminBookings = await BookingsAPI.getAll(currentBookingFilter);
  renderBookingsTable();
  updateDashboardStats();
}

async function loadDestinations() {
  if (isOfflineAdmin()) {
    adminDestinations = getOfflineDestinations();
    renderDestinationsTable();
    updateDashboardStats();
    return;
  }

  adminDestinations = await DestinationsAPI.getAll();
  adminDestinations = adminDestinations.map(normalizeAdminDestination);
  renderDestinationsTable();
  updateDashboardStats();
}

function updateDashboardStats() {
  const pending = adminBookings.filter((booking) => booking.status === "pending").length;
  const confirmed = adminBookings.filter((booking) => booking.status === "confirmed").length;

  setStat("statTours", adminTours.length);
  setStat("statDestinations", adminDestinations.length);
  setStat("statBookings", adminBookings.length);
  setStat("statPending", pending);
  setStat("statConfirmed", confirmed);
}

function renderDestinationsTable() {
  const tbody = document.getElementById("destinationsTableBody");
  if (!tbody) return;

  if (!adminDestinations.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="admin-empty">No destinations available yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminDestinations.map((destination) => `
    <tr>
      <td><strong>${escapeHtml(destination.name)}</strong><br/><span style="color:var(--text-light);font-size:12px">${escapeHtml(destination.subtitle)}</span></td>
      <td>${escapeHtml(destination.type)}</td>
      <td>${escapeHtml(destination.region)}</td>
      <td>${escapeHtml(destination.badge || "—")}</td>
      <td class="admin-actions-cell">
        <button class="btn btn-outline btn-sm" onclick="startEditDestination(${destination.id})">Edit</button>
        <button class="btn btn-primary btn-sm" onclick="deleteDestination(${destination.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function setStat(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(value);
}

function renderBookingsTable() {
  const tbody = document.getElementById("bookingsTableBody");
  if (!tbody) return;

  if (!adminBookings.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="admin-empty">No bookings found for this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminBookings.map((booking) => `
    <tr>
      <td><strong>${escapeHtml(booking.bookingRef)}</strong></td>
      <td>${escapeHtml(booking.fullName)}</td>
      <td>${escapeHtml(booking.type)}</td>
      <td>${formatDate(booking.travelDate)}</td>
      <td>$${Number(booking.totalAmount || 0).toFixed(2)}</td>
      <td><span class="status-pill status-${escapeHtml(booking.status)}">${escapeHtml(booking.status)}</span></td>
      <td>
        <select onchange="changeBookingStatus(${booking.id}, this.value)" class="admin-table-select">
          ${["pending", "confirmed", "cancelled", "completed"].map((status) => `
            <option value="${status}" ${booking.status === status ? "selected" : ""}>${capitalize(status)}</option>
          `).join("")}
        </select>
      </td>
    </tr>
  `).join("");
}

function renderToursTable() {
  const tbody = document.getElementById("toursTableBody");
  if (!tbody) return;

  if (!adminTours.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="admin-empty">No tours available yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminTours.map((tour) => `
    <tr>
      <td><strong>${escapeHtml(tour.title)}</strong></td>
      <td>${escapeHtml(tour.category)}</td>
      <td>${escapeHtml(tour.duration)}</td>
      <td>${escapeHtml(tour.paxRange)}</td>
      <td>$${Number(tour.price || 0).toFixed(2)}</td>
      <td class="admin-actions-cell">
        <button class="btn btn-outline btn-sm" onclick="startEditTour(${tour.id})">Edit</button>
        <button class="btn btn-primary btn-sm" onclick="deleteTour(${tour.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

async function changeBookingStatus(id, status) {
  if (isOfflineAdmin()) {
    showAdminMessage("Booking updates need the API. Start the backend to manage real bookings.", "info");
    return;
  }

  try {
    await BookingsAPI.updateStatus(id, status);
    showAdminMessage(`Booking updated to ${status}.`, "success");
    await loadBookings();
  } catch (error) {
    showAdminMessage(error.message, "error");
  }
}

function startEditTour(id) {
  const tour = adminTours.find((item) => item.id === id);
  if (!tour) return;

  editingTourId = id;
  document.getElementById("tourFormTitle").textContent = "Edit tour";
  document.getElementById("tourSubmitLabel").textContent = "Update tour";
  document.getElementById("tourTitle").value = tour.title || "";
  document.getElementById("tourCategory").value = tour.category || "";
  document.getElementById("tourDuration").value = tour.duration || "";
  document.getElementById("tourPaxRange").value = tour.paxRange || "";
  document.getElementById("tourAccommodation").value = tour.accommodation || "";
  document.getElementById("tourPrice").value = tour.price || "";
  document.getElementById("tourDescription").value = tour.description || "";
  document.getElementById("tourTags").value = (tour.tags || []).join(", ");
  document.getElementById("tourHighlights").value = (tour.highlights || []).join("\n");
  document.getElementById("tourIncludes").value = (tour.includes || []).join("\n");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetTourForm() {
  editingTourId = null;
  document.getElementById("tourEditorForm")?.reset();
  document.getElementById("tourFormTitle").textContent = "Create new tour";
  document.getElementById("tourSubmitLabel").textContent = "Create tour";
}

function startEditDestination(id) {
  const destination = adminDestinations.find((item) => item.id === id);
  if (!destination) return;

  editingDestinationId = id;
  document.getElementById("destinationFormTitle").textContent = "Edit destination";
  document.getElementById("destinationSubmitLabel").textContent = "Update destination";
  document.getElementById("destinationName").value = destination.name || "";
  document.getElementById("destinationSubtitle").value = destination.subtitle || "";
  document.getElementById("destinationRegion").value = destination.region || "";
  document.getElementById("destinationType").value = destination.type || "heritage";
  document.getElementById("destinationBadge").value = destination.badge || "";
  document.getElementById("destinationBestTime").value = destination.bestTime || "";
  document.getElementById("destinationDistance").value = destination.distance || "";
  document.getElementById("destinationImageUrl").value = destination.imageUrl || destination.image || "";
  document.getElementById("destinationDescription").value = destination.description || "";
  destinationUploadedImage = "";
  updateDestinationImagePreview(destination.imageUrl || destination.image || "");
  document.getElementById("destinationFormTitle").scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetDestinationForm() {
  editingDestinationId = null;
  destinationUploadedImage = "";
  document.getElementById("destinationEditorForm")?.reset();
  document.getElementById("destinationFormTitle").textContent = "Create new destination";
  document.getElementById("destinationSubmitLabel").textContent = "Create destination";
  updateDestinationImagePreview("");
}

async function handleTourSubmit(event) {
  event.preventDefault();

  const submitButton = document.getElementById("tourSubmitButton");
  submitButton.disabled = true;

  try {
    const formData = buildTourFormData();

    if (isOfflineAdmin()) {
      saveOfflineTourFromForm();
      showAdminMessage("Tour saved locally in demo mode.", "success");
    } else if (editingTourId) {
      await ToursAPI.update(editingTourId, formData);
      showAdminMessage("Tour updated successfully.", "success");
    } else {
      await ToursAPI.create(formData);
      showAdminMessage("Tour created successfully.", "success");
    }

    resetTourForm();
    await loadTours();
  } catch (error) {
    showAdminMessage(error.message, "error");
  } finally {
    submitButton.disabled = false;
  }
}

function buildTourFormData() {
  const formData = new FormData();
  formData.append("title", document.getElementById("tourTitle").value.trim());
  formData.append("category", document.getElementById("tourCategory").value);
  formData.append("duration", document.getElementById("tourDuration").value.trim());
  formData.append("paxRange", document.getElementById("tourPaxRange").value.trim());
  formData.append("accommodation", document.getElementById("tourAccommodation").value.trim());
  formData.append("price", document.getElementById("tourPrice").value);
  formData.append("description", document.getElementById("tourDescription").value.trim());

  parseCommaList(document.getElementById("tourTags").value).forEach((item) => formData.append("tags", item));
  parseLineList(document.getElementById("tourHighlights").value).forEach((item) => formData.append("highlights", item));
  parseLineList(document.getElementById("tourIncludes").value).forEach((item) => formData.append("includes", item));

  const imageInput = document.getElementById("tourImage");
  if (imageInput.files[0]) {
    formData.append("image", imageInput.files[0]);
  }

  return formData;
}

async function deleteTour(id) {
  const confirmed = window.confirm("Delete this tour from the public site?");
  if (!confirmed) return;

  try {
    if (isOfflineAdmin()) {
      setOfflineTours(getOfflineTours().filter((tour) => tour.id !== id));
    } else {
      await ToursAPI.remove(id);
    }

    if (editingTourId === id) {
      resetTourForm();
    }
    showAdminMessage("Tour deleted.", "success");
    await loadTours();
  } catch (error) {
    showAdminMessage(error.message, "error");
  }
}

async function handleDestinationSubmit(event) {
  event.preventDefault();

  const submitButton = document.getElementById("destinationSubmitButton");
  submitButton.disabled = true;

  try {
    const destination = buildDestinationPayload();

    if (isOfflineAdmin()) {
      saveOfflineDestination(destination);
      showAdminMessage("Destination saved locally in demo mode.", "success");
    } else if (editingDestinationId) {
      await DestinationsAPI.update(editingDestinationId, destination);
      showAdminMessage("Destination updated successfully.", "success");
    } else {
      await DestinationsAPI.create(destination);
      showAdminMessage("Destination created successfully.", "success");
    }

    resetDestinationForm();
    await loadDestinations();
  } catch (error) {
    showAdminMessage(error.message, "error");
  } finally {
    submitButton.disabled = false;
  }
}

async function deleteDestination(id) {
  const confirmed = window.confirm("Delete this destination from the public site?");
  if (!confirmed) return;

  try {
    if (isOfflineAdmin()) {
      setOfflineDestinations(getOfflineDestinations().filter((destination) => destination.id !== id));
    } else {
      await DestinationsAPI.remove(id);
    }

    if (editingDestinationId === id) {
      resetDestinationForm();
    }

    showAdminMessage("Destination deleted.", "success");
    await loadDestinations();
  } catch (error) {
    showAdminMessage(error.message, "error");
  }
}

function buildDestinationPayload() {
  const imageValue = destinationUploadedImage || document.getElementById("destinationImageUrl").value.trim();

  return {
    name: document.getElementById("destinationName").value.trim(),
    subtitle: document.getElementById("destinationSubtitle").value.trim(),
    region: document.getElementById("destinationRegion").value.trim(),
    type: document.getElementById("destinationType").value,
    badge: document.getElementById("destinationBadge").value.trim() || null,
    bestTime: document.getElementById("destinationBestTime").value.trim(),
    distance: document.getElementById("destinationDistance").value.trim(),
    imageUrl: imageValue,
    description: document.getElementById("destinationDescription").value.trim()
  };
}

function handleDestinationImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) {
    destinationUploadedImage = "";
    updateDestinationImagePreview(document.getElementById("destinationImageUrl").value.trim());
    return;
  }

  if (!file.type.startsWith("image/")) {
    showAdminMessage("Please choose a valid image file.", "error");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    destinationUploadedImage = String(reader.result || "");
    document.getElementById("destinationImageUrl").value = "";
    updateDestinationImagePreview(destinationUploadedImage);
  };
  reader.onerror = () => showAdminMessage("Could not read the selected image.", "error");
  reader.readAsDataURL(file);
}

function updateDestinationImagePreview(src) {
  const preview = document.getElementById("destinationImagePreview");
  if (!preview) return;

  if (!src) {
    preview.innerHTML = "<span>No destination image selected yet.</span>";
    return;
  }

  preview.innerHTML = `<img src="${escapeHtml(src)}" alt="Destination preview"/>`;
}

function showAdminMessage(message, type) {
  const el = document.getElementById("adminMessage");
  if (!el) return;

  el.textContent = message;
  el.className = `admin-feedback ${type}`;
}

function parseCommaList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function parseLineList(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function canUseOfflineAdmin(email, password, error) {
  return email === "admin@kumarulanka.lk"
    && password === "Admin@Kumaru1"
    && /Cannot reach the API/i.test(error.message);
}

function enableOfflineAdmin() {
  sessionStorage.setItem("ce_token", "offline-admin-token");
  sessionStorage.setItem(OFFLINE_ADMIN_KEY, "true");
  setAdminUser({
    fullName: "Kumaru Admin",
    email: "admin@kumarulanka.lk",
    role: "admin",
    expiry: null
  });
}

function isOfflineAdmin() {
  return sessionStorage.getItem(OFFLINE_ADMIN_KEY) === "true";
}

function loadOfflineData() {
  adminTours = getOfflineTours();
  adminDestinations = getOfflineDestinations();
  adminBookings = [];
  renderToursTable();
  renderDestinationsTable();
  renderBookingsTable();
  updateDashboardStats();
}

function getOfflineTours() {
  const saved = localStorage.getItem(OFFLINE_TOURS_KEY);
  if (saved) return JSON.parse(saved);

  const seedTours = [
    {
      id: 1,
      title: "Cultural Triangle Discovery",
      category: "cultural",
      duration: "5 Days",
      paxRange: "2-10",
      accommodation: "4-star hotel",
      price: 349,
      description: "Visit Sigiriya, Dambulla, Polonnaruwa, and Anuradhapura with an expert guide.",
      tags: ["Cultural", "Guided"],
      highlights: ["Sigiriya Rock Fortress", "Dambulla Cave Temple"],
      includes: ["AC transport", "English guide"]
    },
    {
      id: 2,
      title: "Ella Mountain Adventure",
      category: "adventure",
      duration: "3 Days",
      paxRange: "2-8",
      accommodation: "Boutique stay",
      price: 219,
      description: "Hike Little Adam's Peak and visit Nine Arches Bridge.",
      tags: ["Adventure", "Hiking"],
      highlights: ["Little Adam's Peak", "Nine Arches Bridge"],
      includes: ["AC transport", "Guide"]
    }
  ];

  setOfflineTours(seedTours);
  return seedTours;
}

function setOfflineTours(tours) {
  localStorage.setItem(OFFLINE_TOURS_KEY, JSON.stringify(tours));
  adminTours = tours;
}

function getOfflineDestinations() {
  const saved = localStorage.getItem(OFFLINE_DESTINATIONS_KEY);
  if (saved) return JSON.parse(saved).map(normalizeAdminDestination);

  const seedDestinations = [
    {
      id: 1,
      name: "Sigiriya",
      subtitle: "Ancient Rock Fortress",
      region: "Cultural Triangle",
      badge: "UNESCO",
      imageUrl: "https://images.unsplash.com/photo-1566296314736-6eaea1755728?w=600&q=80",
      description: "A 5th-century rock fortress rising above the jungle.",
      bestTime: "Jan - Apr",
      distance: "169 km from Colombo",
      type: "heritage"
    },
    {
      id: 2,
      name: "Mirissa",
      subtitle: "Whale Watching & Beaches",
      region: "Southern Coast",
      badge: "Hot",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      description: "A crescent-shaped beach paradise famous for whales and sunsets.",
      bestTime: "Nov - Apr",
      distance: "150 km from Colombo",
      type: "beach"
    }
  ];

  setOfflineDestinations(seedDestinations);
  return seedDestinations;
}

function setOfflineDestinations(destinations) {
  localStorage.setItem(OFFLINE_DESTINATIONS_KEY, JSON.stringify(destinations));
  adminDestinations = destinations.map(normalizeAdminDestination);
}

function saveOfflineDestination(destination) {
  const destinations = getOfflineDestinations();
  const existingIndex = editingDestinationId
    ? destinations.findIndex((item) => item.id === editingDestinationId)
    : -1;

  const destinationToSave = normalizeAdminDestination({
    ...destination,
    id: editingDestinationId || Date.now()
  });

  if (existingIndex >= 0) {
    destinations[existingIndex] = destinationToSave;
  } else {
    destinations.unshift(destinationToSave);
  }

  setOfflineDestinations(destinations);
}

function normalizeAdminDestination(destination) {
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

function saveOfflineTourFromForm() {
  const tours = getOfflineTours();
  const existingIndex = editingTourId
    ? tours.findIndex((tour) => tour.id === editingTourId)
    : -1;

  const tour = {
    id: editingTourId || Date.now(),
    title: document.getElementById("tourTitle").value.trim(),
    category: document.getElementById("tourCategory").value,
    duration: document.getElementById("tourDuration").value.trim(),
    paxRange: document.getElementById("tourPaxRange").value.trim(),
    accommodation: document.getElementById("tourAccommodation").value.trim(),
    price: Number(document.getElementById("tourPrice").value || 0),
    description: document.getElementById("tourDescription").value.trim(),
    tags: parseCommaList(document.getElementById("tourTags").value),
    highlights: parseLineList(document.getElementById("tourHighlights").value),
    includes: parseLineList(document.getElementById("tourIncludes").value)
  };

  if (existingIndex >= 0) {
    tours[existingIndex] = tour;
  } else {
    tours.push(tour);
  }

  setOfflineTours(tours);
}
