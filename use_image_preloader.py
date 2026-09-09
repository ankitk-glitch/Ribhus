import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Replace the <video> block with an <img> block
    img_preloader = """
        <!-- Cinematic AI Generated Hologram (Animated via CSS) -->
        <img src="holo_city.jpg" class="preloader-video" alt="3D Holographic Construction">
"""
    html = re.sub(r'<!--\s*PLACE YOUR VIDEO HERE!.*?</video>', img_preloader.strip(), html, flags=re.DOTALL)
    
    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Add the cinematic pan animation to the preloader-video class
    css = re.sub(r'\.preloader-video \{.*?\}', '.preloader-video {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    min-width: 100vw;\n    min-height: 100vh;\n    object-fit: cover;\n    z-index: 1;\n    opacity: 0.75;\n    animation: cinematicPan 6s ease-out forwards;\n}', css, flags=re.DOTALL)

    new_keyframes = """
@keyframes cinematicPan {
    0% { transform: translate(-50%, -50%) scale(1.0) rotate(0deg); }
    100% { transform: translate(-50%, -50%) scale(1.15) rotate(0.5deg); }
}
"""
    with open('styles.css', 'a') as f:
        f.write(new_keyframes)

if __name__ == "__main__":
    update_html()
    update_css()
    print("Image preloader set.")
