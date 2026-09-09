import re

with open('styles.css', 'r') as f:
    css = f.read()

# Replace the portfolio carousel CSS with a much cleaner, premium version
new_carousel_css = """
/* Premium Portfolio Carousel */
.portfolio-carousel-wrapper {
    position: relative;
    padding: 1rem 0;
}

.portfolio-carousel {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 1rem 0.5rem 2rem 0.5rem; /* Room for shadow */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
}

.portfolio-carousel::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}

.portfolio-card {
    min-width: calc(50% - 1rem);
    flex: 0 0 auto;
    cursor: pointer;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.03);
}

.portfolio-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.portfolio-card img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    display: block;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.portfolio-card .portfolio-content {
    padding: 2.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.portfolio-card h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--primary-dark);
}

.portfolio-card p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.view-details {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    color: var(--accent-gold);
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s;
}

.view-details:hover {
    color: var(--primary-dark);
}

/* Absolute Floating Carousel Buttons */
.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    color: var(--primary-dark);
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s;
}

.carousel-btn:hover {
    background: var(--primary-dark);
    color: #fff;
    border-color: var(--primary-dark);
}

.carousel-btn.prev-btn {
    left: -25px;
}

.carousel-btn.next-btn {
    right: -25px;
}

@media (max-width: 992px) {
    .portfolio-card {
        min-width: calc(80% - 1rem); /* Show 1.5 cards on tablet so they know to scroll */
    }
}
@media (max-width: 768px) {
    .portfolio-card {
        min-width: 100%;
    }
    .carousel-btn.prev-btn { left: 0; }
    .carousel-btn.next-btn { right: 0; }
}
"""

# Regex to replace the old portfolio styles. 
# We need to find the block from /* Portfolio Carousel */ to right before /* Modal */
pattern = r'/\* Portfolio Carousel \*/.*?/\* Modal \*/'
css = re.sub(pattern, new_carousel_css + '\n/* Modal */', css, flags=re.DOTALL)

with open('styles.css', 'w') as f:
    f.write(css)

