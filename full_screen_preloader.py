import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    new_preloader = """
    <!-- Full-Screen Blueprint Construction Preloader -->
    <div id="preloader">
        <div class="full-screen-blueprint">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="blueprint-svg">
                <!-- Massive structural lines across the screen -->
                <line x1="0" y1="20" x2="100" y2="20" class="draw-line grid-line" />
                <line x1="0" y1="40" x2="100" y2="40" class="draw-line grid-line" />
                <line x1="0" y1="60" x2="100" y2="60" class="draw-line grid-line" />
                <line x1="0" y1="80" x2="100" y2="80" class="draw-line grid-line" />
                
                <line x1="20" y1="0" x2="20" y2="100" class="draw-line grid-line" />
                <line x1="40" y1="0" x2="40" y2="100" class="draw-line grid-line" />
                <line x1="60" y1="0" x2="60" y2="100" class="draw-line grid-line" />
                <line x1="80" y1="0" x2="80" y2="100" class="draw-line grid-line" />
                
                <!-- 3D Perspective Shapes / Buildings -->
                <polyline points="20,100 20,50 40,30 60,30 80,50 80,100" class="draw-line thick-line" />
                <polyline points="20,50 40,50 60,30" class="draw-line thick-line" />
                <polyline points="60,50 80,50" class="draw-line thick-line" />
                <line x1="40" y1="50" x2="40" y2="100" class="draw-line thick-line" />
                <line x1="60" y1="50" x2="60" y2="100" class="draw-line thick-line" />
                
                <!-- Secondary structure -->
                <polyline points="0,100 0,70 20,70" class="draw-line thick-line" />
                <polyline points="80,80 100,80 100,100" class="draw-line thick-line" />
            </svg>
        </div>
        
        <div class="logo-anim-container">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="preloader-logo-svg">
                <path d="M25 80 V20 H55 C70 20 80 30 80 40 C80 50 70 60 55 60 H40 V80" stroke="var(--accent-gold)" stroke-width="8" stroke-linejoin="miter" class="draw-logo"/>
                <path d="M50 60 L75 80" stroke="var(--accent-gold)" stroke-width="8" stroke-linecap="square" class="draw-logo"/>
                <line x1="10" y1="65" x2="90" y2="35" stroke="#fff" stroke-width="6" stroke-linecap="square" class="draw-logo"/>
            </svg>
        </div>
    </div>
"""
    html = re.sub(r'<!-- Cinematic City Construction Preloader -->.*?</div>\s*</div>', new_preloader, html, flags=re.DOTALL)
    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # We replace the old city-container CSS
    css = re.sub(r'/\* City Animation Container \*/.*?@keyframes shiftToCorner \{.*?\}', '', css, flags=re.DOTALL)
    # The regex above is dangerous if it misses. I will just append and let it override via ID/classes.

    new_css = """
/* Full-Screen Blueprint Animation */
.full-screen-blueprint {
    position: absolute;
    top: 0; left: 0; width: 100vw; height: 100vh;
    opacity: 1;
    animation: fadeOutCity 0.5s 2.8s forwards;
    overflow: hidden;
}

.blueprint-svg {
    width: 100%; height: 100%;
    stroke: var(--accent-gold);
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.3));
}

.blueprint-svg .grid-line {
    stroke-width: 0.1;
    stroke: rgba(255,255,255,0.2);
}

.blueprint-svg .thick-line {
    stroke-width: 0.4;
}

.blueprint-svg .draw-line {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: drawBlueprint 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes drawBlueprint {
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

    new_logic = """
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // SUPER IMPORTANT: Force all hidden elements to show, preventing blank page!
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.classList.add('visible');
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                preloader.style.display = 'none'; // remove completely
            }, 50);
        }
    }, 5200); 
});
"""
    # Replace old logic
    js = re.sub(r'window\.addEventListener\(\'load\', \(\) => \{.*?\}, 5200\);\s*\}\);', new_logic.strip(), js, flags=re.DOTALL)
    
    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Full screen preloader and blank page fix applied.")
