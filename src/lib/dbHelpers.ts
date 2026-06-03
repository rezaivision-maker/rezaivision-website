import { collection, getDocs, doc, setDoc, deleteDoc, query, where, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { blogPosts as staticPosts, BlogPost } from "@/data/blogPosts";

const COLLECTION_NAME = "posts";

// Helper to convert Firestore docs to BlogPost objects
const mapDocToPost = (docData: any, id: string): BlogPost => {
  return {
    id,
    slug: docData.slug || "",
    title: docData.title || "",
    excerpt: docData.excerpt || "",
    content: docData.content || "",
    category: docData.category || "corporate",
    date: docData.date || "",
    readTime: docData.readTime || "",
    image: docData.image || "",
    ctaLabel: docData.ctaLabel || "",
    ctaLink: docData.ctaLink || "",
    layout: docData.layout || "standard",
    kpiTitle1: docData.kpiTitle1 || "",
    kpiValue1: docData.kpiValue1 || "",
    kpiTitle2: docData.kpiTitle2 || "",
    kpiValue2: docData.kpiValue2 || "",
    clientName: docData.clientName || "",
    projectDuration: docData.projectDuration || "",
    galleryImages: docData.galleryImages || [],
    videoUrl: docData.videoUrl || "",
  };
};

/**
 * Fetches all blog posts from Firestore.
 * Fallback: If Firestore is empty or fails, returns the static posts.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const q = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("Firestore collection is empty, using fallback static data.");
      return staticPosts;
    }

    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      posts.push(mapDocToPost(doc.data(), doc.id));
    });
    
    // Sort by date (you can add a custom ordering if needed)
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts from Firestore: ", error);
    return staticPosts;
  }
}

/**
 * Fetches a single blog post by its slug.
 * Checks Firestore first. Fallback: static posts.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return mapDocToPost(docSnap.data(), docSnap.id);
    }
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}: `, error);
  }

  // Fallback
  const staticPost = staticPosts.find((p) => p.slug === slug);
  return staticPost || null;
}

/**
 * Saves (Creates or Updates) a blog post in Firestore.
 */
export async function saveBlogPost(post: BlogPost): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, post.id);
  // Remove id from the document body to prevent duplication in Firestore fields
  const { id, ...dataWithoutId } = post;
  await setDoc(docRef, dataWithoutId, { merge: true });
}

/**
 * Deletes a blog post from Firestore.
 */
export async function deleteBlogPost(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Bulk imports all static blog posts into Firestore.
 * Useful for initializing the database.
 */
export async function importStaticPosts(): Promise<void> {
  for (const post of staticPosts) {
    await saveBlogPost(post);
  }
}
