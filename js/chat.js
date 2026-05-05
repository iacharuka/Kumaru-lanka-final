/* ============================================================
   KUMARU LANKA — AI Trip Planning Chat
   Uses the Anthropic Messages API via a proxy/backend.
   IMPORTANT: Never expose your API key in frontend code.
   Set up a simple backend (Node/PHP/Python) that forwards
   requests to https://api.anthropic.com/v1/messages
   and set CHAT_API_URL to your backend endpoint below.
   ============================================================ */

const CHAT_API_URL = "/api/chat"; // ← your backend proxy URL

const SYSTEM_PROMPT = `You are Sena, a friendly and knowledgeable Sri Lanka travel assistant for Kumaru Lanka — a premium travel and tourist transport service based in Sri Lanka.

You help tourists plan their trips, recommend destinations, suggest tour packages, advise on the best times to visit, and answer questions about hiring vehicles with drivers.

Key info about Kumaru Lanka:
- Tours: Cultural Triangle, Ella Adventure, Yala Safari, South Coast Beach, Kandy/Nuwara Eliya, Island Diving, Colombo Street Food, Adam's Peak, Ayurveda Retreat, Jaffna Discovery, Rainforest Trail, Grand Island Tour (10 days)
- Vehicles: Tuk-Tuk ($25/day), Private Car ($55/day), AC Van ($75/day), Mini Bus ($110/day) — all with professional drivers
- Destinations: Sigiriya, Kandy, Ella, Galle, Yala, Mirissa, Nuwara Eliya, Trincomalee, Anuradhapura, Sinharaja
- Best time to visit: Dec–Apr for west & south coast; May–Sep for east coast
- Contact: +94 77 123 4567 | hello@kumarulanka.lk

Always be warm, enthusiastic about Sri Lanka, and helpful. Keep responses concise (2–4 sentences max). If someone is ready to book, encourage them to click "Book Now" or contact via WhatsApp.`;

const SUGGESTIONS = [
  "Best time to visit Sri Lanka?",
  "Suggest a 7-day itinerary",
  "How much does a car hire cost?",
  "What's special about Sigiriya?",
  "Family-friendly tours?",
  "Airport transfer from Colombo?"
];

let chatHistory = [];
let chatOpen = false;

/* ─── Render Chat Window ─────────────────────────────────── */
function renderChatWindow() {
  const existing = document.getElementById("ai-chat-window");
  if (existing) return;

  const win = document.createElement("div");
  win.id = "ai-chat-window";
  win.innerHTML = `
    <div class="chat-header">
      <div class="chat-header-info">
        <div class="chat-avatar">🌴</div>
        <div>
          <h4>Sena — Your Travel Guide</h4>
          <p>AI-powered trip planner</p>
        </div>
      </div>
      <button class="chat-close-btn" onclick="toggleChat()">✕</button>
    </div>
    <div class="chat-messages" id="chatMessages"></div>
    <div class="chat-suggestions" id="chatSuggestions"></div>
    <div class="chat-input-area">
      <input type="text" id="chatInput" placeholder="Ask me anything about Sri Lanka..." onkeydown="handleChatKey(event)"/>
      <button class="chat-send" onclick="sendChatMessage()">➤</button>
    </div>
  `;
  document.body.appendChild(win);

  // Show greeting and suggestion chips
  addBotMessage("👋 Hi! I'm Sena, your Sri Lanka travel expert. Ask me anything — best places to visit, tour recommendations, vehicle hire, or help planning your itinerary!");
  renderSuggestions();
}

/* ─── Toggle Open/Close ──────────────────────────────────── */
function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById("ai-chat-window");

  if (chatOpen) {
    if (!win) renderChatWindow();
    document.getElementById("ai-chat-window").classList.add("open");
  } else {
    if (win) win.classList.remove("open");
  }
}

/* ─── Suggestion Chips ───────────────────────────────────── */
function renderSuggestions() {
  const el = document.getElementById("chatSuggestions");
  if (!el) return;
  el.innerHTML = SUGGESTIONS.map(s =>
    `<span class="chip" onclick="sendSuggestion('${s}')">${s}</span>`
  ).join("");
}

function sendSuggestion(text) {
  document.getElementById("chatSuggestions").innerHTML = "";
  document.getElementById("chatInput").value = text;
  sendChatMessage();
}

/* ─── Send Message ───────────────────────────────────────── */
function handleChatKey(e) {
  if (e.key === "Enter") sendChatMessage();
}

async function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addUserMessage(text);
  chatHistory.push({ role: "user", content: text });

  const typingId = addTypingIndicator();

  try {
    const reply = await fetchAIReply(chatHistory);
    removeTypingIndicator(typingId);
    addBotMessage(reply);
    chatHistory.push({ role: "assistant", content: reply });
  } catch (err) {
    removeTypingIndicator(typingId);
    addBotMessage("Sorry, I'm having trouble connecting right now. Please try again or contact us on WhatsApp at +94 77 123 4567.");
  }
}

/* ─── API Call ───────────────────────────────────────────── */
async function fetchAIReply(history) {
  const res = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: history
    })
  });

  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.content?.[0]?.text || "I'm not sure about that — please contact our team directly!";
}

/* ─── Message Rendering ──────────────────────────────────── */
function addUserMessage(text) {
  const el = document.getElementById("chatMessages");
  const msg = document.createElement("div");
  msg.className = "msg msg-user";
  msg.textContent = text;
  el.appendChild(msg);
  el.scrollTop = el.scrollHeight;
}

function addBotMessage(text) {
  const el = document.getElementById("chatMessages");
  const msg = document.createElement("div");
  msg.className = "msg msg-bot";
  msg.textContent = text;
  el.appendChild(msg);
  el.scrollTop = el.scrollHeight;
}

function addTypingIndicator() {
  const el = document.getElementById("chatMessages");
  const id = "typing-" + Date.now();
  const div = document.createElement("div");
  div.id = id;
  div.className = "msg msg-bot msg-typing";
  div.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}