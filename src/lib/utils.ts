import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Valida si un string es un UUID válido (versión 4)
 * @param uuid - String a validar
 * @returns boolean - true si es un UUID válido, false en caso contrario
 */
export function isValidUuid(uuid: string): boolean {
  if (!uuid || typeof uuid !== "string") {
    return false;
  }

  // Regex para UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // donde x es cualquier dígito hexadecimal y y es 8, 9, A, o B
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidRegex.test(uuid);
}

/**
 * Valida si un string es un UUID válido (cualquier versión)
 * @param uuid - String a validar
 * @returns boolean - true si es un UUID válido, false en caso contrario
 */
export function isValidUuidAnyVersion(uuid: string): boolean {
  if (!uuid || typeof uuid !== "string") {
    return false;
  }

  // Regex para UUID de cualquier versión
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  return uuidRegex.test(uuid);
}
