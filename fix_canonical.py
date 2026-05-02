import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # replace https://rezaivision.de with https://www.rezaivision.de
    # but avoid replacing https://www.rezaivision.de if it already exists
    new_content = re.sub(r'https://(?!(www\.))rezaivision\.de', 'https://www.rezaivision.de', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            process_file(os.path.join(root, file))

process_file('public/sitemap.xml')
process_file('index.html')
