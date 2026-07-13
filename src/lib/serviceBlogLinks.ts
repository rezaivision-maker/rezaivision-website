import { blogPosts, BlogPost } from "@/data/blogPosts";

// Thematische Zuordnung Leistungsseite -> passende Blogartikel.
// Automatisch per Keyword-Matching: neue Artikel mit passenden Begriffen im
// Slug/Titel/Excerpt tauchen von selbst auf der richtigen Leistungsseite auf.
const SERVICE_KEYWORDS: Record<string, string[]> = {
  unternehmensfilm: [
    "imagefilm", "unternehmensfilm", "unternehmensvideo", "firmenvideo",
    "markenfilm", "vorstellungsvideo", "unternehmensvorstellung",
    "videos-fuer-unternehmen", "videos für unternehmen", "2-minuten-video",
  ],
  recruiting: [
    "recruiting", "mitarbeitergewinnung", "fachkräfte", "fachkraefte",
    "fachkraft", "bewerb", "arbeitgeber", "stellenanzeige", "personal",
  ],
  werbevideo: [
    "werbevideo", "werbung", "social ad", "social-ad", "conversion",
    "werbereel", "videoaufrufe", "3-sekunden", "anzeigenvideo", "performance",
  ],
  "social-media": [
    "social media", "social-media", "reel", "tiktok", "instagram",
    "content-erstellung", "content creator", "content-creator", "flatrate", "retainer",
  ],
  webdesign: ["webdesign", "landingpage", "web design"],
};

export function getServiceBlogLinks(service: string, limit = 3): BlogPost[] {
  const kws = SERVICE_KEYWORDS[service] || [];
  if (!kws.length) return [];
  const scored = blogPosts
    // Alle Leistungsseiten sind B2B -> nur "corporate"-Artikel zulassen, damit
    // Hochzeits-/Musik-Artikel ("emotion") nicht über generische Begriffe
    // (z.B. "Content Creator", "Instagram") auf eine Business-Seite rutschen.
    .filter((p) => p.category === "corporate")
    .map((p) => {
      const hay = `${p.slug} ${p.title} ${p.excerpt}`.toLowerCase();
      const hits = kws.reduce((s, k) => s + (hay.includes(k) ? 1 : 0), 0);
      return { p, hits };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits);
  return scored.slice(0, limit).map((x) => x.p);
}
