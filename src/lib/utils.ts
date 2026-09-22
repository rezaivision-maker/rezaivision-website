import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GERMAN_MONTHS: Record<string, number> = {
  januar: 0, februar: 1, "märz": 2, april: 3, mai: 4, juni: 5,
  juli: 6, august: 7, september: 8, oktober: 9, november: 10, dezember: 11,
};

/**
 * Wandelt ein deutsch formatiertes Datum ("15. April 2026") oder ein ISO-Datum
 * ("2026-04-15") in einen sortierbaren Zeitstempel (ms) um. Unparsbares → 0
 * (landet damit beim Sortieren ganz unten).
 */
export function germanDateToTimestamp(dateStr?: string): number {
  if (!dateStr) return 0;
  const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return Date.UTC(+iso[1], +iso[2] - 1, +iso[3]);
  const m = dateStr.match(/(\d{1,2})\.?\s+([A-Za-zäöüÄÖÜ]+)\s+(\d{4})/);
  if (m) {
    const month = GERMAN_MONTHS[m[2].toLowerCase()];
    if (month !== undefined) return Date.UTC(+m[3], month, +m[1]);
  }
  return 0;
}
