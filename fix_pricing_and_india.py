import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Change manual dropdown for India to use English instead of Hindi
    html = html.replace("selectCountry('hi', 'INR', '🇮🇳', 'India')", "selectCountry('en', 'INR', '🇮🇳', 'India')")

    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # 1. Replace the Pricing Grid CSS completely
    css = re.sub(r'\.pricing-grid \{.*?\}', '', css, flags=re.DOTALL)
    
    # 2. Replace .pricing-card padding/sizing completely
    css = re.sub(r'\.pricing-card \{.*?\}', '', css, flags=re.DOTALL)
    
    # 3. Replace .pricing-card .price formatting completely
    css = re.sub(r'\.pricing-card \.price \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'\.pricing-card \.price \.dynamic-price \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'\.pricing-card \.price \.price-suffix \{.*?\}', '', css, flags=re.DOTALL)

    # Note: Regex above might match multiple things or fail if syntax changed slightly, 
    # To be extremely safe, I'll just append the new overrides with !important where needed,
    # or just rely on CSS cascade. Let's use the cascade to override cleanly.
    
    new_pricing_css = """
/* ==========================================
   Pricing Overrides (Strict 4-Column Layout)
   ========================================== */
.pricing-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 1.5rem !important;
    align-items: stretch !important;
    width: 100%;
}

.pricing-card {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    padding: 2.5rem 1.5rem !important; /* Perfect internal spacing */
    height: auto !important;
    min-height: 100% !important;
    box-sizing: border-box !important;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}

/* Ensure the gold border doesn't break grid sizing */
.pricing-card[style*="border"] {
    border-width: 2px !important;
}

.pricing-card .price {
    display: flex !important;
    align-items: baseline !important;
    gap: 5px !important;
    margin-bottom: 1.2rem !important;
    flex-wrap: nowrap !important;
    white-space: nowrap !important;
    overflow: visible !important;
}

.pricing-card .price .dynamic-price {
    display: inline !important;
    font-size: 1.65rem !important; /* Smaller so €199 - €499 fits perfectly */
    font-family: var(--font-heading) !important;
    color: var(--primary-dark) !important;
    font-weight: 800 !important;
    letter-spacing: -0.5px !important;
}

.pricing-card .price .price-suffix {
    display: inline !important;
    font-size: 0.9rem !important;
    color: #666 !important;
    font-style: normal !important;
}

.pricing-card h3 {
    font-size: 1.25rem !important;
    margin-bottom: 1rem !important;
    line-height: 1.4 !important;
}

.pricing-card p {
    font-size: 0.95rem !important;
    line-height: 1.5 !important;
}

@media (max-width: 1200px) {
    .pricing-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 2rem !important;
    }
}

@media (max-width: 768px) {
    .pricing-grid {
        grid-template-columns: 1fr !important;
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(new_pricing_css)


def update_js():
    with open('script.js', 'r') as f:
        js = f.read()

    # Modify India logic inside autoLocalize
    # Find: if (!langCode) { const langFull = ... }
    
    india_fix = """
            if (!langCode) {
                const langFull = geoData.languages ? geoData.languages.split(',')[0] : 'en';
                langCode = langFull.split('-')[0];
                
                // Professional websites in India use English, not Hindi.
                if (geoData.country_code === 'IN') {
                    langCode = 'en';
                }
            }"""

    # We replace the original block
    pattern = r'if \(\!langCode\) \{\s*const langFull.*?langCode = langFull\.split\(\'-\'\)\[0\];\s*\}'
    js = re.sub(pattern, india_fix, js, flags=re.DOTALL)

    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Pricing and India logic fixed.")
