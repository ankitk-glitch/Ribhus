import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    preloader_html = """
    <!-- 3D Geometric Preloader -->
    <div id="preloader">
        <div class="preloader-content">
            <svg viewBox="0 0 100 100" class="bim-preloader-svg">
                <!-- Left Wall -->
                <polygon points="50,85 15,65 15,25 50,45" class="wire-wall-left" />
                <!-- Right Wall -->
                <polygon points="50,85 85,65 85,25 50,45" class="wire-wall-right" />
                <!-- Top Roof -->
                <polygon points="15,25 50,45 85,25 50,5" class="wire-roof" />
            </svg>
            <div class="preloader-text">Constructing 3D Model...</div>
        </div>
    </div>
"""

    # Inject right after <body>
    html = re.sub(r'<body.*?>', lambda m: m.group(0) + preloader_html, html)

    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    css_addition = """
/* ==========================================
   3D Geometric Preloader
   ========================================== */
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #050e1a; /* deep dark navy */
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
}

.preloader-content {
    text-align: center;
}

.bim-preloader-svg {
    width: 120px;
    height: 120px;
    fill: rgba(255,255,255,0); /* Transparent initially */
    stroke: var(--accent-gold);
    stroke-width: 2.5;
    stroke-linejoin: round;
    overflow: visible;
}

/* Drawing the wireframe lines */
.bim-preloader-svg polygon {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: drawWire 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, fill3D 1s 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.wire-wall-left { 
    animation-delay: 0s, 1.5s; 
}
.wire-wall-right { 
    animation-delay: 0.3s, 1.7s; 
}
.wire-roof { 
    animation-delay: 0.6s, 1.9s; 
}

/* Line Drawing Keyframes */
@keyframes drawWire {
    100% { stroke-dashoffset: 0; }
}

/* 3D Solid Fill Keyframes */
@keyframes fill3D {
    100% { 
        fill: rgba(212, 175, 55, 0.15); /* Soft gold fill */
    }
}

/* Specific face fills to create 3D shading illusion */
.wire-wall-left {
    --target-fill: rgba(212, 175, 55, 0.3);
}
.wire-wall-right {
    --target-fill: rgba(212, 175, 55, 0.1);
}
.wire-roof {
    --target-fill: rgba(212, 175, 55, 0.4);
}

@keyframes fill3D {
    100% { fill: var(--target-fill); }
}

.preloader-text {
    color: var(--accent-gold);
    font-family: var(--font-heading);
    margin-top: 30px;
    letter-spacing: 3px;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0;
    animation: fadeInPulse 2s 0.5s infinite alternate;
}

@keyframes fadeInPulse {
    0% { opacity: 0.3; transform: translateY(5px); }
    100% { opacity: 1; transform: translateY(0); }
}
"""
    with open('styles.css', 'a') as f:
        f.write(css_addition)


def update_js():
    with open('script.js', 'r') as f:
        js = f.read()

    preloader_js = """
// ==========================================
// Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    // Keep it visible long enough to show the beautiful 3D construction (2.8 seconds total)
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Re-trigger intersection observer for hero elements after preloader hides
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }, 300);
        }
    }, 2800);
});
"""
    # Prepend it to script.js
    with open('script.js', 'w') as f:
        f.write(preloader_js + '\n' + js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Preloader added.")
