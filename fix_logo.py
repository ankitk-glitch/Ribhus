import re

def fix_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # The exact SVG we want (Dark Navy 'R', Gold Slash)
    correct_svg = """<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="ribhus-svg">
                    <path d="M25 80 V20 H55 C70 20 80 30 80 40 C80 50 70 60 55 60 H40 V80" stroke="var(--primary-dark)" stroke-width="8" stroke-linejoin="miter" fill="none"/>
                    <path d="M50 60 L75 80" stroke="var(--primary-dark)" stroke-width="8" stroke-linecap="square"/>
                    <line x1="10" y1="65" x2="90" y2="35" stroke="var(--accent-gold)" stroke-width="6" stroke-linecap="square"/>
                </svg>"""

    # Fix Header Logo
    header_logo = f"""<a href="#" class="logo-container">
                {correct_svg}
                <span style="margin-left: 12px;">RIBHUS</span>
            </a>"""
    
    # We replace the old logo-container block
    pattern_header = r'<a href="#" class="logo-container">.*?RIBHUS\s*</a>'
    html = re.sub(pattern_header, header_logo, html, count=1, flags=re.DOTALL)

    # Fix Footer Logo (Inside a white circle as per Page 10 of PDF, no text)
    footer_logo = f"""<div class="footer-logo">
                <div class="logo-circle">
                    {correct_svg}
                </div>
            </div>"""
    
    pattern_footer = r'<div class="footer-logo">.*?</div>\s*</div>'
    # Wait, the footer logo replacement regex needs to be careful
    pattern_footer = r'<div class="footer-logo">.*?</a>\s*</div>'
    html = re.sub(pattern_footer, footer_logo, html, count=1, flags=re.DOTALL)

    with open('index.html', 'w') as f:
        f.write(html)

def fix_css():
    with open('styles.css', 'a') as f:
        f.write("""
/* Logo Circle Fix */
.logo-circle {
    background-color: #FFFFFF;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.logo-circle svg {
    width: 45px;
    height: 45px;
}
""")

if __name__ == "__main__":
    fix_html()
    fix_css()
    print("Logo fixed.")
