import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # SVG Logo Code
    svg_logo = """<a href="#" class="logo-container">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px;">
                    <path d="M25 80 V20 H55 C70 20 80 30 80 40 C80 50 70 60 55 60 H40 V80" stroke="currentColor" stroke-width="8" stroke-linejoin="miter" fill="none"/>
                    <path d="M50 60 L75 80" stroke="currentColor" stroke-width="8" stroke-linecap="square"/>
                    <line x1="10" y1="65" x2="90" y2="35" stroke="var(--accent-gold)" stroke-width="6" stroke-linecap="square"/>
                </svg>
                RIBHUS
            </a>"""

    # Replace Header Logo
    html = re.sub(r'<div class="logo">RIBHUS</div>', svg_logo, html)

    # Replace Footer Logo
    footer_logo_replacement = f"""<div class="footer-logo">
                {svg_logo}
            </div>"""
    html = re.sub(r'<div class="footer-logo">RIBHUS</div>', footer_logo_replacement, html)

    # Add animation classes to elements
    # Why Ribhus section
    html = html.replace('<h2 class="section-title">The Engineering Capacity Crunch</h2>', '<h2 class="section-title animate-on-scroll">The Engineering Capacity Crunch</h2>')
    html = html.replace('<div class="crunch-card white-card">', '<div class="crunch-card white-card animate-on-scroll delay-100">', 1)
    html = html.replace('<div class="crunch-card white-card">', '<div class="crunch-card white-card animate-on-scroll delay-200">', 1)
    html = html.replace('<div class="banner">', '<div class="banner animate-on-scroll delay-300">')

    # Process section
    html = html.replace('<h2 class="section-title text-center">From Legacy Paper to Digital Precision</h2>', '<h2 class="section-title text-center animate-on-scroll">From Legacy Paper to Digital Precision</h2>')
    html = html.replace('<div class="process-step feature-card">', '<div class="process-step feature-card animate-on-scroll delay-100">', 1)
    html = html.replace('<div class="process-step feature-card">', '<div class="process-step feature-card animate-on-scroll delay-200">', 1)
    html = html.replace('<div class="process-step feature-card">', '<div class="process-step feature-card animate-on-scroll delay-300">', 1)

    # Portfolio section
    html = html.replace('<h2 class="section-title">From 2D Source to 3D Architectural Model</h2>', '<h2 class="section-title animate-on-scroll">From 2D Source to 3D Architectural Model</h2>')
    html = html.replace('<div class="portfolio-carousel-wrapper">', '<div class="portfolio-carousel-wrapper animate-on-scroll delay-200">')

    # Pricing section
    html = html.replace('<h2 class="section-title">Transparent, Complexity-Based Pricing</h2>', '<h2 class="section-title animate-on-scroll">Transparent, Complexity-Based Pricing</h2>')
    html = html.replace('<p style="color: #fff; margin-bottom: 3rem;">We don\'t believe', '<p class="animate-on-scroll" style="color: #fff; margin-bottom: 3rem;">We don\'t believe')
    html = html.replace('<div class="pricing-card white-card">', '<div class="pricing-card white-card animate-on-scroll delay-100">', 1)
    html = html.replace('<div class="pricing-card white-card">', '<div class="pricing-card white-card animate-on-scroll delay-200">', 1)
    html = html.replace('<div class="pricing-card white-card">', '<div class="pricing-card white-card animate-on-scroll delay-300">', 1)

    # Footer
    html = html.replace('<h2>Initiate Your Digital Transformation Today</h2>', '<h2 class="animate-on-scroll">Initiate Your Digital Transformation Today</h2>')
    html = html.replace('<p>Stop relying on legacy paper.', '<p class="animate-on-scroll delay-100">Stop relying on legacy paper.')
    html = html.replace('<div class="contact-links">', '<div class="contact-links animate-on-scroll delay-200">')

    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    css_additions = """
/* =========================================
   ANIMATIONS & LOGO
   ========================================= */

/* Logo Styling */
.logo-container {
    display: flex;
    align-items: center;
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary-dark);
    text-decoration: none;
    transition: transform 0.3s ease;
}
.logo-container:hover {
    transform: scale(1.05);
}
.footer-logo .logo-container {
    color: var(--text-light);
    justify-content: center;
    font-size: 2.5rem;
}

/* Scroll Animations */
.animate-on-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}

.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
.delay-400 { transition-delay: 0.4s; }

/* Hero Entry Animations */
.hero h1, .hero p, .hero-features .feature-card {
    opacity: 0;
    animation: slideUpFade 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.hero h1 { animation-delay: 0.1s; }
.hero p { animation-delay: 0.3s; }
.hero-features .feature-card:nth-child(1) { animation-delay: 0.5s; }
.hero-features .feature-card:nth-child(2) { animation-delay: 0.65s; }
.hero-features .feature-card:nth-child(3) { animation-delay: 0.8s; }

@keyframes slideUpFade {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(css_additions)

def update_js():
    js_additions = """
// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
"""
    with open('script.js', 'a') as f:
        f.write(js_additions)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Files updated successfully.")
