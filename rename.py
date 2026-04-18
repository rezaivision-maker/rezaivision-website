import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    orig_content = content
    content = re.sub(r'RezaiEmotion', 'reza-e-motion', content)
    content = re.sub(r'RezaEmotion', 'reza-e-motion', content)
    content = re.sub(r'rezaiemotion', 'reza-e-motion', content)
    content = re.sub(r'rezaemotion', 'reza-e-motion', content)
    content = re.sub(r'REZAEMOTION', 'REZA-E-MOTION', content)

    if orig_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.html', '.xml', '.json')):
            replace_in_file(os.path.join(root, file))
            
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.html', '.xml', '.json', '.txt')):
            replace_in_file(os.path.join(root, file))
