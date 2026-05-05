/* ============================================================
   KUMARU LANKA — Main JS (shared utilities + page logic)
   ============================================================ */

/* ─── Smooth scroll helper ───────────────────────────────── */
function scrollToSection(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Render star rating string ──────────────────────────── */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

/* ─── Generate pill HTML ─────────────────────────────────── */
function pillHTML(label) {
  const map = {
    Cultural:"pill-green", Guided:"", Festival:"pill-orange", "Off-beat":"pill-teal",
    Adventure:"pill-orange", Hiking:"", Spiritual:"pill-purple",
    Wildlife:"pill-green", Safari:"pill-green",
    Beach:"", Relaxation:"",
    Wellness:"pill-teal", Ayurveda:"pill-teal",
    Diving:"", Nature:"pill-teal", Food:"pill-orange"
  };
  const cls = map[label] || "";
  return `<span class="pill ${cls}">${label}</span>`;
}

/* ─── Tour card template ─────────────────────────────────── */
function tourCardHTML(tour) {
  return `
    <div class="tour-card" data-cat="${tour.category}">
      <img class="tour-card-img" src="${tour.image}" alt="${tour.title}" loading="lazy"/>
      <div class="tour-card-body">
        <div class="tour-card-tags">${tour.tags.map(pillHTML).join("")}</div>
        <h3>${tour.title}</h3>
        <div class="tour-card-meta">
          <span>📅 ${tour.duration}</span>
          <span>👥 ${tour.pax} pax</span>
          <span>🏨 ${tour.accommodation}</span>
        </div>
        <p>${tour.description}</p>
        <div class="tour-card-footer">
          <div>
            <div class="tour-price">$${tour.price} <span>/person</span></div>
            <div class="tour-rating">
              <span class="stars stars-sm">${renderStars(tour.rating)}</span>
              <span style="color:var(--text-light);font-size:12px">(${tour.reviews})</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openBookingModal('${tour.title} — $${tour.price}/person')">Book Now</button>
        </div>
      </div>
    </div>
  `;
}

/* ─── Destination card template ──────────────────────────── */
function destCardHTML(dest) {
  return `
    <div class="dest-card" onclick="showDestDetail(${dest.id})">
      <img class="dest-card-img" src="${dest.image}" alt="${dest.name}" loading="lazy"/>
      <div class="dest-card-overlay">
        <div class="dest-card-name">${dest.name}</div>
        <div class="dest-card-sub">${dest.subtitle}</div>
      </div>
      ${dest.badge ? `<div class="dest-card-badge">${dest.badge}</div>` : ""}
    </div>
  `;
}

/* ─── Vehicle card template ──────────────────────────────── */
function vehicleCardHTML(v) {
  return `
    <div class="vehicle-card" id="vc-${v.id}" onclick="selectVehicle('${v.id}')">
      <div class="vehicle-icon">${v.icon}</div>
      <h3>${v.name}</h3>
      <p>${v.description}</p>
      <div class="vehicle-price">$${v.pricePerDay} <span>/day</span></div>
      <div class="vehicle-seats">👤 ${v.passengers} passengers</div>
    </div>
  `;
}

/* ─── Review card template ───────────────────────────────── */
function reviewCardHTML(r) {
  return `
    <div class="review-card">
      <div class="review-top">
        <div class="avatar" style="background:${r.avatarColor}">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-from">${r.flag} ${r.country}</div>
        </div>
      </div>
      <div class="stars">${renderStars(r.rating)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-tour">${r.tourTitle}</div>
      <div class="review-date">${r.date}</div>
    </div>
  `;
}

/* ─── Render tour grid ───────────────────────────────────── */
function renderTourGrid(containerId, tours) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!tours.length) {
    el.innerHTML = `<div class="no-results"><p style="font-size:32px">🔍</p><p>No tours found. Try a different search.</p></div>`;
    return;
  }
  el.innerHTML = tours.map(tourCardHTML).join("");
}

/* ─── Render destination grid ────────────────────────────── */
function renderDestGrid(containerId, dests) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = dests.map(destCardHTML).join("");
}

/* ─── Render review grid ─────────────────────────────────── */
function renderReviewGrid(containerId, reviews) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = reviews.map(reviewCardHTML).join("");
}

/* ─── Render vehicle cards ───────────────────────────────── */
function renderVehicleCards(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = VEHICLES.map(vehicleCardHTML).join("");
}

/* ─── Vehicle selection + price calculator ───────────────── */
let selectedVehicleId = "car";
let selectedExtras    = [];

function selectVehicle(id) {
  selectedVehicleId = id;
  document.querySelectorAll(".vehicle-card").forEach(c => c.classList.remove("selected"));
  const card = document.getElementById("vc-" + id);
  if (card) card.classList.add("selected");
  updatePriceBreakdown();
  renderExtras();
}

function renderExtras() {
  const vehicle = VEHICLES.find(v => v.id === selectedVehicleId);
  if (!vehicle) return;
  const el = document.getElementById("extrasGrid");
  if (!el) return;

  el.innerHTML = Object.entries(vehicle.extras).map(([key, price]) => {
    const isDaily = ["wifi", "guide"].includes(key);
    return `
      <label class="extra-item">
        <input type="checkbox" value="${key}" onchange="toggleExtra('${key}')"
          ${selectedExtras.includes(key) ? "checked" : ""}/>
        ${EXTRAS_LABELS[key]} (+$${price}${isDaily ? "/day" : ""})
      </label>
    `;
  }).join("");
}

function toggleExtra(key) {
  if (selectedExtras.includes(key)) {
    selectedExtras = selectedExtras.filter(e => e !== key);
  } else {
    selectedExtras.push(key);
  }
  updatePriceBreakdown();
}

function updatePriceBreakdown() {
  const days = parseInt(document.getElementById("calcDays")?.value) || 1;
  const result = calculatePrice(selectedVehicleId, days, selectedExtras);
  if (!result) return;

  const el = document.getElementById("priceBreakdown");
  if (!el) return;

  let rows = `
    <div class="price-row"><span>${result.vehicle} × ${days} day${days > 1 ? "s" : ""}</span><span>$${result.baseTotal}</span></div>
  `;

  Object.values(result.extrasBreakdown).forEach(e => {
    rows += `<div class="price-row"><span>${e.label}</span><span>$${e.amount}</span></div>`;
  });

  rows += `
    <div class="price-row"><span>Tax (10%)</span><span>$${result.tax}</span></div>
    <div class="price-row total"><span>Total Estimate</span><span>$${result.total}</span></div>
  `;

  el.innerHTML = rows;
}

/* ─── Destination detail modal ───────────────────────────── */
function showDestDetail(id) {
  const dest = typeof getPublicDestinationById === "function"
    ? getPublicDestinationById(id)
    : DESTINATIONS.find(d => d.id === id);
  if (!dest) return;

  const relatedTours = (dest.relatedTourIds || [])
    .map(tid => TOURS.find(t => t.id === tid))
    .filter(Boolean)
    .map(t => `<span class="related-tour-chip" onclick="goToRoute('tours')">${t.title}</span>`)
    .join("");

  document.getElementById("modalSub").textContent = dest.region + " · " + dest.type;
  document.getElementById("modalBody").innerHTML = `
    <button class="modal-close" onclick="closeBookingModal()">✕</button>
    <img src="${dest.image}" style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:20px" alt="${dest.name}"/>
    <div class="tag">${dest.type}</div>
    <h2 style="margin-top:8px">${dest.name}</h2>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:4px">${dest.subtitle}</p>
    <div style="display:flex;gap:16px;margin:12px 0;font-size:13px;color:var(--text-muted);flex-wrap:wrap">
      <span>📍 ${dest.region}</span>
      <span>🗓 Best: ${dest.bestTime}</span>
      <span>🚗 ${dest.distance}</span>
    </div>
    <p style="font-size:14px;color:#555;line-height:1.65;margin-bottom:20px">${dest.description}</p>
    ${relatedTours ? `<div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">Tours including ${dest.name}</h4>${relatedTours}</div>` : ""}
    <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="openBookingModal('Visit ${dest.name}')">Book a Tour Here</button>
      <button class="btn btn-outline" onclick="goToRoute('vehicles')">Hire a Vehicle</button>
    </div>
  `;
  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("modalSuccess").style.display = "none";
}
