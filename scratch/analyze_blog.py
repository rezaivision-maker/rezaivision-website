import re
import json

with open("src/data/blogPosts.ts", "r") as f:
    content = f.read()

# Very basic extraction of content blocks
# blogPosts is a typescript array of objects. We can use regex to extract the markdown content.
contents = re.findall(r'content:\s*`(.*?)`', content, re.DOTALL)
slugs = re.findall(r'slug:\s*"(.*?)"', content)

print(f"Total posts found: {len(contents)}")

total_words = 0
kw_counts = {
    "videoproduktion": 0,
    "kaiserslautern": 0,
    "imagefilm": 0,
    "recruiting": 0,
    "social media": 0,
    "werbevideo": 0,
    "pfalz": 0,
    "unternehmen": 0
}

internal_links = []
blog_to_blog_links = 0
service_links = 0
contact_links = 0

for i, text in enumerate(contents):
    slug = slugs[i] if i < len(slugs) else "unknown"
    words = text.lower().split()
    total_words += len(words)
    
    for kw in kw_counts.keys():
        # simple count
        kw_counts[kw] += text.lower().count(kw)
        
    # Extract markdown links [text](url)
    links = re.findall(r'\[.*?\]\((.*?)\)', text)
    for link in links:
        internal_links.append((slug, link))
        if link.startswith("/blog/"):
            blog_to_blog_links += 1
        elif link.startswith("/leistungen"):
            service_links += 1
        elif link.startswith("/kontakt"):
            contact_links += 1

print("\n--- Keyword Density ---")
for kw, count in kw_counts.items():
    density = (count / total_words) * 100 if total_words > 0 else 0
    print(f"{kw}: {count} occurrences ({density:.2f}%)")

print("\n--- Internal Links ---")
print(f"Total internal links in content: {len(internal_links)}")
print(f"Blog -> Blog links: {blog_to_blog_links}")
print(f"Blog -> Service pages: {service_links}")
print(f"Blog -> Contact page: {contact_links}")

