import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Create the new split hero layout
    new_hero = """
    <section class="hero split-hero">
        <div class="container split-hero-container">
            <div class="hero-text-side">
                <h1 class="animate-on-scroll">Every 2D plan becomes an accurate 3D BIM model.</h1>
                <p class="animate-on-scroll delay-100">Scanned paper drawings, rough PDF blueprints, or 2D CAD files — converted into production-ready ArchiCAD and Revit 3D architectural models. Built for architects, real estate planners, and building energy consultants across Europe.</p>
                <div class="hero-features">
                    <div class="feature-card animate-on-scroll delay-200">
                        <h3>Fast Turnaround</h3>
                        <p>Delivered in 24–48 hours</p>
                    </div>
                    <div class="feature-card animate-on-scroll delay-300">
                        <h3>Native Formats</h3>
                        <p>ArchiCAD (.pln), Revit (.rvt), IFC, DWG</p>
                    </div>
                    <div class="feature-card animate-on-scroll delay-400">
                        <h3>Focused Scope</h3>
                        <p>Pure Architectural LOD 200 / 300</p>
                    </div>
                </div>
            </div>
            <div class="hero-image-side animate-on-scroll delay-300">
                <div class="hero-slideshow">
                    <img class="hero-slide active" src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_1.jpg" alt="4-Floor Residential Building Exterior">
                    <img class="hero-slide" src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_2.jpg" alt="3D Exterior Render">
                    <img class="hero-slide" src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_3.jpg" alt="3BHK Exterior">
                    <img class="hero-slide" src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_5.jpg" alt="3D Cutaway">
                </div>
            </div>
        </div>
    </section>
    """

    # Replace the old hero section
    pattern = r'<section class="hero">.*?</section>'
    html = re.sub(pattern, new_hero, html, flags=re.DOTALL)

    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Remove the old .hero::before rule so it doesn't conflict
    css = re.sub(r'\.hero::before \{.*?\}', '', css, flags=re.DOTALL)

    # Append new styles for split-hero
    new_css = """
/* Split Hero Section */
.split-hero {
    background-color: var(--primary-light);
    padding: 4rem 0 6rem;
    overflow: hidden;
}

.split-hero-container {
    display: flex;
    align-items: center;
    gap: 4rem;
}

.hero-text-side {
    flex: 1;
    max-width: 600px;
    text-align: left;
}

.hero-text-side h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--primary-dark);
}

.hero-text-side p {
    font-size: 1.15rem;
    color: #444;
    margin-bottom: 2.5rem;
}

.hero-features {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.hero-features .feature-card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 5px solid var(--accent-gold);
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    text-align: left;
    margin: 0;
}

.hero-features .feature-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
}

.hero-features .feature-card p {
    margin-bottom: 0;
    font-size: 0.95rem;
    color: #666;
}

.hero-image-side {
    flex: 1;
    position: relative;
    height: 600px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.hero-slideshow {
    width: 100%;
    height: 100%;
    position: relative;
    background: #e0e0e0;
}

.hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.5s ease-in-out, transform 5s linear;
    transform: scale(1);
}

.hero-slide.active {
    opacity: 1;
    transform: scale(1.05); /* Slow zoom effect while visible */
}

@media (max-width: 992px) {
    .split-hero-container {
        flex-direction: column;
    }
    .hero-image-side {
        width: 100%;
        height: 400px;
    }
    .hero-text-side {
        text-align: center;
        max-width: 100%;
    }
    .hero-features {
        align-items: stretch;
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(new_css)

def update_js():
    js_addition = """
// Hero Slideshow Crossfade
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Change image every 4 seconds
    }
});
"""
    with open('script.js', 'a') as f:
        f.write(js_addition)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Hero updated with split layout and slideshow.")
