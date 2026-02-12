// Interactive timeline: click a job -> show details, highlight selected.

const timeline = document.getElementById("timeline");
const items = Array.from(document.querySelectorAll(".timeline__item"));

const detailsTitle = document.getElementById("detailsTitle");
const detailsMeta = document.getElementById("detailsMeta");
const detailsList = document.getElementById("detailsList");

function setActiveItem(item) {
  items.forEach(i => i.classList.remove("is-active"));
  item.classList.add("is-active");

  const role = item.dataset.role || "Role";
  const company = item.dataset.company || "Company";
  const dates = item.dataset.dates || "Dates";
  const location = item.dataset.location || "Location";

  detailsTitle.textContent = role;
  detailsMeta.textContent = `${company} • ${dates} • ${location}`;

  const bulletsRaw = item.dataset.bullets || "";
  const bullets = bulletsRaw.split("|").map(s => s.trim()).filter(Boolean);

  detailsList.innerHTML = "";
  if (bullets.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Add bullet points for this role in the HTML (data-bullets).";
    detailsList.appendChild(li);
  } else {
    bullets.forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      detailsList.appendChild(li);
    });
  }
}

// Click handling (event delegation)
timeline.addEventListener("click", (e) => {
  const btn = e.target.closest(".timeline__btn");
  if (!btn) return;

  const item = btn.closest(".timeline__item");
  if (!item) return;

  setActiveItem(item);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize details with the default active item (or first)
const initial = document.querySelector(".timeline__item.is-active") || items[0];
if (initial) setActiveItem(initial);
