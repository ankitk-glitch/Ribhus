import re

with open('styles.css', 'r') as f:
    css = f.read()

# Fix the button hover state on dark background
pattern = r'\.carousel-btn:hover \{.*?\}'
new_hover = """.carousel-btn:hover {
    background: var(--accent-gold);
    color: var(--primary-dark);
    border-color: var(--accent-gold);
    transform: translateY(-50%) scale(1.1);
}"""
css = re.sub(pattern, new_hover, css, flags=re.DOTALL)

with open('styles.css', 'w') as f:
    f.write(css)
