import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
          Bereit für den <span className="gold-text-gradient">nächsten Schritt?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 font-light">
          Lassen Sie uns in einem kurzen, unverbindlichen Gespräch herausfinden, wie wir Ihr Unternehmen durch Video sichtbar machen können.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button href="/kontakt" size="lg" className="text-lg h-16 px-12">
            Projektanfrage starten
          </Button>
        </div>
        <p className="mt-8 text-lg text-gray-300">
          Oder unkompliziert: <a href="https://wa.me/4917631739958?text=Hallo%20Parsha!%20Wir%20haben%20Interesse%20an%20einer%20Videoproduktion..." target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline font-medium">Schreiben Sie mir direkt auf WhatsApp.</a>
        </p>
        <p className="mt-6 text-sm text-gray-400">
          Erstgespräche sind immer kostenlos & unverbindlich.
        </p>
        
        <div className="mt-20 pt-8 border-t border-white/10">
          <p className="text-xs text-brand-accent/60 leading-relaxed max-w-3xl mx-auto font-light">
            Ihre Agentur für professionelle Videoproduktion in Kaiserslautern, Mannheim, Frankfurt am Main, Mainz, Saarbrücken und Wiesbaden. Wir realisieren leistungsstarke Unternehmensfilme, Recruiting Videos und Social Media Ads im gesamten kaufkräftigen Südwesten (Rheinland-Pfalz, Saarland, Hessen und deutschlandweit).
          </p>
        </div>
      </div>
    </section>
  );
}
