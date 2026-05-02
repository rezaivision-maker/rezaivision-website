import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  keywords?: string;
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
}: SEOProps) {
  const absoluteCanonicalUrl = canonical
    ? (canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`)
    : undefined;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {absoluteCanonicalUrl && <link rel="canonical" href={absoluteCanonicalUrl} />}

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="de_DE" />
      {absoluteCanonicalUrl && <meta property="og:url" content={absoluteCanonicalUrl} />}
      <meta property="og:site_name" content="Rezai Vision" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
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
