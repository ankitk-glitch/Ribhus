import re

def update_js():
    with open('script.js', 'r') as f:
        js = f.read()

    old_project1 = 'images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg"]'
    new_project1 = 'images: [\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project1.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_1.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_2.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_3.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_4.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_5.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p1_6.jpg"\n        ]'
    
    old_project2 = 'images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg"]'
    new_project2 = 'images: [\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project2.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_1.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_2.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p2_3.jpg"\n        ]'
    
    old_project3 = 'images: ["https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg"]'
    new_project3 = 'images: [\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_project3.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_1.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_2.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_3.jpg",\n            "https://ankitk-glitch.github.io/ankit.Portfolio/assets/images/3d_p3_4.jpg"\n        ]'

    js = js.replace(old_project1, new_project1)
    js = js.replace(old_project2, new_project2)
    js = js.replace(old_project3, new_project3)

    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_js()
    print("Project images restored.")
