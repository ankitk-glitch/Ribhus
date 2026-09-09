import re

with open('script.js', 'r') as f:
    js = f.read()

# Replace the preloader logic
new_logic = """
// ==========================================
// Preloader Logic
// ==========================================
(function initPreloader() {
    // We do NOT wait for window.onload because external assets (like Google Translate or images) 
    // might delay the event and cause the user to be stuck on the blue screen.
    // The CSS animations start immediately, so we start our timer immediately.
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Fade out the dark blue background
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Immediately force all hidden page content to show
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            
            // Remove from DOM after fade out completes
            setTimeout(() => { 
                preloader.remove(); 
            }, 1000);
        }
    }, 5800); // 5.8s perfectly matches the 5.0s + 1s CSS shift animation
})();
"""

# Use regex to find the old window.addEventListener('load', ...) block and replace it
# The block starts with // ========================================== \n // Preloader Logic
js = re.sub(r'// ==========================================\n// Preloader Logic\n// ==========================================\nwindow\.addEventListener\(\'load\', \(\) => \{.*?\}\);\s*(?=\n// Close modal)', new_logic.strip() + '\n', js, flags=re.DOTALL)

with open('script.js', 'w') as f:
    f.write(js)

print("Fixed blue screen bug.")
