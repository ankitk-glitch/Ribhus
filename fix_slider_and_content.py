import re

def fix_js():
    with open('script.js', 'r') as f:
        js = f.read()

    portfolio_logic = """
// ==========================================
// Portfolio & Modal Logic
// ==========================================
const projects = [
    {
        title: "Residential House Planning & Design",
        scope: "Ground Floor Layout | 1393 sq.ft. | 37 ft Frontage",
        highlights: "Complete architectural planning focusing on spatial efficiency and natural light integration for a modern family home.",
        images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg"]
    },
    {
        title: "4-Floor Residential Building (G+3)",
        scope: "3D BIM Design | 8 x 10 m Plot | ARCHICAD",
        highlights: "Full LOD 300 BIM modeling delivered in ArchiCAD, including structural layouts and detailed facade rendering.",
        images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg"]
    },
    {
        title: "3BHK Residential Project",
        scope: "Architectural Planning & BIM Documentation | 32 x 50 ft Plot",
        highlights: "Comprehensive 2D drafting to 3D BIM conversion, generating precise floor plans, elevations, and section views.",
        images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg"]
    },
    {
        title: "Professional BIM Model Portfolio",
        scope: "European Residential Projects | Celekhor GmbH (Germany)",
        highlights: "A collection of high-fidelity BIM conversions tailored specifically for German architectural standards and compliance.",
        images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_bim_portfolio.jpg"]
    }
];

let currentProjectIndex = 0;
let currentModalImageIndex = 0;

function scrollPortfolio(dir) {
    const carousel = document.querySelector('.portfolio-carousel');
    if (!carousel) return;
    const card = carousel.querySelector('.portfolio-card');
    if (!card) return;
    const scrollAmount = card.offsetWidth + 32; 
    carousel.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
}

function openModal(index) {
    currentProjectIndex = index;
    currentModalImageIndex = 0;
    const project = projects[index];
    
    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalScope').innerHTML = `<strong>Scope:</strong> ${project.scope}`;
    document.getElementById('modalHighlights').innerHTML = `<p>${project.highlights}</p>`;
    
    renderModalImages();
    
    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderModalImages() {
    const container = document.getElementById('modalImagesContainer');
    const project = projects[currentProjectIndex];
    container.innerHTML = '';
    
    project.images.forEach((imgSrc, i) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        if (i === currentModalImageIndex) img.classList.add('active');
        container.appendChild(img);
    });
    
    const leftBtn = document.querySelector('.modal-slider-btn.left');
    const rightBtn = document.querySelector('.modal-slider-btn.right');
    if (project.images.length > 1) {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
    } else {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }
}

function moveModalImage(dir) {
    const project = projects[currentProjectIndex];
    currentModalImageIndex = (currentModalImageIndex + dir + project.images.length) % project.images.length;
    renderModalImages();
}

"""
    # Prepend the portfolio logic to script.js right after the first line or before preloader
    with open('script.js', 'w') as f:
        f.write(portfolio_logic + js)

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # Enhance "Why Ribhus" content
    
    old_card1 = """<h3>Scale Without Hiring</h3>
                <p>Avoid local recruitment delays and high overhead. We provide instant capacity.</p>"""
    new_card1 = """<h3>Instant Scalability, Zero Overhead</h3>
                <p>Bypass the severe European talent shortage. We act as an immediate, fully-trained extension of your in-house team, eliminating recruitment delays and HR overhead.</p>"""
                
    old_card2 = """<h3>European Standards</h3>
                <p>We work exclusively on European projects. We know the codes, the LODs, and the quality expectations.</p>"""
    new_card2 = """<h3>Engineered for Europe</h3>
                <p>We exclusively serve the EU market. From strict LOD 300 compliance to ArchiCAD native standards, our models are engineered to seamlessly integrate into your local workflows.</p>"""
                
    old_card3 = """<h3>Speed & Precision</h3>
                <p>Our unified pipeline ensures 99.9% dimensional accuracy with 48-hour turnarounds.</p>"""
    new_card3 = """<h3>Uncompromising Precision</h3>
                <p>Our multi-tiered dimensional QA pipeline guarantees flawless accuracy. We transform complex legacy 2D blueprints into highly detailed 3D BIM models at unprecedented speed.</p>"""

    html = html.replace(old_card1, new_card1)
    html = html.replace(old_card2, new_card2)
    html = html.replace(old_card3, new_card3)

    # Enhance the crunch cards slightly
    old_crunch1 = """<h3>Rising Infrastructure Demand</h3>
                    <p>European infrastructure demands, grid modernization, and renewable buildouts are accelerating at an unprecedented pace.</p>"""
    new_crunch1 = """<h3>The Accelerating Demand</h3>
                    <p>European infrastructure demands, building grid modernization, and strict energy efficiency regulations are driving an unprecedented need for precise 3D BIM data.</p>"""
                    
    old_crunch2 = """<h3>A Shrinking Talent Pool</h3>
                    <p>In markets like Germany, a severe shortage of qualified BIM modelers and CAD technicians creates a critical bottleneck.</p>"""
    new_crunch2 = """<h3>The Critical Talent Shortage</h3>
                    <p>Across DACH and broader European markets, a severe shortage of qualified native BIM modelers and CAD technicians is creating critical project bottlenecks.</p>"""

    html = html.replace(old_crunch1, new_crunch1)
    html = html.replace(old_crunch2, new_crunch2)

    with open('index.html', 'w') as f:
        f.write(html)

if __name__ == "__main__":
    fix_js()
    update_html()
    print("Fixed script and enhanced content.")
