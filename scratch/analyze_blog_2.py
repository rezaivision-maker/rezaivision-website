import re

with open("src/data/blogPosts.ts", "r") as f:
    content = f.read()

contents = re.findall(r'content:\s*`(.*?)`', content, re.DOTALL)

kw_counts = {
    "video": 0,
    "filmmaker": 0,
    "agentur": 0,
    "content": 0,
    "kaiserslautern": 0,
    "mannheim": 0,
    "saarbrücken": 0,
    "mainz": 0,
    "südwesten": 0
}

total_words = sum(len(text.lower().split()) for text in contents)

for text in contents:
    for kw in kw_counts.keys():
        kw_counts[kw] += text.lower().count(kw)

print(f"Total Words: {total_words}")
print("\n--- Additional Keyword Density ---")
for kw, count in kw_counts.items():
    density = (count / total_words) * 100 if total_words > 0 else 0
    print(f"{kw}: {count} occurrences ({density:.2f}%)")

