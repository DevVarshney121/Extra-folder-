/* =========================
   EASY IMAGE PATHS
   Change image paths ONLY here.
   ========================= */
const IMAGE_PATHS = {
  logo: "images/elite-stay-logo.png",
  pgExterior: "images/PG Exterior.png",
  room3Main: "images/3 Seater Room.jpeg",
  office: "images/Office area.jpeg",

  room4Current1: "images/3 seater 3.jpeg",
  room2Main: "images/Two Seater.jpeg",
  room1Main: "images/single sharing private room 1.png",

  studyTable: "images/table tannish.png",
  lunch: "images/lunch.png",
  outdoor: "images/outdoor view.png",
  breakfast1: "images/breakfast img 1.png",
  freeze: "images/Freeze.jpeg",
  washingMachine: "images/Washing Machine.jpeg",
  washroom: "images/washrom 2.png",
  parking: "images/Parking img.jpeg",
  buildingEntrance: "images/Building & Entrance.jpeg",
  dinner: "images/dinner.png",
  breakfast2: "images/breakfast img 2.png",
  veranda: "images/varanda.jpeg",

  room3Alt1: "images/3 seater 1 .jpeg",
  room2Alt1: "images/2 Seater room 2 .jpeg",
  room2Alt2: "images/2 Seater Room.jpeg",
  room1Alt2: "images/single sharing private room 1 img 2.png",

  /* Existing 4-seater path used by the Rooms page */
  room4Legacy: "images/4 seater.png",

  /* Your new 4-seater images — available here for easy replacement */
  room4New1: "images/4 seater image 2.png",
  room4New2: "images/4 seater img 1.png",
  room4New3: "images/4 seater img 3.png"
};

/* Load all normal page images from IMAGE_PATHS. */
document.querySelectorAll("[data-image]").forEach(img => {
  const path = IMAGE_PATHS[img.dataset.image];
  if (path) img.src = path;
});


/* The Elite Stay PG & Hostel frontend interactions. Replace CONFIG values with verified contact details. */
const CONFIG = {
  whatsappNumber: "919319800234", // Add country code + number only, e.g. 91XXXXXXXXXX
  phoneDisplay: "9319800234",
  email: "theelitestaypghostel@gmail.com",
  address: "The Elite Stay PG & Hostel, A-6, Beta 1 Block A Rd, Near Gate No 1, Near Jagat Farm, Beta I, Greater Noida, Uttar Pradesh 201310"
};
const ELITE_STAY_LAT = "28.4769706";
const ELITE_STAY_LNG = "77.5034043";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + ELITE_STAY_LAT + "," + ELITE_STAY_LNG;
document.querySelectorAll("[data-directions]").forEach(a => a.href = directionsUrl);
document.querySelectorAll("[data-address]").forEach(el => el.textContent = CONFIG.address);
document.querySelectorAll("[data-phone]").forEach(el => el.textContent = CONFIG.phoneDisplay);
document.querySelectorAll("[data-email]").forEach(el => el.textContent = CONFIG.email);
document.querySelectorAll("[data-phone-link]").forEach(a => a.href = "tel:" + CONFIG.phoneDisplay.replace(/\D/g,""));
document.querySelectorAll("[data-map]").forEach(frame => {
  frame.src = "https://maps.google.com/maps?q=" + ELITE_STAY_LAT + "," + ELITE_STAY_LNG + "&z=17&output=embed";
});


// Mobile app-style bottom navigation. Desktop navigation remains unchanged.
if (window.matchMedia("(max-width: 767px)").matches && !document.querySelector(".mobile-app-nav")) {
  const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const mobileNav = document.createElement("nav");
  mobileNav.className = "mobile-app-nav";
  mobileNav.setAttribute("aria-label", "Mobile app navigation");
  const items = [
    ["index.html", "Home", "fa-solid fa-house"],
    ["rooms.html", "Rooms", "fa-solid fa-bed"],
    ["facilities.html", "Facilities", "fa-solid fa-wifi"],
    ["gallery.html", "Gallery", "fa-solid fa-images"],
    ["contact.html", "Contact", "fa-solid fa-phone"]
  ];
  mobileNav.innerHTML = items.map(([href, label, icon]) => {
    const pageHref = href.split("#")[0];
    const active = currentPage === pageHref && label !== "Book Now" ? " active" : "";
    return `<a href="${href}" class="${active.trim()}"${active ? ' aria-current="page"' : ""}><i class="${icon}" aria-hidden="true"></i><span>${label}</span></a>`;
  }).join("");
  document.body.appendChild(mobileNav);
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if(menuToggle && navLinks){menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));}

document.querySelectorAll(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",String(item.classList.contains("open")));}));

document.querySelectorAll("[data-room-filter]").forEach(btn=>btn.addEventListener("click",()=>{const filter=btn.dataset.roomFilter;document.querySelectorAll("[data-room-filter]").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll("[data-room-card]").forEach(card=>{card.hidden=filter!=="all" && card.dataset.roomCard!==filter;});}));

(function(){
  function setupGalleryFilters(){
    const root = document.querySelector(".filters");
    if(!root || root.dataset.filtersReady === "1") return;
    root.dataset.filtersReady = "1";
    root.addEventListener("click", event=>{
      const btn = event.target.closest("[data-gallery-filter]");
      if(!btn || !root.contains(btn)) return;
      event.preventDefault();
      const filter = btn.dataset.galleryFilter || "all";
      root.querySelectorAll("[data-gallery-filter]").forEach(b=>b.classList.toggle("active", b === btn));
      document.querySelectorAll("[data-gallery-category]").forEach(card=>{
        card.hidden = filter !== "all" && card.dataset.galleryCategory !== filter;
      });
    });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupGalleryFilters);
  else setupGalleryFilters();
})();


const modalBackdrop = document.querySelector("#roomModal");

function openRoomDetailsModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeRoomDetailsModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (modalBackdrop) {
  document.querySelectorAll("[data-room-details]").forEach(btn => {
    btn.addEventListener("click", () => {
      const roomName = btn.dataset.roomDetails || btn.closest("[data-room-card]")?.querySelector("h3")?.textContent || "Room";
      const slug = roomName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      sessionStorage.setItem("eliteStaySelectedRoom", roomName);
      location.href = `property.html?room=${encodeURIComponent(slug)}`;
    });
  });

  modalBackdrop.querySelectorAll("[data-modal-close]").forEach(button => {
    button.addEventListener("click", closeRoomDetailsModal);
  });
  modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) closeRoomDetailsModal();
  });
}

/* Auto-rotate room-card images every 5 seconds on every page that contains room cards. */
const ROOM_MEDIA = {
  "4 Seater Room": [
    IMAGE_PATHS.room4Current1,
    IMAGE_PATHS.room3Alt1,
    IMAGE_PATHS.room3Main,
    IMAGE_PATHS.buildingEntrance
  ],
  "3 Seater Room": [
    IMAGE_PATHS.room3Main,
    IMAGE_PATHS.room3Alt1,
    IMAGE_PATHS.room4Current1,
    IMAGE_PATHS.buildingEntrance
  ],
  "2 Seater Room": [
    IMAGE_PATHS.room2Main,
    IMAGE_PATHS.room2Alt1,
    IMAGE_PATHS.room2Alt2,
    IMAGE_PATHS.room2Alt2
  ],
  "1 Seater Room": [
    IMAGE_PATHS.room1Main,
    IMAGE_PATHS.room1Alt2,
    IMAGE_PATHS.room1Main,
    IMAGE_PATHS.room1Alt2
  ]
};

document.querySelectorAll("[data-room-card]").forEach(card => {
  const title = card.querySelector("h3")?.textContent.trim();
  const images = ROOM_MEDIA[title];
  const img = card.querySelector(".card-image img");
  if (!images || !img) return;
  let index = images.indexOf(img.src) >= 0 ? images.indexOf(img.src) : 0;
  img.src = images[index];
  img.dataset.roomAutoImage = "true";
  setInterval(() => {
    index = (index + 1) % images.length;
    img.classList.add("room-image-fade");
    setTimeout(() => {
      img.src = images[index];
      img.classList.remove("room-image-fade");
    }, 180);
  }, 5000);
});

/* Property detail page: room-specific gallery, pricing, details and separate video slot. */
const ROOM_VIDEOS = {
  "3 Seater Room": "images/3 seater roo video.mp4",
  "2 Seater Room": "images/2 seater roomvideo.mp4"
};

const propertyRoot = document.querySelector("[data-property-page]");
if (propertyRoot) {
  const params = new URLSearchParams(location.search);
  const requested = params.get("room") || "4-seater-room";
  const commonBreakdown = [
    {icon:"▱", title:"Bed & Personal Storage", items:["Individual bed with comfortable mattress & pillow","Personal lockable almirah (wardrobe) for each resident","Dedicated bedside switchboard & charging point"]},
    {icon:"⌑", title:"Study & Comfort", items:["Dedicated study table & ergonomic chair","AC available for comfortable living","High-speed Wi-Fi coverage"]},
    {icon:"⌂", title:"Washroom & Utilities", items:["Attached washroom with every room","24×7 electric geyser for hot water","24×7 power backup, RO drinking water & daily housekeeping"]}
  ];
  const roomBySlug = {
    "4-seater-room": {name:"4 Seater Room", price:"₹10,000–₹11,000", type:"Shared room (4 Seater)", furnishing:"Fully Furnished", preference:"Balcony / Non-Balcony", description:"Comfortable shared accommodation with essential facilities, suitable for students and working professionals."},
    "3-seater-room": {name:"3 Seater Room", price:"₹12,000–₹15,000", type:"Shared room (3 Seater)", furnishing:"Fully Furnished", preference:"Balcony / Non-Balcony", description:"A practical three-seater setup with a comfortable layout, AC, attached washroom and everyday living essentials."},
    "2-seater-room": {name:"2 Seater Room", price:"₹16,000–₹20,000", type:"Shared room (2 Seater)", furnishing:"Fully Furnished", preference:"Balcony / Non-Balcony", description:"A comfortable two-seater room designed for privacy, convenience, AC comfort and a clean living experience."},
    "1-seater-room": {name:"1 Seater Room", price:"₹30,000–₹31,000", type:"Private room (1 Seater)", furnishing:"Fully Furnished", preference:"Balcony / Non-Balcony", description:"A private furnished room option for residents who prefer their own personal space, AC comfort and an attached washroom."}
  };
  const room = roomBySlug[requested] || roomBySlug["4-seater-room"];
  const gallery = propertyRoot.querySelector("[data-property-gallery]");
  const images = ROOM_MEDIA[room.name] || ROOM_MEDIA["4 Seater Room"];
  if (gallery) gallery.innerHTML = images.map((src,i)=>`<img src="${src}" alt="${room.name} - image ${i+1}" loading="lazy">`).join("");
  propertyRoot.querySelector("[data-property-title]").textContent = room.name;
  propertyRoot.querySelector("[data-property-price]").innerHTML = `${room.price}<small> / month</small>`;
  propertyRoot.querySelector("[data-property-type]").textContent = room.type;
  propertyRoot.querySelector("[data-property-furnishing]").textContent = room.furnishing;
  propertyRoot.querySelector("[data-property-preference]").textContent = room.preference;
  propertyRoot.querySelector("[data-property-description]").textContent = room.description;

  const breakdown = propertyRoot.querySelector("[data-property-breakdown]");
  if (breakdown) breakdown.innerHTML = commonBreakdown.map(card=>`<article class="property-breakdown-card"><div class="property-breakdown-icon">${card.icon}</div><h3>${card.title}</h3><ul>${card.items.map(item=>`<li>${item}</li>`).join("")}</ul></article>`).join("");
  const breakdownTitle = propertyRoot.querySelector("[data-property-breakdown-title]");
  if (breakdownTitle) breakdownTitle.textContent = `What’s Inside Your ${room.name}`;
  propertyRoot.querySelector("[data-property-overview-title]").textContent = `Comfortable Living at The Elite Stay PG & Hostel`;
  propertyRoot.querySelector("[data-property-overview-intro]").textContent = `Explore this complete ${room.name.toLowerCase()} accommodation in Beta 1, Greater Noida. Confirm current availability, deposit, food and other charges with management before booking.`;
  const overviewCopy = propertyRoot.querySelector("[data-property-overview-copy]");
  if (overviewCopy) overviewCopy.innerHTML = `<p><strong>Room Space & Comfort:</strong> The ${room.name.toLowerCase()} is designed for students and working professionals who want a clean, comfortable and well-managed stay. Residents get an individual bed, comfortable mattress, pillow and fresh bedsheet, with a choice of <strong>Balcony</strong> or <strong>Non-Balcony</strong> preference depending on availability.</p><p><strong>Furniture, Study Setup & Personal Almirah:</strong> Every resident gets personal storage with an individual lock, along with a dedicated <strong>study table and chair</strong> for study, assignments or work-from-home use.</p><p><strong>AC, Geyser & Attached Washroom:</strong> The room is equipped with <strong>AC</strong> for comfortable living. Every room has an <strong>Attached Washroom</strong> and access to a 24×7 geyser for hot water, along with regular housekeeping and continuous water supply.</p><p><strong>Homey Meals, High-Speed Wi-Fi & 24×7 Security:</strong> The stay includes high-speed Wi-Fi, nutritious <strong>3-time meals</strong>, RO drinking water, 24×7 power backup, daily housekeeping and CCTV/security support.</p>`;

  const videoWrap = propertyRoot.querySelector("[data-property-video]");
  const videoTitle = propertyRoot.querySelector("[data-property-video-title]");
  const videoSrc = ROOM_VIDEOS[room.name] || "";
  if (videoTitle) videoTitle.textContent = `${room.name} Video`;
  if (videoWrap) {
    videoWrap.innerHTML = videoSrc
      ? `<video controls playsinline preload="metadata" poster="${images[0] || ""}"><source src="${videoSrc}" type="video/mp4">Your browser does not support the video tag.</video>`
      : `<div class="property-video-placeholder"><span class="property-video-play">▶</span><strong>${room.name} Video</strong><small>Add this room’s separate video URL in <code>ROOM_VIDEOS</code> inside <code>js/main.js</code>.</small></div>`;
  }

  propertyRoot.querySelectorAll("[data-property-book]").forEach(btn=>btn.addEventListener("click",()=>{
    openRoomEnquiry(room.name, room.price);
  }));

  const otherRoomsWrap = propertyRoot.querySelector("[data-other-rooms]");
  if (otherRoomsWrap) {
    const otherRooms = Object.values(roomBySlug).filter(item => item.name !== room.name);
    otherRoomsWrap.innerHTML = otherRooms.map(item => {
      const image = (ROOM_MEDIA[item.name] || ROOM_MEDIA["4 Seater Room"])[0];
      const slug = Object.keys(roomBySlug).find(key => roomBySlug[key].name === item.name);
      return `<article class="property-other-room-card">
        <div class="property-other-room-image"><img src="${image}" alt="${item.name}" loading="lazy"></div>
        <div class="property-other-room-body">
          <span class="eyebrow">ROOM OPTION</span>
          <h3>${item.name}</h3>
          <div class="property-other-room-price">${item.price}<small> / month</small></div>
          <p>Fully furnished • AC • Attached Washroom</p>
          <div class="property-other-room-actions">
            <button class="btn" type="button" data-other-room-enquiry data-room-name="${item.name}" data-room-price="${item.price}">Enquiry</button>
            <a class="btn btn-outline" href="property.html?room=${encodeURIComponent(slug)}">View Details →</a>
          </div>
        </div>
      </article>`;
    }).join("");
    otherRoomsWrap.querySelectorAll("[data-other-room-enquiry]").forEach(btn => {
      btn.addEventListener("click", () => openRoomEnquiry(btn.dataset.roomName, btn.dataset.roomPrice));
    });
  }
}

const lightbox=document.querySelector("#lightbox");
let lightboxItems=[],lightboxIndex=0;
function showLightbox(index){if(!lightbox)return;lightboxItems=[...document.querySelectorAll("[data-lightbox]:not([hidden])")];lightboxIndex=(index+lightboxItems.length)%lightboxItems.length;const item=lightboxItems[lightboxIndex];const img=item.querySelector("img");lightbox.querySelector("img").src=img.src;lightbox.querySelector("img").alt=img.alt;lightbox.querySelector("[data-lightbox-caption]").textContent=item.dataset.caption||img.alt;lightbox.classList.add("show");}
document.querySelectorAll("[data-lightbox]").forEach(item=>item.addEventListener("click",()=>{lightboxItems=[...document.querySelectorAll("[data-lightbox]:not([hidden])")];showLightbox(lightboxItems.indexOf(item));}));
if(lightbox){lightbox.querySelectorAll("[data-lightbox-close]").forEach(b=>b.addEventListener("click",()=>lightbox.classList.remove("show")));lightbox.querySelector("[data-lightbox-prev]")?.addEventListener("click",()=>showLightbox(lightboxIndex-1));lightbox.querySelector("[data-lightbox-next]")?.addEventListener("click",()=>showLightbox(lightboxIndex+1));lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show")});}
document.addEventListener("keydown",e=>{if (e.key === "Escape") {
  lightbox?.classList.remove("show");
  closeRoomDetailsModal();
}
if(lightbox?.classList.contains("show")&&e.key==="ArrowRight")showLightbox(lightboxIndex+1);if(lightbox?.classList.contains("show")&&e.key==="ArrowLeft")showLightbox(lightboxIndex-1);});

/* Room enquiry popup + Formspree submission */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoednvnb";

function createInquiryModal() {
  if (document.querySelector("#roomInquiryModal")) return document.querySelector("#roomInquiryModal");
  const wrap = document.createElement("div");
  wrap.className = "modal-backdrop inquiry-modal";
  wrap.id = "roomInquiryModal";
  wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = `
    <div class="modal inquiry-room-modal" role="dialog" aria-modal="true" aria-labelledby="roomInquiryTitle">
      <button class="modal-close inquiry-close" type="button" data-inquiry-close aria-label="Close">×</button>
      <div class="inquiry-room-header">
        <span class="eyebrow" data-inquiry-room-label>ROOM ENQUIRY</span>
        <h2 id="roomInquiryTitle">Submit Room Enquiry</h2>
      </div>
      <div class="modal-content inquiry-room-content">
        <form id="roomInquiryForm" action="${FORMSPREE_ENDPOINT}" method="POST">
          <input type="hidden" name="_subject" value="The Elite Stay PG & Hostel - Room Enquiry">
          <input type="hidden" name="source" value="Room Enquiry Popup">
          <input type="hidden" name="roomPrice" id="inquiryRoomPrice">
          <input type="hidden" name="roomType" id="inquiryRoomHidden">
          <div class="form-grid inquiry-room-grid">
            <div class="field"><label for="inquiryName">Full Name *</label><input id="inquiryName" name="name" autocomplete="name" required placeholder="e.g. Rahul Sharma"></div>
            <div class="field"><label for="inquiryPhone">Mobile Number *</label><input id="inquiryPhone" name="phone" type="tel" autocomplete="tel" required pattern="[0-9+() -]{8,20}" placeholder="10-digit mobile number"></div>
            <div class="field full"><label for="inquiryMoveDate">Expected Move-in Date *</label><input id="inquiryMoveDate" name="moveDate" type="date" required></div>
            <div class="field"><label for="inquiryRoomPreference">Room Preference</label><select id="inquiryRoomPreference" name="roomPreference"><option>Balcony Room</option><option>Non-Balcony Room</option></select></div>
            <div class="field"><label for="inquiryWashroomPreference">Washroom Preference</label><select id="inquiryWashroomPreference" name="washroomPreference"><option>Attached Washroom</option></select></div>
            <div class="field full"><label for="inquiryMessage">Message (Optional)</label><textarea id="inquiryMessage" name="message" placeholder="Any questions about AC, geyser, meals, or visiting time?"></textarea></div>
          </div>
          <div class="form-actions inquiry-room-actions">
            <button class="btn" type="submit" data-inquiry-submit>Send Enquiry</button>
            <button class="btn inquiry-whatsapp-btn" type="button" data-inquiry-whatsapp><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Chat on WhatsApp</button>
          </div>
          <div class="notice" data-inquiry-notice role="status" aria-live="polite"></div>
        </form>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  return wrap;
}

const inquiryModal = createInquiryModal();
const inquiryForm = inquiryModal.querySelector("#roomInquiryForm");
const inquiryNotice = inquiryModal.querySelector("[data-inquiry-notice]");
const inquiryRoomLabel = inquiryModal.querySelector("[data-inquiry-room-label]");
const inquiryRoomHidden = inquiryModal.querySelector("#inquiryRoomHidden");
const inquiryRoomPrice = inquiryModal.querySelector("#inquiryRoomPrice");
const inquiryMoveDate = inquiryModal.querySelector("#inquiryMoveDate");
let currentInquiryRoom = "";
let currentInquiryPrice = "";

if (inquiryMoveDate) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  inquiryMoveDate.min = `${yyyy}-${mm}-${dd}`;
}

function closeInquiry() {
  inquiryModal.classList.remove("show");
  inquiryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function openRoomEnquiry(roomName = "", roomPrice = "") {
  currentInquiryRoom = roomName || "Room Enquiry";
  currentInquiryPrice = roomPrice || "";
  inquiryRoomLabel.textContent = roomPrice ? `${currentInquiryRoom.toUpperCase()} • ${roomPrice}/MO` : currentInquiryRoom.toUpperCase();
  inquiryRoomHidden.value = currentInquiryRoom;
  inquiryRoomPrice.value = currentInquiryPrice;
  inquiryModal.classList.add("show");
  inquiryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => inquiryModal.querySelector("[name=name]")?.focus(), 50);
}

window.openRoomEnquiry = openRoomEnquiry;

document.querySelectorAll("[data-room-submit]").forEach(btn => {
  btn.addEventListener("click", () => {
    const roomName = btn.dataset.roomSubmit || "";
    const priceMap = {
      "4 Seater Room": "₹10,000–₹11,000",
      "3 Seater Room": "₹12,000–₹15,000",
      "2 Seater Room": "₹16,000–₹20,000",
      "1 Seater Room": "₹30,000–₹31,000"
    };
    openRoomEnquiry(roomName, priceMap[roomName] || "");
  });
});

inquiryModal.querySelector("[data-inquiry-close]")?.addEventListener("click", closeInquiry);
inquiryModal.addEventListener("click", e => { if (e.target === inquiryModal) closeInquiry(); });

document.addEventListener("keydown", e => { if (e.key === "Escape") closeInquiry(); });

inquiryForm?.addEventListener("submit", async e => {
  e.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const submitBtn = inquiryForm.querySelector("[data-inquiry-submit]");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  inquiryNotice.style.display = "none";
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(inquiryForm),
      headers: { Accept: "application/json" }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.errors?.map(x => x.message).join(", ") || `Submission failed (${response.status})`);
    inquiryNotice.style.display = "block";
    inquiryNotice.textContent = "Thank you! Your enquiry has been sent successfully.";
    setTimeout(() => {
      inquiryForm.reset();
      inquiryRoomHidden.value = currentInquiryRoom;
      inquiryRoomPrice.value = currentInquiryPrice;
      closeInquiry();
    }, 1200);
  } catch (error) {
    inquiryNotice.style.display = "block";
    inquiryNotice.textContent = error.message || "Network error. Please try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Enquiry";
  }
});

inquiryModal.querySelector("[data-inquiry-whatsapp]")?.addEventListener("click", () => {
  if (!inquiryForm.reportValidity()) return;
  if (!CONFIG.whatsappNumber) return;
  const d = Object.fromEntries(new FormData(inquiryForm).entries());
  const message = `The Elite Stay PG & Hostel Room Enquiry\n\nRoom: ${d.roomType}\nPrice: ${d.roomPrice || "Not specified"}\nName: ${d.name}\nPhone: ${d.phone}\nMove-in: ${d.moveDate}\nRoom Preference: ${d.roomPreference}\nWashroom: ${d.washroomPreference}\nMessage: ${d.message || "No message"}`;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

const contactInquiryForm=document.querySelector("#inquiryForm");
if(contactInquiryForm){
  contactInquiryForm.setAttribute("action", FORMSPREE_ENDPOINT);
  contactInquiryForm.setAttribute("method", "POST");
  const roomSelect=contactInquiryForm.querySelector('[name="roomType"]');
  const chosen=sessionStorage.getItem("eliteStaySelectedRoom");
  if(chosen&&roomSelect){const match=[...roomSelect.options].find(o=>o.text.toLowerCase().includes(chosen.toLowerCase().replace(" room","")));if(match)roomSelect.value=match.value;sessionStorage.removeItem("eliteStaySelectedRoom");}
  const notice=contactInquiryForm.querySelector(".notice");

  contactInquiryForm.addEventListener("submit", async e=>{
    e.preventDefault();
    if(!contactInquiryForm.reportValidity())return;
    const button=contactInquiryForm.querySelector("[data-submit-demo]");
    button.disabled=true;
    button.textContent="Sending...";
    notice.style.display="none";
    try{
      const response=await fetch(FORMSPREE_ENDPOINT,{
        method:"POST",
        body:new FormData(contactInquiryForm),
        headers:{Accept:"application/json"}
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.errors?.map(x=>x.message).join(", ")||`Submission failed (${response.status})`);
      notice.style.display="block";
      notice.textContent="Thank you! Your inquiry has been sent successfully.";
      contactInquiryForm.reset();
    }catch(error){
      notice.style.display="block";
      notice.textContent=error.message||"Network error. Please check your internet and try again.";
    }finally{
      button.disabled=false;
      button.textContent="Submit Inquiry";
    }
  });

  contactInquiryForm.querySelector("[data-send-whatsapp]")?.addEventListener("click",e=>{e.preventDefault();if(!contactInquiryForm.reportValidity())return;if(!CONFIG.whatsappNumber){notice.style.display="block";notice.textContent="WhatsApp is not configured yet. Add the real WhatsApp number in js/main.js before using this button.";return;}const d=Object.fromEntries(new FormData(contactInquiryForm).entries());
  const message=`The Elite Stay PG & Hostel Inquiry\n\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email||"Not provided"}\nRoom: ${d.roomType}\nMove-in: ${d.moveDate||"Not specified"}\nOccupants: ${d.occupants||"Not specified"}\nMessage: ${d.message||"No message"}`;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
  });
}



// Floating WhatsApp button on every page. Add a real number in CONFIG first.
document.querySelectorAll("[data-floating-whatsapp]").forEach(link=>{
  link.addEventListener("click",event=>{
    event.preventDefault();
    if(!CONFIG.whatsappNumber){
      alert("WhatsApp is not configured yet. Please add The Elite Stay PG & Hostel's real WhatsApp number in js/main.js (CONFIG.whatsappNumber).");
      return;
    }
    const msg="Hello The Elite Stay PG & Hostel, I would like to know about room availability, pricing and facilities.";
    window.open("https://wa.me/"+CONFIG.whatsappNumber+"?text="+encodeURIComponent(msg),"_blank","noopener");
  });
});


// Floating Instagram button alongside the existing WhatsApp button.
document.querySelectorAll("[data-floating-instagram]").forEach(link=>{
  link.addEventListener("click",event=>{
    event.preventDefault();
    window.open("https://www.instagram.com/theelitestaypg/","_blank","noopener");
  });
});

// Facilities page: weekly menu tabs and interactive amenity chips.
(function(){
  const menuData = {
    mon:{breakfast:"Poha, Pasta, Macaroni, Vermicelli or Daliya",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Seasonal Vegetable, Pulse, Rice & Roti"},
    tue:{breakfast:"Potato Paratha, Onion Paratha, Cauliflower Paratha or Paratha with Vegetable",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Paneer, Raita, Rice & Roti"},
    wed:{breakfast:"Poha, Pasta, Macaroni, Vermicelli or Daliya",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Kadhi, Jeera Potato, Rice & Roti"},
    thu:{breakfast:"Potato Paratha, Onion Paratha, Cauliflower Paratha or Paratha with Vegetable",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Seasonal Vegetable, Chholey, Rice & Roti"},
    fri:{breakfast:"Puri, Sabji & Halwa, or a rotating breakfast item",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Green Vegetable, Dal Makhni, Rice & Roti"},
    sat:{breakfast:"Poha, Pasta, Macaroni, Vermicelli or Daliya",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Soya Chap, Raita, Rice & Roti"},
    sun:{breakfast:"Paratha with Vegetable, Puri Sabji Halwa or another rotating breakfast item",lunch:"Morning: Seasonal Vegetable, Roti, Chana / Chholey • Afternoon: Seasonal Vegetable, Pulse & Roti",dinner:"Seasonal Vegetable, Rajma, Rice & Roti"}
  };
  const menuButtons=document.querySelectorAll("[data-menu-day]");
  const breakfast=document.querySelector("[data-menu-breakfast]");
  const lunch=document.querySelector("[data-menu-lunch]");
  const dinner=document.querySelector("[data-menu-dinner]");
  menuButtons.forEach(btn=>btn.addEventListener("click",()=>{
    const data=menuData[btn.dataset.menuDay]; if(!data)return;
    menuButtons.forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});
    if(breakfast)breakfast.textContent=data.breakfast;
    if(lunch)lunch.textContent=data.lunch;
    if(dinner)dinner.textContent=data.dinner;
  }));

  const amenities={
    wifi:["High-Speed Wi-Fi","Reliable high-speed internet access for online classes, work, calls and entertainment."],
    backup:["24×7 Power Backup","Backup support helps keep lights, fans and Wi-Fi available during power interruptions."],
    cctv:["CCTV Surveillance","CCTV coverage is provided around key common and entry areas for resident safety."],
    housekeeping:["Daily Housekeeping","Regular cleaning support helps keep rooms, washrooms and common areas neat and hygienic."],
    fridge:["Common Refrigerator","Common refrigerator access is available for residents to store suitable personal food items."],
    lift:["Lift Access","Lift access makes daily movement between floors more convenient for residents."],
    bike:["Bike Parking","Bike parking is available for residents for convenient two-wheeler access."],
    common:["Clean Common Areas","Dining, corridors and shared spaces are maintained regularly for comfortable daily use."],
    geyser:["24×7 Geyser","Geyser hot-water support is available for comfortable bathing throughout the day."],
    markets:["Nearby Markets (Jagat Farm)","Jagat Farm is nearby for groceries, stationery, pharmacies, ATMs, salons and everyday essentials."],
    washing:["Washing Machine","Washing machine facility is available for residents for convenient everyday laundry needs."]
  };
  const amenityButtons=document.querySelectorAll("[data-amenity]");
  const amenityTitle=document.querySelector("[data-amenity-title]");
  const amenityDescription=document.querySelector("[data-amenity-description]");
  amenityButtons.forEach(btn=>btn.addEventListener("click",()=>{
    const data=amenities[btn.dataset.amenity]; if(!data)return;
    amenityButtons.forEach(b=>b.classList.toggle("active",b===btn));
    if(amenityTitle)amenityTitle.textContent=data[0]+":";
    if(amenityDescription)amenityDescription.textContent=data[1];
  }));
})();


/* Nearby locations: additive filter/search/directions behavior only. */
(function(){
  const nearbyLocations = [
    {name:"Jagat Farm Market",category:"market",label:"Markets & Malls",distance:"500 m · 5 min walk",mode:"Walk",description:"Street food, groceries, stationery, ATMs & daily essentials",icon:"fa-bag-shopping"},
    {name:"Alpha 1 Commercial Belt",category:"market",label:"Markets & Malls",distance:"1.1 km · 4 min auto / 14 min walk",mode:"Auto / Walk",description:"Cafes, coaching centres, banks & shopping",icon:"fa-bag-shopping"},
    {name:"Ansal Plaza Mall",category:"market",label:"Markets & Malls",distance:"1.5 km · 5 min drive",mode:"Drive / Auto",description:"Shopping, dining & hangout spots",icon:"fa-bag-shopping"},
    {name:"Omaxe Connaught Place Mall",category:"market",label:"Markets & Malls",distance:"1.5 km · 5 min drive",mode:"Drive / Auto",description:"Multiplex cinema, food court & retail brands",icon:"fa-bag-shopping"},
    {name:"MSX Mall",category:"market",label:"Markets & Malls",distance:"3.1 km · 9 min drive",mode:"Drive / Auto",description:"Cinema, shopping & restaurants",icon:"fa-bag-shopping"},
    {name:"The Grand Venice Mall",category:"market",label:"Markets & Malls",distance:"3.4 km · 10 min drive",mode:"Drive / Auto",description:"Major mall, gaming zone & dining",icon:"fa-bag-shopping"},
    {name:"Alpha 1 Metro Station (Aqua Line)",category:"metro",label:"Metro & Commute",distance:"1.0 km · 4 min e-rickshaw / 12 min walk",mode:"E-Rickshaw / Walk",description:"Nearest metro station for Noida & Delhi commute",icon:"fa-train-subway"},
    {name:"Pari Chowk Metro Station",category:"metro",label:"Metro & Commute",distance:"1.6 km · 5 min drive",mode:"E-Rickshaw / Auto",description:"Major Greater Noida transit hub & bus stand",icon:"fa-train-subway"},
    {name:"Delta 1 Metro Station",category:"metro",label:"Metro & Commute",distance:"1.9 km · 6 min drive",mode:"Auto / Drive",description:"Aqua Line station",icon:"fa-train-subway"},
    {name:"Knowledge Park II Metro Station",category:"metro",label:"Metro & Commute",distance:"2.3 km · 7 min drive",mode:"E-Rickshaw / Drive",description:"Direct metro stop for Knowledge Park colleges",icon:"fa-train-subway"},
    {name:"GNIDA Office Metro Station",category:"metro",label:"Metro & Commute",distance:"3.1 km · 9 min drive",mode:"Drive / Auto",description:"Aqua Line connectivity",icon:"fa-train-subway"},
    {name:"IEC College of Engg. & Tech",category:"college",label:"Colleges & Universities",distance:"1.2 km · 4 min drive",mode:"E-Rickshaw",description:"Knowledge Park I, easy e-rickshaw access",icon:"fa-graduation-cap"},
    {name:"Accurate Institute of Mgmt. & Tech",category:"college",label:"Colleges & Universities",distance:"2.3 km · 7 min drive",mode:"E-Rickshaw / Auto",description:"Knowledge Park III",icon:"fa-graduation-cap"},
    {name:"Galgotias College (GCET)",category:"college",label:"Colleges & Universities",distance:"2.8 km · 8 min drive",mode:"Shared Auto",description:"Knowledge Park II, frequent shared autos",icon:"fa-graduation-cap"},
    {name:"GNIOT & IILM University",category:"college",label:"Colleges & Universities",distance:"2.8 km · 8 min drive",mode:"E-Rickshaw / Auto",description:"Knowledge Park II campus cluster",icon:"fa-graduation-cap"},
    {name:"NIET (Noida Inst. of Engg. & Tech)",category:"college",label:"Colleges & Universities",distance:"3.0 km · 9 min drive",mode:"Auto / Drive",description:"Knowledge Park II",icon:"fa-graduation-cap"},
    {name:"Sharda University",category:"college",label:"Colleges & Universities",distance:"3.7 km · 10–12 min drive",mode:"E-Rickshaw",description:"Knowledge Park III, direct e-rickshaw route",icon:"fa-graduation-cap"},
    {name:"GL Bajaj Institute of Tech & Mgmt.",category:"college",label:"Colleges & Universities",distance:"4.0 km · 10–12 min drive",mode:"Auto / E-Rickshaw",description:"Knowledge Park III, popular student route",icon:"fa-graduation-cap"},
    {name:"Gautam Buddha University (GBU)",category:"college",label:"Colleges & Universities",distance:"8.4 km · 18 min drive",mode:"Drive / Auto",description:"Yamuna Expressway side",icon:"fa-graduation-cap"},
    {name:"Beta 1 Local Market & ATMs",category:"hospital",label:"Hospitals & Daily",distance:"300 m · 3 min walk",mode:"Walk",description:"Medical store, dairy, photocopy & banks",icon:"fa-square-plus"},
    {name:"Kailash Hospital, Greater Noida",category:"hospital",label:"Hospitals & Daily",distance:"700 m · 3 min drive / 8 min walk",mode:"Walk / Drive",description:"24×7 Multi-speciality & emergency care",icon:"fa-square-plus"},
    {name:"Sharma Medicare Super Speciality",category:"hospital",label:"Hospitals & Daily",distance:"1.7 km · 5 min drive",mode:"Drive / Auto",description:"24×7 healthcare & trauma centre",icon:"fa-square-plus"},
    {name:"Sharda Hospital",category:"hospital",label:"Hospitals & Daily",distance:"2.3 km · 7 min drive",mode:"Drive / Auto",description:"Multi-speciality hospital near Knowledge Park",icon:"fa-square-plus"},
    {name:"Yatharth Super Speciality Hospital",category:"hospital",label:"Hospitals & Daily",distance:"2.9 km · 9 min drive",mode:"Drive / Auto",description:"Major super speciality hospital",icon:"fa-square-plus"}
  ];

  const origin = "The Elite Stay PG & Hostel, A-6, Beta 1, Greater Noida";
  const iconMap = {college:"fa-graduation-cap", metro:"fa-train-subway", market:"fa-bag-shopping", hospital:"fa-square-plus"};
  const categoryNames = {college:"Colleges & Universities", metro:"Metro & Commute", market:"Markets & Malls", hospital:"Hospitals & Daily"};

  function directionsFor(name){
    return "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(name + ", Greater Noida, Uttar Pradesh");
  }

  function cardTemplate(item){
    return `<article class="nearby-card" data-category="${item.category}" data-nearby-card data-search-text="${(item.name+" "+item.label+" "+item.description+" "+item.distance+" "+item.mode).toLowerCase()}">
      <div class="nearby-card-top">
        <div class="nearby-icon"><i class="fa-solid ${item.icon || iconMap[item.category]}" aria-hidden="true"></i></div>
        <div class="nearby-card-main">
          <span class="nearby-category">${item.label}</span>
          <h3>${item.name}</h3>
        </div>
      </div>
      <div class="nearby-meta">
        <span class="nearby-distance"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${item.distance}</span>
        <span class="nearby-mode">${item.mode}</span>
      </div>
      <p class="nearby-description">${item.description}</p>
      <div class="nearby-card-footer">
        <span class="nearby-origin">From Beta 1 Gate No. 1</span>
        <a class="nearby-directions" href="${directionsFor(item.name)}" target="_blank" rel="noopener noreferrer">Directions →</a>
      </div>
    </article>`;
  }

  function setupNearby(){
    const grid = document.querySelector("[data-nearby-grid]");
    const sampleGrid = document.querySelector("[data-nearby-sample-grid]");
    const tabRoot = document.querySelector(".nearby-tabs");
    const search = document.querySelector("[data-nearby-search]");
    const empty = document.querySelector("[data-nearby-empty]");
    if(!grid || !tabRoot || !search) return;
    if(tabRoot.dataset.nearbyReady === "1") return;
    tabRoot.dataset.nearbyReady = "1";

    grid.innerHTML = nearbyLocations.map(cardTemplate).join("");
    if(sampleGrid){
      const samples = [
        nearbyLocations.find(x=>x.name==="GL Bajaj Institute of Tech & Mgmt."),
        nearbyLocations.find(x=>x.name==="Alpha 1 Metro Station (Aqua Line)"),
        nearbyLocations.find(x=>x.name==="Jagat Farm Market")
      ].filter(Boolean);
      sampleGrid.innerHTML = samples.map(cardTemplate).join("");
    }

    let active = "all";

    function apply(){
      const term = (search.value || "").trim().toLowerCase();
      let shown = 0;
      grid.querySelectorAll("[data-nearby-card]").forEach(card=>{
        const categoryOk = active === "all" || (card.dataset.category || "") === active;
        const searchable = (card.dataset.searchText || card.textContent || "").toLowerCase();
        const textOk = !term || searchable.includes(term);
        const visible = categoryOk && textOk;

        // Use both the hidden property and an inline display rule so the filter
        // works reliably on desktop and mobile even if another CSS rule styles cards.
        card.hidden = !visible;
        card.style.display = visible ? "flex" : "none";
        card.setAttribute("aria-hidden", String(!visible));
        if(visible) shown++;
      });

      if(empty) empty.hidden = shown !== 0;
    }

    tabRoot.querySelectorAll("[data-nearby-filter]").forEach(tab=>{
      tab.addEventListener("click", event=>{
        event.preventDefault();
        active = (tab.dataset.nearbyFilter || "all").toLowerCase();
        tabRoot.querySelectorAll("[data-nearby-filter]").forEach(t=>{
          const selected = t === tab;
          t.classList.toggle("active", selected);
          t.setAttribute("aria-selected", String(selected));
        });
        apply();
      });
    });

    search.addEventListener("input", apply);
    apply();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupNearby);
  else setupNearby();
})();


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .then(() => {
        console.log("Elite Stay PWA Service Worker Registered");
      })
      .catch(error => {
        console.error("Service Worker Registration Failed:", error);
      });
  });
}