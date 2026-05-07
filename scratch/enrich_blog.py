with open("src/data/blogPosts.ts", "r", encoding="utf-8") as f:
    text = f.read()

replacements = [
    # Imagefilm / Unternehmensfilm
    (
        "Das ist die eigentliche Stärke eines guten Imagefilms",
        "Das ist die eigentliche Stärke einer [hochwertigen Videoproduktion](/leistungen/unternehmensfilm)"
    ),
    (
        "Ein Werbevideo pusht ein konkretes Angebot",
        "Ein [Werbevideo für Social Media](/leistungen/werbevideo) pusht ein konkretes Angebot"
    ),
    (
        "Wer beim Imagefilm spart, spart oft genau an der Stelle",
        "Wer bei der Videoproduktion in Kaiserslautern oder im ganzen Südwesten spart, spart oft genau an der Stelle"
    ),
    (
        "Ein Unternehmensvideo ist meist kein Kleinstbetrag.",
        "Ein professioneller [Unternehmensfilm](/leistungen/unternehmensfilm) ist meist kein Kleinstbetrag."
    ),
    # Recruiting
    (
        "Ein Recruiting-Problem? Ein kurzer Blick in eure Werkstatt",
        "Ein Recruiting-Problem? Ein authentisches [Recruiting Video](/leistungen/recruiting) mit einem Blick in eure Werkstatt"
    ),
    (
        "Das ist kein Marketing-Wunschtraum. Das ist, wie gute Fachkräfte 2026 den Schritt zu einem neuen Arbeitgeber machen.",
        "Das ist kein Marketing-Wunschtraum. Das ist, wie gute Fachkräfte 2026 im Raum Pfalz und Saarland durch gezielte [Recruiting Videos](/leistungen/recruiting) den Schritt zu einem neuen Arbeitgeber machen."
    ),
    # Social Media / Werbevideo
    (
        "Die gute Nachricht: Aus einem einzigen Drehtag lassen sich viele verschiedene Clips schneiden.",
        "Die gute Nachricht: Aus einem einzigen Drehtag lassen sich im Rahmen einer [Social Media Betreuung](/leistungen/social-media) viele verschiedene Clips schneiden."
    ),
    (
        "Ein gutes Werbevideo ist kein Kunstprojekt, sondern ein Werkzeug.",
        "Ein gutes [Werbevideo](/leistungen/werbevideo) ist kein Kunstprojekt, sondern ein Performance-Werkzeug für Unternehmen in Mannheim, Mainz und Kaiserslautern."
    ),
    # Regional keywords
    (
        "Der Markt für Videoproduktionen ist groß und unübersichtlich.",
        "Der Markt für professionelle Videoproduktion in Kaiserslautern, Saarbrücken und dem Südwesten ist groß und unübersichtlich."
    ),
    (
        "Vertrauen entsteht nicht durch Behauptungen, sondern durch Beweise. Und das einzige Medium",
        "Vertrauen entsteht nicht durch Behauptungen, sondern durch Beweise. Und das einzige Medium in der B2B-Videoproduktion"
    ),
    # Interlinking Blog -> Blog
    (
        "Ein Video auf YouTube hochladen und hoffen, dass es gefunden wird – das ist kein Plan.",
        "Ein Video einfach auf YouTube hochzuladen ist kein Plan (mehr dazu in unserem [Artikel über Werbevideos](/blog/werbevideo-unternehmen-was-es-leisten-muss))."
    ),
    (
        "Ihr sucht keinen Dienstleister, der dreht und abliefert.",
        "Ihr sucht keinen Dienstleister, der einfach nur Bilder abliefert. Genau deshalb ist auch die [Unterscheidung zwischen Content Creator und Videograf](/blog/wedding-content-creator-vs-videograf-kaiserslautern) so entscheidend."
    ),
    # Private Events / reza-e-motion
    (
        "Ein Hochzeitsvideograf liefert euren emotionalen Hochzeitsfilm für die Ewigkeit.",
        "Ein klassischer [Hochzeitsvideograf](/reza-e-motion/hochzeitsfilme) liefert euren emotionalen Hochzeitsfilm für die Ewigkeit."
    ),
    (
        "Kurz gesagt: Ein Hochzeitsvideograf",
        "Kurz gesagt: Ein Videograf (mehr zu unseren [privaten Eventbegleitungen](/reza-e-motion/eventbegleitung))"
    )
]

for old, new in replacements:
    if old in text:
        text = text.replace(old, new, 1) # Only replace the first occurrence to be safe
    else:
        print(f"Warning: Could not find '{old[:30]}...'")

with open("src/data/blogPosts.ts", "w", encoding="utf-8") as f:
    f.write(text)
print("Blog posts updated with internal links and keywords.")
