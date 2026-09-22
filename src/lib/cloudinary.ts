// Direkter Browser-Upload zu Cloudinary über ein "unsigned" Upload-Preset.
// Kein Secret nötig — der Preset-Name ist öffentlich (in Cloudinary als
// "unsigned" konfiguriert). /admin ist ohnehin passwortgeschützt.
//
// Einmalige Einrichtung in Cloudinary:
//   Settings → Upload → Upload presets → Add → Signing mode: Unsigned
//   → Name exakt wie UPLOAD_PRESET unten.
//
// Die Originaldatei wird unverändert hochgeladen (hohe Quellauflösung,
// vgl. CLAUDE.md-Regel 5a) — Cloudinary skaliert bei der Auslieferung.

const CLOUD_NAME = "dzt4f9xdi";
const UPLOAD_PRESET = "rezaivision_blog";
const UPLOAD_FOLDER = "blog";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function uploadToCloudinary(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Nur Bilddateien werden unterstützt.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Bild ist zu groß (max. 10 MB).");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", UPLOAD_FOLDER);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    let msg = `${res.status}`;
    try {
      const err = await res.json();
      msg = err?.error?.message || msg;
    } catch {
      /* Antwort war kein JSON — Status-Code reicht */
    }
    throw new Error(`Cloudinary-Upload fehlgeschlagen: ${msg}`);
  }

  const data = await res.json();
  if (!data.secure_url) {
    throw new Error("Cloudinary lieferte keine URL zurück.");
  }
  return data.secure_url as string;
}
