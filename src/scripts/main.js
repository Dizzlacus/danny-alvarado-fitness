// Danny Alvarado Fitness — global scripts

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

  function syncPlayback() {
    video.muted = true;
    if (reduceMotion.matches) {
      video.pause();
      return;
    }
    const playAttempt = video.play();
    if (playAttempt) playAttempt.catch(() => {});
  }

  syncPlayback();
  reduceMotion.addEventListener("change", syncPlayback);
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
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");
  const tiles = document.querySelectorAll("[data-gallery-src]");
  if (!lightbox || !lightboxImage || !tiles.length) return;

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function isOpen() {
    return !lightbox.classList.contains("hidden");
  }

  function getFocusable() {
    return Array.from(lightbox.querySelectorAll(FOCUSABLE)).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  }

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("overflow-hidden");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const src = tile.getAttribute("data-gallery-src");
      const alt = tile.getAttribute("data-gallery-alt") || "";
      if (src) openLightbox(src, alt);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;

    if (e.key === "Escape") {
      closeLightbox();
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) {
      e.preventDefault();
      lightbox.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || !lightbox.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !lightbox.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  });
})();

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = reduceMotion ? "auto" : "smooth";

  function initCarousel(trackId, prevId, nextId, itemSelector) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track) return;

    function scrollBySlide(direction) {
      const item = track.querySelector(itemSelector);
      if (!item) return;
      const gapValue = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap);
      const gap = Number.isFinite(gapValue) ? gapValue : 0;
      track.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: scrollBehavior });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => scrollBySlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => scrollBySlide(1));
  }

  initCarousel("gallery-track", "gallery-prev", "gallery-next", ".gallery-tile");
  initCarousel("reviews-track", "reviews-prev", "reviews-next", ".review-card");

  function initReviewExpand() {
    const cards = document.querySelectorAll(".review-card");
    if (!cards.length) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function syncExpandButtons() {
      cards.forEach((card) => {
        const text = card.querySelector(".review-quote-text");
        const button = card.querySelector(".review-expand");
        if (!text || !button) return;

        if (card.classList.contains("is-expanded")) {
          button.classList.remove("hidden");
          return;
        }

        const prevHeight = text.style.height;
        text.style.height = "";
        const needsClamp = text.scrollHeight > text.clientHeight + 1;
        text.style.height = prevHeight;
        button.classList.toggle("hidden", !needsClamp);
      });
    }

    function setExpanded(card, text, button, expanded) {
      const name = card.querySelector("footer .font-medium")?.textContent?.trim() || "client";
      button.setAttribute("aria-expanded", String(expanded));
      button.setAttribute(
        "aria-label",
        expanded ? `Show less of review from ${name}` : `Read full review from ${name}`,
      );

      if (reduceMotion) {
        card.classList.toggle("is-expanded", expanded);
        text.style.height = "";
        syncExpandButtons();
        return;
      }

      const startHeight = text.getBoundingClientRect().height;
      text.style.height = `${startHeight}px`;
      card.classList.toggle("is-expanded", expanded);

      // Measure end height off-DOM so the open card doesn't flash mid-transition
      const probe = text.cloneNode(true);
      probe.removeAttribute("style");
      probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${text.offsetWidth}px;height:auto;`;
      if (expanded) {
        probe.style.display = "block";
        probe.style.webkitLineClamp = "unset";
      } else {
        probe.style.display = "-webkit-box";
        probe.style.webkitBoxOrient = "vertical";
        probe.style.webkitLineClamp = "4";
        probe.style.overflow = "hidden";
      }
      text.parentNode.appendChild(probe);
      const endHeight = probe.getBoundingClientRect().height;
      probe.remove();

      requestAnimationFrame(() => {
        text.style.height = `${endHeight}px`;
      });

      const onEnd = (event) => {
        if (event.propertyName !== "height") return;
        text.removeEventListener("transitionend", onEnd);
        text.style.height = expanded ? "auto" : "";
      };
      text.addEventListener("transitionend", onEnd);
      syncExpandButtons();
    }

    cards.forEach((card) => {
      const button = card.querySelector(".review-expand");
      const text = card.querySelector(".review-quote-text");
      if (!button || !text) return;

      button.addEventListener("click", () => {
        setExpanded(card, text, button, !card.classList.contains("is-expanded"));
      });
    });

    syncExpandButtons();
    window.addEventListener("resize", syncExpandButtons);
    if (document.fonts?.ready) {
      document.fonts.ready.then(syncExpandButtons);
    }
  }

  initReviewExpand();
})();

(function () {
  const gallery = document.getElementById("gallery");
  const header = document.getElementById("site-header");
  if (!gallery || !header) return;

  const rail = gallery.querySelector(".gallery-rail");
  const pin = gallery.querySelector(".gallery-wordmark-pin");
  const wordmark = gallery.querySelector(".gallery-wordmark");
  const progress = document.getElementById("scroll-progress");
  if (!rail || !pin || !wordmark) return;

  const STICK_GAP = 20;
  const BOTTOM_GAP = 40;
  let startOffset = 0;
  let fullPinHeight = 0;
  let measuring = false;

  function pinTrackHeight(stickTop) {
    return Math.max(fullPinHeight, window.innerHeight - stickTop - BOTTOM_GAP);
  }

  function measurePin() {
    measuring = true;
    const wasFixed = pin.classList.contains("is-fixed");

    pin.classList.remove("is-fixed");
    pin.style.position = "";
    pin.style.top = "";
    pin.style.left = "";
    pin.style.width = "";
    pin.style.height = "";

    fullPinHeight = wordmark.offsetHeight || 160;
    startOffset = Math.max(0, gallery.offsetHeight / 2 - fullPinHeight / 2);

    pin.classList.toggle("is-fixed", wasFixed);
    measuring = false;
  }

  function setResting() {
    const headerBottom = header.getBoundingClientRect().bottom;
    const stickTop = headerBottom + STICK_GAP;
    pin.classList.remove("is-fixed");
    pin.style.position = "absolute";
    pin.style.top = startOffset + "px";
    pin.style.left = "0";
    pin.style.width = "100%";
    pin.style.height = pinTrackHeight(stickTop) + "px";
  }

  function setFixed(stickTop, railRect) {
    pin.classList.add("is-fixed");
    pin.style.position = "fixed";
    pin.style.top = stickTop + "px";
    pin.style.left = railRect.left + "px";
    pin.style.width = railRect.width + "px";
    pin.style.height = pinTrackHeight(stickTop) + "px";
  }

  function updateScrollProgress() {
    if (!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.height = pct + "%";
  }

  function updateGalleryMark() {
    if (measuring) return;

    const headerBottom = header.getBoundingClientRect().bottom;
    const stickTop = headerBottom + STICK_GAP;
    const galleryRect = gallery.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    const startViewTop = galleryRect.top + startOffset;

    if (startViewTop > stickTop) {
      setResting();
    } else {
      setFixed(stickTop, railRect);
    }

    updateScrollProgress();
    markTicking = false;
  }

  let markTicking = false;

  function onMarkScroll() {
    if (markTicking) return;
    markTicking = true;
    requestAnimationFrame(updateGalleryMark);
  }

  function refresh() {
    measurePin();
    updateGalleryMark();
  }

  refresh();
  window.addEventListener("scroll", onMarkScroll, { passive: true });
  window.addEventListener("resize", refresh);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
})();

(function () {
  const track = document.getElementById("gallery-track");
  const indexEl = document.getElementById("gallery-index");
  if (!track || !indexEl) return;

  const tiles = Array.from(track.querySelectorAll(".gallery-tile"));
  if (!tiles.length) return;

  const total = String(tiles.length).padStart(2, "0");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateIndex() {
    const trackRect = track.getBoundingClientRect();
    let bestIdx = 0;
    let bestDist = Infinity;
    tiles.forEach((tile, i) => {
      const rect = tile.getBoundingClientRect();
      const dist = Math.abs(rect.left - trackRect.left);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    indexEl.textContent = pad(bestIdx + 1) + " — " + total;
  }

  track.addEventListener("scroll", updateIndex, { passive: true });
  window.addEventListener("resize", updateIndex);
  updateIndex();
})();
