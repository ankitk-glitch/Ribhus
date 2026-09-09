import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Remove "RIBHUS" text next to the logo
    html = re.sub(r'<span style="margin-left: 12px;">RIBHUS</span>', '', html)

    with open('index.html', 'w') as f:
        f.write(html)

def update_css():
    css_addition = """
/* Hero Section 3D Roving Background */
.hero {
    position: relative;
    overflow: hidden;
    background-color: var(--primary-light);
}

.hero::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background-image: url('https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_5.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.12; /* Kept very subtle so text remains readable */
    z-index: 0;
    /* Slow roving/panning animation */
    animation: roveBackground 30s linear infinite alternate;
    pointer-events: none;
}

/* Ensure content stays above the background */
.hero-content {
    position: relative;
    z-index: 2;
}

@keyframes roveBackground {
    0% {
        transform: scale(1) translate(0, 0);
    }
    50% {
        transform: scale(1.05) translate(-1%, 2%);
    }
    100% {
        transform: scale(1.1) translate(2%, -1%);
    }
}
"""
    with open('styles.css', 'a') as f:
        f.write(css_addition)

if __name__ == "__main__":
    update_html()
    update_css()
    print("Hero updated.")
