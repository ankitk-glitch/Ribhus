import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    video_tag = """
        <video autoplay muted playsinline id="preloader-vid" class="preloader-video">
            <source src="city.mp4" type="video/mp4">
        </video>
"""
    # Replace the img tag with the video tag
    html = re.sub(r'<img src="holo_city\.jpg" class="preloader-video".*?>', video_tag.strip(), html)
    
    with open('index.html', 'w') as f:
        f.write(html)


def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Update .preloader-video to scale up and hide the corner watermark
    new_css_rule = """
.preloader-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100vw;
    min-height: 100vh;
    object-fit: cover;
    z-index: 1;
    opacity: 0.75;
    /* Scale to 1.15 hides the Gemini logo in the corners */
    transform: translate(-50%, -50%) scale(1.15);
}
"""
    # Replace the existing .preloader-video rule (which had the animation)
    css = re.sub(r'\.preloader-video \{.*?\}', new_css_rule.strip(), css, flags=re.DOTALL)
    
    with open('styles.css', 'w') as f:
        f.write(css)


def update_js():
    with open('script.js', 'r') as f:
        js = f.read()

    # Add the video trim logic inside the preloader IIFE
    video_logic = """
            // Video loop logic to skip the last 2 seconds (hides Gemini end text)
            const vid = document.getElementById('preloader-vid');
            if (vid) {
                vid.addEventListener('timeupdate', () => {
                    // Gemini videos usually have text in the last 1.5 - 2 seconds
                    if (vid.duration && vid.currentTime >= vid.duration - 2.0) {
                        vid.currentTime = 0; // Loop before text appears
                        vid.play();
                    }
                });
            }
"""
    # Insert it right before the setTimeout in initPreloader
    js = js.replace("setTimeout(() => {", video_logic + "\n    setTimeout(() => {", 1)

    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
    print("Video tricks applied.")
