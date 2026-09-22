import { useRef, useState } from "react";
import { UploadCloud, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface CloudinaryDropzoneProps {
  /** Wird mit der Cloudinary-secure_url aufgerufen, wenn ein Upload fertig ist. */
  onUploaded: (url: string) => void;
  /** Aktuelle Bild-URL — zeigt Vorschau-Thumbnail + "Öffnen"-Link an. */
  currentUrl?: string;
  label?: string;
  /** Kompakte Variante für enge Felder (z.B. Galerie). */
  compact?: boolean;
  className?: string;
}

export default function CloudinaryDropzone({
  onUploaded,
  currentUrl,
  label = "Bild hierher ziehen oder klicken",
  compact = false,
  className = "",
}: CloudinaryDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined | null) => {
    if (!file) return;
    setError(null);
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onUploaded(url);
    } catch (e: any) {
      setError(e?.message || "Upload fehlgeschlagen.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Bild in neuem Tab öffnen"
            className="group relative shrink-0"
          >
            <img
              src={currentUrl}
              alt="Vorschau"
              className="h-12 w-12 rounded-lg object-cover border border-white/10"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={14} className="text-white" />
            </span>
          </a>
        )}
        <div
          onClick={() => !isUploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed cursor-pointer transition-colors text-sm
            ${compact ? "px-3 py-2" : "px-4 py-5"}
            ${
              isDragging
                ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                : "border-white/15 text-gray-400 hover:border-brand-accent/60 hover:bg-white/5"
            }`}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Lädt hoch…
            </>
          ) : (
            <>
              <UploadCloud size={16} /> {label}
            </>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
