import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  keywords?: string;
  noindex?: boolean;
}

const DEFAULT_TITLE = "Unsichtbar oder Unvergesslich? | Videoproduktion Kaiserslautern | Rezai Vision";
const DEFAULT_DESCRIPTION = "Warum manche Marken faszinieren, während andere im Rauschen untergehen. Ich entwickle Videos als strategisches Werkzeug für Ihre Website, Ads und LinkedIn. Videoproduktion in Kaiserslautern & Südwesten.";
const DEFAULT_IMAGE = "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1772569736/Parsha_Freisteller_Infusefilm_Kaiserslautern_Videoproduktion_oei9r3.webp";
const SITE_URL = "https://www.rezaivision.de";

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData,
  keywords,
  noindex = false,
}: SEOProps) {
  const location = useLocation();
  const [dynamicTitle, setDynamicTitle] = useState(title);
  const [dynamicDescription, setDynamicDescription] = useState(description);
  const [dynamicKeywords, setDynamicKeywords] = useState(keywords);

  const absoluteCanonicalUrl = canonical
    ? (canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`)
    : undefined;

  useEffect(() => {
    let pageId = "";
    const path = location.pathname;
    
    if (path === "/") pageId = "home";
    else if (path === "/preisrechner") pageId = "preisrechner";
    else if (path === "/kontakt") pageId = "kontakt";
    else if (path === "/portfolio") pageId = "portfolio";
    else if (path === "/blog") pageId = "blog";
    else if (path === "/ueber-uns") pageId = "ueber-uns";

    if (!pageId) return;

    let isMounted = true;
    const fetchDynamicSEO = async () => {
      try {
        const docRef = doc(db, "seoMetadata", pageId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          if (data.title) setDynamicTitle(data.title);
          if (data.description) setDynamicDescription(data.description);
          if (data.keywords) setDynamicKeywords(data.keywords);
        }
      } catch (err) {
        console.error("Error loading dynamic SEO:", err);
      }
    };

    fetchDynamicSEO();

    return () => { isMounted = false; };
  }, [location.pathname]);

  const finalTitle = dynamicTitle || title;
  const finalDescription = dynamicDescription || description;
  const finalKeywords = dynamicKeywords || keywords;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {absoluteCanonicalUrl && <link rel="canonical" href={absoluteCanonicalUrl} />}

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="de_DE" />
      {absoluteCanonicalUrl && <meta property="og:url" content={absoluteCanonicalUrl} />}
      <meta property="og:site_name" content="Rezai Vision" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Schema.org) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
