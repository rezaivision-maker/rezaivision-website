import { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/sections/HeroSection";
import { MessageCircle } from "lucide-react";

// Lazy load below-the-fold components
const TrustSection = lazy(() => import("@/components/sections/TrustSection").then(m => ({ default: m.TrustSection })));
const ProblemSection = lazy(() => import("@/components/sections/ProblemSection").then(m => ({ default: m.ProblemSection })));
const ApproachSection = lazy(() => import("@/components/sections/ApproachSection").then(m => ({ default: m.ApproachSection })));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const ShowreelSection = lazy(() => import("@/components/sections/ShowreelSection").then(m => ({ default: m.ShowreelSection })));
const CasesSection = lazy(() => import("@/components/sections/CasesSection").then(m => ({ default: m.CasesSection })));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection })));
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const TestimonialSection = lazy(() => import("@/components/sections/TestimonialSection").then(m => ({ default: m.TestimonialSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const PricingSection = lazy(() => import("@/components/sections/PricingSection").then(m => ({ default: m.PricingSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Videoproduktion Kaiserslautern | Rezai Vision"
        description="Strategisch geplante Videos mit hochwertiger Bildsprache, die Vertrauen aufbauen und Wirkung entfalten – für Unternehmen im Südwesten Deutschlands. Content Creator Kaiserslautern für Hero-Content und Kampagnen."
        canonical="/"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "name": "Rezai Vision",
            "image": "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1772569736/Parsha_Freisteller_Infusefilm_Kaiserslautern_Videoproduktion_oei9r3.webp",
            "@id": "https://www.rezaivision.de",
            "url": "https://www.rezaivision.de",
            "telephone": "+4963162512000",
            "priceRange": "€€",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Erfurter Straße 93",
              "addressLocality": "Kaiserslautern",
              "postalCode": "67663",
              "addressRegion": "Rheinland-Pfalz",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 49.4442,
              "longitude": 7.7314
            },
            "areaServed": [
              {
                "@type": "GeoCircle",
                "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 49.4447, "longitude": 7.7689 },
                "geoRadius": "100000",
                "description": "100km Umkreis Kaiserslautern"
              },
              { "@type": "State", "name": "Rheinland-Pfalz", "addressCountry": "DE" },
              { "@type": "State", "name": "Saarland", "addressCountry": "DE" },
              { "@type": "State", "name": "Hessen", "addressCountry": "DE" },
              { "@type": "State", "name": "Baden-Württemberg", "addressCountry": "DE" },
              { "@type": "City", "name": "Kaiserslautern", "addressCountry": "DE" },
              { "@type": "City", "name": "Mannheim", "addressCountry": "DE" },
              { "@type": "City", "name": "Frankfurt am Main", "addressCountry": "DE" },
              { "@type": "City", "name": "Mainz", "addressCountry": "DE" },
              { "@type": "City", "name": "Saarbrücken", "addressCountry": "DE" },
              { "@type": "City", "name": "Ludwigshafen", "addressCountry": "DE" },
              { "@type": "City", "name": "Heidelberg", "addressCountry": "DE" },
              { "@type": "City", "name": "Neustadt an der Weinstraße", "addressCountry": "DE" },
              { "@type": "City", "name": "Pirmasens", "addressCountry": "DE" },
              { "@type": "City", "name": "Zweibrücken", "addressCountry": "DE" },
              { "@type": "City", "name": "Speyer", "addressCountry": "DE" },
              { "@type": "City", "name": "Worms", "addressCountry": "DE" },
              { "@type": "City", "name": "Trier", "addressCountry": "DE" },
              { "@type": "City", "name": "Landstuhl", "addressCountry": "DE" },
              { "@type": "City", "name": "Kusel", "addressCountry": "DE" }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "description": "Strategisch geplante Videos mit hochwertiger Bildsprache, die Vertrauen aufbauen und Wirkung entfalten – für Unternehmen im Südwesten Deutschlands. Content Creator Kaiserslautern für Hero-Content und Kampagnen.",
            "founder": {
              "@type": "Person",
              "name": "Parsha Rezai",
              "jobTitle": "Lead Videographer & Founder"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "125",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Ramin F." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Parsha hat für unser Unternehmen einen Imagefilm produziert, der unsere Erwartungen übertroffen hat. Sehr professionell und kreativ.",
                "datePublished": "2025-11-15"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Marcel W." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Dank der Social Media Videos von Rezai Vision kamen 70% unserer Bewerbungen über Instagram. Absolute Empfehlung für Recruiting!",
                "datePublished": "2025-09-20"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "David B." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Die Reels und Ads für unser Tattoo-Studio haben unsere Sichtbarkeit in Kaiserslautern enorm gesteigert. Top Qualität!",
                "datePublished": "2025-08-10"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Ralph N." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Professionelle Produktvideos für unsere Industrienähmaschinen. Perfekte Umsetzung für Messe und Social Media.",
                "datePublished": "2026-01-05"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Parnaz S." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Der Hochzeitsfilm war einfach perfekt. Jeder Moment wurde eingefangen, ohne dass wir etwas davon gemerkt haben. Wunderschön!",
                "datePublished": "2025-07-22"
              }
            ],
            "sameAs": [
              "https://www.instagram.com/rezaivision",
              "https://www.facebook.com/rezaivision",
              "https://www.tiktok.com/@rezaivision",
              "https://www.linkedin.com/company/rezaivision"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Was kostet eine Videoproduktion bei Rezai Vision in Kaiserslautern?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Preise für Unternehmensfilme starten bei 2.490 €, Recruitingvideos bei 1.890 €. Werbekampagnen und Video Ads beginnen bei 1.490 €. Regelmäßige Social Media Content Produktionen (TikToks, Reels) starten bei 490 €."
                }
              },
              {
                "@type": "Question",
                "name": "Wie lange dauert eine typische Videoproduktion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Der genaue Zeitraum hängt vom Umfang ab. In der Regel benötigen wir von der Konzeption bis zum fertigen Video etwa 2 bis 4 Wochen."
                }
              },
              {
                "@type": "Question",
                "name": "Brauchen wir für unser Unternehmensvideo professionelle Schauspieler?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nicht zwingend. Oft wirken echte Mitarbeiter viel authentischer. Sollten für Kampagnen Darsteller nötig sein, übernehmen wir das Casting."
                }
              }
            ]
          }
        ]}
      />

      <HeroSection />
      
      <Suspense fallback={null}>
        <div className="section-deferred"><TrustSection /></div>
        <div className="section-deferred"><ProblemSection /></div>
        <div className="section-deferred"><ApproachSection /></div>
        <div className="section-deferred"><ServicesSection /></div>
        <div className="section-deferred"><ShowreelSection /></div>
        <div className="section-deferred"><CasesSection /></div>
        <div className="section-deferred"><ProcessSection /></div>
        <div className="section-deferred"><AboutSection /></div>
        <div className="section-deferred"><TestimonialSection /></div>
        <div className="section-deferred"><FAQSection /></div>
        <div className="section-deferred"><PricingSection /></div>
        <div className="section-deferred"><CTASection /></div>
      </Suspense>

    </div>
  );
}
