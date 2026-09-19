import re

with open('index.html', 'r') as f:
    html = f.read()

# Replace the messy contact links with a much cleaner layout using emojis for visual balance
old_contacts = """<div class="contact-links animate-on-scroll delay-200" style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                <a href="mailto:contact@ribhus.com" class="btn btn-secondary">Email: contact@ribhus.com</a>
                <a href="https://wa.me/917303540359" target="_blank" class="btn btn-secondary">WhatsApp</a>
                <a href="https://www.instagram.com/the.ribhus/" target="_blank" class="btn btn-secondary">Instagram</a>
                <a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">Company LinkedIn</a>
            </div>"""

new_contacts = """<div class="contact-links animate-on-scroll delay-200" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="mailto:contact@ribhus.com" class="btn btn-secondary">✉️ Email</a>
                <a href="https://wa.me/917303540359" target="_blank" class="btn btn-secondary">💬 WhatsApp</a>
                <a href="https://www.instagram.com/the.ribhus/" target="_blank" class="btn btn-secondary">📸 Instagram</a>
                <a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">💼 LinkedIn</a>
            </div>"""

html = html.replace(old_contacts, new_contacts)

# Also fix any rogue instances just in case it didn't match perfectly
html = re.sub(r'<a href="mailto:contact@ribhus\.com" class="btn btn-secondary">.*?</a>', '<a href="mailto:contact@ribhus.com" class="btn btn-secondary">✉️ Email</a>', html)
html = re.sub(r'<a href="https://wa\.me/917303540359" target="_blank" class="btn btn-secondary">.*?</a>', '<a href="https://wa.me/917303540359" target="_blank" class="btn btn-secondary">💬 WhatsApp</a>', html)
html = re.sub(r'<a href="https://www\.instagram\.com/the\.ribhus/" target="_blank" class="btn btn-secondary">.*?</a>', '<a href="https://www.instagram.com/the.ribhus/" target="_blank" class="btn btn-secondary">📸 Instagram</a>', html)
html = re.sub(r'<a href="https://linkedin\.com/company/theribhus" target="_blank" class="btn btn-secondary">.*?</a>', '<a href="https://linkedin.com/company/theribhus" target="_blank" class="btn btn-secondary">💼 LinkedIn</a>', html)


with open('index.html', 'w') as f:
    f.write(html)
