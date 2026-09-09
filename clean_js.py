import re

with open('script.js', 'r') as f:
    js = f.read()

# Remove the specific block
js = re.sub(r'// Hero Slideshow Crossfade.*?}\);', '', js, flags=re.DOTALL)

with open('script.js', 'w') as f:
    f.write(js)
