import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Play, ArrowRight, Instagram, Linkedin, Facebook, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { CookieBanner } from "./ui/CookieBanner";
import { Helmet } from "react-helmet-async";

const navLinks = [
  { name: "Leistungen", path: "/leistungen" },
  { name: "Referenzen", path: "/#showreel" },
  { name: "Preise", path: "/preise" },
  { name: "Über uns", path: "/ueber-uns" },
  { name: "Kontakt", path: "/kontakt" },
];

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `https://rezaivision.de${crumb.path}`
            }))
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rezai Vision",
            "alternateName": "RezaiVision Videoproduktion Kaiserslautern",
            "url": "https://rezaivision.de",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://rezaivision.de/blog?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rezai Vision",
            "url": "https://rezaivision.de",
            "logo": "https://res.cloudinary.com/dzt4f9xdi/image/upload/v1772567552/Rechteck_ts5rt1.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+49-176-31739958",
              "contactType": "customer service",
              "areaServed": "DE",
              "availableLanguage": ["German", "English"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Erfurter Straße 93",
              "addressLocality": "Kaiserslautern",
              "postalCode": "67663",
              "addressRegion": "Rheinland-Pfalz",
              "addressCountry": "DE"
            },
            "sameAs": [
              "https://www.instagram.com/rezaivision",
              "https://www.facebook.com/rezaivision",
              "https://www.tiktok.com/@rezaivision"
            ]
          })}
        </script>
      </Helmet>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-brand-bg/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter flex items-center">
              <span className="text-brand-accent">Rezai</span>
              <span className="text-white">Vision</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex shrink-0 items-center justify-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-accent whitespace-nowrap",
                  location.pathname === link.path ? "text-brand-accent" : "text-gray-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <Link
              to="/reza-e-motion"
              className={cn(
                "text-sm font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-2 border whitespace-nowrap",
                location.pathname === "/reza-e-motion" 
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/30" 
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              reza-e-motion
            </Link>
          </nav>

          <div className="flex-1 flex justify-end items-center">
            <div className="hidden lg:block">
              <Button href="/kontakt" variant="primary" size="sm">
                Projekt-Check
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-brand-text p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-bg pt-24 px-6 pb-6 flex flex-col">
          <nav className="flex flex-col gap-6 text-2xl font-display font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-brand-accent",
                  location.pathname === link.path ? "text-brand-accent" : "text-gray-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-full h-px bg-white/10 my-2" />
            <Link
              to="/reza-e-motion"
              className={cn(
                "transition-all flex items-center gap-3 px-4 py-3 rounded-xl border",
                location.pathname === "/reza-e-motion" 
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/30" 
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              reza-e-motion
            </Link>
          </nav>
          <div className="mt-auto pb-8">
            <Button href="/kontakt" variant="primary" size="lg" className="w-full h-auto py-3">
              <span className="flex flex-col items-center text-center leading-tight">
                <span>20-Minuten</span>
                <span>Projekt-Check</span>
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-darker pt-24 pb-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <Link to="/" className="text-2xl font-display font-bold tracking-tighter flex items-center mb-6">
                <span className="text-brand-accent">Rezai</span>
                <span className="text-white">Vision</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-xs text-sm leading-relaxed">
                Professionelle & verlässliche Videoproduktion mit Hauptsitz in Kaiserslautern. Wir produzieren Filme, Social Ads und Eventvideos im Umkreis von 100 km, inklusive Mannheim, Saarbrücken, Mainz und Frankfurt. Starke Arbeit verdient es, gesehen zu werden.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-display font-semibold mb-6">Leistungen</h4>
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
              <h4 className="text-lg font-display font-semibold mb-6">Unternehmen</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/#showreel" className="hover:text-brand-accent transition-colors">Referenzen</Link></li>
                <li><Link to="/preise" className="hover:text-brand-accent transition-colors">Preise</Link></li>
                <li><Link to="/ueber-uns" className="hover:text-brand-accent transition-colors">Über uns</Link></li>
                <li><Link to="/blog" className="hover:text-brand-accent transition-colors">Magazin</Link></li>
                <li><Link to="/faq" className="hover:text-brand-accent transition-colors">FAQ</Link></li>
                <li><Link to="/glossar" className="hover:text-brand-accent transition-colors">Glossar</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-semibold mb-6">Kontakt</h4>
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
                Projekt anfragen
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
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
      <CookieBanner />
    </div>
  );
}
