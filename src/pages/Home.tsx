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
        <meta name="description" content="Ihre Agentur für Videoproduktion in Kaiserslautern, Mannheim & Rheinland-Pfalz. Wir erstellen performante Unternehmensfilme, Recruiting Videos und Social Media Ads im Umkreis von 100km." />
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
                "areaServed": ["Deutschland", "Rheinland-Pfalz", "Saarland", "Hessen", "Kaiserslautern", "Mannheim", "Frankfurt am Main", "Mainz", "Saarbrücken", "Wiesbaden"],
                "description": "Premium Agentur für Videoproduktion aus Kaiserslautern. Spezialisiert auf Unternehmensfilme, Video Ads, Social Media Reels und Recruiting Videos für den regionalen Mittelstand.",
                "founder": {
                  "@type": "Person",
                  "name": "Parsha Rezai",
                  "jobTitle": "Lead Videographer & Founder"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "reviewCount": "24",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "sameAs": [
                  "https://www.instagram.com/rezaivision",
                  "https://www.linkedin.com/in/parsha-rezai"
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
                      "text": "Die Preise für Unternehmensfilme und Recruitingvideos starten bei 2.490 €. Werbekampagnen und Video Ads beginnen bei 1.990 €. Regelmäßige Social Media Content Produktionen (TikToks, Reels) starten bei 490 €."
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
