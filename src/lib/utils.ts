import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  return `¡Hola Club Impenetrable! 👋\n\nEstoy interesado en este producto de su catálogo:\n\n📦 *${productTitle}*\n💰 *${formatPrice(price)}*\n🔗 *Enlace:* ${currentUrl}\n\n¿Tienen disponibilidad y medios de pago/envío? ¡Muchas gracias!`;
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
