import { useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

/**
 * Lädt ein externes Video (Vimeo, YouTube …) erst nach Klick (DSGVO/TDDDG).
 * Vorher besteht keine Verbindung zum Anbieter. Hat der Nutzer einen Anbieter
 * auf dieser Seite schon freigegeben, laden weitere Videos desselben Anbieters
 * (z. B. im Slider) ohne erneuten Klick – bis die Seite neu geladen wird.
 */
const freigegeben = new Set<string>();

function anbieter(src: string): string {
  if (/vimeo\.com/i.test(src)) return "Vimeo";
  if (/youtu(\.be|be\.com|be-nocookie\.com)/i.test(src)) return "YouTube";
  try {
    return new URL(src).hostname;
  } catch {
    return "einem externen Anbieter";
  }
}

type Props = {
  src: string;
  title: string;
  allow?: string;
  className?: string;
  allowFullScreen?: boolean;
};

export function ClickToLoadEmbed({
  src,
  title,
  allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share",
  className = "absolute inset-0 w-full h-full",
  allowFullScreen = true,
}: Props) {
  const name = anbieter(src);
  const [aktiv, setAktiv] = useState(() => freigegeben.has(name));

  if (aktiv) {
    return (
      <iframe
        src={src}
        className={className}
        allow={allow}
        allowFullScreen={allowFullScreen}
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    );
  }

  return (
    <div className={`${className} flex flex-col items-center justify-center gap-4 bg-zinc-950 p-6 text-center`}>
      <button
        type="button"
        onClick={() => {
          freigegeben.add(name);
          setAktiv(true);
        }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/90 text-brand-bg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent"
        aria-label={`Video „${title}“ von ${name} laden und abspielen`}
      >
        <Play size={28} className="ml-1" aria-hidden="true" />
      </button>
      <p className="max-w-sm text-xs leading-relaxed text-gray-400">
        Mit dem Klick wird das Video von {name} geladen; dabei werden Daten (u. a. Ihre IP-Adresse) an {name} übertragen.{" "}
        <Link to="/datenschutz" className="text-brand-accent hover:underline">Datenschutz</Link>
      </p>
    </div>
  );
}
