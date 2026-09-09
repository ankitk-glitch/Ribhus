import re
import random

# Procedurally generate a dense holographic city SVG
svg_lines = []

# Define some buildings (x_start, width, height, step)
buildings = [
    (50, 100, 200, 20),
    (170, 80, 150, 15),
    (270, 120, 300, 25), # Tall main
    (410, 90, 220, 20),
    (520, 110, 180, 20),
    (650, 80, 130, 15),
]

for b_x, b_w, b_h, step in buildings:
    # Verticals
    for x in range(b_x, b_x + b_w + 1, step):
        svg_lines.append(f'<line x1="{x}" y1="400" x2="{x}" y2="{400-b_h}" class="draw-line holo-line" style="animation-delay: {random.uniform(0, 0.5):.2f}s;" />')
    # Horizontals
    for y in range(400 - b_h, 401, step):
        svg_lines.append(f'<line x1="{b_x}" y1="{y}" x2="{b_x + b_w}" y2="{y}" class="draw-line holo-line" style="animation-delay: {random.uniform(0.5, 1.0):.2f}s;" />')

# Add 2 Construction Cranes
# Crane 1 (Left)
svg_lines.append('<line x1="160" y1="400" x2="160" y2="100" class="draw-line holo-crane" />') # Mast
svg_lines.append('<line x1="100" y1="100" x2="220" y2="100" class="draw-line holo-crane" />') # Arm
svg_lines.append('<line x1="160" y1="100" x2="200" y2="60" class="draw-line holo-crane" />') # Support
svg_lines.append('<line x1="120" y1="100" x2="120" y2="180" class="draw-line holo-crane" />') # Cable dropping down

# Crane 2 (Right)
svg_lines.append('<line x1="400" y1="400" x2="400" y2="50" class="draw-line holo-crane" />') # Mast
svg_lines.append('<line x1="320" y1="50" x2="480" y2="50" class="draw-line holo-crane" />') # Arm
svg_lines.append('<line x1="400" y1="50" x2="350" y2="20" class="draw-line holo-crane" />') # Support
svg_lines.append('<line x1="350" y1="50" x2="350" y2="150" class="draw-line holo-crane" />') # Cable dropping

svg_content = "\n".join(svg_lines)

html_preloader = f"""
    <!-- Holographic City Preloader -->
    <div id="preloader">
        <!-- 3D Perspective Grid Floor -->
        <div class="holo-floor"></div>
        
        <div class="hologram-city-container">
            <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax meet" class="holo-city-svg">
                <defs>
                    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {svg_content}
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

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Replace old preloader. Match everything from <!-- .* Preloader --> to the end of the preloader div
    html = re.sub(r'<!-- .*?Preloader -->.*?<div class="logo-anim-container">.*?</div>\s*</div>', html_preloader, html, flags=re.DOTALL)
    
    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Strip out the previous blueprint CSS
    css = re.sub(r'/\* Full-Screen Blueprint Animation \*/.*?@keyframes shiftToCorner \{.*?\}', '', css, flags=re.DOTALL)

    new_css = """
/* Holographic City Preloader */
#preloader {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: #020611; /* Deep cyberspace blue */
    z-index: 99999;
    overflow: hidden;
    transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
}

.holo-floor {
    position: absolute;
    bottom: -30vh;
    left: -50vw;
    width: 200vw;
    height: 100vh;
    background-image: 
        linear-gradient(rgba(0, 243, 255, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 243, 255, 0.4) 1px, transparent 1px);
    background-size: 60px 60px;
    transform: perspective(600px) rotateX(75deg);
    animation: floorMove 3s linear infinite, fadeOutCity 0.5s 3.5s forwards;
    opacity: 0.8;
}

@keyframes floorMove {
    from { background-position: 0 0; }
    to { background-position: 0 60px; }
}

.hologram-city-container {
    position: absolute;
    bottom: 10vh; /* Sit right above the 3D grid horizon */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1200px;
    height: 60vh;
    opacity: 1;
    animation: fadeOutCity 0.5s 3.5s forwards;
}

.holo-city-svg {
    width: 100%; height: 100%;
    filter: url(#cyanGlow);
}

.holo-line {
    stroke: #00f3ff;
    stroke-width: 1.5;
    fill: none;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: drawHolo 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
}

.holo-crane {
    stroke: #ff0055; /* Cranes in a contrasting neon pink/red for realism */
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: drawHolo 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
    animation-delay: 1.0s !important; /* Cranes appear later */
}

@keyframes drawHolo {
    to { stroke-dashoffset: 0; }
}

@keyframes fadeOutCity {
    to { opacity: 0; visibility: hidden; }
}

.logo-anim-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
    animation: fadeInLogo 0.5s 3.7s forwards, shiftToCorner 1s 5.0s cubic-bezier(0.77, 0, 0.175, 1) forwards;
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

    # Preloader logic update for new timings (city draws for 3s, fades at 3.5, logo at 3.7, shifts at 5.0, ends at 6.0)
    new_logic = """
// ==========================================
// Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Force visible
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.classList.add('visible');
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                setTimeout(() => { preloader.remove(); }, 1000);
            }, 50);
        }
    }, 6000); 
});
"""
    js = re.sub(r'// ==========================================\n// Preloader Logic.*?(?=\n\n//)', new_logic.strip(), js, flags=re.DOTALL)
    
    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Holographic Blueprint injected.")
