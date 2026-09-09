import re

with open('index.html', 'r') as f:
    html = f.read()

# The exact banner HTML that was duplicated
banner_pattern = r'\s*<!-- Horizontal Free Sample Banner -->\s*<div class="free-sample-banner.*?</div\s*>\s*</div\s*>\s*</div\s*>'
# Wait, parsing HTML with Regex for this big block is risky if I don't get the end tag right.
# The block ends with the closing of the banner:
#                 <div style="margin-top: 15px; font-size: 0.95rem; color: #666; font-weight: 600;">contact@theribhus.com</div>
#             </div>
#         </div>

banner_regex = r'\s*<!-- Horizontal Free Sample Banner -->.*?<div style="margin-top: 15px; font-size: 0.95rem; color: #666; font-weight: 600;">contact@theribhus.com</div>\s*</div>\s*</div>'

html = re.sub(banner_regex, '', html, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(html)
