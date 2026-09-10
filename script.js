
// ==========================================
// Portfolio & Modal Logic
// ==========================================
const projects = [
    {
        title: "Residential House Planning & Design",
        scope: "Ground Floor Layout | 1393 sq.ft. | 37 ft Frontage",
        highlights: "Complete architectural planning focusing on spatial efficiency and natural light integration for a modern family home.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_4.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_5.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_6.jpg"
        ]
    },
    {
        title: "4-Floor Residential Building (G+3)",
        scope: "3D BIM Design | 8 x 10 m Plot | ARCHICAD",
        highlights: "Full LOD 300 BIM modeling delivered in ArchiCAD, including structural layouts and detailed facade rendering.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_3.jpg"
        ]
    },
    {
        title: "3BHK Residential Project",
        scope: "Architectural Planning & BIM Documentation | 32 x 50 ft Plot",
        highlights: "Comprehensive 2D drafting to 3D BIM conversion, generating precise floor plans, elevations, and section views.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_4.jpg"
        ]
    },
    {
        title: "Professional BIM Model Portfolio",
        scope: "European Residential Projects | 6+ Months Experience in Germany",
        highlights: "A collection of high-fidelity BIM conversions tailored specifically for German architectural standards and compliance.",
        images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_bim_portfolio.jpg"]
    }
];

let currentProjectIndex = 0;
let currentModalImageIndex = 0;

function movePortfolio(dir) {
    const carousel = document.querySelector('.portfolio-carousel');
    if (!carousel) return;
    const card = carousel.querySelector('.portfolio-card');
    if (!card) return;
    const scrollAmount = card.offsetWidth + 32; 
    carousel.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
}

function openModal(index) {
    currentProjectIndex = index;
    currentModalImageIndex = 0;
    const project = projects[index];
    
    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalScope').innerHTML = `<strong>Scope:</strong> ${project.scope}`;
    document.getElementById('modalHighlights').innerHTML = `<p>${project.highlights}</p>`;
    
    renderModalImages();
    
    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderModalImages() {
    const container = document.getElementById('modalImagesContainer');
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
    if (project.images.length > 1) {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
    } else {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }
}

function moveModalImage(dir) {
    const project = projects[currentProjectIndex];
    currentModalImageIndex = (currentModalImageIndex + dir + project.images.length) % project.images.length;
    renderModalImages();
}



// ==========================================
// Preloader Logic
// ==========================================
(function initPreloader() {
    // We do NOT wait for window.onload because external assets (like Google Translate or images) 
    // might delay the event and cause the user to be stuck on the blue screen.
    // The CSS animations start immediately, so we start our timer immediately.
    
            // Video loop logic to skip the last 2 seconds (hides Gemini end text)
            const vid = document.getElementById('preloader-vid');
            if (vid) {
                vid.addEventListener('timeupdate', () => {
                    // Gemini videos usually have text in the last 1.5 - 2 seconds
                    if (vid.duration && vid.currentTime >= vid.duration - 2.0) {
                        vid.currentTime = 0; // Loop before text appears
                        vid.play();
                    }
                });
            }

    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Fade out the dark blue background
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Immediately force all hidden page content to show
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            
            // Remove from DOM after fade out completes
            setTimeout(() => { 
                preloader.remove(); 
            }, 1000);
        }
    }, 5800); // 5.8s perfectly matches the 5.0s + 1s CSS shift animation
})();

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
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
});






// ==========================================
// Custom Country/Language Selector Logic
// ==========================================
function toggleLangMenu(event) {
    event.stopPropagation();
    document.getElementById('lang-menu').classList.toggle('show');
}

function filterCountries() {
    let input = document.getElementById('lang-search').value.toLowerCase();
    let lis = document.getElementById('country-list').getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
        let text = lis[i].innerText.toLowerCase();
        if (text.indexOf(input) > -1) {
            lis[i].style.display = "";
        } else {
            lis[i].style.display = "none";
        }
    }
}

function selectCountry(langCode, currencyCode, flag, name) {
    // Save choices
    localStorage.setItem('manual_lang', langCode);
    localStorage.setItem('manual_currency', currencyCode);
    localStorage.setItem('manual_flag', flag);
    localStorage.setItem('manual_name', name);
    
    // Set Google Translate Cookie
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; domain=.${location.hostname}; path=/`;
    
    // Reload to apply translation and currency
    location.reload();
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.lang-btn') && !event.target.closest('.lang-btn') && !event.target.matches('#lang-search')) {
        var dropdowns = document.getElementsByClassName("lang-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// ==========================================
// 100% Automatic Localization (Currency + Language)
// ==========================================
async function autoLocalize() {
    try {
        // Read manual overrides from localStorage
        let langCode = localStorage.getItem('manual_lang');
        let userCurrency = localStorage.getItem('manual_currency');
        
        // Update UI if manual exists
        if (langCode && userCurrency) {
            document.getElementById('current-flag').innerText = localStorage.getItem('manual_flag') || '🌐';
            document.getElementById('current-country').innerText = localStorage.getItem('manual_name') || 'Global';
        }

        let geoData = null;
        
        // If no manual override, fetch IP
        if (!langCode || !userCurrency) {
            const geoRes = await fetch('https://ipapi.co/json/');
            geoData = await geoRes.json();
            
            
            if (!langCode) {
                const langFull = geoData.languages ? geoData.languages.split(',')[0] : 'en';
                langCode = langFull.split('-')[0];
                
                // Professional websites in India use English, not Hindi.
                if (geoData.country_code === 'IN') {
                    langCode = 'en';
                }
            }
            if (!userCurrency) {
                userCurrency = geoData.currency || 'EUR';
            }
            
            // Auto update UI based on IP detection
            if (!localStorage.getItem('manual_lang')) {
                document.getElementById('current-country').innerText = geoData.country_name || 'Europe';
                if (geoData.country_code) {
                    const flag = String.fromCodePoint(...[...geoData.country_code.toUpperCase()].map(c => c.charCodeAt(0) + 127397));
                    document.getElementById('current-flag').innerText = flag;
                }
            }
        }
        
        // --- 1. Auto Language Translation ---
        if (langCode !== 'en' && document.cookie.indexOf('googtrans') === -1) {
            document.cookie = `googtrans=/en/${langCode}; path=/`;
            document.cookie = `googtrans=/en/${langCode}; domain=.${location.hostname}; path=/`;
        }
        
        // Load Google Translate
        loadGoogleTranslate();

        // --- 2. Auto Currency Conversion ---
        if (userCurrency && userCurrency !== 'EUR') {
            const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
            const rateData = await rateRes.json();
            const conversionRate = rateData.rates[userCurrency];

            if (conversionRate) {
                const formatter = new Intl.NumberFormat(langCode, {
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
    } catch (error) {
        console.error("Auto localization failed (fallback to default): ", error);
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

// Replace the old DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', autoLocalize);
