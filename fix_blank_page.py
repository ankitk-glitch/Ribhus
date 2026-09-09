import re

with open('script.js', 'r') as f:
    js = f.read()

# Fix the preloader logic to absolutely ensure visibility
fixed_logic = """
// ==========================================
// Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Forcefully make all above-the-fold elements visible to prevent blank page
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.animate-on-scroll');
                heroElements.forEach(el => {
                    el.classList.add('visible');
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                // Remove the preloader from DOM to prevent blocking clicks
                setTimeout(() => { preloader.remove(); }, 1000);
            }, 50);
        }
    }, 5200); 
});
"""

# Replace old logic
js = re.sub(r'// ==========================================\n// Preloader Logic.*?(?=\n\n//)', fixed_logic, js, flags=re.DOTALL)
# Wait, my regex might fail if it doesn't match properly.
# Let's just do a specific replace.
