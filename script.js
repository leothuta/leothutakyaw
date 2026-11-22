/* ===== EDIT THIS PART ===== */
const CONFIG = {
  email:    "thutakyaw2002@gmail.com",
  linkedin: "https:/www.linkedin.com/in/thu-ta-kyaw-48461a411/",
  github:   "https://github.com/leothuta",
  telegram: "https://t.me/B_Wiggins", 
  phone:    "+66 94 308 5958" 
};

// Add or change projects here. image: put a file in assets/ (optional).
const PROJECTS = [
  { title: "VLAN and inter-VLAN routing lab", status: "In progress",
    desc: "Segmenting a small network into VLANs and routing between them in Packet Tracer.",
    tags: ["VLAN", "Routing", "Packet Tracer"], image: "assets/vlan-lab.png", link: "" },
  { title: "Small office network design", status: "In progress",
    desc: "Designing and documenting a network for a 20-person office, with addressing plan and topology.",
    tags: ["Subnetting", "Topology", "Documentation"], image: "assets/office-network.png", link: "" },
  { title: "Lab PC setup checklist", status: "Done",
    desc: "The checklist I use to prepare lab PCs, projectors, and OS boots before each class.",
    tags: ["Troubleshooting", "Windows", "Process"], image: "assets/checklist.png", link: "" }
];
/* ===== END EDIT ===== */

const $ = (s, r = document) => r.querySelector(s); 

// Missing images show their placeholder text instead of a broken icon
document.addEventListener("error", e => {
  if (e.target.tagName === "IMG") { e.target.parentElement.classList.add("missing"); e.target.remove(); }
}, true);

// Typing roles
const roles = ["Network engineer", "Lab troubleshooter", "Problem solver", "Backend developer", "Football lover"];
let ri = 0, ci = 0, del = false;
(function type() {
  const w = roles[ri];
  $("#typed").textContent = w.slice(0, ci);
  if (!del && ci === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 40 : 90);
})();

// Cursor glow
addEventListener("pointermove", e => {
  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
});

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Network playground
const info = $("#info"), log = $("#log"), packet = $("#packet");
document.querySelectorAll(".dev").forEach(d => {
  const show = () => info.textContent = d.dataset.info;
  d.addEventListener("mouseenter", show); d.addEventListener("focus", show); d.addEventListener("click", show);
});
const routes = [...document.querySelectorAll(".route")];
let busy = false;
const say = t => { log.textContent += "\n" + t; log.scrollTop = log.scrollHeight; };
$("#send").addEventListener("click", () => {
  if (busy) return;
  busy = true;
  const i = Math.floor(Math.random() * routes.length), path = routes[i], len = path.getTotalLength();
  const t0 = performance.now(), dur = 1800;
  say(`> ping Lab PC ${i + 1}`);
  packet.style.display = "block";
  (function step(now) {
    const k = Math.min((now - t0) / dur, 1), p = path.getPointAtLength(len * k);
    packet.setAttribute("cx", p.x); packet.setAttribute("cy", p.y);
    if (k < 1) return requestAnimationFrame(step);
    packet.style.display = "none";
    const pc = $("#pc" + i); pc.classList.add("ok");
    setTimeout(() => pc.classList.remove("ok"), 900);
  const ms = 2 + Math.floor(Math.random() * 6);
const msgs = [
  `Box box! Delivered to Lab PC ${i + 1} in ${ms}ms`,
  `Purple sector! Lab PC ${i + 1} replied in ${ms}ms`,
  `Lights out and away we go: Lab PC ${i + 1}, ${ms}ms`
];
say(msgs[Math.floor(Math.random() * msgs.length)]);
    busy = false;
  })(t0);
});

// Certificates lightbox
const box = $("#lightbox");
document.querySelectorAll(".cert").forEach(c => c.addEventListener("click", () => {
  const img = $("img", c);
  if (!img) return;
  $("img", box).src = img.src; $("img", box).alt = img.alt; box.showModal();
}));
box.addEventListener("click", e => { if (e.target === box || e.target.tagName === "BUTTON") box.close(); });

// Projects
$("#projectGrid").innerHTML = PROJECTS.map(p => `
  <article class="proj">
    <div class="shot" data-ph="Add ${p.image || "an image"}">${p.image ? `<img src="${p.image}" alt="${p.title}">` : ""}</div>
    <div class="body">
      <span class="status ${p.status === "Done" ? "done" : ""}">${p.status}</span>
      <h4>${p.title}</h4><p>${p.desc}</p>
      <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">View project</a>` : ""}
    </div>
  </article>`).join("");

// Contact links (icons)
const ICONS = {
  email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  telegram: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
};
const icon = (name, label, href, external = true) =>
  `<a class="ico" href="${href}" aria-label="${label}" title="${label}"${external ? ' target="_blank" rel="noopener"' : ""}>
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>
   </a>`;
const L = [];
if (CONFIG.email)    L.push(icon("email", "Email: " + CONFIG.email, "mailto:" + CONFIG.email, false));
if (CONFIG.linkedin) L.push(icon("linkedin", "LinkedIn", CONFIG.linkedin));
if (CONFIG.github)   L.push(icon("github", "GitHub", CONFIG.github));
if (CONFIG.telegram) L.push(icon("telegram", "Telegram", CONFIG.telegram));
if (CONFIG.phone)    L.push(icon("phone", "Call " + CONFIG.phone, "tel:" + CONFIG.phone.replace(/\s/g, ""), false));
$("#links").innerHTML = L.join("");

// Contact form opens the visitor's email app with the message filled in
// Contact form: sends the message to your inbox via Web3Forms
const WEB3FORMS_KEY = "60a8a688-bb30-4e08-9e7f-f5598628fcf2";
$("#form").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, status = $("#formStatus"), btn = $("button", form);
  const data = Object.fromEntries(new FormData(form));
  data.access_key = WEB3FORMS_KEY;
  data.subject = "New portfolio message from " + data.name;
  btn.disabled = true;
  status.textContent = "Sending...";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.success) { status.textContent = "Message sent. Thank you!"; form.reset(); }
    else status.textContent = "Something went wrong. Please email me directly.";
  } catch {
    status.textContent = "Network error. Please try again or email me directly.";
  }
  btn.disabled = false;
});
