import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CLUB_NAME, NEW_PRODUCT_DAYS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createWhatsAppMessage(productTitle: string, price: number, url?: string): string {
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  return `¡Hola ${CLUB_NAME}!\n\nEstoy interesado en este producto de su catálogo:\n\n*${productTitle}*\n*Precio:* ${formatPrice(price)}\n*Enlace:* ${currentUrl}\n\n¿Tienen disponibilidad y medios de pago/envío? ¡Muchas gracias!`;
}

export function getWhatsAppShareUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getCatalogShareUrl(path: string = ""): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return path;
}

/**
 * Determina si un producto debe mostrar la insignia de "Nuevo".
 * Retorna true solo si el badge es "NUEVO" y no han transcurrido más de NEW_PRODUCT_DAYS (30 días) desde su creación.
 */
export function isProductNew(product?: { badge?: string | null; created_at?: string } | null): boolean {
  if (!product) return false;
  const rawBadge = (product.badge || "").trim().toUpperCase();
  if (rawBadge !== "NUEVO") return false;

  if (!product.created_at) {
    return true;
  }

  const createdTime = new Date(product.created_at).getTime();
  if (isNaN(createdTime)) {
    return true;
  }

  const diffMs = Date.now() - createdTime;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= NEW_PRODUCT_DAYS;
}

/**
 * Retorna los días restantes de vigencia de la insignia "Nuevo" (0 a 30).
 * Retorna 0 si ya superó los 30 días (expirado).
 */
export function getRemainingNewDays(product?: { created_at?: string } | null): number {
  if (!product?.created_at) return NEW_PRODUCT_DAYS;

  const createdTime = new Date(product.created_at).getTime();
  if (isNaN(createdTime)) return NEW_PRODUCT_DAYS;

  const diffMs = Date.now() - createdTime;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const remaining = NEW_PRODUCT_DAYS - diffDays;

  return Math.max(0, remaining);
}
