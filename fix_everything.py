import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # 1. Cache buster for styles
    html = re.sub(r'<link rel="stylesheet" href="styles\.css.*?>', '<link rel="stylesheet" href="styles.css?v=4">', html)

    # 2. Fix Navbar Layout: Wrap lang selector and button in .nav-actions
    # Extract the custom-lang-selector and the google_translate_element and the btn
    nav_pattern = r'(<div class="custom-lang-selector".*?<div id="google_translate_element" style="display:none;"></div>)\s*<a href="#contact" class="btn btn-primary">Start Free Pilot</a>'
    
    replacement = r"""<div class="nav-actions" style="display: flex; align-items: center;">
                \1
                <a href="#contact" class="btn btn-primary">Start Free Pilot</a>
            </div>"""
    html = re.sub(nav_pattern, replacement, html, flags=re.DOTALL)

    # 3. Simplify Pricing text to ensure it stays on one line
    html = html.replace('<span class="price-suffix">/ multi-story</span>', '<span class="price-suffix">/ project</span>')
    html = html.replace('<h3>Multi-Story Residential & Apartments</h3>', '<h3>Multi-Story Residential</h3>')

    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # 1. Update Pricing Grid to handle 4 cards elegantly
    css = re.sub(r'\.pricing-grid \{.*?\}', '.pricing-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n    gap: 1.5rem;\n    align-items: stretch;\n}', css, flags=re.DOTALL)

    # 2. Make pricing cards flex columns so they have equal height and button/footer aligns at bottom
    new_card_css = """
.pricing-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.pricing-card hr {
    margin: 1.5rem 0;
    border: none;
    border-top: 1px solid rgba(0,0,0,0.1);
}
"""
    # 3. Adjust Price Font Sizes so it fits on one line
    css = re.sub(r'\.pricing-card \.price \.dynamic-price \{.*?\}', '.pricing-card .price .dynamic-price {\n    display: inline;\n    font-size: 2.1rem;\n    font-family: var(--font-heading);\n    color: var(--primary-dark);\n    font-weight: 700;\n}', css, flags=re.DOTALL)
    
    css = re.sub(r'\.pricing-card \.price \{.*?\}', '.pricing-card .price {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    margin-bottom: 1rem;\n    flex-wrap: nowrap;\n    white-space: nowrap;\n    overflow: hidden;\n}', css, flags=re.DOTALL)

    # Remove old .pricing-card if there's any conflicting static height (should be fine)
    
    with open('styles.css', 'a') as f:
        f.write(new_card_css)

if __name__ == "__main__":
    update_html()
    update_css()
    print("Everything fixed.")
