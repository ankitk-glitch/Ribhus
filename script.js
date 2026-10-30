// ==========================================
// Ribhus — Client Side Engine & 3D Blur Effects
// ==========================================

// 1. Projects Data for Gallery Modal
const projects = [
    {
        title: "Sobha Heartland II Luxury Villa",
        scope: "Ground Floor Layout | 1,393 sq.ft. | 37 ft Frontage",
        highlights: "Complete architectural planning focusing on spatial efficiency, natural light integration, and ArchiCAD LOD 300 conversion for high-end residential clients.",
        images: [
            "assets/villa_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_3.jpg"
        ]
    },
    {
        title: "Munich G+3 Multi-Family Block",
        scope: "3D BIM Design | 8 x 10 m Plot | ARCHICAD & IFC",
        highlights: "Full LOD 300 BIM modeling delivered in ArchiCAD for the German market, including structural layouts, facade detailing, and thermal boundary tagging for energy audits.",
        images: [
            "assets/project_apartment.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_2.jpg"
        ]
    },
    {
        title: "Vienna Commercial & Office Complex",
        scope: "Architectural Planning & BIM Documentation | 3,200 m²",
        highlights: "Comprehensive 2D drafting to 3D BIM conversion, generating precise floor plans, elevations, section views, and MEP routing zones for Austrian building permit submission.",
        images: [
            "assets/villa_2.jpg",
            "assets/project_commercial.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_1.jpg"
        ]
    },
    {
        title: "Rotterdam Residential Row House",
        scope: "European Residential Projects | 150+ Models Experience",
        highlights: "A collection of high-fidelity BIM conversions tailored specifically for German & Dutch architectural standards and energy compliance software.",
        images: [
            "assets/villa_3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_bim_portfolio.jpg"
        ]
    }
];

let currentProjectIndex = 0;
let currentModalImageIndex = 0;

// Portfolio Carousel Smooth Scrolling
function movePortfolio(dir) {
    const carousel = document.querySelector('.portfolio-carousel');
    if (!carousel) return;
    const card = carousel.querySelector('.project-allstate-card');
    if (!card) return;
    const scrollAmount = card.offsetWidth + 32; 
    carousel.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
}

// Modal Handlers
function openModal(index) {
    currentProjectIndex = index;
    currentModalImageIndex = 0;
    const project = projects[index];
    
    const titleEl = document.getElementById('modalTitle');
    const scopeEl = document.getElementById('modalScope');
    const highEl = document.getElementById('modalHighlights');
    
    if (titleEl) titleEl.innerText = project.title;
    if (scopeEl) scopeEl.innerHTML = `<strong>Scope:</strong> ${project.scope}`;
    if (highEl) highEl.innerHTML = `<p>${project.highlights}</p>`;
    
    renderModalImages();
    
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function renderModalImages() {
    const container = document.getElementById('modalImagesContainer');
    if (!container) return;
    const project = projects[currentProjectIndex];
    container.innerHTML = '';
    
    project.images.forEach((imgSrc, i) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        if (i === currentModalImageIndex) img.classList.add('active');
        container.appendChild(img);
    });
    
    const leftBtn = document.querySelector('.modal-slider-btn.left');
    const rightBtn = document.querySelector('.modal-slider-btn.right');
    if (leftBtn && rightBtn) {
        if (project.images.length > 1) {
            leftBtn.style.display = 'flex';
            rightBtn.style.display = 'flex';
        } else {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
        }
    }
}

function moveModalImage(dir) {
    const project = projects[currentProjectIndex];
    currentModalImageIndex = (currentModalImageIndex + dir + project.images.length) % project.images.length;
    renderModalImages();
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
});

// ==========================================
// 3D Blur & Scroll Interactions
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Reveal Elements with 3D Blur transition on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 2. Navbar 3D Blur & Ambient Orbs Parallax on Scroll
    const navbar = document.getElementById('mainNavbar');
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar blur intensification
        if (navbar) {
            if (scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Ambient Blur Orbs subtle 3D parallax
        if (orb1) orb1.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
        if (orb2) orb2.style.transform = `translate3d(0, ${-scrollY * 0.08}px, 0)`;
        if (orb3) orb3.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`;
    }, { passive: true });

    // 3. 3D Tilt Effect on Hero Model Card
    const heroCard = document.querySelector('.hero-3d-model-wrap');
    if (heroCard) {
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * -12;
            const tiltY = (x / rect.width) * 12;
            heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }
});

// ==========================================
// Language Menu & Localization
// ==========================================
function toggleLangMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('lang-menu');
    if (menu) menu.classList.toggle('show');
}

function filterCountries() {
    const input = document.getElementById('lang-search');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('country-list');
    const li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        const txtValue = li[i].textContent || li[i].innerText;
        li[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
    }
}

function selectCountry(langCode, currencyCode, flag, name) {
    localStorage.setItem('manual_lang', langCode);
    localStorage.setItem('manual_currency', currencyCode);
    localStorage.setItem('manual_flag', flag);
    localStorage.setItem('manual_name', name);
    
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; domain=.${location.hostname}; path=/`;
    
    location.reload();
}

window.addEventListener('click', (event) => {
    if (!event.target.closest('.custom-lang-selector')) {
        const dropdown = document.getElementById("lang-menu");
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});

// 100% Automatic Localization (Currency + Language)
async function autoLocalize() {
    try {
        let langCode = localStorage.getItem('manual_lang');
        let userCurrency = localStorage.getItem('manual_currency');
        
        if (langCode && userCurrency) {
            const flagEl = document.getElementById('current-flag');
            const countryEl = document.getElementById('current-country');
            if (flagEl) flagEl.innerText = localStorage.getItem('manual_flag') || '🌐';
            if (countryEl) countryEl.innerText = localStorage.getItem('manual_name') || 'Global';
        }

        let geoData = null;
        
        if (!langCode || !userCurrency) {
            const geoRes = await fetch('https://ipapi.co/json/').catch(() => null);
            if (geoRes && geoRes.ok) {
                geoData = await geoRes.json();
            }
            
            if (geoData) {
                if (!langCode) {
                    const langFull = geoData.languages ? geoData.languages.split(',')[0] : 'en';
                    langCode = langFull.split('-')[0];
                    if (geoData.country_code === 'IN') langCode = 'en';
                }
                if (!userCurrency) {
                    userCurrency = geoData.currency || 'EUR';
                }
                
                if (!localStorage.getItem('manual_lang')) {
                    const countryEl = document.getElementById('current-country');
                    const flagEl = document.getElementById('current-flag');
                    if (countryEl) countryEl.innerText = geoData.country_name || 'Europe';
                    if (flagEl && geoData.country_code) {
                        const flag = String.fromCodePoint(...[...geoData.country_code.toUpperCase()].map(c => c.charCodeAt(0) + 127397));
                        flagEl.innerText = flag;
                    }
                }
            }
        }
        
        if (langCode && langCode !== 'en' && document.cookie.indexOf('googtrans') === -1) {
            document.cookie = `googtrans=/en/${langCode}; path=/`;
            document.cookie = `googtrans=/en/${langCode}; domain=.${location.hostname}; path=/`;
        }
        
        loadGoogleTranslate();

        if (userCurrency && userCurrency !== 'EUR') {
            const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/EUR').catch(() => null);
            if (rateRes && rateRes.ok) {
                const rateData = await rateRes.json();
                const conversionRate = rateData.rates[userCurrency];

                if (conversionRate) {
                    const formatter = new Intl.NumberFormat(langCode || 'en', {
                        style: 'currency',
                        currency: userCurrency,
                        maximumFractionDigits: 0
                    });

                    document.querySelectorAll('.dynamic-price').forEach(el => {
                        const eurValue = parseFloat(el.getAttribute('data-eur'));
                        const convertedValue = eurValue * conversionRate;
                        el.innerText = formatter.format(convertedValue);
                    });
                }
            }
        }
    } catch (error) {
        console.warn("Auto localization fallback: ", error);
        loadGoogleTranslate();
    }
}

function loadGoogleTranslate() {
    if (document.getElementById('gt-script-dynamic')) return;
    const script = document.createElement('script');
    script.id = 'gt-script-dynamic';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', autoLocalize);
