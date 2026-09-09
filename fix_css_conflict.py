import re

with open('styles.css', 'r') as f:
    css = f.read()

# Remove the old Hero Entry Animations section
pattern = r'/\* Hero Entry Animations \*/.*?@keyframes slideUpFade \{.*?\}'
css = re.sub(pattern, '', css, flags=re.DOTALL)

with open('styles.css', 'w') as f:
    f.write(css)

print("CSS conflicts resolved.")
