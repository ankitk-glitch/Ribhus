import re

# FIX 1: Duplicate banners & Pricing Alignment
with open('index.html', 'r') as f:
    html = f.read()

# Remove all banners first
html = re.sub(r'<!-- Horizontal Free Sample Banner -->.*?contact@theribhus.com</div>\s*</div>\s*</div>', '', html, flags=re.DOTALL)

# Also remove "End of pricing grid" comments to be safe
html = html.replace('            </div> <!-- End of pricing grid -->', '')

# Insert banner exactly ONCE at the end of pricing grid
# The pricing grid ends at the third closing div after Studio Retainer card
banner = """

            <!-- Horizontal Free Sample Banner -->
            <div class="free-sample-banner animate-on-scroll delay-400">
                <div class="free-sample-content">
                    <span style="background: var(--accent-gold); color: var(--primary-dark); padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 1rem;">Zero Commitment</span>
                    <h3>Claim Your Free Pilot Project</h3>
                    <p style="margin-bottom: 1rem;">Test our engineering quality before making any commitments. Send us your most complex legacy plan, rough PDF blueprint, or CAD bottleneck.</p>
                    <div style="background: rgba(11, 30, 54, 0.05); padding: 1.5rem; border-left: 4px solid var(--primary-dark); border-radius: 4px;">
                        <p style="margin-bottom: 0.5rem; color: var(--primary-dark);"><strong>What to include in your email:</strong></p>
                        <ul style="list-style-type: none; padding: 0; margin: 0; color: #444; font-size: 0.95rem; line-height: 1.6;">
                            <li>✅ Attach your 2D plans (PDF, DWG, or JPG)</li>
                            <li>✅ Mention your target software (ArchiCAD / Revit)</li>
                            <li>✅ Any specific LOD requirements or guidelines</li>
                        </ul>
                    </div>
                </div>
                <div class="free-sample-cta">
                    <a href="mailto:contact@theribhus.com?subject=Free%20Pilot%20Project%20Request" class="btn btn-primary" style="font-size: 1.1rem; padding: 1.2rem 2.5rem; box-shadow: 0 8px 20px rgba(11, 30, 54, 0.3);">Email Project Files</a>
                    <div style="margin-top: 15px; font-size: 0.95rem; color: #444; font-weight: 600;">contact@theribhus.com</div>
                </div>
            </div>
"""

# Find the end of Studio retainer card to insert banner
pattern_retainer = r'(<p class="turnaround"><strong>Ongoing capacity</strong></p>\s*</div>\s*)'
html = re.sub(pattern_retainer, r'\1</div>' + banner, html, flags=re.DOTALL)

# Fix pricing text to be one line
html = html.replace('<span>per project</span>', '<span class="price-suffix">/ project</span>')
html = html.replace('<span>by floors & complexity</span>', '<span class="price-suffix">/ multi-story</span>')
html = html.replace('<span>per month</span>', '<span class="price-suffix">/ month</span>')

with open('index.html', 'w') as f:
    f.write(html)

with open('styles.css', 'r') as f:
    css = f.read()

css = re.sub(r'\.pricing-card \.price span \{.*?\}', '', css, flags=re.DOTALL)

css += """
.pricing-card .price {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 1rem;
    flex-wrap: nowrap;
    white-space: nowrap;
}
.pricing-card .price .dynamic-price {
    display: inline;
    font-size: 2.5rem;
    font-family: var(--font-heading);
    color: var(--primary-dark);
}
.pricing-card .price .price-suffix {
    display: inline;
    font-size: 1.1rem;
    color: #666;
    font-style: italic;
}
"""
with open('styles.css', 'w') as f:
    f.write(css)

print("Step 1 Fixed.")
