

// ==========================================
// Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Force visible
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.classList.add('visible');
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                setTimeout(() => { preloader.remove(); }, 1000);
            }, 50);
        }
    }, 6000); 
});

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
