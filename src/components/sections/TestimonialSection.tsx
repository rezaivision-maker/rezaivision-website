import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { testimonials } from "@/data/homeData";

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export function TestimonialSection() {
  return (
    <section className="py-24 bg-brand-darker border-y border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
           <div className="max-w-2xl">
             <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Das sagen unsere Kunden</h2>
             <div className="flex flex-wrap items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-fit">
               <span className="text-2xl font-bold font-display text-white">5.0</span>
               <div className="flex gap-1 mr-2">
                 {[1,2,3,4,5].map(i => <Star key={i} fill="#fbbc04" className="text-[#fbbc04]" size={20} />)}
               </div>
               <span className="text-sm text-gray-400 flex items-center gap-2">
                 125+ Bewertungen auf 
                 <div className="bg-white rounded-full p-1 inline-flex items-center justify-center">
                   <GoogleIcon />
                 </div>
               </span>
             </div>
           </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial: any, i) => (
              <div key={i} className="h-full">
                {/* Google Darkmode Card Style */}
                <div className="h-full rounded-2xl bg-[#202124] border border-white/5 p-6 md:p-8 flex flex-col relative group transition-transform hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:border-brand-accent/20">
                  
                  {/* Header: Avatar, Name, G-Logo */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 bg-gray-800">
                        <img
                          loading="lazy" src={testimonial.img}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-white text-[16px] leading-tight mb-1">{testimonial.name}</span>
                        <div className="flex items-center flex-wrap gap-1.5 text-[13px] text-gray-400">
                          {testimonial.isLocalGuide && (
                            <span className="flex items-center gap-1 text-gray-300">
                              <Star size={10} fill="#8AB4F8" className="text-[#8AB4F8]" />
                              Local Guide
                            </span>
                          )}
                          {testimonial.isLocalGuide && <span>·</span>}
                          <span className="truncate max-w-[150px]">{testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-full p-1.5 shrink-0 ml-2">
                      <GoogleIcon />
                    </div>
                  </div>

                  {/* Stars & Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} fill="#fbbc04" className="text-[#fbbc04] shrink-0" size={16} />
                      ))}
                    </div>
                    <span className="text-[13px] text-gray-400">{testimonial.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-[15px] text-gray-200 leading-relaxed flex-grow whitespace-pre-wrap">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300 hover:bg-white/10 transition-colors shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0"></span>
            Bereit für Ihr eigenes Erfolgsprojekt?
            <Link to="/kontakt" className="text-brand-accent font-bold hover:underline ml-1">Jetzt anfragen</Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
