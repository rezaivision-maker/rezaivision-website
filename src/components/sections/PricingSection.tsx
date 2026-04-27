
export function PricingSection() {
  return (
    <section className="py-24 bg-brand-bg border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
            Was kostet eine Videoproduktion?
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Der Aufwand hängt vom Projekt ab.<br />
            Hier finden Sie typische Preisbereiche zur Orientierung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Unternehmensfilm",
              price: "ab 2.490 €",
              desc: "Authentische & hochwertige Videoproduktion für Ihre Website und Markenbildung."
            },
            {
              title: "Recruiting Video",
              price: "ab 1.890 €",
              desc: "Effiziente Bewerbergewinnung durch echten Einblick in Ihre Unternehmenskultur."
            },
            {
              title: "Social Ads / Einzelspot",
              price: "ab 1.490 €",
              desc: "Verkaufsstarke Clips für Social Media Ads oder Landingpages."
            },
            {
              title: "Social Media Retainer",
              price: "ab 1.490 € / Monat",
              desc: "Planvolle, kontinuierliche Sichtbarkeit durch regelmäßigen Content-Support.",
              highlight: true
            }
          ].map((plan, i) => (
            <div key={i} className={`p-8 rounded-2xl border ${plan.highlight ? 'border-brand-accent/50 bg-brand-accent/5' : 'border-white/5 bg-brand-darker'} flex flex-col h-full`}>
              <h3 className="text-xl font-display font-bold mb-4 min-h-[3.5rem] sm:min-h-0 md:min-h-[4rem] flex items-start">{plan.title}</h3>
              <div className="text-2xl font-bold gold-text-gradient mb-4 shrink-0">{plan.price}</div>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">{plan.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-400">
            Der genaue Preis hängt von Umfang, Drehaufwand und Zielsetzung ab.<br />
            Nach einem kurzen Gespräch erhalten Sie eine transparente Einschätzung.
          </p>
        </div>
      </div>
    </section>
  );
}
