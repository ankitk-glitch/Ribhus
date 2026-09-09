import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Remove the hardcoded google translate script so we can inject it dynamically
    html = html.replace('<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>', '')

    with open('index.html', 'w') as f:
        f.write(html)

def update_js():
    with open('script.js', 'r') as f:
        js = f.read()

    # Replace the existing localizeCurrency function with a comprehensive autoLocalize function
    new_js = """
// ==========================================
// 100% Automatic Localization (Currency + Language)
// ==========================================
async function autoLocalize() {
    try {
        // Fetch user's country, language, and currency based on IP
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        
        // --- 1. Auto Language Translation ---
        const langFull = geoData.languages ? geoData.languages.split(',')[0] : 'en';
        const langCode = langFull.split('-')[0]; // Extract base language (e.g., 'fr' from 'fr-FR')
        
        // If not English and no manual translation cookie exists, force auto-translation
        if (langCode !== 'en' && document.cookie.indexOf('googtrans') === -1) {
            document.cookie = `googtrans=/en/${langCode}; path=/`;
            document.cookie = `googtrans=/en/${langCode}; domain=.${location.hostname}; path=/`;
        }
        
        // Now inject Google Translate (it will read the cookie we just set and auto-translate)
        loadGoogleTranslate();

        // --- 2. Auto Currency Conversion ---
        const userCurrency = geoData.currency;
        if (userCurrency && userCurrency !== 'EUR') {
            const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
            const rateData = await rateRes.json();
            const conversionRate = rateData.rates[userCurrency];

            if (conversionRate) {
                const formatter = new Intl.NumberFormat(geoData.languages.split(',')[0], {
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
        loadGoogleTranslate(); // Make sure translation widget still loads on failure
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
"""
    # Remove the old function
    js = re.sub(r'// ==========================================.*?document\.addEventListener\(\'DOMContentLoaded\', localizeCurrency\);', '', js, flags=re.DOTALL)

    with open('script.js', 'w') as f:
        f.write(js + new_js)

if __name__ == "__main__":
    update_html()
    update_js()
    print("Auto-translation enabled.")
