import re

with open('index.html', 'r') as f:
    html = f.read()

custom_dropdown = """
            <div class="custom-lang-selector" id="country-selector-widget">
                <button class="lang-btn" onclick="toggleLangMenu(event)">
                    <span id="current-flag">🇪🇺</span> <span id="current-country">Europe</span> <span class="arrow">▼</span>
                </button>
                <div class="lang-menu" id="lang-menu">
                    <input type="text" id="lang-search" placeholder="Search country..." onkeyup="filterCountries()" onclick="event.stopPropagation()">
                    <ul id="country-list">
                        <li onclick="selectCountry('en', 'USD', '🇺🇸', 'United States')">🇺🇸 United States</li>
                        <li onclick="selectCountry('en', 'GBP', '🇬🇧', 'United Kingdom')">🇬🇧 United Kingdom</li>
                        <li onclick="selectCountry('de', 'EUR', '🇩🇪', 'Germany')">🇩🇪 Germany</li>
                        <li onclick="selectCountry('fr', 'EUR', '🇫🇷', 'France')">🇫🇷 France</li>
                        <li onclick="selectCountry('es', 'EUR', '🇪🇸', 'Spain')">🇪🇸 Spain</li>
                        <li onclick="selectCountry('it', 'EUR', '🇮🇹', 'Italy')">🇮🇹 Italy</li>
                        <li onclick="selectCountry('nl', 'EUR', '🇳🇱', 'Netherlands')">🇳🇱 Netherlands</li>
                        <li onclick="selectCountry('pl', 'PLN', '🇵🇱', 'Poland')">🇵🇱 Poland</li>
                        <li onclick="selectCountry('sv', 'SEK', '🇸🇪', 'Sweden')">🇸🇪 Sweden</li>
                        <li onclick="selectCountry('hi', 'INR', '🇮🇳', 'India')">🇮🇳 India</li>
                        <li onclick="selectCountry('ja', 'JPY', '🇯🇵', 'Japan')">🇯🇵 Japan</li>
                        <li onclick="selectCountry('zh-CN', 'CNY', '🇨🇳', 'China')">🇨🇳 China</li>
                        <li onclick="selectCountry('ar', 'AED', '🇦🇪', 'UAE')">🇦🇪 UAE</li>
                        <li onclick="selectCountry('en', 'AUD', '🇦🇺', 'Australia')">🇦🇺 Australia</li>
                        <li onclick="selectCountry('en', 'CAD', '🇨🇦', 'Canada')">🇨🇦 Canada</li>
                    </ul>
                </div>
            </div>
            <div id="google_translate_element" style="display:none;"></div>
"""

# Replace the old google_translate_element
html = re.sub(r'<div id="google_translate_element".*?</div>', custom_dropdown, html, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(html)

css_additions = """
/* Custom Country Selector */
.custom-lang-selector {
    position: relative;
    display: inline-block;
    margin-right: 15px;
}
.lang-btn {
    background: transparent;
    border: 1px solid rgba(0,0,0,0.1);
    padding: 8px 12px;
    border-radius: 4px;
    font-family: var(--font-body);
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-dark);
}
.lang-menu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 5px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    width: 220px;
    z-index: 1000;
    overflow: hidden;
    text-align: left;
}
.lang-menu.show {
    display: block;
}
#lang-search {
    width: 100%;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #eee;
    font-family: var(--font-body);
    outline: none;
    font-size: 0.95rem;
}
#country-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 250px;
    overflow-y: auto;
}
#country-list li {
    padding: 10px 12px;
    cursor: pointer;
    font-size: 0.95rem;
    color: #444;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}
#country-list li:hover {
    background: #f5f5f5;
    color: var(--primary-dark);
}
/* Hide google elements completely */
.goog-te-banner-frame, .skiptranslate {
    display: none !important;
}
body {
    top: 0 !important;
}
"""
with open('styles.css', 'a') as f:
    f.write(css_additions)

print("Step 2 Dropdown injected.")
