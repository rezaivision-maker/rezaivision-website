
import { blogPosts } from '../src/data/blogPosts';

function validateBlog() {
  console.log('--- Blog Validation Started ---');
  const slugs = new Set();
  const ids = new Set();
  let errors = 0;

  blogPosts.forEach(post => {
    // Check ID
    if (ids.has(post.id)) {
      console.error(`ERROR: Duplicate ID found: ${post.id}`);
      errors++;
    }
    ids.add(post.id);

    // Check Slug
    if (slugs.has(post.slug)) {
      console.error(`ERROR: Duplicate Slug found: ${post.slug}`);
      errors++;
    }
    slugs.add(post.slug);

    // Check Required Fields
    if (!post.title || !post.excerpt || !post.content || !post.image) {
      console.error(`ERROR: Missing fields in post ${post.id}`);
      errors++;
    }

    // Check Image Path
    if (!post.image.startsWith('/images/blog/')) {
        console.warn(`WARN: Image path for ${post.id} might be non-standard: ${post.image}`);
    }
  });

  console.log(`Summary: ${blogPosts.length} posts checked. ${errors} errors found.`);
  console.log('--- Blog Validation Finished ---');
}

validateBlog();
