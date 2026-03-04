/* ============================================
   ACHAHIJAB - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize all modules
  initMobileMenu();
  initNavbarScroll();
  initScrollAnimations();
  initTestimonialSlider();
  initSmoothScroll();
});

/* ==========================================
   1. MOBILE MENU
   ========================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================
   2. NAVBAR SHADOW ON SCROLL
   ========================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shadow-md', window.scrollY > 50);
  });
}

/* ==========================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================
   4. TESTIMONIAL SLIDER
   ========================================== */
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('#slider-dots span');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!track || !prevBtn || !nextBtn) return;

  const TOTAL_SLIDES = 3;
  const AUTO_INTERVAL = 4000;
  let current = 0;
  let autoTimer;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function update() {
    const offset = isMobile() ? current * 100 : current * 33.333;
    track.style.transform = `translateX(-${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-primary', i === current);
      dot.classList.toggle('bg-pink-200', i !== current);
    });
  }

  function goTo(index) {
    const max = isMobile() ? TOTAL_SLIDES - 1 : 0;
    current = Math.max(0, Math.min(index, max));
    update();
  }

  function next() {
    const max = isMobile() ? TOTAL_SLIDES - 1 : 0;
    current = current >= max ? 0 : current + 1;
    update();
  }

  function prev() {
    const max = isMobile() ? TOTAL_SLIDES - 1 : 0;
    current = current <= 0 ? max : current - 1;
    update();
  }

  function startAuto() {
    autoTimer = setInterval(next, AUTO_INTERVAL);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Event listeners
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });
  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  startAuto();
}

/* ==========================================
   5. SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
