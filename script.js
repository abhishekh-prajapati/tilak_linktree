/**
 * S.K. College & Tatva Fest 2026 - Enhanced Linktree Controller
 */

const CONFIG = {
  links: {
    skCollege: "https://www.instagram.com/s.k.college?fqnt=MTI0OXBlMm1na3Q2bA==",
    tatva: "https://www.instagram.com/tatva_by_tilak?avpt=MXNnbm83Y3A0bTdhYQ==",
    registration: "https://forms.gle/TZjioA525rk2iVLe7"
  },
  autoSlideInterval: 5000,
  slides: [
    { 
      title: "FEST 2026: AURA • MANTHAN • KALEIDOSCOPE",
      posterUrl: "assets/poster1.webp",
      caption: "Tilak Education Society's S.K. College Fest 2026 (Aura, Manthan & Kaleidoscope)"
    },
    { 
      title: "TATVA 2026: SHAAN LIVE CONCERT",
      posterUrl: "assets/poster2.jpg",
      caption: "Tatva 2026: Shaan Live in Concert (23rd Dec 2026 at Tilak Sports Complex)"
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  const slide1 = document.getElementById("slide1");
  const slide2 = document.getElementById("slide2");
  const slides = [slide1, slide2];
  
  const dot0 = document.getElementById("dot0");
  const dot1 = document.getElementById("dot1");
  const dots = [dot0, dot1].filter(Boolean);
  
  const slideIndicatorTitle = document.getElementById("slideIndicatorTitle");
  const togglePlayBtn = document.getElementById("togglePlayBtn");
  const iconPause = togglePlayBtn ? togglePlayBtn.querySelector(".icon-pause") : null;
  const iconPlay = togglePlayBtn ? togglePlayBtn.querySelector(".icon-play") : null;
  
  const toggleFitBtn = document.getElementById("toggleFitBtn");
  const iconExpand = toggleFitBtn ? toggleFitBtn.querySelector(".icon-expand") : null;
  const iconCollapse = toggleFitBtn ? toggleFitBtn.querySelector(".icon-collapse") : null;

  const shareBtn = document.getElementById("shareBtn");
  const toast = document.getElementById("toast");

  // Poster Modal Elements
  const openModalBtn = document.getElementById("openModalBtn");
  const posterModal = document.getElementById("posterModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const closeModalBackdrop = document.getElementById("closeModalBackdrop");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");

  // Links
  const linkSK = document.getElementById("link-sk-college");
  const linkTatva = document.getElementById("link-tatva");
  const linkReg = document.getElementById("link-registration");

  if (linkSK) linkSK.href = CONFIG.links.skCollege;
  if (linkTatva) linkTatva.href = CONFIG.links.tatva;
  if (linkReg) linkReg.href = CONFIG.links.registration;

  let currentSlideIndex = 0;
  let isAutoPlaying = true;
  let isFillMode = false;
  let slideTimer = null;

  function goToSlide(index) {
    if (index === currentSlideIndex) return;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    currentSlideIndex = index;

    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");

    if (slideIndicatorTitle) {
      slideIndicatorTitle.style.opacity = "0";
      setTimeout(() => {
        slideIndicatorTitle.textContent = CONFIG.slides[currentSlideIndex].title;
        slideIndicatorTitle.style.opacity = "1";
      }, 200);
    }

    // Update modal if open
    if (modalImg) {
      modalImg.src = CONFIG.slides[currentSlideIndex].posterUrl;
      modalCaption.textContent = CONFIG.slides[currentSlideIndex].caption;
    }
  }

  function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideTimer = setInterval(nextSlide, CONFIG.autoSlideInterval);
  }

  function stopAutoSlide() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  // Toggle Play/Pause
  togglePlayBtn.addEventListener("click", () => {
    isAutoPlaying = !isAutoPlaying;
    if (isAutoPlaying) {
      iconPause.style.display = "block";
      iconPlay.style.display = "none";
      startAutoSlide();
      showToast("Auto-slide resumed");
    } else {
      iconPause.style.display = "none";
      iconPlay.style.display = "block";
      stopAutoSlide();
      showToast("Auto-slide paused");
    }
  });

  // Toggle Fit / Fill Mode (if present)
  if (toggleFitBtn) {
    toggleFitBtn.addEventListener("click", () => {
      isFillMode = !isFillMode;
      if (isFillMode) {
        appContainer.classList.add("fill-mode");
        if (iconExpand) iconExpand.style.display = "none";
        if (iconCollapse) iconCollapse.style.display = "block";
        showToast("Mode: Full Screen Fill");
      } else {
        appContainer.classList.remove("fill-mode");
        if (iconExpand) iconExpand.style.display = "block";
        if (iconCollapse) iconCollapse.style.display = "none";
        showToast("Mode: Complete Poster Fit");
      }
    });
  }

  // Share button (if present)
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: "S.K. College Fest & Concert 2026",
        text: "Check out the official links for S.K. College Fest & Shaan Concert 2026!",
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          copyToClipboard(window.location.href);
        }
      } else {
        copyToClipboard(window.location.href);
      }
    });
  }
  if (dot0) {
    dot0.addEventListener("click", () => {
      goToSlide(0);
      if (isAutoPlaying) startAutoSlide();
    });
  }

  if (dot1) {
    dot1.addEventListener("click", () => {
      goToSlide(1);
      if (isAutoPlaying) startAutoSlide();
    });
  }

  // Poster Modal (if present)
  function openModal() {
    stopAutoSlide();
    if (modalImg) modalImg.src = CONFIG.slides[currentSlideIndex].posterUrl;
    if (modalCaption) modalCaption.textContent = CONFIG.slides[currentSlideIndex].caption;
    if (posterModal) {
      posterModal.classList.add("open");
      posterModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeModal() {
    if (posterModal) {
      posterModal.classList.remove("open");
      posterModal.setAttribute("aria-hidden", "true");
    }
    if (isAutoPlaying) startAutoSlide();
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (closeModalBackdrop) closeModalBackdrop.addEventListener("click", closeModal);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
      }
      if (isAutoPlaying) startAutoSlide();
    }
  }

  // Share button
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "S.K. College Fest & Concert 2026",
      text: "Check out the official links for S.K. College Fest & Shaan Concert 2026!",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard(window.location.href);
      }
    } else {
      copyToClipboard(window.location.href);
    }
  });

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Link copied to clipboard!");
      }).catch(() => {
        showToast("Press Ctrl+C to copy");
      });
    } else {
      showToast("Link copied!");
    }
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && posterModal.classList.contains("open")) {
      closeModal();
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextSlide();
      if (isAutoPlaying) startAutoSlide();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
      if (isAutoPlaying) startAutoSlide();
    } else if (e.key === " ") {
      togglePlayBtn.click();
    }
  });

  // Start rotation
  startAutoSlide();
});
