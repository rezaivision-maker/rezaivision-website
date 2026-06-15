with open('src/data/blogPosts.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace all occurrences of \\`` (backslash followed by two backticks) with just ` (one backtick).
# Let's count them first.
count = content.count('\\``')
print(f"Found {count} occurrences of '\\``'")

# Replace them
new_content = content.replace('\\``', '`')

with open('src/data/blogPosts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement complete.")
