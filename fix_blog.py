import re

with open('src/data/blogPosts.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

out_lines = []
in_content = False

for line in lines:
    if not in_content:
        # Check if this line is the start of content
        if re.search(r'^\s*content:\s*`#', line):
            in_content = True
            # Clean up the start line. It might have a backtick at the end.
            # We want it to just start with a backtick and NOT end with one.
            line = re.sub(r'`\s*$', '', line)
            # Make sure it ends with a newline
            if not line.endswith('\n'):
                line += '\n'
            # Escape internal backticks EXCEPT the very first one
            # Actually, let's just extract the text after `content: `
            match = re.match(r'^(\s*content:\s*)`(.*)', line, re.DOTALL)
            if match:
                prefix = match.group(1)
                text = match.group(2)
                # escape any backticks in text
                text = text.replace('`', '\\`')
                out_lines.append(f"{prefix}`{text}")
            else:
                out_lines.append(line)
        else:
            out_lines.append(line)
    else:
        # We are inside the content block.
        # Check if this line is the end of the object
        if re.match(r'^\s*},\s*$', line) or re.match(r'^\s*}\s*$', line) or re.match(r'^\s*];\s*$', line):
            in_content = False
            # The previous line needs a closing backtick.
            # Remove trailing newline from previous line, add backtick, then newline
            if out_lines and out_lines[-1].endswith('\n'):
                # Wait, if the previous line already has a backtick, don't add another one
                prev_line = out_lines[-1].rstrip()
                if prev_line.endswith('`') and not prev_line.endswith('\\`'):
                    pass # already has backtick
                else:
                    out_lines[-1] = out_lines[-1].rstrip('\n') + '`\n'
            out_lines.append(line)
        else:
            # Escape backticks in content lines
            escaped_line = line.replace('`', '\\`')
            out_lines.append(escaped_line)

with open('src/data/blogPosts.ts', 'w', encoding='utf-8') as f:
    f.writelines(out_lines)

print("Fixed blogPosts.ts")
