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
    title: "12-Storey Residential Building (Thermal Simulation IFC4)",
    tag: "Thermal Simulation · 11,073 m²",
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
    title: "Modern High-Efficiency Villa — Energy Envelope BIM",
    tag: "Residential Energy BIM",
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
    subtitle: "Delivered 17 detailed 2D AutoCAD (DWG) sheets of gusset plate and girder bolted connections in 8 days for a consulting engineering firm.",
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
    const softVal = form.querySelector('select[name="software"]')?.value || '';
    const filesVal = form.querySelector('input[name="source_files"]')?.value || '';
    const detailsVal = form.querySelector('textarea[name="details"]')?.value || '';

    const subject = encodeURIComponent(`BIM Pilot Request: ${nameVal} - ${typeVal} (${softVal})`);
    const body = encodeURIComponent(
      `Name: ${nameVal}\nEmail: ${emailVal}\nCompany: ${compVal}\nProject Type: ${typeVal}\nTarget Software: ${softVal}\nPlans / Cloud Link: ${filesVal}\n\nProject Details:\n${detailsVal}`
    );
    window.location.href = `mailto:contact@theribhus.com?subject=${subject}&body=${body}`;
    btn.textContent = 'Opening Mail Client...';
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
    }, 2500);
  }
}

function handleFileInputChange(input) {
  const display = document.getElementById('selectedFileName');
  if (display && input.files && input.files[0]) {
    display.textContent = '✓ ' + input.files[0].name + ' (' + (input.files[0].size / 1024 / 1024).toFixed(2) + ' MB)';
    display.style.display = 'block';
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
    "nav.samples": "Sample IFC",
    "nav.pilot": "Free Pilot",

    "hero.eyebrow": "Civil Engineer-Led BIM Modeling · Germany & DACH",
    "hero.title": "3D CAD & IFC Building Models for Energy Consultants – From €49",
    "hero.subtitle": "Save up to 70% drafting time on iSFP & GEG energy certificates. We convert your 2D plans, PDFs, and sketches into clean, audit-ready IFC4 and CAD models for Hottgenroth, Solar-Computer, and ZUB Helena — delivered reliably in 24–48 hours.",
    "hero.btnPilot": "Start Free Pilot (1 Room / Plan Free)",
    "hero.btnSample": "Download Sample IFC File",
    "hero.trust1": "100% Import Accuracy Guarantee (Money-back if import fails)",
    "hero.trust2": "DIN V 18599 & GEG-Compliant Geometry",
    "hero.trust3": "24–48 Hour Express Delivery",
    "hero.trust4": "NDA / Confidentiality on Request",

    "software.lead": "100% Compatibility Guaranteed",
    "software.caption": "Seamless IFC interfaces for all leading German energy consulting software solutions.",

    "trustbar.speed.label": "Turnaround",
    "trustbar.speed.val": "24–48 h express on standard residential",
    "trustbar.detail.label": "Precision",
    "trustbar.detail.val": "LOD 200–300 & DIN 277 compliance",
    "trustbar.formats.label": "Interfaces",
    "trustbar.formats.val": "Hottgenroth · Solar-Computer · IFC 4.3",
    "trustbar.exp.label": "Experience",
    "trustbar.exp.val": "Engineering expertise gained across 150+ modeled buildings for German energy audits and iSFP projects according to DIN V 18599.",

    "samples.eyebrow": "Practical Test & Verification",
    "samples.heading": "See for Yourself: Download Test IFC Files",
    "samples.subheading": "Download our sample files and import them directly into your software to verify IFC structure and geometry in advance.",
    "samples.card1.title": "Sample Single-Family Home (Built 1978)",
    "samples.card1.desc": "Fully closed thermal building envelope with roof slopes, dormers, and precise window/door openings for iSFP and GEG compliance.",
    "samples.card1.btn": "Download IFC Sample File (375 KB)",
    "samples.card2.title": "Sample Multi-Family Building (8 Units)",
    "samples.card2.desc": "Complete 3D BIM model with all interior partitions, slabs, DIN 277 room stamps and zones for room heating load calculations.",
    "samples.card2.btn": "Download IFC Sample File (773 KB)",
    "samples.note": "Compatible with Hottgenroth Energieberater 18599, Solar-Computer GBIS, ZUB Helena, ArchiCAD, Revit and Solibri.",

    "problem.eyebrow": "Why Energy Consultancies Outsource Modeling",
    "problem.heading": "An energy audit is only as good as the model under it.",
    "problem.body": "Auditors and consultants receive plans as PDFs, DWGs or scans. Before any calculation can start, someone has to rebuild them as a model with correct wall thicknesses, floor heights, openings and room volumes. Hiring locally is slow and costly, and generic CAD outsourcing often returns models that fail your own checks. Ribhus is a specialized civil engineering studio that does only this one job, and does it to a standard you can build on.",
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
    "services.card2.feat3": "Direct import into Hottgenroth, Solar-Computer & ZUB",

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
    "pricing.heading": "Transparent Fixed Prices – Faster & Up to 40% Below Market Average.",
    "pricing.subheading": "Every project receives a binding fixed quote before kickoff. Zero hourly surprises, backed by our 100% Import Accuracy Guarantee.",
    "pricing.prefix": "from ",
    "pricing.tier1.tag": "Package 1: Thermal Envelope",
    "pricing.tier1.title": "Thermal Building Envelope",
    "pricing.tier1.best": "iSFP, Energy Certificates & GEG Audits",
    "pricing.tier1.unit": "/ building",
    "pricing.tier1.time": "24–48 hours turnaround",
    "pricing.tier1.vs": "Market Price: ~€79 · 38% Savings",
    "pricing.tier1.btn": "Request Envelope Model",
    "pricing.tier1.f1": "Complete thermal building envelope",
    "pricing.tier1.f2": "Roof slopes, dormers & connections",
    "pricing.tier1.f3": "Precise window & door opening areas",
    "pricing.tier1.f4": "IFC 4.3 for Hottgenroth & Solar-Computer",

    "pricing.popular": "Most Popular / Full BIM",
    "pricing.tier2.tag": "Package 2: Full BIM Model",
    "pricing.tier2.title": "Complete 3D BIM Model",
    "pricing.tier2.best": "Comprehensive Retrofit & Heating Load",
    "pricing.tier2.unit": "/ building",
    "pricing.tier2.time": "48–72 hours turnaround",
    "pricing.tier2.vs": "Market Price: ~€169 · 24% Savings",
    "pricing.tier2.btn": "Order Full BIM Model",
    "pricing.tier2.f1": "Everything in Package 1 (Thermal Envelope)",
    "pricing.tier2.f2": "All interior partitions, slabs & stairs",
    "pricing.tier2.f3": "Room stamps & DIN 277 net floor areas",
    "pricing.tier2.f4": "Native ArchiCAD (.pln) / Revit (.rvt) file",

    "pricing.tier3.tag": "Package 3: Dedicated Retainer",
    "pricing.tier3.title": "Monthly Dedicated Retainer",
    "pricing.tier3.best": "Offices with 10+ projects / month",
    "pricing.tier3.currency": "From €",
    "pricing.tier3.unit": "/ month",
    "pricing.tier3.time": "Reserved monthly capacity (<24h)",
    "pricing.tier3.btn": "Discuss Retainer Plan",
    "pricing.tier3.f1": "Dedicated personal modeler (Civil Engineer)",
    "pricing.tier3.f2": "Priority turnaround (<24h express)",
    "pricing.tier3.f3": "Unlimited model revisions",
    "pricing.tier3.f4": "Consolidated monthly invoicing",

    "guarantee.tag": "Zero-Risk Assurance",
    "guarantee.title": "🛡️ Our 100% Import Accuracy Guarantee",
    "guarantee.subtitle": "If your model doesn't import error-free, you don't pay a single cent.",
    "guarantee.body1": "We understand: A CAD model is only useful if envelope surfaces and room geometry align perfectly in your software (Hottgenroth, Solar-Computer, etc.) right from the start.",
    "guarantee.body2": "If any model we deliver exhibits geometric or layer issues upon import, we fix it within 12 hours free of charge. If the model still cannot be used for your calculations, you receive a 100% refund of the invoice amount.",

    "about.eyebrow": "About Ribhus",
    "about.heading": "Dependable BIM & Digital Building Support",
    "about.p1": "Founded in 2026 by Ankit Kumar and Madhav Bhati, civil engineering graduates from Delhi Technological University (DTU), Ribhus is a BIM and digital building support venture working with architecture firms, engineering consultancies and building professionals.",
    "about.p2": "We help transform architectural drawings, scanned documents and existing building information into accurate, structured and coordinated digital models. Our work focuses on architectural BIM modelling, 2D-to-3D conversion, scan-to-BIM workflows and IFC-based deliverables.",
    "about.p3": "With practical experience across international BIM workflows, we understand that a reliable model is more than just a 3D representation. It needs to reflect the actual building geometry, wall assemblies, room dimensions and spatial information required for downstream design, coordination and building-performance assessments.",
    "about.p4": "At Ribhus, we aim to make dependable BIM support more accessible, flexible and efficient for firms that need additional modelling capacity without expanding their in-house teams.",
    "about.founder1.name": "Ankit Kumar",
    "about.founder1.role": "Co-Founder · Civil Engineer (B.Tech, DTU)",
    "about.founder1.desc": "Architectural BIM modeling, 2D-to-3D conversion pipelines, ArchiCAD & Revit production, and certified IFC exports for European energy audit workflows.",
    "about.founder1.quote": "A reliable model is more than geometry — it is the bedrock of simulation and engineering validation.",
    "about.founder2.name": "Madhav Bhati",
    "about.founder2.role": "Co-Founder · Civil Engineer (B.Tech, DTU)",
    "about.founder2.desc": "Structural modeling coordination, dimensional quality control, scan-to-BIM reconstruction, and compliance checking for international client deliveries.",
    "about.founder2.quote": "Precision in building geometry eliminates expensive rework down the line.",
    "about.cta": "Talk to Our Founders",

    "pilot.eyebrow": "Zero-Risk Starting Point",
    "pilot.heading": "Try us on one drawing, free.",
    "pilot.lead": "Send one room, one floor plan or one scanned PDF (up to 50 m²). We model it at no cost, so you can judge our accuracy and speed before you commit. No card, no contract.",
    "pilot.submitBtn": "Send Pilot Request",
    "pilot.promise": "We reply within one working day. NDA / Confidentiality on request."
  },

  de: {
    "nav.services": "Dienste",
    "nav.process": "Ablauf",
    "nav.projects": "Projekte",
    "nav.pricing": "Preise",
    "nav.about": "Über uns",
    "nav.samples": "Test-IFC",
    "nav.pilot": "Kostenloser Testlauf",

    "hero.eyebrow": "Bauingenieur-geführte BIM-Modellierung · Deutschland & DACH",
    "hero.title": "3D-CAD- & IFC-Gebäudemodelle für Energieberater – ab 49 €",
    "hero.subtitle": "Sparen Sie bis zu 70 % Zeichenzeit bei iSFP- und GEG-Nachweisen. Wir wandeln Ihre 2D-Bestandspläne, PDFs und Skizzen in saubere, audit-bereite IFC4- und CAD-Modelle für Hottgenroth, Solar-Computer und ZUB Helena – verlässlich in 24–48 Stunden.",
    "hero.btnPilot": "Kostenlosen Testlauf starten (1 Raum / Plan gratis)",
    "hero.btnSample": "Test-IFC-Datei herunterladen",
    "hero.trust1": "100% Passgenauigkeits-Garantie (Geld-zurück bei Importfehlern)",
    "hero.trust2": "DIN V 18599 & GEG-konforme Geometrie",
    "hero.trust3": "24–48 Stunden Express-Lieferung",
    "hero.trust4": "NDA / Vertraulichkeit auf Wunsch",

    "software.lead": "100% Kompatibilität garantiert",
    "software.caption": "Nahtlose IFC-Schnittstellen für alle führenden deutschen Energieberater-Softwarelösungen.",

    "trustbar.speed.label": "Lieferzeit",
    "trustbar.speed.val": "24–48 Std. Express für Wohngebäude",
    "trustbar.detail.label": "Präzision",
    "trustbar.detail.val": "LOD 200–300 & DIN 277 Konformität",
    "trustbar.formats.label": "Schnittstellen",
    "trustbar.formats.val": "Hottgenroth · Solar-Computer · IFC 4.3",
    "trustbar.exp.label": "Erfahrung",
    "trustbar.exp.val": "Bauingenieur-Kompetenz aus über 150+ modellierten Gebäuden für deutsche Energieberatungen und iSFP-Projekte nach DIN V 18599.",

    "samples.eyebrow": "Praxistest & Verifikation",
    "samples.heading": "Überzeugen Sie sich selbst: Testdateien herunterladen",
    "samples.subheading": "Laden Sie unsere Beispieldateien herunter und importieren Sie sie direkt in Ihr System, um die IFC-Struktur und Geometrie vorab zu prüfen.",
    "samples.card1.title": "Muster-Einfamilienhaus (Bestand 1978)",
    "samples.card1.desc": "Vollständig geschlossene thermische Gebäudehülle mit Dachschrägen, Gauben und maßgenauen Fenstern/Türen für iSFP und GEG-Nachweise.",
    "samples.card1.btn": "Download IFC-Musterdatei (375 KB)",
    "samples.card2.title": "Muster-Mehrfamilienhaus (8 Wohneinheiten)",
    "samples.card2.desc": "Vollständiges 3D-BIM-Gebäudemodell mit allen Innenwänden, Geschossdecken, DIN 277 Raumstempeln und Zonen für Raumheizlastberechnungen.",
    "samples.card2.btn": "Download IFC-Musterdatei (773 KB)",
    "samples.note": "Kompatibel mit Hottgenroth Energieberater 18599, Solar-Computer GBIS, ZUB Helena, ArchiCAD, Revit und Solibri.",

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
    "services.card2.feat3": "Direktimport in Hottgenroth, Solar-Computer & ZUB",

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
    "pricing.heading": "Festpreise im Marktvergleich – Schneller & Bis zu 40% günstiger als der Durchschnitt.",
    "pricing.subheading": "Verbindliche Festpreisangebote vor Beginn. Keine Stundensurprises, 100% Passgenauigkeits-Garantie.",
    "pricing.prefix": "ab ",
    "pricing.tier1.tag": "Paket 1: Thermische Hülle",
    "pricing.tier1.title": "Thermische Gebäudehülle",
    "pricing.tier1.best": "iSFP, Energieausweise & GEG-Nachweise",
    "pricing.tier1.unit": "/ Gebäude",
    "pricing.tier1.time": "24–48 Stunden Turnaround",
    "pricing.tier1.vs": "Marktpreis: ~79 € · 38% Ersparnis",
    "pricing.tier1.btn": "Jetzt Hüllfläche anfragen",
    "pricing.tier1.f1": "Vollständige thermische Gebäudehülle",
    "pricing.tier1.f2": "Dachneigung, Gauben & Wandanschlüsse",
    "pricing.tier1.f3": "Exakte Fenster- & Türöffnungsflächen",
    "pricing.tier1.f4": "IFC 4.3 für Hottgenroth & Solar-Computer",

    "pricing.popular": "Meistgefragt / Full BIM",
    "pricing.tier2.tag": "Paket 2: Vollmodell",
    "pricing.tier2.title": "Vollständiges 3D-BIM-Modell",
    "pricing.tier2.best": "Umfassende Sanierung & Raumheizlast",
    "pricing.tier2.unit": "/ Gebäude",
    "pricing.tier2.time": "48–72 Stunden Turnaround",
    "pricing.tier2.vs": "Marktpreis: ~169 € · 24% Ersparnis",
    "pricing.tier2.btn": "Vollmodell beauftragen",
    "pricing.tier2.f1": "Alles aus Paket 1 (Thermische Hülle)",
    "pricing.tier2.f2": "Alle Innenwände, Decken & Treppen",
    "pricing.tier2.f3": "Raumstempel & DIN 277 Netto-Raumflächen",
    "pricing.tier2.f4": "Native ArchiCAD (.pln) / Revit (.rvt) Datei",

    "pricing.tier3.tag": "Paket 3: Retainer",
    "pricing.tier3.title": "Monats-Retainer (Dedicated)",
    "pricing.tier3.best": "Büros mit 10+ Projekten / Monat",
    "pricing.tier3.currency": "Ab €",
    "pricing.tier3.unit": "/ Monat",
    "pricing.tier3.time": "Feste Kapazität / Express (<24 Std.)",
    "pricing.tier3.btn": "Retainer besprechen",
    "pricing.tier3.f1": "Fester persönlicher Modellierer (Bauingenieur)",
    "pricing.tier3.f2": "Prioritäre Bearbeitung (<24 Std. Express)",
    "pricing.tier3.f3": "Unbegrenzte Modell-Revisionen",
    "pricing.tier3.f4": "Monatliche Sammelrechnung mit Zahlungsziel",

    "guarantee.tag": "Risikofrei testen",
    "guarantee.title": "🛡️ Unsere 100% Passgenauigkeits-Garantie",
    "guarantee.subtitle": "Importiert Ihr Modell nicht fehlerfrei, zahlen Sie keinen Cent.",
    "guarantee.body1": "Wir wissen: Ein CAD-Modell nützt Ihnen nur, wenn die Hüllflächen und Raumgeometrien in Ihrer Software (Hottgenroth, Solar-Computer etc.) sofort stimmen.",
    "guarantee.body2": "Sollte ein von uns geliefertes Modell beim Import Geometrie- oder Schichtenfehler aufweisen, beheben wir das Problem innerhalb von 12 Stunden kostenfrei. Kann das Modell dennoch nicht für Ihre Berechnung genutzt werden, erhalten Sie 100 % des Rechnungsbetrags erstattet.",

    "about.eyebrow": "Studio-Führung",
    "about.heading": "Verlässlicher BIM- & Digital-Building-Support",
    "about.p1": "Gegründet im Jahr 2026 von Ankit Kumar und Madhav Bhati, Bauingenieuren der Delhi Technological University (DTU), ist Ribhus ein spezialisiertes BIM- und Digital-Building-Support-Studio für Architekturbüros, Ingenieurberatungen und Baufachleute.",
    "about.p2": "Wir transformieren Architekturpläne, Bestandsunterlagen und historische Dokumente in präzise, strukturierte und koordinierte digitale Modelle. Unsere Schwerpunkte liegen auf 3D-BIM-Modellierung, 2D-zu-3D-Konvertierung, Scan-to-BIM-Workflows und IFC-basierten Deliverables.",
    "about.p3": "Mit fundierter praktischer Erfahrung in internationalen BIM-Workflows wissen wir: Ein verlässliches Modell ist mehr als reine 3D-Geometrie. Es muss die tatsächlichen Wandaufbauten, Raumgeometrien und thermischen Grenzen abbilden, die für nachgelagerte Planung, Kollisionsprüfung und energetische Berechnungen unerlässlich sind.",
    "about.p4": "Unser Ziel bei Ribhus: Verlässlichen BIM-Support zugänglicher, flexibler und effizienter zu machen für Büros, die zusätzliche Modellierungskapazitäten ohne feste Inhouse-Personalaufstockung benötigen.",
    "about.founder1.name": "Ankit Kumar",
    "about.founder1.role": "Mitgründer · Bauingenieur (B.Tech, DTU)",
    "about.founder1.desc": "Architektur-BIM-Modellierung, 2D-zu-3D-Konvertierungspipelines, ArchiCAD- & Revit-Produktion sowie zertifizierte IFC-Exporte für europäische Planungs- und Energieaudit-Prozesse.",
    "about.founder1.quote": "Ein verlässliches Modell ist mehr als Geometrie — es ist das verlässliche Datenfundament für Simulation und Ausführung.",
    "about.founder2.name": "Madhav Bhati",
    "about.founder2.role": "Mitgründer · Bauingenieur (B.Tech, DTU)",
    "about.founder2.desc": "Tragwerkskoordination, maßliche Qualitätskontrolle, Scan-to-BIM-Rekonstruktion und Normenprüfung für internationale Kundenprojekte.",
    "about.founder2.quote": "Präzision in der Baugeometrie verhindert teure Nacharbeiten auf der Baustelle und in der Berechnung.",
    "about.cta": "Mit den Gründern sprechen",

    "pilot.eyebrow": "Risikofreier Start",
    "pilot.heading": "Kostenlosen Testlauf starten (1 Raum / Plan gratis)",
    "pilot.lead": "Senden Sie uns einen Raum, einen Grundriss oder einen Scan (bis 50 m²). Wir modellieren ihn kostenlos, damit Sie Passgenauigkeit und Geschwindigkeit direkt in Ihrer Software prüfen können.",
    "pilot.submitBtn": "Testlauf anfragen / Projekt einreichen",
    "pilot.promise": "Antwort innerhalb weniger Stunden. NDA / Vertraulichkeit auf Wunsch."
  }
};

/* ═══════════════════════════════════════════════
   GLOBAL COUNTRY, CURRENCY & LANGUAGE ENGINE (WHOLE WORLD)
═══════════════════════════════════════════════ */

// 1. Dynamic Unicode Flag generator for ANY 2-letter ISO Country Code in the world
function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  try {
    return countryCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
  } catch (e) {
    return '🌐';
  }
}

// 2. Comprehensive Currency Rates & Formats
const currencyRates = {
  EUR: { symbol: '€', rate: 1.0, prefix: true },
  USD: { symbol: '$', rate: 1.08, prefix: true },
  GBP: { symbol: '£', rate: 0.85, prefix: true },
  CHF: { symbol: 'CHF ', rate: 0.96, prefix: true },
  CAD: { symbol: 'CA$', rate: 1.48, prefix: true },
  AUD: { symbol: 'A$', rate: 1.66, prefix: true },
  NZD: { symbol: 'NZ$', rate: 1.82, prefix: true },
  AED: { symbol: 'AED ', rate: 3.97, prefix: true },
  SAR: { symbol: 'SAR ', rate: 4.05, prefix: true },
  QAR: { symbol: 'QAR ', rate: 3.93, prefix: true },
  KWD: { symbol: 'KWD ', rate: 0.33, prefix: true },
  BHD: { symbol: 'BHD ', rate: 0.41, prefix: true },
  OMR: { symbol: 'OMR ', rate: 0.42, prefix: true },
  SGD: { symbol: 'S$', rate: 1.45, prefix: true },
  INR: { symbol: '₹', rate: 90.0, prefix: true },
  JPY: { symbol: '¥', rate: 165.0, prefix: true },
  KRW: { symbol: '₩', rate: 1480.0, prefix: true },
  HKD: { symbol: 'HK$', rate: 8.45, prefix: true },
  MYR: { symbol: 'RM ', rate: 4.80, prefix: true },
  SEK: { symbol: 'kr ', rate: 11.5, prefix: true },
  NOK: { symbol: 'kr ', rate: 11.8, prefix: true },
  DKK: { symbol: 'kr ', rate: 7.46, prefix: true },
  PLN: { symbol: 'zł ', rate: 4.30, prefix: true },
  CZK: { symbol: 'Kč ', rate: 25.2, prefix: true },
  ZAR: { symbol: 'R ', rate: 19.5, prefix: true },
  BRL: { symbol: 'R$ ', rate: 6.20, prefix: true },
  MXN: { symbol: 'Mex$ ', rate: 21.8, prefix: true }
};

// 3. Predefined Global Countries
const worldCountries = {
  DE: { name: 'Germany', currency: 'EUR', lang: 'de' },
  AT: { name: 'Austria', currency: 'EUR', lang: 'de' },
  CH: { name: 'Switzerland', currency: 'CHF', lang: 'de' },
  GB: { name: 'United Kingdom', currency: 'GBP', lang: 'en' },
  US: { name: 'United States', currency: 'USD', lang: 'en' },
  CA: { name: 'Canada', currency: 'CAD', lang: 'en' },
  AU: { name: 'Australia', currency: 'AUD', lang: 'en' },
  NZ: { name: 'New Zealand', currency: 'NZD', lang: 'en' },
  FR: { name: 'France', currency: 'EUR', lang: 'en' },
  NL: { name: 'Netherlands', currency: 'EUR', lang: 'en' },
  IT: { name: 'Italy', currency: 'EUR', lang: 'en' },
  ES: { name: 'Spain', currency: 'EUR', lang: 'en' },
  IE: { name: 'Ireland', currency: 'EUR', lang: 'en' },
  BE: { name: 'Belgium', currency: 'EUR', lang: 'en' },
  SE: { name: 'Sweden', currency: 'SEK', lang: 'en' },
  NO: { name: 'Norway', currency: 'NOK', lang: 'en' },
  DK: { name: 'Denmark', currency: 'DKK', lang: 'en' },
  FI: { name: 'Finland', currency: 'EUR', lang: 'en' },
  PL: { name: 'Poland', currency: 'PLN', lang: 'en' },
  PT: { name: 'Portugal', currency: 'EUR', lang: 'en' },
  CZ: { name: 'Czech Republic', currency: 'CZK', lang: 'en' },
  AE: { name: 'United Arab Emirates', currency: 'AED', lang: 'en' },
  SA: { name: 'Saudi Arabia', currency: 'SAR', lang: 'en' },
  QA: { name: 'Qatar', currency: 'QAR', lang: 'en' },
  KW: { name: 'Kuwait', currency: 'KWD', lang: 'en' },
  BH: { name: 'Bahrain', currency: 'BHD', lang: 'en' },
  OM: { name: 'Oman', currency: 'OMR', lang: 'en' },
  SG: { name: 'Singapore', currency: 'SGD', lang: 'en' },
  IN: { name: 'India', currency: 'INR', lang: 'en' },
  JP: { name: 'Japan', currency: 'JPY', lang: 'en' },
  KR: { name: 'South Korea', currency: 'KRW', lang: 'en' },
  HK: { name: 'Hong Kong', currency: 'HKD', lang: 'en' },
  MY: { name: 'Malaysia', currency: 'MYR', lang: 'en' },
  ZA: { name: 'South Africa', currency: 'ZAR', lang: 'en' },
  BR: { name: 'Brazil', currency: 'BRL', lang: 'en' },
  MX: { name: 'Mexico', currency: 'MXN', lang: 'en' },
  GLOBAL: { name: 'Global / Other', currency: 'USD', lang: 'en' }
};

let currentCountryCode = 'DE';
let currentLangCode = 'en';

// Helper to calculate realistic converted prices & synchronized market comparisons
function getPricesForCurrency(currencyCode, isGerman) {
  const curr = currencyRates[currencyCode] || currencyRates.EUR;
  const rate = curr.rate || 1.0;
  const sym = curr.symbol || '€';

  let t1, t2, t3, m1, m2;

  if (currencyCode === 'EUR') {
    t1 = '49';
    m1 = '79 €';
    t2 = '129';
    m2 = '169 €';
    t3 = isGerman ? '1.200' : '1,200';
  } else if (currencyCode === 'USD') {
    t1 = '55';
    m1 = '$85';
    t2 = '145';
    m2 = '$185';
    t3 = isGerman ? '1.350' : '1,350';
  } else if (currencyCode === 'GBP') {
    t1 = '42';
    m1 = '£67';
    t2 = '110';
    m2 = '£144';
    t3 = isGerman ? '1.050' : '1,050';
  } else if (currencyCode === 'CHF') {
    t1 = '48';
    m1 = 'CHF 76';
    t2 = '125';
    m2 = 'CHF 162';
    t3 = isGerman ? '1.180' : '1,180';
  } else if (currencyCode === 'INR') {
    t1 = '4,400';
    m1 = '₹7,100';
    t2 = '11,500';
    m2 = '₹15,200';
    t3 = '1,08,000';
  } else if (currencyCode === 'AED') {
    t1 = '200';
    m1 = 'AED 320';
    t2 = '530';
    m2 = 'AED 690';
    t3 = isGerman ? '4.900' : '4,900';
  } else if (currencyCode === 'CAD') {
    t1 = '75';
    m1 = 'CA$ 120';
    t2 = '198';
    m2 = 'CA$ 260';
    t3 = isGerman ? '1.850' : '1,850';
  } else if (currencyCode === 'AUD') {
    t1 = '82';
    m1 = 'A$ 130';
    t2 = '218';
    m2 = 'A$ 285';
    t3 = isGerman ? '2.050' : '2,050';
  } else {
    const calc = (base) => {
      let v = base * rate;
      if (rate >= 50) v = Math.round(v / 100) * 100;
      else if (rate >= 5) v = Math.round(v / 10) * 10;
      else v = Math.round(v);
      return isGerman ? v.toLocaleString('de-DE') : v.toLocaleString('en-US');
    };
    t1 = calc(49);
    m1 = sym + ' ' + calc(79);
    t2 = calc(129);
    m2 = sym + ' ' + calc(169);
    t3 = calc(1200);
  }

  const prefix = isGerman ? ('ab ') : ('from ');
  const vs1 = isGerman ? (`Marktpreis: ~${m1} · 38% Ersparnis`) : (`Market Price: ~${m1} · 38% Savings`);
  const vs2 = isGerman ? (`Marktpreis: ~${m2} · 24% Ersparnis`) : (`Market Price: ~${m2} · 24% Savings`);

  return { symbol: sym, tier1: t1, tier2: t2, tier3: t3, prefix: prefix, vs1: vs1, vs2: vs2 };
}

function updatePricingDisplay() {
  const isDe = currentLangCode === 'de';
  const cInfo = worldCountries[currentCountryCode] || { currency: 'EUR' };
  const p = getPricesForCurrency(cInfo.currency, isDe);

  // 1. Update currency symbols
  document.querySelectorAll('[data-currency-symbol]').forEach(el => {
    el.textContent = p.symbol;
  });

  // 2. Update tier 1 and tier 2 amounts
  const t1 = document.querySelector('[data-currency-amount=tier1]');
  if (t1) t1.textContent = p.tier1;

  const t2 = document.querySelector('[data-currency-amount=tier2]');
  if (t2) t2.textContent = p.tier2;

  // 3. Update tier 3 prefix and amount
  const t3Prefix = document.querySelector('[data-currency-prefix]');
  if (t3Prefix) t3Prefix.textContent = p.prefix;

  const t3 = document.querySelector('[data-currency-amount=tier3]');
  if (t3) t3.textContent = p.tier3;

  // 4. Update market comparison badges so top price & bottom market price ALWAYS share the exact same currency
  const vs1El = document.querySelector('[data-i18n="pricing.tier1.vs"]');
  if (vs1El) vs1El.textContent = p.vs1;

  const vs2El = document.querySelector('[data-i18n="pricing.tier2.vs"]');
  if (vs2El) vs2El.textContent = p.vs2;
}

function setCountry(countryCode, syncLanguage = true) {
  countryCode = (countryCode || 'DE').toUpperCase();
  currentCountryCode = countryCode;

  let country = worldCountries[countryCode];
  if (!country) {
    // Fallback: create dynamic entry for this international country
    country = {
      name: countryCode,
      currency: currencyRates[countryCode] ? countryCode : 'USD',
      lang: ['DE', 'AT', 'CH', 'LI', 'LU'].includes(countryCode) ? 'de' : 'en'
    };
    worldCountries[countryCode] = country;
  }

  const flag = getFlagEmoji(countryCode === 'GLOBAL' ? 'US' : countryCode);
  const currInfo = currencyRates[country.currency] || currencyRates.USD;

  // 1. Update trigger button in Navbar
  const flagEl = document.getElementById('currentCountryFlag');
  const nameEl = document.getElementById('currentCountryName');
  const currEl = document.getElementById('currentCountryCurrency');
  const langEl = document.getElementById('currentCountryLang');

  if (flagEl) flagEl.textContent = countryCode === 'GLOBAL' ? '🌐' : flag;
  if (nameEl) nameEl.textContent = country.name;
  if (currEl) currEl.textContent = currInfo.symbol.trim() + ' ' + country.currency;
  if (langEl) langEl.textContent = (country.lang || 'en').toUpperCase();

  // 2. Update active state in dropdown list
  document.querySelectorAll('.country-option').forEach(opt => {
    if (opt.getAttribute('data-country') === countryCode) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // 3. Update mobile select if present
  const mobileSel = document.getElementById('mobileCountrySelect');
  if (mobileSel) {
    mobileSel.value = countryCode;
  }

  // 4. Update pilot form hidden input
  const pilotCountry = document.getElementById('pilotCountryInput');
  if (pilotCountry) {
    pilotCountry.value = country.name + ' (' + countryCode + ')';
  }

  // 5. Update pricing table
  updatePricingDisplay();

  // 6. Save in localStorage
  localStorage.setItem('ribhus_country', countryCode);
  localStorage.setItem('ribhus_currency', country.currency);

  // 7. Sync language if requested
  if (syncLanguage) {
    setLanguage(country.lang, false);
  }
}

function setLanguage(lang, syncCurrency = false) {
  if (!i18nDict[lang]) lang = 'de';
  currentLangCode = lang;

  const dict = i18nDict[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'pricing.tier3.currency' || key === 'pricing.prefix') return;
    if (dict[key]) {
      if (dict[key].includes('<') && dict[key].includes('>')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  const langEl = document.getElementById('currentCountryLang');
  if (langEl) langEl.textContent = lang.toUpperCase();

  updatePricingDisplay();
}

function selectProjectType(val) {
  const sel = document.getElementById('pilotProjectType');
  if (sel) {
    sel.value = val;
  }
  const pilotSec = document.getElementById('pilot');
  if (pilotSec) {
    pilotSec.scrollIntoView({ behavior: 'smooth' });
  }
}

async function initCountryAndLanguage() {
  let savedCountry = localStorage.getItem('ribhus_country');
  const savedLang = localStorage.getItem('ribhus_lang');

  // Purge any legacy 'IN' (India) currency detection that caused the price to flip to INR
  if (savedCountry === 'IN') {
    savedCountry = 'DE';
    localStorage.setItem('ribhus_country', 'DE');
    localStorage.setItem('ribhus_currency', 'EUR');
  }

  if (savedCountry) {
    setCountry(savedCountry, !savedLang);
    if (savedLang) setLanguage(savedLang, false);
  } else {
    // Default country is ALWAYS Germany (DE / EUR / de)
    let detectedCountry = 'DE';

    let tz = '';
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {}

    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    // Only switch if explicitly an international DACH or specific partner timezone
    if (tz.includes('Zurich')) detectedCountry = 'CH';
    else if (tz.includes('Vienna')) detectedCountry = 'AT';
    else if (tz.includes('London') || browserLang === 'en-gb') detectedCountry = 'GB';
    else if (tz.includes('America') || tz.includes('New_York') || tz.includes('Chicago')) detectedCountry = 'US';
    else detectedCountry = 'DE'; // All other timezones (including India) default to Germany/EUR

    setCountry(detectedCountry, true);

    // Optional IP check: ONLY switch if explicitly one of target DACH sales markets
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.country_code) {
          const code = data.country_code.toUpperCase();
          if (['DE', 'AT', 'CH'].includes(code)) {
            if (!localStorage.getItem('ribhus_country')) {
              setCountry(code, !localStorage.getItem('ribhus_lang'));
            }
          }
        }
      }
    } catch (err) {
      // Fallback silently
    }
  }

  // Setup Country Dropdown Toggle & Click Handlers
  const countryWrap = document.getElementById('countrySelectorWrap');
  const countryBtn = document.getElementById('countryBtn');
  const searchInput = document.getElementById('countrySearchInput');

  if (countryBtn && countryWrap) {
    countryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      countryWrap.classList.toggle('open');
      const isOpen = countryWrap.classList.contains('open');
      countryBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen && searchInput) {
        setTimeout(() => searchInput.focus(), 50);
      }
    });

    // Real-time Country Search Filter
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.country-option').forEach(opt => {
          const searchData = (opt.getAttribute('data-search') || '').toLowerCase();
          const countryName = (opt.getAttribute('data-name') || '').toLowerCase();
          const countryCode = (opt.getAttribute('data-country') || '').toLowerCase();
          const currency = (opt.getAttribute('data-currency') || '').toLowerCase();

          if (!query || searchData.includes(query) || countryName.includes(query) || countryCode.includes(query) || currency.includes(query)) {
            opt.style.display = 'flex';
          } else {
            opt.style.display = 'none';
          }
        });
      });
      searchInput.addEventListener('click', (e) => e.stopPropagation());
    }

    // Country Option Click
    document.querySelectorAll('.country-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = opt.getAttribute('data-country');
        setCountry(code, true);
        countryWrap.classList.remove('open');
        countryBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!countryWrap.contains(e.target)) {
        countryWrap.classList.remove('open');
        countryBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        countryWrap.classList.remove('open');
        countryBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Setup Mobile Country Select
  const mobileCountry = document.getElementById('mobileCountrySelect');
  if (mobileCountry) {
    mobileCountry.addEventListener('change', (e) => {
      setCountry(e.target.value, true);
    });
  }

  // Re-run Lucide icon injection
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Hook into DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initCountryAndLanguage();
});