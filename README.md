# Kumaru Lanka Website

Static website for **Kumaru Lanka**, a Sri Lanka travel and tourist transport service. The site promotes tour packages, destinations, private vehicle hire, customer reviews, booking enquiries, WhatsApp contact, an AI trip planner, and an admin dashboard.

## Website Overview

Kumaru Lanka helps visitors discover Sri Lanka through guided tours, destination information, private transport, and custom travel enquiries.

Main website sections:

- Home page with hero search, destination previews, tour previews, vehicle previews, reviews, and quote CTA
- Destinations page with category filtering and destination detail modal
- Tours page with search, category tabs, sorting, tour cards, and booking modal
- Vehicles page with vehicle selection, extras, and price calculator
- Contact page with contact details and enquiry form success state
- Admin page for bookings, tour inventory, and destination inventory
- Floating WhatsApp button for quick contact
- AI chat widget for Sri Lanka travel planning

## Website Colors

The main color palette is defined in `css/main.css` inside the `:root` variables.

| Color Name | CSS Variable | Hex | Usage |
| --- | --- | --- | --- |
| Primary Orange | `--primary` | `#e07b39` | Main buttons, active tabs, badges, links, scrollbar |
| Primary Dark Orange | `--primary-dark` | `#c96a2a` | Button hover states and orange pills |
| Primary Light Orange | `--primary-light` | `#fef3eb` | Tags, soft badge backgrounds, light accent areas |
| Dark Green | `--green-dark` | `#1a2e1a` | Headings, page hero gradients, strong brand areas |
| Mid Green | `--green-mid` | `#1a4a2e` | Hero gradients, chat header, promo strip |
| Deep Green | `--green-deep` | `#0d2010` | Dark tooltips and deep backgrounds |
| Main Text | `--text-main` | `#1a1a1a` | Primary body text |
| Muted Text | `--text-muted` | `#666` | Paragraphs, secondary labels, descriptions |
| Light Text | `--text-light` | `#999` | Small metadata and supporting text |
| Border | `--border` | `#eee` | Light dividers and card borders |
| Light Background | `--bg-light` | `#f8f9f4` | Alternate page sections |
| White Background | `--bg-white` | `#ffffff` | Main page background and cards |

Supporting UI colors:

| Color | Hex | Usage |
| --- | --- | --- |
| Star Gold | `#f5a623` | Review and tour star ratings |
| WhatsApp Green | `#25d366` | Floating WhatsApp button |
| WhatsApp Hover Green | `#1fb858` | WhatsApp hover state |
| Blue Pill Background | `#f0f7ff` | Default pill background |
| Blue Pill Text | `#1a6ab0` | Default pill text |
| Green Pill Background | `#eafaf0` | Green category pill background |
| Green Pill Text | `#1a7a3a` | Green category pill text |
| Purple Pill Background | `#f3f0ff` | Purple category pill background |
| Purple Pill Text | `#5a4ab0` | Purple category pill text |
| Teal Pill Background | `#e0f5ef` | Teal category pill background |
| Teal Pill Text | `#0d7a5a` | Teal category pill text |

Main gradients:

```css
/* Standard page hero */
linear-gradient(160deg, var(--green-dark) 0%, var(--green-mid) 60%, var(--green-dark) 100%)

/* Home hero */
linear-gradient(160deg, #0a2018 0%, #1a4a2e 50%, #0d2a1a 100%)

/* Promo strip */
linear-gradient(135deg, #1a4a2e, #0d2a1a)
```

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Main landing page with previews for destinations, tours, vehicles, and reviews |
| Destinations | `pages/destinations.html` | Lists Sri Lanka destinations by category |
| Tours | `pages/tours.html` | Lists tour packages with search, filter, and sort controls |
| Vehicles | `pages/vehicles.html` | Vehicle hire page with pricing calculator |
| Contact | `pages/contact.html` | Contact details and message form |
| Admin | `pages/admin.html` | Admin dashboard for managing bookings, tours, and destinations |

## Features

### Tour Packages

The website includes 12 tour packages:

- Cultural Triangle Discovery
- Ella Mountain Adventure
- Yala & Udawalawe Safari
- South Coast Beach Escape
- Kandy & Nuwara Eliya Highlights
- Island Hopping & Diving
- Colombo City & Street Food Tour
- Adam's Peak Sunrise Pilgrimage
- Ayurveda & Wellness Retreat
- Jaffna & North Sri Lanka Discovery
- Rainforest & Waterfall Trail
- Full Island 10-Day Grand Tour

Tour categories:

- Cultural
- Adventure
- Wildlife
- Beach
- Wellness

### Destinations

The website includes 10 Sri Lanka destinations:

- Sigiriya
- Kandy
- Ella
- Galle
- Yala National Park
- Mirissa
- Nuwara Eliya
- Trincomalee
- Anuradhapura
- Sinharaja Forest

Destination categories:

- Heritage
- Cultural
- Adventure
- Wildlife
- Beach
- Nature

### Vehicle Hire

Available vehicle types:

| Vehicle | Price | Passengers |
| --- | ---: | --- |
| Tuk-Tuk | $25/day | 1-3 |
| Private Car | $55/day | 1-4 |
| AC Van | $75/day | 5-8 |
| Mini Bus | $110/day | 9-20 |

Vehicle calculator features:

- Number of days
- Pickup date
- Optional extras
- 10% tax calculation
- Total estimate display

Extras include airport pickup/drop, night surcharge, child seat, Wi-Fi, and English-speaking guide depending on selected vehicle.

### Booking Modal

The shared booking modal appears across pages and collects:

- Full name
- Email
- Travel date
- Number of people
- Enquiry type
- Message or special requests

Current behavior shows a success message on submit. API integration can be connected through `js/api.js`.

### WhatsApp Contact

The floating WhatsApp button opens:

```text
https://wa.me/94771234567
```

To change the number, edit `WHATSAPP_NUMBER` in `js/components.js`.

### AI Chat

The website includes an AI trip planning chat widget named **Sena**. It helps users with:

- Best time to visit Sri Lanka
- Itinerary suggestions
- Tour recommendations
- Vehicle hire questions
- Destination information
- Airport transfer questions

The chat currently sends requests to:

```text
/api/chat
```

Configure this endpoint in `js/chat.js`. API keys should never be exposed in frontend code.

### Admin Dashboard

Admin page:

```text
pages/admin.html
```

Seeded demo login shown on the page:

```text
Email: admin@kumarulanka.lk
Password: Admin@Kumaru1
```

Admin sections:

- Bookings
- Tours
- Destinations

The admin dashboard is designed to work with backend API endpoints defined in `js/api.js`.

## Project Structure

```text
kumaru-lanka/
├── index.html
├── package.json
├── README.md
├── assets/
│   └── images/
│       └── home-hero-sri-lanka.png
├── components/
│   ├── ai-chat.html
│   ├── booking-modal.html
│   ├── footer.html
│   ├── navbar.html
│   ├── tour-card.html
│   ├── vehicle-card.html
│   └── whatsapp-btn.html
├── css/
│   ├── components.css
│   ├── main.css
│   └── pages.css
├── js/
│   ├── admin.js
│   ├── api.js
│   ├── chat.js
│   ├── components.js
│   ├── destination-data.js
│   ├── main.js
│   └── tour-data.js
├── models/
│   ├── destinations.js
│   ├── reviews.js
│   ├── tours.js
│   └── vehicles.js
└── pages/
    ├── admin.html
    ├── contact.html
    ├── destinations.html
    ├── tours.html
    └── vehicles.html
```

## How To Run

This is a static website. Use the included script to serve it locally:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

You can also run:

```bash
npm start
```

Both commands start a Python static server on port `5173`.

## Main Files To Edit

| Need to change | Edit this file |
| --- | --- |
| Home page layout/content | `index.html` |
| Tour data | `models/tours.js` |
| Destination data | `models/destinations.js` |
| Vehicle data/prices | `models/vehicles.js` |
| Reviews | `models/reviews.js` |
| Navbar/footer/booking modal/WhatsApp | `js/components.js` |
| AI chat prompt and endpoint | `js/chat.js` |
| Shared card rendering and price logic | `js/main.js` |
| API connection settings | `js/api.js` |
| Admin dashboard behavior | `js/admin.js` |
| Global styles | `css/main.css` |
| Component styles | `css/components.css` |
| Page-specific styles | `css/pages.css` |

## API Integration

`js/api.js` includes frontend connectors for:

- Authentication
- Tours
- Destinations
- Vehicles
- Bookings
- Reviews
- Chat

Local API fallback URLs:

```text
http://localhost:5001/api
http://localhost:5002/api
```

Production API fallback:

```text
{current-site-origin}/api
```

You can override the API base URL in browser local storage:

```js
localStorage.setItem("ce_api_base_url", "https://your-api-domain.com/api");
```

## Contact Details Used In The Site

```text
Office: 42 Galle Road, Colombo 03, Sri Lanka
Phone / WhatsApp: +94 77 123 4567
Email: hello@kumarulanka.lk
Working hours: Daily 7:00 AM - 9:00 PM, 24/7 for emergencies
```

## Current Notes

- The website uses plain HTML, CSS, and JavaScript.
- There is no build step required.
- Most public content is loaded from local JavaScript model files.
- Backend/API support is prepared but optional for the static demo.
- Booking and contact forms currently show frontend success states.
- Some images are loaded from Unsplash URLs, with one local hero image at `assets/images/home-hero-sri-lanka.png`.
