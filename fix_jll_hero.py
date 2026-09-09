import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    new_hero = """
    <section class="jll-hero">
        <div class="jll-hero-content">
            <h1 class="animate-on-scroll">Transforming European Real<br>Estate into 3D BIM, Today</h1>
            <p class="animate-on-scroll delay-100">Every 2D plan becomes an accurate 3D BIM model. Built for architects, real estate planners, and building energy consultants across Europe.</p>
            <a href="#portfolio" class="btn btn-jll animate-on-scroll delay-200">Explore more <span class="arrow">&rarr;</span></a>
        </div>
    </section>
    <div class="features-bar">
        <div class="container features-bar-grid">
            <div class="feature-card animate-on-scroll delay-100">
                <h3>Fast Turnaround</h3>
                <p>Delivered in 24–48 hours</p>
            </div>
            <div class="feature-card animate-on-scroll delay-200">
                <h3>Native Formats</h3>
                <p>ArchiCAD, Revit, IFC, DWG</p>
            </div>
            <div class="feature-card animate-on-scroll delay-300">
                <h3>Focused Scope</h3>
                <p>Pure Architectural LOD 200 / 300</p>
            </div>
        </div>
    </div>
    """

    # Replace the old split-hero section
    pattern = r'<section class="hero split-hero">.*?</section>'
    html = re.sub(pattern, new_hero, html, flags=re.DOTALL)

    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Remove the old split-hero styles
    css = re.sub(r'/\* Split Hero Section \*/.*?@media \(max-width: 992px\) \{.*?\}', '', css, flags=re.DOTALL)
    # The regex might fail to match the end of the media query cleanly, so I'll just append and override or let it be.
    # To be safe, I'll just append the new JLL hero styles.

    new_css = """
/* JLL Style Hero */
.jll-hero {
    position: relative;
    width: 100%;
    height: 85vh;
    min-height: 600px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%), url('hero_bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    margin-top: -80px; /* pull up behind navbar if transparent, else just standard */
}

/* Make navbar transparent for JLL look if needed, or keep clean white. The JLL screenshot has a clean white navbar ABOVE the image. So no negative margin needed. */
.jll-hero {
    margin-top: 0;
}

.jll-hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
    color: #fff;
}

.jll-hero h1 {
    font-size: 4rem;
    font-family: var(--font-body); /* JLL uses clean sans-serif */
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: #fff;
    font-weight: 400;
}

.jll-hero p {
    font-size: 1.25rem;
    font-family: var(--font-body);
    max-width: 650px;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    font-weight: 400;
    line-height: 1.6;
}

.btn-jll {
    background-color: #fff;
    color: #111;
    border: none;
    padding: 0.8rem 1.8rem;
    font-size: 1.05rem;
    font-family: var(--font-body);
    font-weight: 500;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-jll:hover {
    background-color: #f4f4f4;
}

.btn-jll .arrow {
    font-size: 1.2rem;
    transition: transform 0.3s;
}

.btn-jll:hover .arrow {
    transform: translateX(5px);
}

/* Features Bar Below Hero */
.features-bar {
    background-color: var(--primary-light);
    padding: 3rem 0;
    border-bottom: 1px solid #eaeaea;
}

.features-bar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.features-bar .feature-card {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    border-left: 4px solid var(--accent-gold);
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.features-bar .feature-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--primary-dark);
}

.features-bar .feature-card p {
    color: #666;
    margin: 0;
}

@media (max-width: 768px) {
    .jll-hero h1 {
        font-size: 2.5rem;
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(new_css)

def fix_navbar():
    with open('styles.css', 'r') as f:
        css = f.read()
    # JLL uses very clean navbar, we can keep the current one.
    pass

if __name__ == "__main__":
    update_html()
    update_css()
    print("Updated to JLL style hero.")
