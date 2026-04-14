import { Button } from "@/components/ui/Button";

export function ProcessSection() {
  return (
    <section className="py-24 bg-brand-darker">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Unser Prozess
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Von der ersten Idee bis zum fertigen Video – transparent, effizient und partnerschaftlich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Gespräch", desc: "Wir lernen uns kennen und analysieren Ihre Ziele und Zielgruppe." },
            { step: "02", title: "Konzept", desc: "Entwicklung einer maßgeschneiderten Storyline und Produktionsplanung." },
            { step: "03", title: "Dreh", desc: "Effiziente und professionelle Umsetzung vor Ort mit modernster Technik." },
            { step: "04", title: "Schnitt", desc: "Postproduktion, Color Grading, Sound Design und Musikauswahl." },
            { step: "05", title: "Feedback", desc: "Sie sichten den ersten Entwurf. Wir setzen Ihre Änderungswünsche um." },
            { step: "06", title: "Übergabe", desc: "Auslieferung in allen benötigten Formaten für Ihre Kanäle." }
          ].map((p, i) => (
            <div key={i} className="relative p-8 border border-white/5 rounded-2xl bg-brand-bg gold-card-border">
              <div className="text-5xl font-display font-black gold-text-gradient opacity-10 absolute top-4 right-6">
                {p.step}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 relative z-10">{p.title}</h3>
              <p className="text-gray-400 relative z-10">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/kontakt" size="lg">
            Kostenloses Erstgespräch vereinbaren
          </Button>
        </div>
      </div>
    </section>
  );
}
