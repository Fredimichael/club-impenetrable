"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  X, 
  Share2, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice, createWhatsAppMessage, getWhatsAppShareUrl, getCatalogShareUrl } from "@/lib/utils";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenShare: (title: string, url: string, price: number, description?: string) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onOpenShare,
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"];

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100) 
    : 0;

  const productUrl = getCatalogShareUrl(`/producto/${product.id}`);

  const handleWhatsAppBuy = () => {
    const phone = product.whatsapp_number || DEFAULT_WHATSAPP_NUMBER;
    const msg = createWhatsAppMessage(product.title, product.price, productUrl);
    window.open(getWhatsAppShareUrl(phone, msg), "_blank");
  };

  const handleShareClick = () => {
    onOpenShare(product.title, productUrl, product.price, product.description);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative glass-dock w-full max-w-3xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/20 z-10 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {product.category}
            </span>
            {product.badge && (
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full glass-button text-white/70 hover:text-white"
              title="Compartir Producto"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass-button text-white/70 hover:text-white"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass-panel border border-white/10">
              <Image
                src={images[selectedImageIndex]}
                alt={product.title}
                fill
                className="object-cover object-center transition-all duration-300"
              />

              {hasDiscount && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-500/90 text-white font-bold text-xs shadow-lg backdrop-blur-md">
                  -{discountPercent}% OFF
                </div>
              )}

              {/* Prev / Next Image arrows if more than 1 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full glass-dock text-white/80 hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full glass-dock text-white/80 hover:text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-all ${
                      idx === selectedImageIndex
                        ? "ring-2 ring-emerald-400 scale-95"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Vista ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Availability tag */}
              <div className="flex items-center gap-1.5 mb-2">
                {product.in_stock ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Disponible para entrega inmediata
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-red-400 font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    Agotado temporalmente (Consultar reserva)
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {product.title}
              </h2>

              {/* Price display */}
              <div className="flex items-baseline gap-3 mb-5 p-3 rounded-2xl glass-panel">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-sm sm:text-base line-through text-white/40 font-medium">
                    {formatPrice(product.compare_at_price!)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                  Detalles del Producto
                </h4>
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                  {product.description || "Sin descripción adicional provista."}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
              <button
                onClick={handleWhatsAppBuy}
                className="glass-button-primary w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm sm:text-base shadow-xl"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Pedir o Consultar por WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleShareClick}
                  className="glass-button py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-white/90 hover:text-white"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Compartir / QR</span>
                </button>

                <a
                  href={`/producto/${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enlace directo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
