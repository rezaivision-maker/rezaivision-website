import subprocess

js_code = """
import { blogPosts } from './src/data/blogPosts.ts';
blogPosts.forEach((post, i) => {
  console.log(`Post ${i+1}: ${JSON.stringify(post.content.slice(-20))}`);
});
"""

res = subprocess.run(['npx', 'tsx', '-e', js_code], capture_output=True, text=True)
print("Stdout:")
print(res.stdout)
print("Stderr:")
print(res.stderr)
