/* ═══════════════════════════════════════════════
   RIBHUS SCRIPT — Real architectural projects data,
   interactive modal lightbox, scroll animations, 
   carousel, and contact forms
═══════════════════════════════════════════════ */

/* ─── REAL ARCHITECTURAL PROJECTS DATA STORE ──── */
const projectsData = {
  complex7: {
    title: "3-Building Complex — Basement to 5th Floor (7 Storeys)",
    tag: "Energy Audit · 7 Storeys",
    subtitle: "Coordinated BIM model covering 3 distinct buildings (2,682 elements, 1,364 walls, 6,595.83 m³ volume, 232 thermal zones) built as the exact data source for EPC audits and thermal evaluations.",
    service: "Energy Performance BIM Modeling",
    timeline: "Coordinated Complex Delivery",
    tools: "ArchiCAD, IFC4, XML Schedules",
    standard: "LOD 300 Audit-Ready",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/three-building-complex-energy-bim.html",
    images: [
      "assets/project_complex_7storey.jpg"
    ],
    bullets: [
      "Extracted 2,682 elements: 1,364 walls (6,595.83 m³), 66 slabs, 6 roofs, 412 doors, 602 windows (1,114.73 m² glazing area).",
      "Modelled 232 spatially defined room zones (47 Rooms, 29 Corridors, 24 Bathrooms, 17 Bedrooms, etc.) with verified volume calculations.",
      "Captures shared shading and solar exposure across all 3 buildings for SAP, PHPP, and dynamic thermal simulations."
    ]
  },

  berlin12: {
    title: "12-Storey Residential Building — Berlin, Germany",
    tag: "Thermal Simulation · Berlin",
    subtitle: "11,073 m² across 12 levels modeled for energy simulation from day one. Direct IFC4 export into thermal engines with zero geometric approximations.",
    service: "Thermal Simulation & EPBD Compliance",
    timeline: "Direct Simulation Pipeline",
    tools: "ArchiCAD, IFC4, Thermal Simulation Engine",
    standard: "GEG, EPBD, EN ISO 13790",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/berlin-12storey-thermal-bim.html",
    images: [
      "assets/project_berlin_residential.jpg"
    ],
    bullets: [
      "11,073 m² across 12 levels: 538 windows and 171 doors modeled with zone-specific glazing ratios (7% to 80%).",
      "Thermal engine output: 17,454 m³ ventilated volume, 11,718 m² envelope area, 4.49 W/m²K building shell U-value average.",
      "Primary energy demand of 244 MWh/year (7.66 kWh/m²a) and annual CO₂ emissions of 17,601 kg traceable back to model geometry."
    ]
  },

  germanvilla: {
    title: "Modern German Residential Villa — Energy Envelope BIM",
    tag: "German Residential BIM",
    subtitle: "Single-family high-efficiency villa modeled in ArchiCAD with continuous thermal envelope assemblies, U-value classifications, and solar exposure detailing for GEG audits.",
    service: "Residential Energy BIM",
    timeline: "36 Hours Delivery",
    tools: "ArchiCAD 26, IFC 4.3, BIMx",
    standard: "German GEG / DIN 4108",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/german-residential-villa.html",
    images: [
      "assets/project_german_villa.jpg"
    ],
    bullets: [
      "Monolithic insulated wall assemblies (U ≤ 0.20 W/m²K) and 35° pitched roof insulation layers (U ≤ 0.14 W/m²K).",
      "High-efficiency triple-glazed aperture assemblies (Uw ≤ 0.85 W/m²K) with explicit frame reveal depths.",
      "Audit-defensible living area and heated building volume calculations for GEG energy certificates."
    ]
  },

  truss: {
    title: "Truss Bridge Renovation — Gusset Plates & Girder Connections | IS 800:2007",
    tag: "Structural Detailing · IS 800",
    subtitle: "Delivered 17 detailed 2D AutoCAD (DWG) sheets of gusset plate and girder bolted connections in 8 days for a consulting firm in Rajasthan.",
    service: "Structural Steel Detailing",
    timeline: "8 Days (On-Time Delivery)",
    tools: "AutoCAD 2D, IS 800:2007 Standards, DWG",
    standard: "IS 800:2007 Structural Code",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/truss-bridge-renovation.html",
    images: [
      "assets/truss_gusset_1.jpg"
    ],
    bullets: [
      "Delivered 17 detailed 2D AutoCAD (DWG) sheets of gusset plate and girder bolted connections in 8 days from structural design inputs.",
      "Generated accurate connection plans, elevations, and sections for truss bridge renovation under strict client turnaround deadlines.",
      "Ensured edge distance, pitch, and bolt hole clearances conformed rigorously to IS 800:2007 steel design specifications."
    ]
  }
};

/* ─── INITIALIZATION ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar elevation on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 3. Scroll reveal with IntersectionObserver
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => revealObserver.observe(el));

  // 4. Projects Carousel
  const carousel = document.getElementById('projectsCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.project-card');
    const totalCards = cards.length;

    const getVisibleCards = () => {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const getMaxIndex = () => Math.max(0, totalCards - getVisibleCards());

    const updateCarousel = () => {
      if (!cards[0]) return;
      const cardWidth = cards[0].offsetWidth + 24; // card width + gap
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

  // 5. Hero 3D Parallax Tilt
  const heroCard = document.querySelector('.hero-card');
  const heroImg = document.querySelector('.hero-img');
  if (heroCard && heroImg) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // 6. Modal backdrop clicks
  const pOverlay = document.getElementById('projectModalOverlay');
  if (pOverlay) {
    pOverlay.addEventListener('click', (e) => {
      if (e.target === pOverlay) closeProjectModal();
    });
  }

  const mOverlay = document.getElementById('modalOverlay');
  if (mOverlay) {
    mOverlay.addEventListener('click', (e) => {
      if (e.target === mOverlay) closeModal();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeModal();
    }
  });

});

/* ─── PROJECT DETAILS MODAL HANDLER ───────────── */
function openProjectModal(key) {
  const data = projectsData[key];
  if (!data) return;

  const overlay = document.getElementById('projectModalOverlay');
  if (!overlay) return;

  // Header content
  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTimeline').textContent = data.timeline;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSubtitle').textContent = data.subtitle;

  // Specifications
  document.getElementById('modalService').textContent = data.service;
  document.getElementById('modalTools').textContent = data.tools;
  document.getElementById('modalStandard').textContent = data.standard;

  // Action link
  const actionLink = document.getElementById('modalActionLink');
  actionLink.href = data.actionUrl;
  document.getElementById('modalActionText').textContent = data.actionText;

  // Main Image & Thumbnails
  const mainImg = document.getElementById('modalMainImg');
  mainImg.src = data.images[0];
  mainImg.alt = data.title;

  const thumbsRow = document.getElementById('modalThumbsRow');
  thumbsRow.innerHTML = '';
  data.images.forEach((imgSrc, idx) => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc;
    thumb.alt = `${data.title} view ${idx + 1}`;
    thumb.className = 'modal-thumb' + (idx === 0 ? ' active' : '');
    thumb.onclick = () => {
      mainImg.src = imgSrc;
      thumbsRow.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    };
    thumbsRow.appendChild(thumb);
  });

  // Bullets
  const bulletsList = document.getElementById('modalBullets');
  bulletsList.innerHTML = '';
  data.bullets.forEach(bulletText => {
    const li = document.createElement('li');
    li.textContent = bulletText;
    bulletsList.appendChild(li);
  });

  // Show modal
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Reinitialize icons inside modal if needed
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeProjectModal() {
  const overlay = document.getElementById('projectModalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ─── PILOT / CONTACT MODAL HANDLER ───────────── */
function openModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleHeroForm(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input) {
    openModal();
    const modalEmail = document.querySelector('#uploadForm input[name="email"]');
    if (modalEmail) modalEmail.value = input.value;
  }
}

function handlePilotForm(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input) {
    openModal();
    const modalEmail = document.querySelector('#uploadForm input[name="email"]');
    if (modalEmail) modalEmail.value = input.value;
  }
}

/* ─── WEB3FORMS SUBMISSION ─────────────────────── */
async function submitModal(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const data = new FormData(form);
  data.append('subject', 'New BIM Pilot Inquiry — theribhus.com');

  btn.textContent = 'Sending Request...';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    if (json.success) {
      btn.textContent = '✓ Request Received! We will respond within 24h';
      setTimeout(() => {
        closeModal();
        form.reset();
        btn.textContent = 'Send Pilot Request';
        btn.disabled = false;
      }, 2500);
    } else {
      throw new Error(json.message || 'Submission failed');
    }
  } catch (err) {
    // Fallback directly to mailto if API key is not active
    const emailVal = form.querySelector('input[name="email"]')?.value || '';
    const nameVal = form.querySelector('input[name="name"]')?.value || '';
    const msgVal = form.querySelector('textarea[name="message"]')?.value || '';
    const subject = encodeURIComponent(`BIM Pilot Inquiry from ${nameVal}`);
    const body = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nProject details:\n${msgVal}`);
    window.location.href = `mailto:contact@theribhus.com?subject=${subject}&body=${body}`;
    btn.textContent = 'Opening Mail Client...';
    setTimeout(() => {
      closeModal();
      btn.textContent = 'Send Pilot Request';
      btn.disabled = false;
    }, 2000);
  }
}

/* ─── FULL PILOT FORM HANDLER ─────────────────── */
async function handleFullPilotForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('pilotSubmitBtn');
  const data = new FormData(form);
  data.append('subject', 'New Energy-Audit BIM Pilot Request — theribhus.com');

  const origText = btn.textContent;
  btn.textContent = 'Submitting Request...';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    if (json.success) {
      btn.textContent = '✓ Pilot Request Sent! We reply in 24h';
      btn.style.background = '#059669';
      setTimeout(() => {
        form.reset();
        btn.textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    } else {
      throw new Error(json.message || 'Submission error');
    }
  } catch (err) {
    const nameVal = form.querySelector('input[name="name"]')?.value || '';
    const emailVal = form.querySelector('input[name="email"]')?.value || '';
    const compVal = form.querySelector('input[name="company"]')?.value || '';
    const typeVal = form.querySelector('select[name="type"]')?.value || '';
    const filesVal = form.querySelector('input[name="source_files"]')?.value || '';
    const detailsVal = form.querySelector('textarea[name="details"]')?.value || '';

    const subject = encodeURIComponent(`Free Pilot Request: ${nameVal} (${typeVal})`);
    const body = encodeURIComponent(
      `Name: ${nameVal}\nEmail: ${emailVal}\nCompany: ${compVal}\nProject Type: ${typeVal}\nSource Files: ${filesVal}\n\nDetails:\n${detailsVal}`
    );
    window.location.href = `mailto:contact@theribhus.com?subject=${subject}&body=${body}`;
    btn.textContent = 'Opening Mail Client...';
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
    }, 2500);
  }
}
