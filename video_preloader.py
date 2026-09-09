import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    video_preloader = """
    <!-- Cinematic Video Preloader -->
    <div id="preloader">
        <!-- 
          PLACE YOUR VIDEO HERE!
          Save the video you downloaded as "city.mp4" in the same folder.
        -->
        <video autoplay muted loop playsinline class="preloader-video" id="preloader-vid">
            <source src="city.mp4" type="video/mp4">
            <!-- Fallback text if video fails -->
        </video>
        <div class="preloader-overlay"></div>
        
        <div class="logo-anim-container">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="preloader-logo-svg">
                <path d="M25 80 V20 H55 C70 20 80 30 80 40 C80 50 70 60 55 60 H40 V80" stroke="var(--accent-gold)" stroke-width="8" stroke-linejoin="miter" class="draw-logo"/>
                <path d="M50 60 L75 80" stroke="var(--accent-gold)" stroke-width="8" stroke-linecap="square" class="draw-logo"/>
                <line x1="10" y1="65" x2="90" y2="35" stroke="#fff" stroke-width="6" stroke-linecap="square" class="draw-logo"/>
            </svg>
        </div>
    </div>
"""

    html = re.sub(r'<!-- Holographic City Preloader -->.*?</div>\s*</div>', video_preloader, html, flags=re.DOTALL)
    
    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Clean out old holo-city css
    css = re.sub(r'\.holo-floor \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'\.hologram-city-container \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'\.holo-city-svg \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'\.holo-line \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'\.holo-crane \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'@keyframes drawHolo \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'@keyframes floorMove \{.*?\}', '', css, flags=re.DOTALL)
    css = re.sub(r'@keyframes fadeOutCity \{.*?\}', '', css, flags=re.DOTALL)

    new_css = """
/* Video Preloader Overrides */
.preloader-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 1;
    opacity: 0.6; /* Slightly dimmed to allow logo to pop */
}

.preloader-overlay {
    position: absolute;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: linear-gradient(135deg, rgba(2, 6, 17, 0.9) 0%, rgba(11, 30, 54, 0.4) 100%);
    z-index: 2;
}

.logo-anim-container {
    z-index: 3;
}
"""
    with open('styles.css', 'a') as f:
        f.write(new_css)

if __name__ == "__main__":
    update_html()
    update_css()
    print("Video preloader structure added.")
