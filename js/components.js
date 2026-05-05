/* ============================================================
   KUMARU LANKA — Component Loader
   Dynamically injects navbar, footer, booking modal,
   AI chat widget, and WhatsApp button into every page.
   ============================================================ */

const WHATSAPP_NUMBER = "94771234567"; // ← change to your number

/* ─── ROUTING HELPERS ───────────────────────────────────── */
const pageRoutes = {
  home: { root: "index.html", nested: "../index.html", file: "index.html" },
  destinations: { root: "pages/destinations.html", nested: "destinations.html", file: "destinations.html" },
  tours: { root: "pages/tours.html", nested: "tours.html", file: "tours.html" },
  vehicles: { root: "pages/vehicles.html", nested: "vehicles.html", file: "vehicles.html" },
  contact: { root: "pages/contact.html", nested: "contact.html", file: "contact.html" },
  admin: { root: "pages/admin.html", nested: "admin.html", file: "admin.html" }
};

function isNestedPage() {
  return window.location.pathname.includes("/pages/");
}

function getRoute(key) {
  const route = pageRoutes[key];
  if (!route) return "index.html";
  return isNestedPage() ? route.nested : route.root;
}

function goToRoute(key, query = {}) {
  const url = new URL(getRoute(key), window.location.href);
  Object.entries(query).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(name, value);
    }
  });
  window.location.href = url.toString();
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function renderNavbar() {
  const el = document.getElementById("navbar");
  if (!el) return;

  const page = window.location.pathname.split("/").pop() || "index.html";
  const link = (key, label) => {
    const route = pageRoutes[key];
    return `<a href="${getRoute(key)}" class="${page === route.file ? "active" : ""}">${label}</a>`;
  };

  el.innerHTML = `
    <div class="nav-inner">
      <a class="nav-logo" href="${getRoute("home")}">Kumaru<span>Lanka</span></a>
      <nav class="nav-links">
        ${link("home", "Home")}
        ${link("destinations", "Destinations")}
        ${link("tours", "Tours")}
        ${link("vehicles", "Transport")}
        ${link("contact", "Contact")}
      </nav>
      <button class="nav-cta" onclick="openBookingModal()">Book Now</button>
      <div class="nav-hamburger" onclick="toggleMobileNav()" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  // Mobile nav
  const mobileNav = document.createElement("div");
  mobileNav.className = "nav-mobile";
  mobileNav.id = "mobileNav";
  mobileNav.innerHTML = `
    <a href="${getRoute("home")}">Home</a>
    <a href="${getRoute("destinations")}">Destinations</a>
    <a href="${getRoute("tours")}">Tours</a>
    <a href="${getRoute("vehicles")}">Transport</a>
    <a href="${getRoute("contact")}">Contact</a>
    <a href="#" onclick="openBookingModal()" style="color:var(--primary);font-weight:700">Book Now</a>
  `;
  document.body.insertBefore(mobileNav, document.body.firstChild.nextSibling);

  // Scroll class
  window.addEventListener("scroll", () => {
    el.classList.toggle("scrolled", window.scrollY > 40);
  });
}

function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("open");
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;

  el.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Kumaru<span>Lanka</span></h3>
          <p>Your trusted travel partner for authentic Sri Lanka experiences. Licensed, insured, and loved by travellers worldwide.</p>
          <div class="social-links">
            <div class="social-btn">f</div>
            <div class="social-btn">in</div>
            <div class="social-btn">▶</div>
            <div class="social-btn">ig</div>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li onclick="goToRoute('tours')">Tour Packages</li>
            <li onclick="goToRoute('destinations')">Destinations</li>
            <li onclick="goToRoute('vehicles')">Vehicle Hire</li>
            <li onclick="goToRoute('vehicles')">Airport Transfers</li>
            <li onclick="goToRoute('tours')">Day Trips</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li onclick="goToRoute('contact')">About Us</li>
            <li>Our Guides</li>
            <li>Blog & Tips</li>
            <li>Careers</li>
            <li>Press</li>
            <li onclick="goToRoute('admin')">Admin Panel</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>📍 Colombo, Sri Lanka</li>
            <li>📞 +94 77 123 4567</li>
            <li>✉ hello@kumarulanka.lk</li>
            <li onclick="openWhatsApp()">💬 WhatsApp Us</li>
            <li>🕐 24/7 Support</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        © 2025 Kumaru Lanka. All rights reserved. | Registered Travel Agent · Sri Lanka Tourism Development Authority
      </div>
    </div>
  `;
}

/* ─── BOOKING MODAL ──────────────────────────────────────── */
function renderBookingModal() {
  const el = document.getElementById("booking-modal");
  if (!el) return;

  el.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal">
        <button class="modal-close" onclick="closeBookingModal()">✕</button>
        <div id="modalBody">
          <h2>Book Your Experience</h2>
          <p class="modal-sub" id="modalSub">Fill in your details and we'll get back to you within 2 hours.</p>
          <div class="form-row">
            <div class="form-group"><label>Full Name</label><input type="text" id="mName" placeholder="John Smith"/></div>
            <div class="form-group"><label>Email</label><input type="email" id="mEmail" placeholder="you@email.com"/></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Travel Date</label><input type="date" id="mDate"/></div>
            <div class="form-group"><label>Number of People</label><input type="number" id="mPax" min="1" placeholder="2"/></div>
          </div>
          <div class="form-group">
            <label>Enquiry Type</label>
            <select id="mType">
              <option>Tour Package Booking</option>
              <option>Vehicle Hire</option>
              <option>Custom Itinerary</option>
              <option>Airport Transfer</option>
              <option>General Enquiry</option>
            </select>
          </div>
          <div class="form-group">
            <label>Message / Requests</label>
            <textarea id="mMsg" placeholder="Tell us about your trip plans or any special requests..."></textarea>
          </div>
          <button class="btn btn-primary btn-full btn-lg" onclick="submitBookingModal()">Send Booking Request</button>
        </div>
        <div class="modal-success" id="modalSuccess">
          <div class="icon">✅</div>
          <h3>Booking Request Sent!</h3>
          <p>Our team will contact you within 2 hours to confirm your booking. Check your email for a copy.</p>
          <br/>
          <button class="btn btn-primary" onclick="closeBookingModal()">Close</button>
        </div>
      </div>
    </div>
  `;
}

function openBookingModal(label) {
  if (label) document.getElementById("modalSub").textContent = label;
  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("modalBody").style.display = "block";
  document.getElementById("modalSuccess").style.display = "none";
}

function closeBookingModal() {
  document.getElementById("modalOverlay").classList.remove("active");
}

function submitBookingModal() {
  document.getElementById("modalBody").style.display = "none";
  document.getElementById("modalSuccess").style.display = "block";
}

// Close on overlay click
document.addEventListener("click", e => {
  const overlay = document.getElementById("modalOverlay");
  if (e.target === overlay) closeBookingModal();
});

/* ─── WHATSAPP BUTTON ────────────────────────────────────── */
function renderWhatsAppButton() {
  const el = document.getElementById("whatsapp-btn");
  if (!el) return;
  el.innerHTML = `
    <span style="font-size:26px">💬</span>
    <span class="whatsapp-tooltip">Chat on WhatsApp</span>
  `;
  el.onclick = openWhatsApp;
}

function openWhatsApp() {
  const msg = encodeURIComponent("Hi! I'm interested in booking a tour or vehicle with Kumaru Lanka.");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

/* ─── AI CHAT BUTTON ─────────────────────────────────────── */
function renderAIChatButton() {
  const el = document.getElementById("ai-chat-btn");
  if (!el) return;
  el.innerHTML = `🤖`;
  el.onclick = toggleChat;
}

/* ─── BOOTSTRAP ALL COMPONENTS ──────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
  renderBookingModal();
  renderWhatsAppButton();
  renderAIChatButton();
});
