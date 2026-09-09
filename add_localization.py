import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # 1. Update Pricing HTML for Currency Conversion
    html = html.replace('€59 – €99', '<span class="dynamic-price" data-eur="59">€59</span> – <span class="dynamic-price" data-eur="99">€99</span>')
    html = html.replace('€199 – €499+', '<span class="dynamic-price" data-eur="199">€199</span> – <span class="dynamic-price" data-eur="499">€499</span>+')
    html = html.replace('From €1,799', 'From <span class="dynamic-price" data-eur="1799">€1,799</span>')

    # 2. Insert Google Translate Widget into Navbar
    # Find the nav-links and insert the widget right after
    translate_html = """
            <nav class="nav-links">
                <a href="#why-ribhus">Why Ribhus</a>
                <a href="#process">Process</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#pricing">Pricing</a>
            </nav>
            <div id="google_translate_element" class="lang-selector"></div>
            <a href="#contact" class="btn btn-primary">Start Free Pilot</a>
"""
    # Replace the existing nav-links and button block safely
    pattern_nav = r'<nav class="nav-links">.*?</nav>\s*<a href="#contact" class="btn btn-primary">Start Free Pilot</a>'
    html = re.sub(pattern_nav, translate_html, html, flags=re.DOTALL)

    # 3. Add Google Translate Script before </body>
    translate_script = """
    <!-- Google Translate Script -->
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>"""
    html = html.replace('</body>', translate_script)

    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    css = """
/* Language & Currency Styles */
.lang-selector {
    margin-right: 15px;
    display: inline-block;
}

/* Cleanup Google Translate default styling */
.goog-te-gadget-simple {
    background-color: transparent !important;
    border: 1px solid rgba(0,0,0,0.1) !important;
    padding: 6px 10px !important;
    border-radius: 4px;
    font-family: var(--font-body) !important;
    font-size: 0.9rem !important;
}

.goog-te-gadget-icon {
    display: none;
}

/* Hide Google top banner */
.goog-te-banner-frame {
    display: none !important;
}
body {
    top: 0 !important;
}
"""
    with open('styles.css', 'a') as f:
        f.write(css)

def update_js():
    js = """
// ==========================================
// Auto Currency Conversion based on Location
// ==========================================
async function localizeCurrency() {
    try {
        // 1. Fetch user's country and currency
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        const userCurrency = geoData.currency;
        
        // If user is in Europe or fetching failed, keep default EUR
        if (!userCurrency || userCurrency === 'EUR') return;

        // 2. Fetch latest exchange rates from EUR
        const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const rateData = await rateRes.json();
        const conversionRate = rateData.rates[userCurrency];

        if (!conversionRate) return;

        // 3. Format numbers based on user's locale (e.g., US -> $1,000, DE -> 1.000 €)
        const locale = geoData.languages ? geoData.languages.split(',')[0] : 'en-US';
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: userCurrency,
            maximumFractionDigits: 0
        });

        // 4. Update the pricing elements dynamically
        const priceElements = document.querySelectorAll('.dynamic-price');
        priceElements.forEach(el => {
            const eurValue = parseFloat(el.getAttribute('data-eur'));
            const convertedValue = eurValue * conversionRate;
            el.innerText = formatter.format(convertedValue);
        });

    } catch (error) {
        console.error("Localization failed (fallback to EUR): ", error);
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', localizeCurrency);
"""
    with open('script.js', 'a') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Localization added successfully.")
