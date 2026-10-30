/* ═══════════════════════════════════════════════
   RIBHUS SCRIPT — Real architectural projects data,
   interactive modal lightbox, scroll animations, 
   carousel, and contact forms
═══════════════════════════════════════════════ */

/* ─── REAL ARCHITECTURAL PROJECTS DATA STORE ──── */
const projectsData = {
  celekhor: {
    title: "Celekohr GmbH — 150+ European Residential BIM Portfolio",
    tag: "German BIM Portfolio",
    subtitle: "Modelled 150+ residential and commercial architectural projects in ArchiCAD at LOD 200–300 in six months, building models used for energy audits across Germany.",
    service: "BIM Modeling & Energy Audits",
    timeline: "6 Months Retainer",
    tools: "ArchiCAD, IFC 4.3 Workflows, DIN Standards",
    standard: "LOD 200–300 (German GEG)",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/celekhor-german-bim.html",
    images: [
      "assets/3d_bim_portfolio.jpg",
      "assets/3d_project2.jpg",
      "assets/3d_project3.jpg",
      "assets/apartment_3d.jpg"
    ],
    bullets: [
      "Modelled 150+ residential and commercial architectural projects in ArchiCAD at LOD 200–300 in six months for German clients.",
      "Exported IFC 4.3 files for downstream energy-model extraction and ran 30+ monthly pre-checks for dimension errors and DIN deviations.",
      "Documented requirements, resolved complex roof/envelope junctions, and maintained strict BIM consistency across all European deliverables."
    ]
  },

  multistory: {
    title: "4-Floor Residential Building (G+3) — Multi-Story ArchiCAD Modeling",
    tag: "Multi-Storey Architecture",
    subtitle: "Multi-level residential building modeling featuring vertical circulation cores, structural grid alignments, and coordinated service shafts.",
    service: "Multi-Storey Architectural BIM",
    timeline: "4 Weeks Delivery",
    tools: "ArchiCAD, AutoCAD 2D, BIMx",
    standard: "LOD 300 Construction Coordination",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/multistory-residential-g3.html",
    images: [
      "assets/3d_project2.jpg",
      "assets/3d_p2_1.jpg",
      "assets/3d_p2_2.jpg",
      "assets/3d_p2_3.jpg"
    ],
    bullets: [
      "Structured a multi-story G+3 residential building model in ArchiCAD with vertical load-bearing and circulation consistency.",
      "Maintained exact alignment of staircases, lift wells, plumbing shafts, and service ducts across all 4 floors.",
      "Generated unified elevation sheets, cross-sectional views, and scheduled component quantities for construction review."
    ]
  },

  residential3bhk: {
    title: "3BHK Residential Planning & Technical BIM Documentation | 32 x 50 ft",
    tag: "BIM Documentation",
    subtitle: "Site-responsive architectural planning and technical BIM documentation for a 3BHK residential residence on a 32 x 50 ft plot compliant with bylaws.",
    service: "Architectural Planning & BIM",
    timeline: "3 Weeks Delivery",
    tools: "ArchiCAD, BIMx, Twinmotion",
    standard: "LOD 300 Municipal Bylaws Compliant",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/3bhk-residential-bim.html",
    images: [
      "assets/3d_project3.jpg",
      "assets/3d_p3_1.jpg",
      "assets/3d_p3_2.jpg",
      "assets/3d_p3_3.jpg",
      "assets/3d_p3_4.jpg"
    ],
    bullets: [
      "Site-responsive planning strictly separating public guest spaces, semi-private family zones, and private bedroom suites.",
      "Standardized room geometries, wall thicknesses, and setbacks compliant with local municipal building regulations.",
      "Constructed complete BIM documentation linking 2D floor plans, structural sections, and exterior elevation drawings in one integrated ArchiCAD file."
    ]
  },

  truss: {
    title: "Truss Bridge Renovation — Gusset Plates & Girder Connections | IS 800:2007",
    tag: "Structural Detailing",
    subtitle: "Delivered 17 detailed 2D AutoCAD (DWG) sheets of gusset plate and girder bolted connections in 8 days for a consulting firm in Rajasthan.",
    service: "Structural Steel Detailing",
    timeline: "8 Days (On-Time Delivery)",
    tools: "AutoCAD 2D, IS 800:2007 Standards, DWG",
    standard: "IS 800:2007 Structural Code",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/truss-bridge-renovation.html",
    images: [
      "assets/truss_gusset_1.jpg",
      "assets/truss_gusset_2.jpg",
      "assets/truss_gusset_3.png"
    ],
    bullets: [
      "Delivered 17 detailed 2D AutoCAD (DWG) sheets of gusset plate and girder bolted connections in 8 days from structural design inputs.",
      "Generated accurate connection plans, elevations, and sections for truss bridge renovation under strict client turnaround deadlines.",
      "Ensured edge distance, pitch, and bolt hole clearances conformed rigorously to IS 800:2007 steel design specifications."
    ]
  },

  houseplan: {
    title: "Contemporary Residential Villa — Concept Planning & Exterior 3D",
    tag: "Architectural Design",
    subtitle: "Architectural concept planning, exterior modeling, and material study for contemporary private residential living with high-res visualizations.",
    service: "Residential Architecture & Visuals",
    timeline: "2 Weeks",
    tools: "ArchiCAD, Twinmotion, AutoCAD",
    standard: "LOD 300 Photorealistic Visualization",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/contemporary-villa-design.html",
    images: [
      "assets/3d_project1.jpg",
      "assets/3d_p1_1.jpg",
      "assets/3d_p1_2.jpg",
      "assets/3d_p1_3.jpg",
      "assets/3d_p1_4.jpg"
    ],
    bullets: [
      "Developed functional modern layouts balancing indoor circulation with landscaped outdoor patio integration.",
      "Utilized ArchiCAD to coordinate 3D wall assemblies, window fenestrations, cantilevered canopies, and roof detailing.",
      "Produced high-resolution 3D visualizations and drawing packages for stakeholder and municipal approval."
    ]
  },

  veterinary: {
    title: "Commercial Veterinary Clinic (Tierarztpraxis) — 2D Blueprint to 3D BIM",
    tag: "Commercial Renovation BIM",
    subtitle: "Existing commercial veterinary clinic converted from scanned blueprints into structured ArchiCAD & IFC BIM model for German renovation.",
    service: "Existing Building → Structured BIM",
    timeline: "10 Days",
    tools: "ArchiCAD, IFC 4.3, PDF Vectorization",
    standard: "LOD 200 Renovation Model",
    actionText: "Open Full Case Study Page ↗",
    actionUrl: "projects/veterinary-clinic-bim.html",
    images: [
      "assets/apartment_3d.jpg",
      "assets/blueprint.jpg",
      "assets/elevation.jpg",
      "assets/section.jpg"
    ],
    bullets: [
      "Reconstructed existing clinic layout from hand-annotated blueprints and legacy drawings into parametric BIM walls, doors, and equipment zones.",
      "Isolated clinical treatment rooms, surgical theaters, and customer waiting areas with distinct acoustic and wall properties.",
      "Supplied structured IFC exports for mechanical MEP coordination and German energy performance compliance."
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
