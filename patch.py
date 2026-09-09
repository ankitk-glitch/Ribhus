import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace the portfolio section
new_portfolio = """    <section id="portfolio" class="section dark-section">
        <div class="container">
            <h2 class="section-title">From 2D Source to 3D Architectural Model</h2>
            <div class="portfolio-carousel-wrapper">
                <button class="carousel-btn prev-btn" onclick="movePortfolio(-1)">&#10094;</button>
                <div class="portfolio-carousel">
                    <!-- Project 1 -->
                    <div class="portfolio-card white-card has-image" onclick="openModal(0)">
                        <img src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg" alt="Residential House Planning">
                        <div class="portfolio-content">
                            <h3>Residential House Planning &amp; Design</h3>
                            <p><strong>Scope:</strong> Ground Floor Layout | 1393 sq.ft. | 37 ft Frontage</p>
                            <span class="view-details">View all images &rarr;</span>
                        </div>
                    </div>
                    <!-- Project 2 -->
                    <div class="portfolio-card white-card has-image" onclick="openModal(1)">
                        <img src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg" alt="4-Floor Residential Building">
                        <div class="portfolio-content">
                            <h3>4-Floor Residential Building (G+3)</h3>
                            <p><strong>Scope:</strong> 3D BIM Design | 8 x 10 m Plot | ARCHICAD</p>
                            <span class="view-details">View all images &rarr;</span>
                        </div>
                    </div>
                    <!-- Project 3 -->
                    <div class="portfolio-card white-card has-image" onclick="openModal(2)">
                        <img src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg" alt="3BHK Residential Project">
                        <div class="portfolio-content">
                            <h3>3BHK Residential Project</h3>
                            <p><strong>Scope:</strong> Architectural Planning &amp; BIM Documentation | 32 x 50 ft Plot</p>
                            <span class="view-details">View all images &rarr;</span>
                        </div>
                    </div>
                    <!-- Project 4 -->
                    <div class="portfolio-card white-card has-image" onclick="openModal(3)">
                        <img src="https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_bim_portfolio.jpg" alt="Professional BIM Model Portfolio">
                        <div class="portfolio-content">
                            <h3>Professional BIM Model Portfolio</h3>
                            <p><strong>Scope:</strong> European Residential Projects | Celekhor GmbH (Germany)</p>
                            <span class="view-details">View all images &rarr;</span>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn next-btn" onclick="movePortfolio(1)">&#10095;</button>
            </div>
        </div>
    </section>"""

# Using regex to replace the section
pattern = r'<section id="portfolio" class="section dark-section">.*?</section>'
content = re.sub(pattern, new_portfolio, content, flags=re.DOTALL)

modal_code = """
    <!-- Modal Structure -->
    <div id="projectModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <div class="modal-body">
                <div class="modal-slider">
                    <button class="modal-slider-btn left" onclick="moveModalImage(-1)">&#10094;</button>
                    <div id="modalImagesContainer" class="modal-images-container"></div>
                    <button class="modal-slider-btn right" onclick="moveModalImage(1)">&#10095;</button>
                </div>
                <div class="modal-details">
                    <h3 id="modalTitle"></h3>
                    <p id="modalScope"></p>
                    <div id="modalHighlights"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>"""

content = content.replace('</body>', modal_code)

with open('index.html', 'w') as f:
    f.write(content)
