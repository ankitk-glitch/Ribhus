import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    old_contact = """<div class="contact-links animate-on-scroll delay-200">
                <a href="mailto:contact@theribhus.com" class="btn btn-secondary">contact@theribhus.com</a>
                <a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">LinkedIn</a>
            </div>"""

    new_contact = """<div class="contact-links animate-on-scroll delay-200">
                <a href="mailto:contact@theribhus.com" class="btn btn-secondary">Email</a>
                <a href="https://wa.me/" target="_blank" class="btn btn-secondary">WhatsApp</a>
                <a href="https://instagram.com/theribhus" target="_blank" class="btn btn-secondary">Instagram</a>
                <a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">LinkedIn</a>
            </div>"""

    html = html.replace(old_contact, new_contact)
    
    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()
    
    # Add flex-wrap if not present
    if "flex-wrap: wrap;" not in css.split(".contact-links")[1].split("}")[0]:
        css = css.replace(".contact-links {\n    display: flex;", ".contact-links {\n    display: flex;\n    flex-wrap: wrap;")
        
    with open('styles.css', 'w') as f:
        f.write(css)

if __name__ == "__main__":
    update_html()
    update_css()
    print("Added socials to contact.")
