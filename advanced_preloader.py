import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    new_preloader = """
    <!-- Cinematic City Construction Preloader -->
    <div id="preloader">
        <div class="city-container">
            <svg viewBox="0 0 400 200" class="city-svg">
                <!-- Glowing City Skyline Wireframe -->
                <polyline points="20,180 20,100 60,100 60,60 100,60 100,180" class="draw-line" />
                <polyline points="90,180 90,40 140,40 140,80 170,80 170,180" class="draw-line" />
                <polyline points="160,180 160,20 220,20 220,180" class="draw-line" /> <!-- Center Tall Tower -->
                <polyline points="210,180 210,70 260,70 260,110 300,110 300,180" class="draw-line" />
                <polyline points="290,180 290,50 340,50 340,180" class="draw-line" />
                <polyline points="330,180 330,90 380,90 380,180" class="draw-line" />
                
                <!-- Base Ground Line -->
                <line x1="0" y1="180" x2="400" y2="180" class="draw-line base-line" />
                
                <!-- Internal Grid/Structural Lines -->
                <line x1="180" y1="20" x2="180" y2="180" class="draw-line grid-line" />
                <line x1="200" y1="20" x2="200" y2="180" class="draw-line grid-line" />
                <line x1="160" y1="60" x2="220" y2="60" class="draw-line grid-line" />
                <line x1="160" y1="100" x2="220" y2="100" class="draw-line grid-line" />
                <line x1="160" y1="140" x2="220" y2="140" class="draw-line grid-line" />
                
                <line x1="100" y1="60" x2="140" y2="60" class="draw-line grid-line" />
                <line x1="260" y1="70" x2="290" y2="70" class="draw-line grid-line" />
            </svg>
        </div>
        
        <div class="logo-anim-container">
            <!-- Ribhus Logo -->
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="preloader-logo-svg">
                <path d="M25 80 V20 H55 C70 20 80 30 80 40 C80 50 70 60 55 60 H40 V80" stroke="var(--accent-gold)" stroke-width="8" stroke-linejoin="miter" class="draw-logo"/>
                <path d="M50 60 L75 80" stroke="var(--accent-gold)" stroke-width="8" stroke-linecap="square" class="draw-logo"/>
                <line x1="10" y1="65" x2="90" y2="35" stroke="#fff" stroke-width="6" stroke-linecap="square" class="draw-logo"/>
            </svg>
        </div>
    </div>
"""

    # Replace old preloader
    html = re.sub(r'<!-- 3D Geometric Preloader -->.*?</div>\s*</div>', new_preloader, html, flags=re.DOTALL)

    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Remove the old 3D geometric preloader css
    css = re.sub(r'/\* ==========================================\s*3D Geometric Preloader\s*========================================== \*/.*?(?=/\*)', '', css, flags=re.DOTALL)

    new_css = """
/* ==========================================
   Cinematic City & Logo Preloader
   ========================================== */
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #050e1a; /* Deep navy blueprint background */
    z-index: 99999;
    transition: opacity 0.6s ease-out, visibility 0.6s ease-out;
}

/* City Animation Container */
.city-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90vw;
    opacity: 1;
    animation: fadeOutCity 0.5s 2.8s forwards;
}

.city-svg {
    width: 100%;
    height: auto;
    stroke: var(--accent-gold);
    stroke-width: 2.5;
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
}

.city-svg .draw-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawCity 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

.city-svg .grid-line {
    stroke-width: 1;
    opacity: 0.5;
    animation-delay: 0.5s;
}

.city-svg .base-line {
    animation-duration: 1s;
}

/* Logo Animation Container */
.logo-anim-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
    /* Fades in at 3.0s, stays for a moment, then shifts to top left at 4.2s */
    animation: fadeInLogo 0.5s 3.0s forwards, shiftToCorner 1.2s 4.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

.preloader-logo-svg {
    filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.3));
}

/* Keyframes */
@keyframes drawCity {
    to { stroke-dashoffset: 0; }
}

@keyframes fadeOutCity {
    to { opacity: 0; visibility: hidden; }
}

@keyframes fadeInLogo {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
}

@keyframes shiftToCorner {
    0% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.5);
    }
    100% {
        /* Approximate position of the actual navbar logo */
        top: 2rem; 
        left: 5%; 
        transform: translate(0, 0) scale(0.4);
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(new_css)


def update_js():
    with open('script.js', 'r') as f:
        js = f.read()

    # Update preloader timing logic
    new_js_logic = """
// ==========================================
// Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    // City draws (0-2.8s)
    // City fades (2.8-3.0s)
    // Logo fades in (3.0-3.5s)
    // Logo shifts to corner (4.2-5.4s)
    
    // Fade out the entire preloader background exactly when the logo reaches the corner (5.2s)
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Re-trigger hero animations
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }, 100);
        }
    }, 5200); 
});
"""
    
    # Replace the old logic
    js = re.sub(r'// ==========================================\s*// Preloader Logic\s*// ==========================================.*?\}\);', new_js_logic, js, flags=re.DOTALL)

    with open('script.js', 'w') as f:
        f.write(js)


if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Advanced Preloader installed.")
