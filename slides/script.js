(function () {
  const slides = document.querySelectorAll(".slide");
  const total = slides.length;
  let current = 0;

  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function updateSlide(direction) {
    const prev = slides[current];
    if (direction === "next" && current < total - 1) {
      prev.classList.remove("active");
      prev.classList.add("exit-up");
      setTimeout(() => prev.classList.remove("exit-up"), 500);
      current++;
    } else if (direction === "prev" && current > 0) {
      prev.classList.remove("active");
      current--;
    } else {
      return;
    }
    slides[current].classList.add("active");
    updateUI();
  }

  function goTo(idx) {
    if (idx < 0 || idx >= total || idx === current) return;
    slides[current].classList.remove("active");
    current = idx;
    slides[current].classList.add("active");
    updateUI();
  }

  function updateUI() {
    const pct = ((current + 1) / total) * 100;
    progressBar.style.width = pct + "%";
    const newHash = "#" + (current + 1);
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      updateSlide("next");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      updateSlide("prev");
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1);
    }
  });

  // Button navigation
  prevBtn.addEventListener("click", () => updateSlide("prev"));
  nextBtn.addEventListener("click", () => updateSlide("next"));

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) updateSlide("next");
        else updateSlide("prev");
      }
    },
    { passive: true },
  );

  // Hash change
  function goToFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const num = parseInt(hash.substring(1), 10);
      if (!isNaN(num) && num >= 1 && num <= total) {
        goTo(num - 1);
      }
    }
  }
  window.addEventListener("hashchange", goToFromHash);

  // Init
  goToFromHash();
  updateUI();
})();
