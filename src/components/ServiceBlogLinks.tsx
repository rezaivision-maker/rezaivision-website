import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getServiceBlogLinks } from "@/lib/serviceBlogLinks";

// Zeigt thematisch passende Blogartikel auf einer Leistungsseite (interne
// Verlinkung: gibt den Artikeln Autorität von der starken Leistungsseite).
// Rendert nichts, wenn kein passender Artikel existiert.
export function ServiceBlogLinks({ service }: { service: string }) {
  const posts = getServiceBlogLinks(service, 3);
  if (!posts.length) return null;

  return (
    <section className="py-24 bg-brand-darker border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Mehr dazu im Blog</h2>
          <p className="text-gray-400 text-lg">Vertiefendes Praxiswissen und ehrliche Einordnung zu diesem Thema.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="group block bg-brand-bg border border-white/5 rounded-2xl p-6 hover:border-brand-accent/50 transition-all"
            >
              <div className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">Blog</div>
              <h3 className="text-lg font-display font-bold mb-2 group-hover:text-brand-accent transition-colors leading-snug">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">{p.excerpt}</p>
              <span className="inline-flex items-center text-brand-accent text-xs font-bold uppercase tracking-widest">
                Artikel lesen <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
