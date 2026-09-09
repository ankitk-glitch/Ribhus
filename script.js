const projects = [
    {
        title: "Residential House Planning & Design",
        scope: "Ground Floor Layout | 1393 sq.ft. | 37 ft Frontage",
        highlights: "Complete 2D floor plans with 3D exterior and interior rendering visualizations. Structural optimization for a 3-bedroom, 2-bathroom layout with parking.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_4.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_5.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_6.jpg"
        ]
    },
    {
        title: "4-Floor Residential Building (G+3)",
        scope: "3D BIM Design | 8 x 10 m Plot | ARCHICAD",
        highlights: "Engineered on a compact plot, optimizing vertical circulation and facade massing. Includes floor-by-floor space planning and window placement for natural daylighting.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_3.jpg"
        ]
    },
    {
        title: "3BHK Residential Project",
        scope: "Architectural Planning & BIM Documentation | 32 x 50 ft Plot",
        highlights: "Site-responsive planning separating living zones. Delivered regulation-compliant plans and technical BIM documentation linking floor plans, sections, and elevations.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_1.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_2.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_3.jpg",
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_4.jpg"
        ]
    },
    {
        title: "Professional BIM Model Portfolio",
        scope: "European Residential Projects | Celekhor GmbH (Germany)",
        highlights: "Developed 25+ detailed BIM models using ARCHICAD. Executed rigorous pre-checks for quality control and organized complex project workflows for international standards.",
        images: [
            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_bim_portfolio.jpg"
        ]
    }
];

let currentModalImageIndex = 0;
let currentProjectIndex = 0;

function movePortfolio(dir) {
    const carousel = document.querySelector('.portfolio-carousel');
    const card = carousel.querySelector('.portfolio-card');
    const scrollAmount = card.offsetWidth + 32; // card width + gap
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
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
    
    // Hide buttons if only 1 image
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

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});


