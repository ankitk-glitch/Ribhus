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


/* ═══════════════════════════════════════════════
   LOCATION-AWARE BILINGUAL I18N SYSTEM (EN / DE)
═══════════════════════════════════════════════ */
const i18nDict = {
  en: {
    "nav.services": "Services",
    "nav.process": "Process",
    "nav.projects": "Projects",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.pilot": "Free Pilot",

    "hero.eyebrow": "Civil Engineer-Led BIM Studio · Berlin & DACH",
    "hero.title": "Audit-Ready BIM Models Engineered for Energy Performance",
    "hero.subtitle": "When modelling for energy performance, clean, accurate geometry isn't a nice-to-have — it is the entire foundation of your audit. We deliver coordinate-precise ArchiCAD, Revit, and IFC4 models with floor-by-floor thermal zones, wall volumes, and opening schedules in 24–48 hours.",
    "hero.btnPilot": "Start a Free Pilot",
    "hero.btnProjects": "Explore Energy Projects",
    "hero.trust1": "✓ Civil Engineering-Led QA",
    "hero.trust2": "✓ Direct Thermal Engine Export",
    "hero.trust3": "✓ NDA on Request",

    "trustbar.speed.label": "Speed",
    "trustbar.speed.val": "24–48 h turnaround on standard residential",
    "trustbar.detail.label": "Detail",
    "trustbar.detail.val": "LOD 200–300 models",
    "trustbar.formats.label": "Formats",
    "trustbar.formats.val": "ArchiCAD · Revit · IFC 4.3 · DWG",
    "trustbar.exp.label": "Experience",
    "trustbar.exp.val": "150+ models used in German energy audits",

    "problem.eyebrow": "Why Energy Consultancies Outsource Modeling",
    "problem.heading": "An energy audit is only as good as the model under it.",
    "problem.body": "Auditors and consultants receive plans as PDFs, DWGs or scans. Before any calculation can start, someone has to rebuild them as a model with correct wall thicknesses, floor heights, openings and room volumes. Hiring locally is slow and costly, and generic CAD outsourcing often returns models that fail your own checks. Ribhus is a small civil engineering studio that does only this one job, and does it to a standard you can build on.",
    "problem.card1.title": "Capacity when you need it",
    "problem.card1.desc": "We absorb peak workloads without hiring or training, so deadlines stop depending on headcount.",
    "problem.card2.title": "Checked before delivery",
    "problem.card2.desc": "Every model goes through dimension and standards checks, so errors are caught on our side.",
    "problem.card3.title": "Fixed quote per project",
    "problem.card3.desc": "A fixed quote per project instead of hourly billing surprises.",

    "services.eyebrow": "What We Build",
    "services.heading": "Specialized BIM Conversion Services",
    "services.subheading": "High-precision parametric models engineered for German and European building energy auditors, architects, and engineering consultancies.",
    "services.card1.badge": "LOD 200–300",
    "services.card1.title": "2D-to-3D BIM Conversion",
    "services.card1.desc": "PDFs, DWG files or paper scans converted into coordinate-locked ArchiCAD or Revit models with exact wall assemblies and zero dimensional drift.",
    "services.card1.feat1": "Monolithic & composite wall assemblies",
    "services.card1.feat2": "Floor-by-floor vertical alignment",
    "services.card1.feat3": "Precise door & window opening schedules",

    "services.card2.badge": "Energy Simulation",
    "services.card2.title": "Audit-Ready Models (IFC 4.3)",
    "services.card2.desc": "Engineered specifically to feed thermal calculation engines directly. Continuous envelope definitions, room volume extractions, and zone assignments.",
    "services.card2.feat1": "Spatially defined thermal room boundaries",
    "services.card2.feat2": "Glazing ratio & solar gain data extraction",
    "services.card2.feat3": "Direct import into SAP, PHPP & thermal tools",

    "services.card3.badge": "LiDAR & Point Cloud",
    "services.card3.title": "Scan-to-BIM & Legacy Blueprints",
    "services.card3.desc": "Hand-drawn blueprints, historical municipal archives, or 3D LiDAR point cloud scans reconstructed into clean, coordinate-referenced digital twins.",
    "services.card3.feat1": "Point cloud decimation & vectorization",
    "services.card3.feat2": "As-built geometric verification (±2mm)",
    "services.card3.feat3": "Existing building retrofit & renovation base",

    "services.card4.badge": "Quantity Extraction",
    "services.card4.title": "Drafting, Quantities & Visuals",
    "services.card4.desc": "CAD drawing sets, floor plan redesign, BOQ volume calculations according to DIN 277, and interactive BIMx presentation models from a centralized model.",
    "services.card4.feat1": "Automated bill-of-quantities (BOQ) extraction",
    "services.card4.feat2": "Executive 2D plan, section & elevation sheets",
    "services.card4.feat3": "Interactive mobile BIMx model walkthroughs",

    "services.boundary": "Clear scope boundary: We build the coordinated 3D BIM model. The energy calculation, thermal engine simulation, and official certificate stay with your team.",

    "process.eyebrow": "Clear, Predictable Turnaround",
    "process.heading": "Three steps from plans to model.",
    "process.step1.title": "Send your plans",
    "process.step1.desc": "Upload PDFs, DWG files or scans at any European scale. Everything stays under strict NDA upon request.",
    "process.step2.title": "Get a fixed quote",
    "process.step2.desc": "Within hours you receive one price based on floor area, level of detail and complexity. No hourly billing surprises.",
    "process.step3.title": "Receive your model",
    "process.step3.desc": "Standard residential models arrive in 24–48 hours. Larger multi-storey or commercial projects get their own timeline in the quote.",

    "pricing.eyebrow": "Transparent Fixed Pricing",
    "pricing.heading": "Fixed prices, no hourly surprises.",
    "pricing.subheading": "Every project gets a fixed quote before work starts. These ranges are for standard drawings in clear condition.",
    "pricing.tier1.tag": "Small Residential",
    "pricing.tier1.title": "Single project, small residential",
    "pricing.tier1.best": "Best for single-family homes and small units",
    "pricing.tier1.price": "49–99",
    "pricing.tier1.unit": "/ unit",
    "pricing.tier1.time": "24–48 hours turnaround",
    "pricing.btn": "Start with a Free Pilot",
    "pricing.popular": "Most Requested",
    "pricing.tier2.tag": "Multi-Storey",
    "pricing.tier2.title": "Multi-storey residential & commercial",
    "pricing.tier2.best": "Best for apartment buildings and larger complexes",
    "pricing.tier2.price": "100–299",
    "pricing.tier2.unit": "/ building",
    "pricing.tier2.time": "Quoted within hours (3–5 days)",
    "pricing.tier3.tag": "Retainer",
    "pricing.tier3.title": "Studio retainer",
    "pricing.tier3.best": "Best for consultancies with steady volume",
    "pricing.tier3.currency": "From €",
    "pricing.tier3.price": "1,500",
    "pricing.tier3.unit": "/ month",
    "pricing.tier3.time": "Reserved monthly capacity",

    "pilot.eyebrow": "Zero-Risk Starting Point",
    "pilot.heading": "Try us on one drawing, free.",
    "pilot.lead": "Send one room, one floor plan or one scanned PDF (up to 50 m²). We model it at no cost, so you can judge our accuracy and speed before you commit. No card, no contract.",
    "pilot.submitBtn": "Send Pilot Request",
    "pilot.promise": "We reply within one working day. NDA on request."
  },

  de: {
    "nav.services": "Leistungen",
    "nav.process": "Ablauf",
    "nav.projects": "Projekte",
    "nav.pricing": "Preise",
    "nav.about": "Über uns",
    "nav.pilot": "Kostenloser Testlauf",

    "hero.eyebrow": "Bauingenieur-geführtes BIM-Studio · Berlin & DACH",
    "hero.title": "Audit-Bereite BIM-Modelle für Energieberatung & Effizienz",
    "hero.subtitle": "Bei der energetischen Gebäudeanalyse ist präzise Geometrie unverzichtbar. Wir liefern audit-bereite ArchiCAD-, Revit- und IFC4-Modelle mit exakten Raumvolumen, thermischen Hüllflächen und Bauteilschichten in 24–48 Stunden.",
    "hero.btnPilot": "Kostenlosen Testlauf starten",
    "hero.btnProjects": "Projekte ansehen",
    "hero.trust1": "✓ Bauingenieur-geführte QA",
    "hero.trust2": "✓ Direkter Export für thermische Simulation",
    "hero.trust3": "✓ NDA auf Wunsch",

    "trustbar.speed.label": "Geschwindigkeit",
    "trustbar.speed.val": "24–48 Std. Turnaround für Wohngebäude",
    "trustbar.detail.label": "Detaillierungsgrad",
    "trustbar.detail.val": "LOD 200–300 Modelle",
    "trustbar.formats.label": "Formate",
    "trustbar.formats.val": "ArchiCAD · Revit · IFC 4.3 · DWG",
    "trustbar.exp.label": "Erfahrung",
    "trustbar.exp.val": "150+ Modelle für deutsche Energieaudits",

    "problem.eyebrow": "Warum Energieberater die Modellierung auslagern",
    "problem.heading": "Ein Energieaudit ist nur so verlässlich wie das darunterliegende Modell.",
    "problem.body": "Energieberater und Ingenieurbüros erhalten Bestandspläne meist als PDF, DWG oder Scan. Bevor gerechnet werden kann, muss ein exaktes 3D-Modell mit Schichtaufbauten, Höhen und Raumvolumen erstellt werden. Lokales Personal ist teuer, und generische CAD-Dienstleister liefern oft fehlerhafte Geometrien. Ribhus ist ein spezialisiertes Bauingenieur-Studio, das ausschließlich diese Aufgabe auf höchstem Niveau löst.",
    "problem.card1.title": "Kapazität nach Bedarf",
    "problem.card1.desc": "Wir fangen Arbeitsspitzen ohne Personaleinstellung oder Schulungsaufwand flexibel ab.",
    "problem.card2.title": "Vorab durch Bauingenieure geprüft",
    "problem.card2.desc": "Jedes Modell durchläuft 5-stufige Maß- und Normenprüfungen vor dem Export.",
    "problem.card3.title": "Feste Pauschalpreise",
    "problem.card3.desc": "Verbindliche Pauschalpreise pro Projekt anstelle unvorhersehbarer Stundensätze.",

    "services.eyebrow": "Was wir modellieren",
    "services.heading": "Spezialisierte BIM-Konvertierungsdienste",
    "services.subheading": "Präzise parametrische Modelle, entwickelt für deutsche und europäische Gebäudeenergieberater, Architekten und Fachplaner.",
    "services.card1.badge": "LOD 200–300",
    "services.card1.title": "2D-zu-3D BIM-Konvertierung",
    "services.card1.desc": "PDFs, DWG-Dateien oder Papierscans werden in ArchiCAD- oder Revit-Modelle mit exakten Wandaufbauten ohne Maßabweichungen überführt.",
    "services.card1.feat1": "Monolithische & mehrschichtige Wandaufbauten",
    "services.card1.feat2": "Geschossweise vertikale Koordinierung",
    "services.card1.feat3": "Exakte Fenster- und Türlisten",

    "services.card2.badge": "Thermische Simulation",
    "services.card2.title": "Audit-Bereite Modelle (IFC 4.3)",
    "services.card2.desc": "Speziell für thermische Simulationsprogramme vorbereitet: Geschlossene Hüllflächen, exakte Raumvolumen und thermische Zonen.",
    "services.card2.feat1": "Räumlich definierte thermische Raumgrenzen",
    "services.card2.feat2": "Fensterflächenanteil & Solarertragsdaten",
    "services.card2.feat3": "Direktimport in SAP, PHPP & Hottgenroth",

    "services.card3.badge": "LiDAR & Punktwolke",
    "services.card3.title": "Scan-to-BIM & Bestandspläne",
    "services.card3.desc": "Historische Bauakten, Papierpläne oder 3D-Laserscans werden als präzise digitale Zwillinge für Sanierung und GEG-Nachweis rekonstruiert.",
    "services.card3.feat1": "Punktwolken-Dezimierung & Vektorisierung",
    "services.card3.feat2": "Geometrische Bestandsverifikation (±2mm)",
    "services.card3.feat3": "Sanierungsbasis für Denkmalschutz & GEG",

    "services.card4.badge": "Massen & Visualisierung",
    "services.card4.title": "CAD-Zeichnungen, Massen & Visuals",
    "services.card4.desc": "CAD-Plandokumentation, Grundrissüberarbeitung, Massenermittlung nach DIN 277 und interaktive BIMx-Präsentationsmodelle.",
    "services.card4.feat1": "Automatisierte Massenermittlung nach DIN 277",
    "services.card4.feat2": "Ausführungsreife Grundrisse, Schnitte & Ansichten",
    "services.card4.feat3": "Interaktive BIMx 3D-Modellbegehungen",

    "services.boundary": "Klare Schnittstelle: Wir bauen das koordinierte 3D-BIM-Modell. Die energetische Berechnung und das offizielle Zertifikat bleiben vollständig bei Ihrem Büro.",

    "process.eyebrow": "Transparenter Ablauf",
    "process.heading": "In drei Schritten vom Plan zum BIM-Modell.",
    "process.step1.title": "1. Pläne senden",
    "process.step1.desc": "Laden Sie PDFs, DWGs oder Scans hoch. Alle Projektdaten unterliegen auf Wunsch strenger Geheimhaltung (NDA).",
    "process.step2.title": "2. Festpreis erhalten",
    "process.step2.desc": "Innerhalb weniger Stunden erhalten Sie ein verbindliches Festpreisangebot nach BGF und Detailgrad. Keine versteckten Stundensätze.",
    "process.step3.title": "3. Modell in 24–48h erhalten",
    "process.step3.desc": "Wohngebäude-Modelle liefern wir in 24–48 Stunden als native ArchiCAD-, Revit- und IFC 4.3-Dateien.",

    "pricing.eyebrow": "Transparente Festpreise",
    "pricing.heading": "Feste Pauschalpreise ohne Stundensurprises.",
    "pricing.subheading": "Jedes Projekt erhält vor Beginn ein verbindliches Angebot. Diese Richtwerte gelten für Standardpläne.",
    "pricing.tier1.tag": "Einfamilienhaus",
    "pricing.tier1.title": "Einzelprojekt Einfamilienhaus & Wohnungen",
    "pricing.tier1.best": "Ideal für Einfamilienhäuser und kleine Einheiten",
    "pricing.tier1.price": "49–99",
    "pricing.tier1.unit": "/ Einheit",
    "pricing.tier1.time": "24–48 Stunden Turnaround",
    "pricing.btn": "Kostenlosen Testlauf starten",
    "pricing.popular": "Meistgefragt",
    "pricing.tier2.tag": "Mehrfamilienhaus",
    "pricing.tier2.title": "Mehrfamilienhäuser & Gewerbe",
    "pricing.tier2.best": "Ideal für Mehrfamilienhäuser und größere Komplexe",
    "pricing.tier2.price": "100–299",
    "pricing.tier2.unit": "/ Gebäude",
    "pricing.tier2.time": "Angebot in wenigen Stunden (3–5 Tage)",
    "pricing.tier3.tag": "Retainer",
    "pricing.tier3.title": "Studio-Retainer",
    "pricing.tier3.best": "Für Büros mit kontinuierlichem Monatsbedarf",
    "pricing.tier3.currency": "Ab €",
    "pricing.tier3.price": "1.500",
    "pricing.tier3.unit": "/ Monat",
    "pricing.tier3.time": "Reservierte monatliche Kapazität",

    "pilot.eyebrow": "Risikofreier Einstieg",
    "pilot.heading": "Testen Sie uns an einem Plan — völlig kostenlos.",
    "pilot.lead": "Senden Sie uns einen Grundriss oder Scan (bis zu 50 m² BGF). Wir modellieren ihn kostenlos, damit Sie unsere Präzision und Geschwindigkeit unverbindlich testen können. Ohne Vertrag, ohne Kreditkarte.",
    "pilot.submitBtn": "Kostenlosen Testlauf anfragen",
    "pilot.promise": "Antwort innerhalb von 24 Stunden. NDA auf Wunsch."
  }
};

function setLanguage(lang) {
  if (!i18nDict[lang]) lang = 'en';

  const dict = i18nDict[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem('ribhus_lang', lang);
}

function initLanguage() {
  let lang = localStorage.getItem('ribhus_lang');

  if (!lang) {
    // 1. Detect from browser language
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    const isGerman = browserLang.startsWith('de');

    // 2. Detect from timezone (Germany, Austria, Switzerland)
    let isGermanTZ = false;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Berlin') || tz.includes('Vienna') || tz.includes('Zurich') || tz.includes('Busingen')) {
        isGermanTZ = true;
      }
    } catch (e) {}

    lang = (isGerman || isGermanTZ) ? 'de' : 'en';
  }

  setLanguage(lang);

  // Bind click listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      setLanguage(targetLang);
    });
  });
}

// Hook into DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
});
