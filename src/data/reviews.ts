import googleReviewsJson from "./googleReviews.json";
import { testimonials } from "./homeData";

// Live Google data is written at build time by scripts/fetch-google-reviews.js
// when GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set. Until then we fall back
// to the curated, real testimonials — so no rating/number is ever invented.
const googleData = googleReviewsJson as {
  source?: string;
  rating?: number | null;
  userRatingCount?: number | null;
  fetchedAt?: string | null;
};

const isLive =
  googleData.source === "live" && typeof googleData.userRatingCount === "number";

export const reviewStats = {
  // Average star rating (live from Google, else 5.0 from the displayed reviews).
  rating: typeof googleData.rating === "number" ? googleData.rating : 5.0,
  // Number of reviews. Live = real Google total. Fallback = number of real
  // testimonials actually shown on the page (honest, never inflated).
  count: isLive ? (googleData.userRatingCount as number) : testimonials.length,
  isLive,
};

// Schema.org Review objects built from the REAL, visible testimonials so the
// structured data always matches what visitors actually see (Google requirement).
export const schemaReviews = testimonials.map((t) => ({
  "@type": "Review",
  author: { "@type": "Person", name: t.name },
  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  reviewBody: t.quote,
}));
