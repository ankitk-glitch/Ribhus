/* ═══════════════════════════════════════════
   RIBHUS SCRIPT — Scroll animations, carousel,
   navbar, modal, forms
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL EFFECT ─────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ─── MOBILE HAMBURGER ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // ─── SCROLL REVEAL (IntersectionObserver) ─────
  const reveals = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  // ─── PROJECTS CAROUSEL ────────────────────────
  const carousel = document.getElementById('projectsCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.project-card');
    const totalCards = cards.length;
    const visibleCards = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

    const getMaxIndex = () => Math.max(0, totalCards - visibleCards());

    const updateCarousel = () => {
      const cardWidth = cards[0].offsetWidth + 24; // card + gap
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(currentIndex + 1, getMaxIndex());
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateCarousel();
    });

    window.addEventListener('resize', () => {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      updateCarousel();
    });
  }

  // ─── SMOOTH ANCHOR SCROLL ─────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── HERO PARALLAX ON MOUSE MOVE ──────────────
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const heroCard = document.querySelector('.hero-card');
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.03)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    });
  }

  // ─── ACTIVE NAV LINK HIGHLIGHT ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = '#0d1117';
              link.style.fontWeight = '700';
            } else {
              link.style.fontWeight = '500';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

});

// ─── MODAL ──────────────────────────────────────
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
});

// ─── HERO FORM ──────────────────────────────────
function handleHeroForm(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  openModal();
  const emailField = document.querySelector('#uploadForm input[name="email"]');
  if (emailField) emailField.value = email;
}

// ─── CTA PILOT FORM ─────────────────────────────
function handlePilotForm(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  openModal();
  const emailField = document.querySelector('#uploadForm input[name="email"]');
  if (emailField) emailField.value = email;
}

// ─── MODAL FORM SUBMIT (Web3Forms) ───────────────
async function submitModal(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const data = new FormData(form);
  data.append('subject', 'New BIM Pilot Request — Ribhus');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    if (json.success) {
      btn.textContent = '✓ Request Sent!';
      setTimeout(() => {
        closeModal();
        form.reset();
        btn.textContent = 'Send Request';
        btn.disabled = false;
      }, 2000);
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    btn.textContent = 'Error — Try Again';
    btn.disabled = false;
  }
}
