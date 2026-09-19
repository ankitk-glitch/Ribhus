import re

with open('index.html', 'r') as f:
    html = f.read()

# Replace the current contact links
old_contact = """<div class="contact-links animate-on-scroll delay-200" style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                <a href="mailto:theribhus@gmail.com" class="btn btn-secondary">Email: theribhus@gmail.com</a>
                <a href="https://wa.me/917303540359" target="_blank" class="btn btn-secondary">WhatsApp</a>
                <a href="https://www.linkedin.com/in/ankitk-dtu/" target="_blank" class="btn btn-secondary">LinkedIn</a>
                <a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">Company</a>
            </div>"""

new_contact = """<div class="contact-links animate-on-scroll delay-200" style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                <a href="mailto:theribhus@gmail.com" class="btn btn-secondary">Email: theribhus@gmail.com</a>
                <a href="https://wa.me/917303540359" target="_blank" class="btn btn-secondary">WhatsApp</a>
                <a href="https://www.instagram.com/the.ribhus/" target="_blank" class="btn btn-secondary">Instagram</a>
                <a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">Company LinkedIn</a>
            </div>"""

html = html.replace(old_contact, new_contact)

with open('index.html', 'w') as f:
    f.write(html)
print("Updated footer links.")
