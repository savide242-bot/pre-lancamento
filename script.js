/**
 * BabyBites — Official Pre-Launch Campaign JavaScript
 * Handles:
 * 1. Live Countdown Timer (Target: November 30, 2026)
 * 2. Hero Video Controls (Audio Mute/Unmute, Play/Pause)
 * 3. Interactive App Walkthrough Carousel (Next, Prev, Tabs, Dots, Swipe, Keyboard)
 * 4. Mobile Sticky Conversion Bar
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. LIVE COUNTDOWN TIMER (Target: November 30, 2026 00:00:00)
     ========================================================================== */
  const targetDate = new Date('2026-11-30T00:00:00').getTime();

  const daysEl1 = document.getElementById('timerDays');
  const hoursEl1 = document.getElementById('timerHours');
  const minutesEl1 = document.getElementById('timerMinutes');
  const secondsEl1 = document.getElementById('timerSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      const zero = '00';
      if (daysEl1) daysEl1.textContent = zero;
      if (hoursEl1) hoursEl1.textContent = zero;
      if (minutesEl1) minutesEl1.textContent = zero;
      if (secondsEl1) secondsEl1.textContent = zero;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, '0');

    if (daysEl1) daysEl1.textContent = String(days);
    if (hoursEl1) hoursEl1.textContent = pad(hours);
    if (minutesEl1) minutesEl1.textContent = pad(minutes);
    if (secondsEl1) secondsEl1.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ==========================================================================
     2. HERO VIDEO CONTROLS (Top of page)
     ========================================================================== */
  const heroVideo = document.getElementById('heroAppVideo');
  const toggleAudioBtn = document.getElementById('toggleAudioBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.getElementById('audioLabel');
  const togglePlayBtn = document.getElementById('togglePlayBtn');
  const playIcon = document.getElementById('playIcon');
  const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');

  if (heroVideo) {
    // Attempt auto-play with sound muted
    heroVideo.play().catch(() => {
      // Browser autoplay policy
    });

    if (toggleAudioBtn) {
      toggleAudioBtn.addEventListener('click', () => {
        if (heroVideo.muted) {
          heroVideo.muted = false;
          if (audioIcon) audioIcon.textContent = '🔊';
          if (audioLabel) audioLabel.textContent = 'Sound On';
        } else {
          heroVideo.muted = true;
          if (audioIcon) audioIcon.textContent = '🔇';
          if (audioLabel) audioLabel.textContent = 'Muted';
        }
      });
    }

    if (togglePlayBtn) {
      togglePlayBtn.addEventListener('click', () => {
        if (heroVideo.paused) {
          heroVideo.play();
          if (playIcon) playIcon.textContent = '⏸️';
        } else {
          heroVideo.pause();
          if (playIcon) playIcon.textContent = '▶️';
        }
      });
    }

    if (toggleFullscreenBtn) {
      toggleFullscreenBtn.addEventListener('click', () => {
        heroVideo.classList.add('is-fullscreen-mode');
        heroVideo.style.setProperty('object-fit', 'contain', 'important');
        heroVideo.style.setProperty('background-color', '#000000', 'important');
        heroVideo.setAttribute('controls', 'true');

        if (heroVideo.requestFullscreen) {
          heroVideo.requestFullscreen().catch(() => {});
        } else if (heroVideo.webkitRequestFullscreen) {
          heroVideo.webkitRequestFullscreen();
        } else if (heroVideo.webkitEnterFullscreen) {
          heroVideo.webkitEnterFullscreen(); // iOS Safari
        } else if (heroVideo.msRequestFullscreen) {
          heroVideo.msRequestFullscreen();
        }
      });
    }

    const onFullscreenChange = () => {
      const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      if (isFullscreen) {
        heroVideo.classList.add('is-fullscreen-mode');
        heroVideo.style.setProperty('object-fit', 'contain', 'important');
        heroVideo.style.setProperty('background-color', '#000000', 'important');
        heroVideo.setAttribute('controls', 'true');
      } else {
        heroVideo.classList.remove('is-fullscreen-mode');
        heroVideo.style.removeProperty('object-fit');
        heroVideo.style.removeProperty('background-color');
        heroVideo.removeAttribute('controls');
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);
  }


  /* ==========================================================================
     3. INTERACTIVE APP WALKTHROUGH CAROUSEL (Lower on page)
     ========================================================================== */
  const slidesData = [
    {
      category: 'STAGE-BASED NUTRITION',
      title: '300+ Age-Adapted Recipes',
      desc: 'Eliminates the daily guesswork of what to prepare. Over 300 nutrient-dense, pediatrician-aligned recipes categorized by exact age stages (6–8m, 9–11m, 12m+), preparation time, and developmental textures.',
      perk: 'Zero meal repetition · Wholesome meals in 20 minutes or less',
      img: 'assets/images/feature-recipes.jpg'
    },
    {
      category: 'WEEKLY MEAL PLANNING',
      title: 'Weekly Meal Planner',
      desc: 'Removes the evening stress of wondering what to cook next. Effortlessly organize breakfasts, lunches, snacks, and dinners for the entire week and mark completed meals with a single tap.',
      perk: 'Saves up to 4+ hours of mental planning every single week',
      img: 'assets/images/feature-meal-plan.jpg'
    },
    {
      category: 'SMART GROCERY SHOPPING',
      title: 'Smart Shopping List',
      desc: 'Puts an end to chaotic grocery runs and wasted baby produce. The app automatically compiles ingredients from your weekly recipes into an organized, category-sorted checklist ready for your cart.',
      perk: 'Automatic ingredient sync · Never forget an essential item again',
      img: 'assets/images/feature-shopping-list.jpg'
    },
    {
      category: 'PRIVATE MOMS SISTERHOOD',
      title: 'Exclusive Moms Community',
      desc: 'You will never walk through early motherhood feeling isolated. A private, judgment-free social feed where mothers share meal photos, exchange authentic feeding tips, and celebrate every feeding milestone together.',
      perk: 'A safe, supportive, and compassionate circle of real mothers',
      img: 'assets/images/feature-moms-community.jpg'
    },
    {
      category: 'SMART PANTRY USE',
      title: 'Pantry Helper',
      desc: 'Rescues hectic evenings without making a supermarket run. Simply enter 2 or more ingredients already in your pantry or fridge, and BabyBites instantly reveals delicious, baby-safe meals you can cook right now.',
      perk: 'Make the most of what you have · Zero food waste',
      img: 'assets/images/feature-pantry-helper.jpg'
    }
  ];

  let currentSlideIndex = 0;

  const carouselScreenImg = document.getElementById('carouselScreenImg');
  const carouselCategoryBadge = document.getElementById('carouselCategoryBadge');
  const carouselFeatureTitle = document.getElementById('carouselFeatureTitle');
  const carouselFeatureDesc = document.getElementById('carouselFeatureDesc');
  const carouselPerkText = document.getElementById('carouselPerkText');
  
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  function renderSlide(index) {
    if (index < 0) index = slidesData.length - 1;
    if (index >= slidesData.length) index = 0;
    currentSlideIndex = index;

    const data = slidesData[currentSlideIndex];

    // Smooth image fade transition
    if (carouselScreenImg) {
      carouselScreenImg.classList.add('fade-out');
      setTimeout(() => {
        carouselScreenImg.src = data.img;
        carouselScreenImg.alt = data.title;
        carouselScreenImg.classList.remove('fade-out');
      }, 180);
    }

    // Text updates
    if (carouselCategoryBadge) carouselCategoryBadge.textContent = data.category;
    if (carouselFeatureTitle) carouselFeatureTitle.textContent = data.title;
    if (carouselFeatureDesc) carouselFeatureDesc.textContent = data.desc;
    if (carouselPerkText) carouselPerkText.textContent = data.perk;

    // Dots active update
    dots.forEach((dot, i) => {
      if (i === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Next / Prev clicks
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      renderSlide(currentSlideIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      renderSlide(currentSlideIndex - 1);
    });
  }

  // Direct dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slide = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slide)) {
        renderSlide(slide);
      }
    });
  });

  // Keyboard navigation when user is focused near carousel
  document.addEventListener('keydown', (e) => {
    const carouselEl = document.getElementById('appCarousel');
    if (!carouselEl) return;
    const rect = carouselEl.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      if (e.key === 'ArrowRight') renderSlide(currentSlideIndex + 1);
      if (e.key === 'ArrowLeft') renderSlide(currentSlideIndex - 1);
    }
  });

  // Mobile Touch Swipe support
  const stage = document.querySelector('.carousel-stage');
  if (stage) {
    let touchStartX = 0;
    let touchEndX = 0;

    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          renderSlide(currentSlideIndex + 1); // Swipe left -> Next
        } else {
          renderSlide(currentSlideIndex - 1); // Swipe right -> Prev
        }
      }
    }, { passive: true });
  }

});
