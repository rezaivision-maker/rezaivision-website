import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Play, ArrowRight, Instagram, Linkedin, Facebook, Music, ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { CookieBanner } from "./ui/CookieBanner";
import { SEO } from "./SEO";
import { NavDropdown } from "./NavDropdown";

const navLinks = [
  { name: "Portfolio", path: "/#cases" },
  { name: "Preisrechner", path: "/preisrechner" },
  { name: "Magazin", path: "/blog" },
  { name: "Über uns", path: "/ueber-uns" },
  { name: "Kontakt", path: "/kontakt" },
];

const leistungenItems = [
  { name: "Unternehmensfilm", path: "/leistungen/unternehmensfilm", desc: "Strategisches Branding & Vertrauen" },
  { name: "Recruiting Video", path: "/leistungen/recruiting", desc: "Automatisierte Mitarbeitergewinnung" },
  { name: "Social Ads", path: "/leistungen/werbevideo", desc: "Messbare Leads & Verkaufspsychologie" },
  { name: "Social Media Retainer", path: "/leistungen/social-media", desc: "Dauerhafte Präsenz & Betreuung" },
  { name: "Webdesign & Websites", path: "/leistungen/webdesign", desc: "Video-optimierte Websites & Landingpages" }
];

const rezaEmotionItems = [
  { name: "Eventbegleitung", path: "/reza-e-motion/eventbegleitung", desc: "Aftermovies & Highlights" },
  { name: "Musikvideos", path: "/reza-e-motion/musikvideos", desc: "Kreative Visuals für Artists" },
  { name: "Hochzeitsfilme", path: "/reza-e-motion/hochzeitsfilme", desc: "Emotionale Erinnerungen" }
];

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLeistungenOpen, setMobileLeistungenOpen] = useState(false);
  const [mobileRezaOpen, setMobileRezaOpen] = useState(false);
  const location = useLocation();

  // Breadcrumb logic for SEO
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
      return { name, path };
    })
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileLeistungenOpen(false);
    setMobileRezaOpen(false);
    if (location.hash) {
      // Sections are lazy-loaded, so the anchor element may not exist yet.
      // Retry for up to ~2s until it mounts, then scroll to it.
      const id = location.hash.replace('#', '');
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 20) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <SEO
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `https://www.rezaivision.de${crumb.path}`
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rezai Vision",
            "alternateName": "RezaiVision Videoproduktion Kaiserslautern",
            "url": "https://www.rezaivision.de",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.rezaivision.de/blog?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rezai Vision",
            "url": "https://www.rezaivision.de",
            "logo": "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1779109661/Rezaivisionlogo_Website_z2jteg.svg",
            "sameAs": [
              "https://www.instagram.com/rezaivision",
              "https://www.facebook.com/rezaivision",
              "https://www.tiktok.com/@rezaivision",
              "https://www.linkedin.com/company/rezaivision"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Videoproduktion & Video-Marketing",
            "provider": {
              "@type": "Organization",
              "name": "Rezai Vision"
            },
            "areaServed": "DE",
            "offers": {
              "@type": "AggregateOffer",
              "offerCount": "8",
              "lowPrice": "0",
              "priceCurrency": "EUR",
              "url": "https://www.rezaivision.de/",
              "availability": "https://schema.org/InStock"
            }
          }
        ]}
      />
      {/* Skip-Link für Tastaturnutzer */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-accent focus:text-brand-dark focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        Zum Inhalt springen
      </a>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-brand-bg/95 backdrop-blur-lg py-3 border-b border-brand-accent/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1500px] 3xl:max-w-[2000px] mx-auto px-4 md:px-8 xl:px-12 3xl:px-20 flex items-center justify-between gap-2 xl:gap-4">
          <div className="flex-none flex justify-start shrink-0">
            <Link to="/" className="group flex items-center shrink-0">
              <img 
                src="https://res.cloudinary.com/dzt4f9xdi/image/upload/v1779109661/Rezaivisionlogo_Website_z2jteg.svg" 
                alt="Rezai Vision Logo" 
                className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                width="160"
                height="32"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 px-2 mx-auto">
            <NavDropdown
              title="Leistungen"
              path="/leistungen"
              items={leistungenItems}
              isActive={location.pathname.startsWith("/leistungen")}
            />

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative text-sm xl:text-[15px] font-medium tracking-wide transition-all duration-300 py-2 whitespace-nowrap group flex-shrink-0",
                  location.pathname === link.path ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent rounded-full animate-fade-in-up" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent/50 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />
            <NavDropdown
              title="reza-e-motion"
              path="/reza-e-motion"
              items={rezaEmotionItems}
              isActive={location.pathname.startsWith("/reza-e-motion")}
              isSpecial
            />
          </nav>

          <div className="flex-none flex justify-end items-center shrink-0">
            <div className="hidden lg:block">
              <Button
                href="/kontakt"
                variant="primary"
                size="sm"
                className="px-6 py-2.5 whitespace-nowrap shadow-[0_0_20px_rgba(200,164,107,0.1)] hover:shadow-[0_0_30px_rgba(200,164,107,0.25)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Kostenloses Erstgespräch
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              className="lg:hidden text-brand-text p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-brand-bg/98 backdrop-blur-xl pt-24 px-6 pb-6 flex flex-col overflow-y-auto transition-all duration-300 ease-out",
          mobileMenuOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 text-2xl font-display font-bold">
          {/* Mobile Leistungen Accordion */}
          <div>
            <button
              onClick={() => setMobileLeistungenOpen(!mobileLeistungenOpen)}
              className={cn(
                "flex items-center justify-between w-full py-2 transition-colors",
                location.pathname.startsWith("/leistungen") ? "text-brand-accent" : "text-gray-300"
              )}
            >
              Leistungen
              <ChevronDown className={cn("transition-transform duration-300", mobileLeistungenOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                mobileLeistungenOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="flex flex-col gap-4 pl-4 mt-2 border-l border-brand-accent/20">
                <Link to="/leistungen" className="text-lg text-brand-accent font-bold">Übersicht: Alle Leistungen</Link>
                <div className="w-8 h-px bg-white/10 my-1" />
                {leistungenItems.map(item => (
                  <Link key={item.path} to={item.path} className="text-lg text-gray-300">{item.name}</Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "py-2 transition-colors block w-full",
                  location.pathname === link.path ? "text-brand-accent" : "text-white/90"
                )}
              >
                {link.name}
              </Link>
            </div>
          ))}

          <div className="w-full h-px bg-white/10 my-2" />

          {/* Mobile Reza Accordion */}
          <div>
            <button
              onClick={() => setMobileRezaOpen(!mobileRezaOpen)}
              className={cn(
                "flex items-center justify-between w-full py-3 px-4 rounded-xl border transition-all",
                location.pathname.startsWith("/reza-e-motion")
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                  : "bg-white/5 text-gray-300 border-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                reza-e-motion
              </div>
              <ChevronDown className={cn("transition-transform duration-300", mobileRezaOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                mobileRezaOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="flex flex-col gap-4 pl-4 mt-4 border-l border-purple-500/30">
                <Link to="/reza-e-motion" className="text-lg text-purple-400 font-bold">Übersicht: reza-e-motion</Link>
                <div className="w-8 h-px bg-white/10 my-1" />
                {rezaEmotionItems.map(item => (
                  <Link key={item.path} to={item.path} className="text-lg text-gray-300">{item.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="mt-auto pb-8 flex flex-col gap-8">
          <div className="flex justify-center gap-8 text-gray-400">
            <a href="https://www.instagram.com/rezaivision" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-accent transition-colors p-2">
              <Instagram size={28} />
            </a>
            <a href="https://www.tiktok.com/@rezaivision" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-brand-accent transition-colors p-2">
              <Music size={28} />
            </a>
            <a href="https://www.facebook.com/rezaivision" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-accent transition-colors p-2">
              <Facebook size={28} />
            </a>
          </div>
          <Button href="/kontakt" variant="primary" size="lg" className="w-full h-auto py-4 text-xl">
            Kostenloses Erstgespräch
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {!location.pathname.startsWith("/admin") && (
        <footer className="bg-brand-darker pt-24 pb-12 border-t border-white/5">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div>
                <Link to="/" className="group inline-block mb-6">
                  <img 
                    src="https://res.cloudinary.com/dzt4f9xdi/image/upload/v1779109661/Rezaivisionlogo_Website_z2jteg.svg" 
                    alt="Rezai Vision Logo" 
                    className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    width="240"
                    height="48"
                  />
                </Link>
                <p className="text-gray-400 mb-6 max-w-xs text-sm leading-relaxed">
                  Professionelle & verlässliche Videoproduktion mit Hauptsitz in Kaiserslautern. Wir produzieren Filme, Social Ads und Eventvideos im Umkreis von 100 km, inklusive Mannheim, Saarbrücken, Mainz und Frankfurt. Starke Arbeit verdient es, gesehen zu werden.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold mb-6">Leistungen</h3>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to="/leistungen#unternehmensfilm" className="hover:text-brand-accent transition-colors">Unternehmensfilm</Link></li>
                  <li><Link to="/leistungen#recruiting" className="hover:text-brand-accent transition-colors">Recruiting Video</Link></li>
                  <li><Link to="/leistungen#werbevideo" className="hover:text-brand-accent transition-colors">Werbevideo</Link></li>
                  <li><Link to="/leistungen#social-media" className="hover:text-brand-accent transition-colors">Social Media Content</Link></li>
                  <li className="pt-2">
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/reza-e-motion"
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm w-fit",
                          location.pathname === "/reza-e-motion"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        reza-e-motion
                      </Link>
                      <div className="pl-4 border-l border-white/10 flex flex-col gap-2 text-sm">
                        <Link to="/reza-e-motion/eventbegleitung" className="text-gray-400 hover:text-purple-400 transition-colors">Eventbegleitung</Link>
                        <Link to="/reza-e-motion/musikvideos" className="text-gray-400 hover:text-purple-400 transition-colors">Musikvideos</Link>
                        <Link to="/reza-e-motion/hochzeitsfilme" className="text-gray-400 hover:text-purple-400 transition-colors">Hochzeitsfilme</Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold mb-6">Unternehmen</h3>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to="/#cases" className="hover:text-brand-accent transition-colors">Referenzen</Link></li>
                  <li><Link to="/preisrechner" className="hover:text-brand-accent transition-colors">Preisrechner</Link></li>
                  <li><Link to="/ueber-uns" className="hover:text-brand-accent transition-colors">Über uns</Link></li>
                  <li><Link to="/technik" className="hover:text-brand-accent transition-colors">Technik & Qualität</Link></li>
                  <li><Link to="/blog" className="hover:text-brand-accent transition-colors">Magazin</Link></li>
                  <li><Link to="/faq" className="hover:text-brand-accent transition-colors">FAQ</Link></li>
                  <li><Link to="/glossar" className="hover:text-brand-accent transition-colors">Glossar</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold mb-6">Kontakt</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>Kaiserslautern, Deutschland</li>
                  <li><a href="mailto:rezaivision@gmail.com" className="hover:text-brand-accent transition-colors">rezaivision@gmail.com</a></li>
                  <li>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+4963162512000" className="hover:text-brand-accent transition-colors">0631 62512000</a>
                      <a href="tel:+4917631739958" className="hover:text-brand-accent transition-colors">0176 31739958</a>
                    </div>
                  </li>
                </ul>
                <Button href="/kontakt" variant="outline" size="sm" className="mt-6 w-full">
                  Kostenloses Erstgespräch
                </Button>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Rezai Vision. Alle Rechte vorbehalten.</p>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/rezaivision" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors">
                    <Instagram size={20} />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="https://www.tiktok.com/@rezaivision" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors">
                    <Music size={20} />
                    <span className="sr-only">TikTok</span>
                  </a>
                  <a href="https://www.facebook.com/rezaivision" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors">
                    <Facebook size={20} />
                    <span className="sr-only">Facebook</span>
                  </a>
                </div>
                <div className="flex gap-6">
                  <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                  <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                  <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Floating WhatsApp Button */}
      {!location.pathname.startsWith("/admin") && !location.pathname.startsWith("/portal") && (
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
      )}

      <CookieBanner />
    </div>
  );
}
