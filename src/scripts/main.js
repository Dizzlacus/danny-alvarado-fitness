// The Playground — global scripts

(function () {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

(function () {
  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("nav-mobile-panel");
  const iconOpen = document.getElementById("icon-hamburger");
  const iconClose = document.getElementById("icon-close");
  const header = document.getElementById("site-header");
  if (!burger || !mobileMenu || !iconOpen || !iconClose) return;

  function isOpen() {
    return mobileMenu.classList.contains("is-open");
  }

  function openMenu() {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    iconOpen.classList.add("is-hidden");
    iconClose.classList.remove("is-hidden");
    header?.classList.add("is-menu-open");
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    iconOpen.classList.remove("is-hidden");
    iconClose.classList.add("is-hidden");
    header?.classList.remove("is-menu-open");
  }

  burger.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (burger.contains(e.target) || mobileMenu.contains(e.target)) return;
    closeMenu();
  });
})();

(function () {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const preferMobile = window.matchMedia("(max-width: 767px)").matches;
  const nextSrc = preferMobile ? video.dataset.srcMobile : video.dataset.srcDesktop;
  if (nextSrc) video.src = nextSrc;

  function tryPlay() {
    if (reduceMotion.matches) {
      video.pause();
      return;
    }
    const playAttempt = video.play();
    if (playAttempt) playAttempt.catch(() => {});
  }

  tryPlay();
  video.addEventListener("loadeddata", tryPlay);
  video.addEventListener("canplay", tryPlay);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") tryPlay();
  });
  window.addEventListener("pageshow", tryPlay);

  const unlock = () => {
    tryPlay();
    window.removeEventListener("touchstart", unlock);
    window.removeEventListener("pointerdown", unlock);
  };
  window.addEventListener("touchstart", unlock, { passive: true });
  window.addEventListener("pointerdown", unlock);

  reduceMotion.addEventListener("change", tryPlay);
})();

(function () {
  const header = document.getElementById("site-header");
  if (!header) return;

  let ticking = false;

  function updateChrome() {
    header.classList.toggle("is-sticky", window.scrollY > 10);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateChrome);
  }

  updateChrome();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateChrome);
})();

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
})();

(function () {
  const sliders = document.querySelectorAll("[data-ba-slider]");
  if (!sliders.length) return;

  function clamp(value) {
    return Math.min(100, Math.max(0, value));
  }

  sliders.forEach((root) => {
    const input = root.querySelector(".ba-slider-range");
    if (!input) return;

    function apply(value) {
      const next = clamp(Number(value));
      root.style.setProperty("--pos", `${next}%`);
      input.value = String(next);
    }

    function fromPointer(event) {
      const rect = root.getBoundingClientRect();
      if (!rect.width) return Number(input.value);
      return ((event.clientX - rect.left) / rect.width) * 100;
    }

    apply(input.value);

    input.addEventListener("input", () => apply(input.value));
    input.addEventListener("change", () => apply(input.value));

    root.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();
      root.setPointerCapture(event.pointerId);
      apply(fromPointer(event));
    });

    root.addEventListener("pointermove", (event) => {
      if (!root.hasPointerCapture(event.pointerId)) return;
      apply(fromPointer(event));
    });
  });
})();
