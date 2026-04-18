import re
with open('src/data/blogPosts.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if line.strip().startswith('content:') and '#' in line and '`' not in line:
        lines[i] = line.replace('content: #', 'content: `#')
with open('src/data/blogPosts.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
