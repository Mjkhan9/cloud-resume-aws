/* ================================================================
   USMAN MOTIWALA — CLOUD RESUME · SCRIPT
   ================================================================ */

(() => {
  "use strict";

  // ---- DOM refs ----
  const timeline     = document.getElementById("timeline");
  const items        = Array.from(document.querySelectorAll(".timeline__item"));
  const detailsTitle = document.getElementById("detailsTitle");
  const detailsMeta  = document.getElementById("detailsMeta");
  const detailsList  = document.getElementById("detailsList");
  const jobDetails   = document.getElementById("jobDetails");

  // ---- Set active job ----
  function setActiveItem(item) {
    items.forEach(i => i.classList.remove("is-active"));
    item.classList.add("is-active");

    const role     = item.dataset.role     || "Role";
    const company  = item.dataset.company  || "Company";
    const dates    = item.dataset.dates    || "Dates";
    const location = item.dataset.location || "Location";

    detailsTitle.textContent = role;
    detailsMeta.textContent  = `${company} · ${dates} · ${location}`;

    const bulletsRaw = item.dataset.bullets || "";
    const bullets    = bulletsRaw.split("|").map(s => s.trim()).filter(Boolean);

    detailsList.innerHTML = "";

    if (bullets.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Details coming soon.";
      detailsList.appendChild(li);
    } else {
      bullets.forEach((b, i) => {
        const li = document.createElement("li");
        li.textContent = b;
        li.style.opacity = "0";
        li.style.transform = "translateX(-8px)";
        li.style.transition = `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`;
        detailsList.appendChild(li);
        // Trigger reflow, then animate in
        requestAnimationFrame(() => {
          li.style.opacity = "1";
          li.style.transform = "translateX(0)";
        });
      });
    }
  }

  // ---- Click handling (event delegation) ----
  if (timeline) {
    timeline.addEventListener("click", (e) => {
      const btn = e.target.closest(".timeline__btn");
      if (!btn) return;
      const item = btn.closest(".timeline__item");
      if (!item) return;
      setActiveItem(item);
    });
  }

  // ---- Keyboard: arrow navigation between roles ----
  if (timeline) {
    timeline.addEventListener("keydown", (e) => {
      if (!["ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const activeIdx = items.findIndex(i => i.classList.contains("is-active"));
      let next = activeIdx;
      if (e.key === "ArrowDown") next = Math.min(activeIdx + 1, items.length - 1);
      if (e.key === "ArrowUp")   next = Math.max(activeIdx - 1, 0);
      if (next !== activeIdx) {
        setActiveItem(items[next]);
        items[next].querySelector(".timeline__btn")?.focus();
      }
    });
  }

  // ---- Initialize default active item ----
  const initial = document.querySelector(".timeline__item.is-active") || items[0];
  if (initial) setActiveItem(initial);

  // ---- Footer year ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Scroll-triggered card reveals ----
  const cards = document.querySelectorAll(".card--fade-in");
  if ("IntersectionObserver" in window && cards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((card) => {
      card.style.animationPlayState = "paused";
      observer.observe(card);
    });
  }
})();
