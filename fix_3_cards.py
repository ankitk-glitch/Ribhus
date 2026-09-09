import re

def update_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    # Change 4 columns back to 3 columns
    css = css.replace('grid-template-columns: repeat(4, 1fr) !important;', 'grid-template-columns: repeat(3, 1fr) !important;')

    # Fix the price overflow issue: Allow wrap or hide overflow properly, and don't make it visible outside the box!
    # I previously had: white-space: nowrap !important; overflow: visible !important;
    css = css.replace('white-space: nowrap !important;', 'white-space: normal !important;')
    css = css.replace('overflow: visible !important;', 'overflow: hidden !important;')
    css = css.replace('flex-wrap: nowrap !important;', 'flex-wrap: wrap !important;')

    with open('styles.css', 'w') as f:
        f.write(css)

if __name__ == "__main__":
    update_css()
    print("3 cards layout and overflow fixed.")
