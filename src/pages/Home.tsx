import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ShowreelSection } from "@/components/sections/ShowreelSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Videoproduktion & Social Media Agentur Kaiserslautern | Umkreis 100km | Rezai Vision</title>
        <meta name="description" content="Strategisch geplante Videos mit hochwertiger Bildsprache, die Vertrauen aufbauen und Wirkung entfalten – für Unternehmen im Südwesten Deutschlands. Content Creator Kaiserslautern für Hero-Content und Kampagnen." />
        <link rel="canonical" href="https://rezaivision.de/" />
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": ["LocalBusiness", "ProfessionalService"],
                "name": "Rezai Vision",
                "image": "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1772569736/Parsha_Freisteller_Infusefilm_Kaiserslautern_Videoproduktion_oei9r3.webp",
                "@id": "https://rezaivision.de",
                "url": "https://rezaivision.de",
                "telephone": "+4917631739958",
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
                  "https://www.tiktok.com/@rezaivision"
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
            ]
          `}
        </script>
      </Helmet>
      
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <ApproachSection />
      <ServicesSection />
      <ShowreelSection />
      <CasesSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialSection />
      <FAQSection />
      <PricingSection />
      <CTASection />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/4917631739958?text=Hallo%20Parsha!%20Ich%20bin%20gerade%20auf%20deiner%20Website..." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group"
        aria-label="Kontakt über WhatsApp"
      >
        <MessageCircle size={28} />
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-4 bg-brand-darker border border-white/10 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-xl">
          Schnelle Frage?
        </span>
      </a>
    </div>
  );
}
