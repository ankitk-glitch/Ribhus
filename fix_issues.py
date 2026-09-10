import re

def fix_js():
    with open('script.js', 'r') as f:
        js = f.read()

    # Fix 1: scrollPortfolio -> movePortfolio
    js = js.replace('function scrollPortfolio(dir)', 'function movePortfolio(dir)')
    
    # Fix 3: Indian flag (auto-detection mapping)
    # Find the block where current-country is set
    old_country_set = """if (!localStorage.getItem('manual_lang')) {
                document.getElementById('current-country').innerText = geoData.country_name || 'Europe';
            }"""
            
    new_country_set = """if (!localStorage.getItem('manual_lang')) {
                document.getElementById('current-country').innerText = geoData.country_name || 'Europe';
                if (geoData.country_code) {
                    const flag = String.fromCodePoint(...[...geoData.country_code.toUpperCase()].map(c => c.charCodeAt(0) + 127397));
                    document.getElementById('current-flag').innerText = flag;
                }
            }"""
    
    js = js.replace(old_country_set, new_country_set)

    with open('script.js', 'w') as f:
        f.write(js)


def fix_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Fix 2: Footer logo stroke color
    # We find the specific SVG inside the footer.
    # We can match `<footer id="contact"` and its SVG
    
    footer_split = html.split('<footer id="contact" class="footer">')
    if len(footer_split) == 2:
        footer_content = footer_split[1]
        # Replace the dark stroke with white stroke in the footer logo only
        footer_content = footer_content.replace('stroke="var(--primary-dark)"', 'stroke="#ffffff"')
        html = footer_split[0] + '<footer id="contact" class="footer">' + footer_content

    with open('index.html', 'w') as f:
        f.write(html)

if __name__ == "__main__":
    fix_js()
    fix_html()
    print("All 3 fixes applied.")
