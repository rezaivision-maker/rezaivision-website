import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/homeData";

export function TestimonialSection() {
  return (
    <section className="py-24 bg-brand-darker border-y border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, i) => (
              <div key={i} className="h-full">
                <div className="h-full rounded-3xl bg-brand-bg/40 border border-white/5 backdrop-blur-md p-10 flex flex-col relative group hover:bg-brand-bg/60 hover:border-brand-accent/30 transition-all duration-500 shadow-xl">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-accent/10 -z-10" />
                  
                  <p className="text-[22px] font-light leading-relaxed mb-10 italic text-gray-100 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10">
                        <img
                          loading="lazy" src={testimonial.img}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold font-display text-lg text-white">{testimonial.name}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">{testimonial.role}</div>
                      <div className="flex gap-0.5 mt-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} fill="#D4AF37" className="text-brand-accent shrink-0" size={12} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Bereit für Ihr eigenes Erfolgsprojekt?
            <Link to="/kontakt" className="text-brand-accent font-bold hover:underline ml-2">Jetzt anfragen</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
