import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. Remove the Free Sample card from the grid
pattern_card = r'<!-- Free Pilot Sample -->.*?<div class="pricing-card white-card animate-on-scroll delay-200">'
html = re.sub(pattern_card, '<div class="pricing-card white-card animate-on-scroll delay-100">', html, flags=re.DOTALL)

# Adjust remaining delays
html = html.replace('delay-300">', 'delay-200">', 1) 
html = html.replace('delay-400">', 'delay-300">', 1) 

# 2. Add the Horizontal Banner ONLY at the end of the pricing section
horizontal_banner = """
            </div> <!-- End of pricing grid -->

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

# Match exactly the end of the pricing section
pattern_pricing_end = r'(<section id="pricing".*?)            </div>\s*</div>\s*</section>'
html = re.sub(pattern_pricing_end, r'\1' + horizontal_banner + '\n        </div>\n    </section>', html, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(html)

def update_css():
    css_addition = """
/* Horizontal Free Sample Banner */
.free-sample-banner {
    background-color: #fff;
    border: 2px solid var(--accent-gold);
    border-radius: 12px;
    padding: 3.5rem;
    margin-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

.free-sample-content {
    flex: 1;
    text-align: left;
}

.free-sample-content h3 {
    font-size: 2.2rem;
    color: var(--primary-dark);
    margin-bottom: 1rem;
}

.free-sample-content p {
    color: #444;
    font-size: 1.1rem;
    line-height: 1.6;
}

.free-sample-cta {
    flex-shrink: 0;
    text-align: center;
}

.free-sample-cta .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(11, 30, 54, 0.4);
}

@media (max-width: 992px) {
    .free-sample-banner {
        padding: 2.5rem;
        gap: 2.5rem;
    }
}

@media (max-width: 768px) {
    .free-sample-banner {
        flex-direction: column;
        text-align: center;
        padding: 2rem;
        gap: 2rem;
    }
    .free-sample-content {
        text-align: center;
    }
    .free-sample-content div {
        text-align: left;
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(css_addition)

if __name__ == "__main__":
    update_html()
    update_css()
    print("Banner fixed.")
