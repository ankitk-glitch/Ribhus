import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # 1. Update Navbar Links
    html = html.replace('<a href="#pricing">Pricing</a>', '<a href="#get-quote">Submit Project</a>')

    # 2. Define the new sections (Tech Stack + Project Submission)
    new_sections = """
    <!-- Tech Stack Showcase -->
    <section class="tech-stack section light-section text-center" style="padding: 4rem 0; border-top: 1px solid #eaeaea;">
        <div class="container animate-on-scroll">
            <p style="text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 2rem; font-weight: 600; font-size: 0.9rem;">Powered by Industry-Standard Software</p>
            <div class="software-logos">
                <span>ArchiCAD</span>
                <span>Autodesk Revit</span>
                <span>AutoCAD</span>
                <span>BIMcloud</span>
            </div>
        </div>
    </section>

    <!-- Project Submission & Query Form -->
    <section id="get-quote" class="section dark-section">
        <div class="container">
            <div class="quote-container">
                <div class="quote-text animate-on-scroll">
                    <h2 class="section-title" style="margin-bottom: 1.5rem; text-align: left;">Let's build your next digital twin.</h2>
                    <p style="font-size: 1.15rem; opacity: 0.9; margin-bottom: 2rem; line-height: 1.6;">Upload your scanned paper drawings, PDFs, or legacy CAD files. Our engineering pod will review your scope and provide a precise timeline and strategy within 24 hours.</p>
                    <ul class="quote-benefits">
                        <li><span>✓</span> 100% Confidential & Secure Data Handling</li>
                        <li><span>✓</span> Free Pilot available for enterprise backlogs</li>
                        <li><span>✓</span> Adherence to European Engineering Standards</li>
                    </ul>
                </div>
                <div class="quote-form-wrapper animate-on-scroll delay-200">
                    <form class="quote-form" onsubmit="event.preventDefault(); alert('Thank you! Your project details have been received. We will contact you within 24 hours.');">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="John Doe" required>
                            </div>
                            <div class="form-group">
                                <label>Work Email</label>
                                <input type="email" placeholder="john@company.com" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Project Type</label>
                            <select>
                                <option>Single-Family Residential</option>
                                <option>Multi-Story Residential / Apartments</option>
                                <option>Commercial & Retail</option>
                                <option>Other Custom Scope</option>
                            </select>
                        </div>
                        <div class="form-group file-upload">
                            <label>Upload 2D Plans / Legacy Files</label>
                            <div class="drop-zone">
                                <span class="drop-icon">📁</span>
                                <span>Drag & Drop files here or <strong style="color:var(--primary-dark);">Browse</strong></span>
                                <input type="file" multiple accept=".pdf,.dwg,.jpg,.png,.zip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Additional Details</label>
                            <textarea rows="4" placeholder="Tell us about LOD requirements, deadlines, and specific software versions..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 1.2rem; font-size: 1.1rem;">Submit Project for Review</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    """

    # 3. Remove the Pricing section and insert the new sections
    pattern_pricing = r'<section id="pricing".*?</section>'
    html = re.sub(pattern_pricing, new_sections, html, flags=re.DOTALL)

    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    css_additions = """
/* Tech Stack Logos */
.software-logos {
    display: flex;
    justify-content: center;
    gap: 4rem;
    flex-wrap: wrap;
    color: var(--primary-dark);
}
.software-logos span {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    opacity: 0.6;
    transition: opacity 0.3s;
}
.software-logos span:hover {
    opacity: 1;
}

/* Quote & Submission Section */
.quote-container {
    display: flex;
    gap: 4rem;
    align-items: center;
}
.quote-text {
    flex: 1;
    text-align: left;
}
.quote-benefits {
    list-style: none;
    padding: 0;
    line-height: 2.2;
    font-size: 1.05rem;
}
.quote-benefits li {
    display: flex;
    align-items: center;
    gap: 10px;
}
.quote-benefits li span {
    color: var(--accent-gold);
    font-weight: bold;
}

.quote-form-wrapper {
    flex: 1;
    background: #fff;
    padding: 3rem;
    border-radius: 12px;
    color: var(--text-dark);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.quote-form .form-row {
    display: flex;
    gap: 1.5rem;
}

.quote-form .form-group {
    margin-bottom: 1.5rem;
    flex: 1;
    text-align: left;
}

.quote-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--primary-dark);
    font-size: 0.95rem;
}

.quote-form input, 
.quote-form select, 
.quote-form textarea {
    width: 100%;
    padding: 0.9rem 1.2rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 1rem;
    background-color: #f9f9f9;
    transition: border-color 0.3s, background-color 0.3s;
}

.quote-form input:focus, 
.quote-form select:focus, 
.quote-form textarea:focus {
    outline: none;
    border-color: var(--primary-dark);
    background-color: #fff;
}

/* Drag & Drop Zone */
.drop-zone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 2.5rem 1rem;
    text-align: center;
    position: relative;
    cursor: pointer;
    background: #fafafa;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.drop-icon {
    font-size: 2.5rem;
    opacity: 0.5;
}
.drop-zone:hover {
    border-color: var(--accent-gold);
    background: #fff8f0;
}
.drop-zone input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
}

@media (max-width: 992px) {
    .quote-container {
        flex-direction: column;
    }
    .quote-form-wrapper {
        width: 100%;
    }
    .software-logos {
        gap: 2rem;
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(css_additions)


def cleanup_js():
    with open('script.js', 'r') as f:
        js = f.read()
    
    # We remove the Currency Conversion block since there are no prices anymore
    # Removing everything from --- 2. Auto Currency Conversion --- to the end of that if statement
    pattern = r'// --- 2\. Auto Currency Conversion ---.*?(?=\} catch \(error\))'
    js = re.sub(pattern, '', js, flags=re.DOTALL)
    
    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    cleanup_js()
    print("Niche features applied.")
